# Final Challenge (NodeJS)
## Repository description (Documentation)
* Author: Pablo González de la Parra
* Date: 18/12/2022

### Description of this repository
* This planner will help the client to organize his week and his tasks and at what times they happen. 
> **Note:** Improvements over the last delivery

# Run globally
This API is hosted on render.com. In order to access it live, open the next link
```
https://compass-final-project.onrender.com/api/v1/{route}
```
> **Note:** Switch {route} to valid route (See below)


# Run locally
> **Note:** The database used in this repository is stored in MongoDB Atlas (Cloud). It accepts any IP connection.

In order to run the repository locally, follow these next steps:
1. Download the repository locally into your machine
1. Open the folder named *compass-week8-project*
1. Write on the terminal `npm install`
1. Write on the terminal `npm start`
1. Enter in your favorite web browser `http://localhost:3000/api/v1 + {route}`
1. Enter any {route} in order to test the API

# Unit testing
In order to test this program, follow these next steps to access unit testing:
1. Write on the terminal `npm install`
1. After downloading the project locally, run the command `npm run test` (check that server isn't currently running)
> **Note:** If POST tests fail after a few tries, change email in order to continue acceptable running tests. The program doesn't allow same email twice.

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
/events?weekday={dayOfTheWeek}
```
* GET Get events by weekday
* DELETE Delete events from weekday

```
/events?_id={id}
```
* GET Get event by id
* DELETE Delete event by id
> Note: Use ```_id``` in query

## Users
```
/users
```
* GET Get all users
```
/users?_id={id}
```
* GET Get users by id
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
http://localhost:3000/api/v1/events?weekday=thursday
```
## Get event from id
```
http://localhost:3000/api/v1/events?_id=6378030befac8b0188914436
```
## Create event
```
http://localhost:3000/api/v1/events
```
> {\
	"description": "New event 4!",\
	"dateTime": "2022-12-19T00:00:00.000Z",\
	"dayOfWeek": "friday"\
}

## Sign Up (User)
**Note:** For Sign In purposes, all users passwords are `password123`

```
http://localhost:3000/api/v1/users/signup
```
> {\
	"firstName": "Alfredo",\
	"lastName": "González de la Parra",\
	"birthDate": "2000-08-11T00:00:00.000Z",\
	"city": "Mexico City",\
	"country": "Mexico",\
	"email": "alfredo@gmail.com",\
	"password": "password123",\
  "confirmPassword": "password123"\
}


## Sign In (User)
**Note:** For Sign In purposes, all users passwords are `password123`

```
http://localhost:3000/api/v1/users/signin
```
> {\
	"email": "pablo@gmail.com",\
	"password": "password123"\
}
