# Sing me a Song

SingMeASong is an API that lets you register, upvote, downvote and get song recommendations.

## Technologies

### Production
- express
- pg 
- cors
- dotenv
- jest 
- babel-jest
- joi

### Dev
- eslint (airbnb base)
- husky
- nodemon
- faker


## Requirements

- npm
- git
- postgres

## Running it locally

1- Clone this repository using ```git clone https://github.com/giancarvalho/SingMeASong-api.git```

2 - Run ```npm install``` 

3 - Use the dump.sql to create your postgres database.

4 - Add your .env files (follow the [env.example](https://github.com/giancarvalho/SingMeASong-api/blob/d55045a995fb8886c6546082c8914cd3b014bbb1/.env.example) file)

5 - Run ```npm run dev```

There are three built-in scripts:

    "start": "NODE_ENV=prod node src/server.js",
    "dev": "NODE_ENV=dev nodemon src/server.js",
    "test": "NODE_ENV=test npx jest"

## Routes guide

> POST /recommendations - Lets you register new recommendations. It requires an object with the following properties:

```
{
	"name": "Song Name",
	"youtubeLink": "https://www.youtube.com/watch?v=chwyjJbcs1Y",
}
```


> POST /recommendations/:id/upvote - Lets you upvote a recommendation. It requires a recommendation`s id as a param, like in the example below:

```
	/recommendations/3/upvote
```


> POST /recommendations/:id/downvote - Lets you downvote a recommendation. It requires a recommendation`s id as a param, like in the example below:

```
	/recommendations/3/downvote
```


> GET /recommendations/random - It sends a single random recommendation in the following format:

```
{
	"id": 1,
	"name": "Song name",
	"youtubeLink": "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
	"score": 245
},
```


> GET /recommendations/top/:amount - It sends an array containing N of the top recommendations, being N the specified amount in the params. This route requires the amount params to be sent like in the example below:

```
	/recommendations/top/10
```
