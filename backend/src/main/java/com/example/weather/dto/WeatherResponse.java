package com.example.weather.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WeatherResponse {
    private String city;
    private double temperature;
    private int humidity;
    private String condition;
    private double windSpeed;
}
