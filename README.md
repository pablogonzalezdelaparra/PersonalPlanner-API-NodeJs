# Final NodeJS Challenge (3° Challenge)

## Repository information
**Author:** Pablo González de la Parra

**Date:** 30/12/2022

## Description of this repository
Thinking about a new client that appeared in the market, Compass UOL had the idea of creating a planner. This planner will help the client to organize his week and his tasks and at what times they happen.
> **Note:** Improvements over the last delivery (2° Challenge).

## How to run this API on hosted server
This API is hosted on render.com. In order to access it live, open the next link:
```
https://compass-final-project.onrender.com/api/v1 + {route}
```
> **Note:** Enter any valid route in the {route} section in order to test the API. Check below. It may take some time to load the first time you access it.

## How to run this API locally
In order to run this repository in your local machine, follow these next steps:
1. Download the repository locally into your machine (as a ZIP file or using Github Desktop).
1. Open the folder named *compass-final-project* in your IDE of choice.
1. Write on the terminal `npm install` to download all packages.
1. Write on the terminal `npm start` to run the server.
1. While the server is running, enter in your favorite web browser the next URL: 
```
http://localhost:3000/api/v1 + {route}
```
6. Enter any valid route in the {route} section in order to test the API.
> **Note:** The database used in this repository is stored in MongoDB Atlas (Cloud). It accepts any IP connection. All database manipulation is done through the API.

## How to do unit testing
In order to test this program, follow these next steps to run all the unit tests:
1. Check that the server isn't currently running.
1. Write on the terminal `npm install` (if you hadn't done it before).
1. Run the command `npm test`.
> **Note:** Tests may take some time to execute. All the information created by the POST routes are deleted after each iteration of the unit tests. 

## Routes
In order to test the routes in the API, follow the examples below. Consider these next important aspects:
1. API doesn't allow accents due to input validation (ASCII validation).
1. DELETE routes are protected with the jwt token. In order to access them, add the next authorization header to each request.

| Header name   | Value          
| ------------- |:-------------:|
| authorization | Bearer {jwt token}

The `authorization` header's value consists of 3 elements.
1. The keyword `Bearer`.
2. A whitespace.
3. The `jwt` token (gotten from sign in or sign up route).
3. The API has dummy data to test its functionality.
> **Note:** For safety reasons, the token is sent on headers, not on cookies. 
### Base route
* Run locally
```
http://localhost:3000/api/v1
```
* Run on hosted server
```
https://compass-final-project.onrender.com/api/v1
```


### GET routes
* Get all events
```
http://localhost:3000/api/v1/events
```
* - Example response
```
{
	"status": "success",
	"results": 1,
	"data": {
		"data": [
			{
				"_id": "63ab695d5ad83cb8d9ff1527",
				"description": "Independence Day",
				"createdAt": "2022-12-27T21:46:42.675Z",
				"dayOfWeek": "monday"
			},
		]
	}
}
```

* Get all events by weekday
```
http://localhost:3000/api/v1/events?weekday=
```
* - Example request
```
http://localhost:3000/api/v1/events?weekday=monday
```
* - Example response
```
{
	"status": "success",
	"results": 1,
	"data": {
		"data": [
			{
				"_id": "63ab695d5ad83cb8d9ff1527",
				"description": "Independence Day",
				"createdAt": "2022-12-27T21:46:42.675Z",
				"dayOfWeek": "monday"
			},
		]
	}
}
```
> **Note:** Weekdays are: monday, tuesday, wednesday, thursday, friday, saturday, and sunday.

* Get all events by ID
```
http://localhost:3000/api/v1/events?id=
```
* - Example request
```
http://localhost:3000/api/v1/events?id=63ab695d5ad83cb8d9ff1527
```
* - Example response
```
{
	"status": "success",
	"results": 1,
	"data": {
		"data": [
			{
				"_id": "63ab695d5ad83cb8d9ff1527",
				"description": "Independence Day",
				"createdAt": "2022-12-27T21:46:42.675Z",
				"dayOfWeek": "monday"
			},
		]
	}
}
```

* Get all users
```
http://localhost:3000/api/v1/users
```
* - Example response
```
{
	"status": "success",
	"results": 1,
	"data": {
		"data": [
			{
				"_id": "63ab6bb45ad83cb8d9ff1547",
				"firstName": "Pablo",
				"lastName": "Gonzalez de la Parra",
				"birthDate": "2000-08-11T00:00:00.000Z",
				"city": "Mexico City",
				"country": "Mexico",
				"email": "pablo@gmail.com"
			}
		]
	}
}
```

* Get all users by ID
```
http://localhost:3000/api/v1/users?id=
```
* - Example request
```
http://localhost:3000/api/v1/users?id=639ffd185606390cc86158e1
```
* - Example response
```
{
	"status": "success",
	"data": {
		"data": {
			"_id": "639ffd185606390cc86158e1",
			"firstName": "Alfredo",
			"lastName": "González de la Parra",
			"birthDate": "2000-08-11T00:00:00.000Z",
			"city": "Mexico City",
			"country": "Mexico",
			"email": "alfredo@gmail.com"
		}
	}
}
```

### POST routes
* User signup
```
http://localhost:3000/api/v1/users/signup
```
* - Example request
```
{
	"firstName": "Angel",
	"lastName": "Romero Silva",
	"birthDate": "2002-05-07T00:00:00.000Z",
	"city": "Caracas",
	"country": "Venezuela",
	"email": "angel@gmail.com",
	"password": "password123",
  "confirmPassword": "password123"
}
```
* - Example response
```
{
	"status": "success",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWI2YzVjNWFkODNjYjhkOWZmMTU0YiIsImlhdCI6MTY3MjE3ODc4MCwiZXhwIjoxNjc5OTU0NzgwfQ.voFO45Iegrk-rjEnthovQzFZ7Nd4-Q2zYmsX93zXW2g",
	"data": {
		"user": {
			"firstName": "Angel",
			"lastName": "Romero Silva",
			"birthDate": "2002-05-07T00:00:00.000Z",
			"city": "Caracas",
			"country": "Venezuela",
			"email": "angel@gmail.com",
			"_id": "63ab6c5c5ad83cb8d9ff154b",
			"__v": 0
		}
	}
}
```

* User signin
```
http://localhost:3000/api/v1/users/signin
```
* - Example request
```
{
	"email": "messi5@gmail.com",
	"password": "password123"
}
```
* - Example response
```
{
	"status": "success",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWI2Njk2YTdkNGRiYTM1YmQ2ZTE1NyIsImlhdCI6MTY3MjE3NzkyMywiZXhwIjoxNjc5OTUzOTIzfQ.yhKZXISudzOCbA4NepKa4w4MHm0p_OCM8zsRqi2kan0",
	"data": {
		"user": {
			"_id": "63ab6696a7d4dba35bd6e157",
			"firstName": "Leonel",
			"lastName": "Messi",
			"birthDate": "2000-08-11T00:00:00.000Z",
			"city": "Buenos Aires",
			"country": "Argentina",
			"email": "messi5@gmail.com"
		}
	}
}
```
> **Note:** For development purposes (and to use the sign in route on existing users), all users passwords are `password123`

* Create event
```
http://localhost:3000/api/v1/events
```
* - Example request
```
{
	"description": "Flag Day",
	"dateTime": "2022-02-24T00:00:00.000Z",
	"dayOfWeek": "thursday"
}
```
* - Example response
```
{
	"status": "success",
	"data": {
		"data": {
			"description": "Flag Day",
			"dateTime": "2022-02-24T00:00:00.000Z",
			"createdAt": "2022-12-27T21:46:42.675Z",
			"dayOfWeek": "thursday",
			"_id": "63ab6b795ad83cb8d9ff1541",
			"__v": 0
		}
	}
}
```


### DELETE routes
* Delete all events by weekday
```
http://localhost:3000/api/v1/events?weekday=
```
* - Example request
```
http://localhost:3000/api/v1/events?weekday=monday

[header]
authorization, Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWI2Njk2YTdkNGRiYTM1YmQ2ZTE1NyIsImlhdCI6MTY3MjE3NzkyMywiZXhwIjoxNjc5OTUzOTIzfQ.yhKZXISudzOCbA4NepKa4w4MHm0p_OCM8zsRqi2kan0
```

* Delete all events by ID
```
http://localhost:3000/api/v1/events?id=
```
* - Example request
```
http://localhost:3000/api/v1/events?id=63ab695d5ad83cb8d9ff1527

[header]
authorization, Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWI2Njk2YTdkNGRiYTM1YmQ2ZTE1NyIsImlhdCI6MTY3MjE3NzkyMywiZXhwIjoxNjc5OTUzOTIzfQ.yhKZXISudzOCbA4NepKa4w4MHm0p_OCM8zsRqi2kan0
```
* Delete all users by ID
```
http://localhost:3000/api/v1/users?id=
```
* - Example request
```
http://localhost:3000/api/v1/users?id=63ab6696a7d4dba35bd6e157

[header]
authorization, Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWI2Njk2YTdkNGRiYTM1YmQ2ZTE1NyIsImlhdCI6MTY3MjE3NzkyMywiZXhwIjoxNjc5OTUzOTIzfQ.yhKZXISudzOCbA4NepKa4w4MHm0p_OCM8zsRqi2kan0
```
> **Note:** The `jwt` token can be retrieved by signing in as an existing user.

## Comments
If there are any problems accessing or modifying the API or any of its components in order to test it, please reach out to me and I will respond as soon as possible. Thank you!
