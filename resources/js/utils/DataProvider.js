/* eslint-env browser */
import OpenWeatherApiClient from "../api/OpenWeatherApiClient.js";

class DataProvider{

    //Wandelt die Informationen aus der URL in eine JSON Datei um. Diese wird zurückgegeben.
    loadData(city){
        let openWeatherApiClient = new OpenWeatherApiClient,
        requestURL = openWeatherApiClient.getUrl(city);
        
        return fetch(requestURL)
        .then((response) => { 
            return response.json().then((data) => {
                return data;
            }).catch(function(error){
                // eslint-disable-next-line no-console
                console.log(error);
            });
        });
    }
}

export default DataProvider;