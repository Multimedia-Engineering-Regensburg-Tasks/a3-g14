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
 var inputBar = new InputBar;
    
 
 function init() {
     console.log("### Starting Weather-App ###");
     // Starten Sie hier mit Ihrer Implementierung
     initInput();
 }
 
 function getData(city){
     let dataProvider = new DataProvider;
     dataProvider.loadData(city).then((data) => {
         if(data.cod === NOT_FOUND){
             //Stadt wurde nicht gefunden...
         } else {
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
         }
     });
 }

 function litter(City){
    console.log("Trying to delete " + City);
    var rubbish = document.getElementsByTagName('ul')[0];
    
    for(var i = 1; i <= rubbish.length; i++){
        console.log(rubbish.length);
        if(City === rubbish.children[i].attributes[1].value){

            console.log(rubbish[i].attributes[1].value);
            var test = rubbish[i]
            rubbish.removeChild(rubbish.children[i]);
            console.log("child removed");
        }
    }
 }
 
 function addWeatherWidget(data){
     //Hier kann die Stadt als Widget hinzugefügt werden...
     console.log(data);
    //Template holen
    var WeatherTemplate = document.getElementsByTagName("template")[0].content.firstElementChild.cloneNode(true);
 
     //Data-city Befüllen
    WeatherTemplate.attributes[1].value = data.name;
    
    //Icon anpassen
    //"http://openweathermap.org/img/wn/10d@2x.png"
    var iconsource = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    WeatherTemplate.children[0].children[0].src = iconsource;    
    
    //Ort + Temperatur Befüllen
    // Template --> span.data --> span.main
    var LocationName = document.createElement("span");
    LocationName.textContent = data.name + ", " + Math.round(data.main.temp) + "°C";
    WeatherTemplate.children[1].children[0].appendChild(LocationName);
    
    //min Temperature
    //-->Template -->span.data -->span.additioal -->min.temperature --> span.value

    WeatherTemplate.children[1].children[1].children[0].children[1].textContent = Math.round(data.main.temp_min) + "°C";
    //MaxTemperature
    WeatherTemplate.children[1].children[1].children[1].children[1].textContent = Math.round(data.main.temp_max) + "°C";
    //Luftfreuchtigkeit
    WeatherTemplate.children[1].children[1].children[2].children[1].textContent = data.main.humidity + "%";
    //Luftdruck
    WeatherTemplate.children[1].children[1].children[3].children[1].textContent = data.main.pressure +  "hPa";

    //Windgeschwindigkeit
    WeatherTemplate.children[1].children[1].children[4].children[1].textContent = data.wind.speed + "m/s";
    
        //console.log(WeatherTemplate);

                    // --> controls --> delete
    var DeleteCode = '<span onclick="litter(' + data.name + ')"><i class="fas fa-trash"></i></span>';
    WeatherTemplate.children[2].children[1].innerHTML = DeleteCode; 
    //("click", litter(data));
    
    var widgetList = document.getElementsByTagName("ul")[0];
    console.log(widgetList);
    
    widgetList.appendChild(WeatherTemplate);
    
   /* var litter = document.getElementsByClassName('delete')[0].addEventListener("click", function(event){
        console.log("delete");
        widgetList.parentNode.removeChild(widgetList);
 });

 document.getElementsByClassName('update')[0].addEventListener("click", function(){
     console.log("update");
 })
 */

    
 }


 
 init();
