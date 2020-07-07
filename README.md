# devices rest-api
This is a rest api for devices and authentication with signup and login

## install
npm install

to install node modules 


## run the app
nodemon

## run the database
open cmd and run mongod

## run the tests

npm test

# REST API
The REST API to the example app is described below.

# signup
## request
"url": "localhost:3000/api/signup",
with email and password
methode : "post"
## response
{
    "message": "user created!!",
    "result": {
        "_id": "5f04da7f5d551e45d04425e4",
        "email": "test2@test.com",
        "password": "$2b$10$PDUeqRHQzrj/VnL9cwy.Q.evJJvLRRVuwnInUKgYq3HfH/XZuURWi",
        "__v": 0
    }
}

# login
## request
with email and password,
"url": "localhost:3000/api/login",
methode : "post"

## response
return the token
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VySWQiOiI1ZjA0Y2VhMjVkNTUxZTQ1ZDA0NDI1ZTMiLCJpYXQiOjE1OTQxNTI0MDMsImV4cCI6MTU5NDE1NjAwM30.rixKQRIKww2fPeL7NOPOc424QO6VkooZgGVafBPfbV8"

# get All devices
## request
"url": "localhost:3000/api/devices",
methode : "get"
# get specefic device
"url": "localhost:3000/api/devices/:deviceId",
methode : "get"

# get all users
"url": "localhost:3000/api/users",
methode : "get"

# get specefic user
"url": "localhost:3000/api/user/:userId",
methode : "get"

# create device
## you must add token to authorization header,

"name": "localhost:3000/api/devices",
methode : "post",
name:'device name'

# update device and add its data
## you must add token to authorization header,
"url": "localhost:3000/api/devices",
methode : "put",
name:'device name',
description:'device description',
year:'device year',

# delete device
## you must add token to authorization header,
"url": "localhost:3000/api/devices/:deviceId",
methode : "delete",

# [documentation apis] [https://www.postman.com/collections/18e579d25018be47a1ad]

