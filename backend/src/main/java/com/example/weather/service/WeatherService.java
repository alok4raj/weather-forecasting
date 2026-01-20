package com.example.weather.service;

import com.example.weather.dto.WeatherResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Map;

@Service
public class WeatherService {

    @Value("${weather.api.url}")
    private String apiUrl;

    @Value("${weather.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public WeatherService() {
        this.restTemplate = new RestTemplate();
    }

    public WeatherResponse getWeather(String city) {
        // OpenWeatherMap uses 'appid' for key and 'q' for city. Added 'units=metric'
        // for Celsius
        String url = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("appid", apiKey)
                .queryParam("q", city)
                .queryParam("units", "metric")
                .toUriString();

        try {
            // Fetch data from external API as a Map to handle dynamic JSON
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);

            if (response != null) {
                return mapToWeatherResponse(response);
            } else {
                throw new RuntimeException("No data received from weather API");
            }
        } catch (org.springframework.web.client.HttpClientErrorException e) {
            throw new RuntimeException("External API Error: " + e.getStatusCode() + " " + e.getResponseBodyAsString());
        } catch (Exception e) {
            throw new RuntimeException("Error fetching weather data: " + e.getMessage());
        }
    }

    private WeatherResponse mapToWeatherResponse(Map<String, Object> apiResponse) {
        // Parse OpenWeatherMap JSON structure
        Map<String, Object> main = (Map<String, Object>) apiResponse.get("main");
        Map<String, Object> wind = (Map<String, Object>) apiResponse.get("wind");
        List<Map<String, Object>> weatherList = (List<Map<String, Object>>) apiResponse.get("weather");
        Map<String, Object> weather = weatherList.get(0);

        String cityName = (String) apiResponse.get("name");
        double tempC = ((Number) main.get("temp")).doubleValue();
        int humidity = ((Number) main.get("humidity")).intValue();
        String conditionText = (String) weather.get("main"); // or "description"
        double windKph = ((Number) wind.get("speed")).doubleValue() * 3.6; // Convert m/s to km/h

        return new WeatherResponse(cityName, tempC, humidity, conditionText, windKph);
    }
}
