
# Cloudsify
It's All in one Weather forecast, full-stack web-app built using React and Firebase.



## Authors

- [@AakashRaj20](https://github.com/AakashRaj20)


## Tech Stack

**Client:** 
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" width="100" />

**Server:** Node, Express


## Documentation

[Documentation](https://linktodocumentation)


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

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Deployment

To deploy this project run

```bash
  npm run deploy
```

