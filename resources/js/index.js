/* eslint-env browser */

 import DataProvider from "./utils/DataProvider.js";
 import InputBar from "./ui/InputBar.js";
 import WeatherWidget from "./ui/WeatherWidget.js";
 
 const NOT_FOUND = "404";
 var inputBar = new InputBar,
     weatherWidget = new WeatherWidget,
     cityList = new Array();

    //Die im localstorage gespeicherten Städte werden geladen und die InputBar initialisiert.
 function init() {
     addFromLocalStorage();
     initInput();
 }
 
    //Falls die Stadt im OpenWeatherApiClient existiert, werden die Daten des DataProviders an die addWeatherWidget Methode übergeben.
 function getData(city){
     let dataProvider = new DataProvider;
     dataProvider.loadData(city).then((data) => {
         if(data.cod === NOT_FOUND){
             let widgetList = document.querySelector(".widget.add-item");
             widgetList.classList.add("show-error-animation");
             widgetList.addEventListener("animationend", function(){
                 widgetList.classList.remove("show-error-animation");
             });
            }
          else {
            weatherWidget.addWeatherWidget(data,litter,getData,deleteFromLocalStorage);
            saveInLocaleStorage(city);
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

 // speicher jede neu hinzugefügte Stadt im localstorage
 function saveInLocaleStorage (city){
     if(!cityList.includes(city)){
        cityList.push(city);
        localStorage.setItem("cities", JSON.stringify(cityList));
     }
 }

 //Eine übergebene Stadt wird aus dem localstorage entfernt
 function deleteFromLocalStorage(city){
     cityList = cityList.filter(function(item) {
        return item !== city;
    });
    localStorage.setItem("cities", JSON.stringify(cityList));
 }

 //Falls noch keine Eintragung im local storage vorhanden ist, wird eine neues Array in Form einer JSON Datei im localstorage gespeichert.
 //Alle gespeicherten Städte werden der getData() Methode übergeben.
 function addFromLocalStorage(){
     if(localStorage.getItem("cities") === null){
         localStorage.setItem("cities", JSON.stringify(cityList));
     } else {
         cityList = JSON.parse(localStorage.getItem("cities"));
            for (let index = 0; index < cityList.length; index++) {
                let city = cityList[index];
                if(city!== ""){
                    getData(city);
                }
            }
     }
 }

 function litter(City){
    var rubbish = document.getElementsByTagName('ul')[0];
    
    for(let i = 1; i <= rubbish.children.length; i++){
        if(City === rubbish.children[i].attributes[1].value){
            deleteFromLocalStorage(rubbish.children[i].attributes[1].value);
            rubbish.removeChild(rubbish.children[i]);
            break;
        }
    }
 }
 
 init();
