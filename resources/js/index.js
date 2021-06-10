/* eslint-env browser */

/**
 * TODO:
 * 
 * - Eingaben der Nutzer*innen im Inputfeld abfangen
 * - Prüfen ob eingegebene Städte mit der OpenWeatherMap-API verwendet werden können
 * - Neues WetterWidget in Liste ergänzen, Wetterdaten für die eingegebene Stadt holen und im Widget anzeigen
 * - Hinzugefügte Stadt im LocalStorage "merken" und beim erneuten Starten der App für alle gespeicherten Städte Widgets zur liste hinzufügen
 * - Schaltflächen des Widget-Template nutzen um angezeigte Städte aktualisieren und entfernen zu können
 * - Optional: Liste per Drag & Drop sortierbar machen
 * - ...
 */
 import DataProvider from "./utils/DataProvider.js";
 import InputBar from "./ui/InputBar.js";
 
 const NOT_FOUND = "404";
 var inputBar = new InputBar,
     cityList = new Array();

 function init() {
     console.log("### Starting Weather-App ###");
     // Starten Sie hier mit Ihrer Implementierung
     addFromLocalStorage();
     initInput();
 }
 
 function getData(city){
     let dataProvider = new DataProvider;
     dataProvider.loadData(city).then((data) => {
         if(data.cod === NOT_FOUND){
             console.log("Stadt wurde nicht gefunden...");
             let widgetList = document.querySelector(".widget.add-item");
             widgetList.classList.add("show-error-animation");
             widgetList.addEventListener("animationend", function(){
                 console.log("event");
                 widgetList.classList.remove("show-error-animation");
             });
            }
          else {
             addWeatherWidget(data);
             
         }
     });
 }
 
 function initInput(){
     //Ruft die Methode getData auf, wenn die Entertaste gedrückt wird.
     inputBar.bar.addEventListener("keypress", function(e){
         if(e.key === "Enter" && inputBar.bar.value !== ""){
             let input = inputBar.getInput();
             getData(input);
             saveInLocaleStorage(input);
         }
     });
 }

 function addWeatherWidget(data){
    //Prüfen ob Stadt bereits in Liste existiert, falls nicht hinzufügen, falls doch aktualisieren
    var WidgetList = document.getElementsByTagName('ul')[0];
    var CityExists = 0
    if (WidgetList.childElementCount > 1) // Nur Ausführen wenn Bereits eine Stadt in der Liste enthalten ist
    {
        for(var i = 1; i <= WidgetList.children.length; i++)
        {
            if(data.name === WidgetList.children[i].attributes[1].value){
                CityExists = i;
            }
            break;
        }        
    }

    if(CityExists > 0) //Stadt Existiert bereits
    {
        //Icon anpassen
        //"http://openweathermap.org/img/wn/10d@2x.png"
        var iconsource = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
        var icon = WidgetList.children[i].querySelector('.icon');
        icon.children[0].src = iconsource;    
        
        //Ort + Temperatur Befüllen
        // Template --> span.data --> span.main

        var CityandTemp = WidgetList.children[i].querySelector('.main');
        var CurrentString = CityandTemp.querySelector('span')
        CurrentString.textContent = data.name + ", " + Math.round(data.main.temp) + "°C";
    
        //min Temperature
        var MinTemperature = WidgetList.children[i].querySelector('.container.min-temperature');
        MinTemperature.innerText = Math.round(data.main.temp_min) + "°C";

        ////MaxTemperature
        var MaxTemperature = WidgetList.children[i].querySelector('.container.max-temperature');
        MaxTemperature.children[1].innerText = Math.round(data.main.temp_max) + "°C";    
        
        ////Luftfreuchtigkeit
        var Humidity = WidgetList.children[i].querySelector('.container.humidity');
        Humidity.children[1].innerText = Math.round(data.main.humidity) + "%";
        
        ////Luftdruck
        var Pressure = WidgetList.children[i].querySelector('.container.pressure');
        Pressure.children[1].innerText = Math.round(data.main.pressure) + "hPa";
        
        ////Windgeschwindigkeit
        var WindSpeed = WidgetList.children[i].querySelector('.container.wind');
        WindSpeed.children[1].innerText = data.wind.speed;        
    }
    else //Stadt existiert noch nicht
    {
        //Template holen und duplizieren
        var template = document.querySelector('#weather-widget-template');
        var WeatherTemplate = template.cloneNode(true);
        
        //Data-city Befüllen
        var datacity = WeatherTemplate.content.querySelector('.widget');
        datacity.attributes[1].value = data.name;
        
        //Icon anpassen
        //"http://openweathermap.org/img/wn/10d@2x.png"
        var iconsource = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
        var icon = WeatherTemplate.content.querySelector('.icon');
        icon.children[0].src = iconsource;    
        
        //Ort + Temperatur Befüllen
        // Template --> span.data --> span.main

        var CityandTemp = WeatherTemplate.content.querySelector('.main');

        var LocationName = document.createElement("span");
        LocationName.textContent = data.name + ", " + Math.round(data.main.temp) + "°C";
        CityandTemp.appendChild(LocationName);
        
        //min Temperature
        var MinTemperature = WeatherTemplate.content.querySelector('.container.min-temperature');
        MinTemperature.innerText = Math.round(data.main.temp_min) + "°C";

        ////MaxTemperature
        var MaxTemperature = WeatherTemplate.content.querySelector('.container.max-temperature');
        MaxTemperature.children[1].innerText = Math.round(data.main.temp_max) + "°C";    
        
        ////Luftfreuchtigkeit
        var Humidity = WeatherTemplate.content.querySelector('.container.humidity');
        Humidity.children[1].innerText = Math.round(data.main.humidity) + "%";
        
        ////Luftdruck
        var Pressure = WeatherTemplate.content.querySelector('.container.pressure');
        Pressure.children[1].innerText = Math.round(data.main.pressure) + "hPa";
        
        ////Windgeschwindigkeit
        var WindSpeed = WeatherTemplate.content.querySelector('.container.wind');
        WindSpeed.children[1].innerText = data.wind.speed;
        
        var DeleteButton = WeatherTemplate.content.querySelector('.delete');
        console.log(DeleteButton);
        DeleteButton.addEventListener("click", function(){
            litter(this.parentNode.parentNode.attributes[1].textContent);
        });

        var UpdateButton = WeatherTemplate.content.querySelector('.update');
        UpdateButton.addEventListener("click", function(){
            getData(this.parentNode.parentNode.attributes[1].textContent);
        });

        WidgetList.appendChild(WeatherTemplate.content);
    }

 }

 function saveInLocaleStorage (city){
     if(!cityList.includes(city)){
        cityList.push(city);
        localStorage.setItem("cities", JSON.stringify(cityList));
     }
 }

 function deleteFromLocalStorage(city){
     cityList = cityList.filter(function(item) {
        return item !== city;
    });
    localStorage.setItem("cities", JSON.stringify(cityList));
 }

 function addFromLocalStorage(){
     if(localStorage.getItem("cities") === null){
         localStorage.setItem("cities", JSON.stringify(cityList));
     } else {
         cityList = JSON.parse(localStorage.getItem("cities"));
            for (let index = 0; index < cityList.length; index++) {
                let city = cityList[index];
                console.log(city);
                if(city!== ""){
                    getData(city);
                }
            }
     }
 }

 function litter(City){
    console.log("Trying to delete " + City);
    var rubbish = document.getElementsByTagName('ul')[0];
    
    for(var i = 1; i <= rubbish.children.length; i++){
        console.log(rubbish.children.length);
        if(City === rubbish.children[i].attributes[1].value){

            console.log(rubbish.children[i].attributes[1].value);
            deleteFromLocalStorage(rubbish.children[i].attributes[1].value);
            rubbish.removeChild(rubbish.children[i]);
            console.log("child removed");
            break;
        }
    }
 }
 
 init();
