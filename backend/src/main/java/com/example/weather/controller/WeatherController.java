package com.example.weather.controller;

import com.example.weather.dto.WeatherResponse;
import com.example.weather.service.WeatherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "*") // Allow requests from any frontend for simplicity; restrict in production
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/{city}")
    public ResponseEntity<WeatherResponse> getWeather(@PathVariable String city) {
        WeatherResponse weather = weatherService.getWeather(city);
        return ResponseEntity.ok(weather);
    }
}
