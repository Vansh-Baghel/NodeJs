# Socket

- It is used to connect 2 people together.
- For 2 devices , to send and receive messages , we need to have sockets at both the ends .

# NodeJs

## What is node js

- It is not a program but a JavaScript runtime to run JS on a server.
- JavaScript runtime is the browser where we run the code.

## What it does

- It helps to read the HTML file from the server files when request is made by any http and then send the response back to the client.

## Asynchronous Nature of NodeJs

- Node js is Single Threaded means if there are millions of users and if one user is doing any function on it , then other users have to wait unless it finishes.
- By making the code asynchronous , the function will run in the background and once its completed , it will run for the user .
- This will solve time problem.

## fs

- file system module allows you to work with the file system on your computer.

## utf-8

- It is character encoding , if we dont use it , we will get some weird output.

## writeFile

- It is an asynchronous function used to write anything inside a file.

```JS
fs.writeFile("./text.txt" , "This is text written from index.js " , 'utf-8' , err => {
    console.log("The file has been written");
})
```

## readFile

- Used to read content of one file .

```JS
fs.readFile("./greet.txt" , "utf-8" , (err , data) => {
    console.log(data);
});
```

## createServer
* This method is used to create a server.
* We need to use http behind it ,
```JS
const http = require("http");
http.createServer()
```
* We can mention the url of the website.

## req.url 
* In http , when we createServer , we have 2 parameters which are req and res .
* If we used req.url , then it will give us the url of the website.

## writeHead 
* It takes 3 digit status code , 