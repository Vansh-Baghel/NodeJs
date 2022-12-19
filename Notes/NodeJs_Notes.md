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

- Used to read content of one file in async way.

```JS
fs.readFile("./greet.txt" , "utf-8" , (err , data) => {
    console.log(data);
});
```

## createServer

- This method is used to create a server.
- We need to use http behind it ,

```JS
const http = require("http");
http.createServer()
```

- All the content of the website , any changes in the routing , etc stuffs would be mentioned under this.

## req.url

- In http , when we createServer , we have 2 parameters which are req and res .
- If we used req.url , then it will give us the url of current page of the website.

## url.parse(req.url, true)

- Here url must be imported first like

```JS
const url = require('url');
```

- It is a method which returns the url object.
- We can get the query string , pathname , href , etc important properties through which

## writeHead

- It takes 3 digit status code , which is used to display the header in the network tab.
- Used to show the status.

## Rules for Reading api files

- Always read the api file above the callback function ie above the component function because whenever we visit that url , the api call will get refreshed which we don't want.
- Read the api file at the top as a global variable.

```JS
const data = fs.readFileSync("./data.json" , 'utf-8');
const dataObj = JSON.parse(data);

// This is the main function of the component.
const server = http.createServer((req , res) => {})

```

- Reason to use readFileSync and not readFile is that we can assign a variable to readFileSync which is easier to handle and use at different places and also we dont need to worry about waiting because it is used as global variabel so it will start running even before the API page is called . Once the hosting starts , API data will also be loaded.

## /anyText/g

- /g indicates all variables which are present .
- If we want to replace all those variables we can use this way.

```JS
    output = output.replace(/{%IMAGE%}/g, product.image);
```

## \_\_dirname

- This in node indicates the current directory in which we are in.

## server.listen

- Used to create the url of the server / website to start running.
- Like localhost:8000.

```JS
server.listen(8000, 'localhost', () => {
    console.log('Server Started');
});
```

## Creating own modules

- Creating own modules reduces the space in the same file.
- Main thing is to break the bigger problems into smaller problems which is done by modules.

## query String

- The extra part after the ? in the url is called query string and we can see it using url.parse(req.url , true).

```JS
// http://localhost:8000/product?id=2
// where query is   query: [Object: null prototype] { id: '2' }, so to use it, we use query.id
```

## application/json
* It shows the plain text on the web page if we use it as writeHead.
```JS
res.writeHead(200, { 'Content-type': 'application/json' });

```

## text/html
* It html format web page ie like normal web pages with proper styling if provided any.
```JS
res.writeHead(200, { 'Content-type': 'application/json' });

```

## Slugify 
* It edits the query string part of the url.
* We can give the name we want and hide the id=0 part of the url.
* Can watch its documentation.
* It does help with Search Engine Optimization (SEO).
* If you want your website to rank high on Google search results, then url-slugs can help.  

## HTTP request VS HTTP response
* From client to web is HTTP request.
* From web to client is HTTP response.

## Get, post , patch , put
* All of these are from client to web.
* Get is used to request the data.
* Post to send the data.
* Patch and put to modify the data.

