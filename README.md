
# Interview Weather Server App

Node Express server for interview weather app.

## Installation

First, follow this instruction here to setup a Postgres DB locally.
<https://github.com/calvert-work/interview-weather-db-docker>

Then, install packages and run server

```bash
  npm install
  npm run dev
```

Avoid below commands because it is somewhat buggy

```bash
  npm run build
  npm run start
```

Provide these values to your `.env` file

```bash
  SERVER_PORT=3001
  NODE_ENV=development
  OPEN_WEATHER_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXX
  OPEN_WEATHER_URL=https://api.openweathermap.org/data/2.5
  OPEN_WEATHER_GEO_URL=http://api.openweathermap.org/geo/1.0
  DATABASE_URL=postgresql://weather:weather@localhost:5432/weatherdb
  UI_URL=http://localhost:5173
```

If you want to connect to the Postgres DB hosted on render.com, change these lines

```bash
  NODE_ENV=staging
  DATABASE_URL=postgresql://weather:erYsH2rGmewIgmgdbHWchiAGUKORHEFL@dpg-d18fe08gjchc73bhuu6g-a.oregon-postgres.render.com/weatherdb_kh4h
```

## Run tests

Vitest, supertest, msw (Mock Service Worker) are used for unit testing and integration testing

To run tests once:

```bash
  npm run test
```

To watch tests:

```bash
  npm run test:watch
```

To get test coverage:

```bash
  npm run test:coverage
```

## API Reference

#### 1. Healthcheck

```http
  GET /healthcheck
```

Return a value indicating the server is up and running

#### 2. Get location suggestions from open weather api

```http
  GET /api/location/suggestion{/:city}
```

| Path Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `city` | `string` | Searched city eg: `las vegas`|

When user types a city name, this api returns max of 6 suggestions that are relevant to the city name. For example, if city value is `las vegas`, it will return `["Las Vegas,NV,US", "Las Vegas Valley,NV,US, "Las Vegas,NM,US", ...]`

#### 3. Get current weather of a city (Has rate limit, max 10 requests per 30 sec)

```http
  GET /api/weather/current{/:city}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `city`      | `string` | Searched city eg: `las vegas` |

Get current weather data. Store the searched city to history if a user is logged in

#### 4. Get 5 days forecast weather of a city (Has rate limit, max 10 requests per 30 sec)

```http
  GET /api/weather/forecast{/:city}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `city`      | `string` | Searched city eg: `las vegas` |

Get 5 days forecast weather data.

#### 5. Get user

```http
  GET /api/weather/user{/:email}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | Registered user email |

Get details of a registerd user. Registered user unlocks the favorite cities and search history feature.

#### 6. Get favorite cities

```http
  GET /api/weather/favorites  // don't recall why userId is part of the query param
```

| Query parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`      | `string` | **Required:** User id |

Get a list favorite cities of a user

#### 7. Get search history

```http
  GET /api/weather/history
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id`      | `string` | **Required:** User id |

Get a list search history of a user

#### 8. Store favorite city

```http
  POST /api/weather/favorites
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id`      | `string` | **Required:** User id |

Store a city to favorite list, no duplicate is allowed

#### 8. Store favorite city

```http
  POST /api/weather/users
```

Register a new user

#### 9. Delete favorite city

```http
  POST /api/weather/favorites{/:id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required:** favorite city row id |

Delete one favorite city related to the user

#### 10. Clear all history of a user

```http
  POST /api/weather/history
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id`      | `string` | **Required:** User id |

Clear all history related to the user

## Folder structure / Architecture

1. constants folder: to store reuseable constants such as DB columns name
2. controllers folder: to store the business logic of a feature
3. db folder: to store DB related code eg: db instance and db operations
4. dto folder: to store the blueprint of any objects/responses
5. middlewares folder: to store all middlewares
6. routes folder: to group routes by features or by HTTP type
7. utils folder: to group utility/validator code such as capitalize() or isEmail()
8. **tests** folder: to store test case code mimicking the structure of the server code

![folder tree](folderTree.png)

## Suggested optimizations

1. Group external api calls eg: weather api requests to a `services` folder so that the actual api call code will not reside in the controller code

2. Group database operation code to a `repositories` folder so that the actual DB operation code will not reside in the controller code

3. User Id can be found at path parameter, query parameter, or request body in different routes. This should be placed at one place if possible

## What was not done

1. Created Datadog trial account and the intention was to create a winston logger and send app logs with detailed info to Datadog for logging. The server's error responses are purposely made to be vague as a security measure.

2. Unique code representing the common error. The intention was to send this unique code to the frontend whenever there is an error so that the unique code will be used to reference the logs on Datadog

3. Redis setup code is available in the Github Repository above but did not get the chance to implement it to cache responses.
