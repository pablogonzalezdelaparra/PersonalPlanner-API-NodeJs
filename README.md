# Challenge # 02
## Repository description
* Author: Pablo González de la Parra
* Date: 1/11/2022

### Description of this repository
* This planner will help the client to organize his week and his tasks and at what times they happen.

# Run locally
In order to run the repository locally, follow these next steps:
1. Download the repository locally into your machine
1. Open the folder named *compass-week8-project*
1. Write on the terminal `npm install`
1. Write on the terminal `npm start`
1. Enter in your favorite web browser `http://localhost:3000/api/v1 + {route}`
1. Enter any {route} in order to test the API

# Routes
## Base route
```
http://localhost:3000/api/v1
```

## Events
```
/events
```
* GET Get all events
* POST Create event

```
/events/{dayOfTheWeek}
```
* GET Get events by weekday
* DELETE Delete events from weekday

```
/events/{id}
```
* GET Get event by id
* DELETE Delete event by id

## Users
```
/users
```
* GET Get all users
```
/users/{id}
```
* GET Get users by id
* PATCH Update users by id
* DELETE Delete event by id
```
/users/signUp
```
* POST User signUp

```
/users/signIn
```
* POST User signIn
# Example (Queries)
## Get events from thursday
```
http://localhost:3000/api/v1/events/thursday
```
## Get event from id
```
http://localhost:3000/api/v1/events/6378030befac8b0188914436
```
## Create event
```
http://localhost:3000/api/v1/events/6378030befac8b0188914436
```
> {\
	"description": "This is my first event",\
	"dateTime": "2022-01-01T00:00:00.000Z"\
}

## Sign In (User)
```
http://localhost:3000/api/v1/users/signin
```
> {\
	"email": "pablo@gmail.com",\
	"password": "password123"\
}
