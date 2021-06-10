/* eslint-env browser */
/* eslint-disable no-undef */

var widgetList = document.getElementsByTagName("ul")[0],
    CityExists = 0;

class WeatherWidget {

    addWeatherWidget(data, litter, getData, deleteFromLocalStorage){
        //prüft ob Stadt bereits in Liste existiert, falls nicht wird diese hinzugefügt, falls doch aktualisiert

    // Wird nur ausgeführt wenn bereits eine Stadt in der Liste enthalten ist
    if (widgetList.childElementCount > 1){
        for(let i = 1; i < widgetList.children.length; i++)
        {
            if(data.name === widgetList.children[i].attributes[1].value){
                CityExists = i;
                break;
            }
        }        
    }
     //Stadt Existiert bereits
    if(CityExists > 0){
        let iconsource = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png",
            icon = widgetList.children[i].querySelector(".icon"),
            CityandTemp = widgetList.children[i].querySelector(".main"),
            CurrentString = CityandTemp.querySelector("span"),
            MinTemperature = widgetList.children[i].querySelector(".container.min-temperature"),
            MaxTemperature = widgetList.children[i].querySelector(".container.max-temperature"),
            Humidity = widgetList.children[i].querySelector(".container.humidity"),
            Pressure = widgetList.children[i].querySelector(".container.pressure"),
            WindSpeed = widgetList.children[i].querySelector(".container.wind"); 

            CurrentString.textContent = data.name + ", " + Math.round(data.main.temp) + "°C";
            icon.children[0].src = iconsource; 
            //min Temperature
            MinTemperature.innerText = Math.round(data.main.temp_min) + "°C";
            //MaxTemperature
            MaxTemperature.children[1].innerText = Math.round(data.main.temp_max) + "°C";
            //Luftfreuchtigkeit    
            Humidity.children[1].innerText = Math.round(data.main.humidity) + "%"; 
            //Luftdruck
            Pressure.children[1].innerText = Math.round(data.main.pressure) + "hPa";
            //Windgeschwindigkeit
            WindSpeed.children[1].innerText = data.wind.speed;
            
    } else {
        
        //Template wird dupliziert
        let template = document.querySelector("#weather-widget-template"),
            WeatherTemplate = template.cloneNode(true),
            datacity = WeatherTemplate.content.querySelector(".widget"),
            iconsource = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png",
            icon = WeatherTemplate.content.querySelector(".icon"),
            CityandTemp = WeatherTemplate.content.querySelector(".main"),
            LocationName = document.createElement("span"),
            MinTemperature = WeatherTemplate.content.querySelector(".container.min-temperature"),
            MaxTemperature = WeatherTemplate.content.querySelector(".container.max-temperature"),
            Humidity = WeatherTemplate.content.querySelector(".container.humidity"),
            Pressure = WeatherTemplate.content.querySelector(".container.pressure"),
            WindSpeed = WeatherTemplate.content.querySelector(".container.wind"),
            DeleteButton = WeatherTemplate.content.querySelector(".delete"),
            UpdateButton = WeatherTemplate.content.querySelector(".update");
        
            //Data-city wird befüllt
            datacity.attributes[1].value = data.name;
            icon.children[0].src = iconsource; 
            LocationName.textContent = data.name + ", " + Math.round(data.main.temp) + "°C";
            CityandTemp.appendChild(LocationName);
            
            //min Temperature
            MinTemperature.innerText = Math.round(data.main.temp_min) + "°C";
            //MaxTemperature
            MaxTemperature.children[1].innerText = Math.round(data.main.temp_max) + "°C";    
            //Luftfreuchtigkeit
            Humidity.children[1].innerText = Math.round(data.main.humidity) + "%";
            //Luftdruck
            Pressure.children[1].innerText = Math.round(data.main.pressure) + "hPa";
            //Windgeschwindigkeit
            WindSpeed.children[1].innerText = data.wind.speed;
            
            DeleteButton.addEventListener("click", function(){
                litter(this.parentNode.parentNode.attributes[1].textContent);
                deleteFromLocalStorage(this.parentNode.parentNode.attributes[1].textContent);
            });

            UpdateButton.addEventListener("click", function(){
                getData(this.parentNode.parentNode.attributes[1].textContent);
            });

                widgetList.appendChild(WeatherTemplate.content);
        }
    }
}

export default WeatherWidget;