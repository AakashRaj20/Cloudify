<p align="center">
 <img src="https://drive.google.com/uc?id=1LtaOuvpAlThn2PKlEDxa3X0V_Fj1Neyq" width="300" />
</p>

## Overview
This weather tracking app provides up-to-date weather information for various cities. It offers a range of features designed to enhance user experience and functionality.

## Features
• Real-Time Weather Data: Utilizes various REST API endpoints from Rapid API to deliver real-time weather information.

• Dynamic Weather Map: Integrates React Leaflet to visualize weather conditions for approximately 50 nearby cities.

• City Addition: Allows signed-in users to track weather data for multiple cities, enhancing personalization.

• Authentication: Ensures secure access through Google provider authentication via Firebase.

• Database Integration: Leverages Firestore for efficient storage and retrieval of user-specific data.

• Responsive Design: Implements responsive design principles using Material-UI, ensuring a seamless user experience across all devices.

• Engaging Slider: Incorporates Keen Slider for a smooth and engaging user interface element.

• Deployment: The application is deployed using Firebase Hosting, with continuous development facilitated through GitHub Actions.


## Tech Stack

### UI-Design:
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" width="100" />

### Frontend:
<div>
  <img alt="html" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" width="100" />
  <img alt="css" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" width="88" />
  <img alt="javascript" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" width="147" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" width="100" />
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" width="100" />
  <img src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" width="147" />
</div>

### Backend & Hosting:
  <img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black" width="123" />



## Run Locally

Clone the project

```bash
  git clone https://github.com/AakashRaj20/Cloudify.git
```

Go to the project directory

```bash
  cd weather-app
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## API Endpoints Used

#### Get all items

```http
  GET https://weatherapi-com.p.rapidapi.com/forecast.json
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |
| `city` | `string` | **Required**. city searched by user |

#### Get item

```http
  GET https://api.openweathermap.org/data/2.5/find?
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key` | `string` | **Required**. Your API key |
| `lat` | `string` | **Required**. latitude of city searched|
| `lon` | `string` | **Required**. longitude of city searched|
| `cnt` | `string` | **Required**. number of cities data wanted|

```http
  GET https://foreca-weather.p.rapidapi.com/forecast/daily/id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key` | `string` | **Required**. Your API key |
| `id` | `string` | **Required**. id of the city searched|

```http
  GET https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key` | `string` | **Required**. Your API key |
| `city` | `string` | **Required**. city searched by user |

```http
  GET https://weatherapi-com.p.rapidapi.com/forecast.json
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key` | `string` | **Required**. Your API key |
| `city` | `string` | **Required**. city searched by user |
| `days` | `string` | **Required**. number of days |




## Contributing

Contributions are always welcome!


## Deployment

To deploy this project run

```bash
 npm run build
 firebase init
 firebase deploy
```

