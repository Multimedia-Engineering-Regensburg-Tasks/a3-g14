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
 
 function addWeatherWidget(data){
     //Hier kann die Stadt als Widget hinzugefügt werden...
     console.log(data.name);
 }
 
 init();