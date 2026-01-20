# Weather Forecasting Web Application

A responsive, full-stack weather application built with **Spring Boot** (Backend) and **Vanilla HTML/CSS/JS** (Frontend).

## 🚀 Features

- **Real-time Weather**: Fetches current weather data for any city.
- **Detailed Metrics**: Displays temperature (°C), humidity, wind speed, and weather condition.
- **Responsive Design**: Glassmorphism UI that adapts to Mobile, Tablet, and Desktop screens.
- **Error Handling**: User-friendly error messages for invalid cities or API failures.

## 🛠️ Technology Stack

- **Backend**: Java 17, Spring Boot 3.2.2, Spring Web, RestTemplate, Lombok
- **Frontend**: HTML5, CSS3 (Flexbox/Grid), JavaScript (ES6+), FontAwesome

## ⚙️ Setup & Installation

### Prerequisites

- Java 17 or higher
- Maven
- Basic web browser

### Backend Setup

1.  **Clone/Download** the repository.
2.  Navigate to the `backend` directory.
3.  **Configure API Key**:
    The application now uses an environment variable for security. You can run it in two ways:

    **Option A: Command Line (Easiest for testing)**
    ```bash
    mvn spring-boot:run -Dspring-boot.run.arguments=--weather.api.key=YOUR_OPENWEATHER_API_KEY_HERE
    ```

    **Option B: Environment Variable**
    Set `WEATHER_API_KEY` in your system environment variables, then run:
    ```bash
    mvn spring-boot:run
    ```

### Frontend Setup

1.  Navigate to the `frontend` directory.
2.  Open `index.html` in any web browser.
3.  Enter a city name and hit search!

## 📡 API Endpoints

- **GET** `/api/weather/{city}`
  - **Description**: Fetches current weather for the specified city.
  - **Response**:
    ```json
    {
      "city": "London",
      "temperature": 15.0,
      "humidity": 72,
      "condition": "Cloudy",
      "windSpeed": 12.5
    }
    ```

## 📸 Screenshots

*(Add screenshots here after running the app)*
![weather report](image.png)
