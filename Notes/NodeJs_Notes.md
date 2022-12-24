# Socket

- It is used to connect 2 people together.
- For 2 devices , to send and receive messages , we need to have sockets at both the ends .

# Chp 3

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

- These are things which we import using require() and path could be mentioned if its custom module.
- Creating own modules **reduces the space** in the same file.
- Main thing is to break the bigger **problems into smaller problems** which is done by modules.

## query String

- The extra part after the ? in the url is called query string and we can see it using url.parse(req.url , true).

```JS
// http://localhost:8000/product?id=2
// where query is   query: [Object: null prototype] { id: '2' }, so to use it, we use query.id
```

## application/json

- It shows the plain text on the web page if we use it as writeHead.

```JS
res.writeHead(200, { 'Content-type': 'application/json' });

```

## text/html

- It html format web page ie like normal web pages with proper styling if provided any.

```JS
res.writeHead(200, { 'Content-type': 'application/json' });

```

## Slugify

- It edits the query string part of the url.
- We can give the name we want and hide the id=0 part of the url.
- Can watch its documentation.
- It does help with Search Engine Optimization (SEO).
- If you want your website to rank high on Google search results, then url-slugs can help.

## HTTP request VS HTTP response

- From client to web is HTTP request.
- From web to client is HTTP response.

## Get, post , patch , put

- All of these are from client to web.
- Get is used to request the data.
- Post to send the data.
- Patch and put to modify the data.

# Chp 4

## interval exit reason

- Whenever we use timer in our node.js file, the execution stops once the timer is reached.
- It won't exit any server if its running. Else if there are just timers, we need to run the node from terminal everytime the timer stops.

```JS
setTimeout(() => console.log("2 sec"), 2000);
```

## Event Emitter and Event Listener

- Emitter **emits name events** whenever something happens on web like **request is sent**, timer expires, etc.
- Event Listener is used to **send the req and res** to the client side, and it is uses **server.on** which is an **instance of Emitter** which sends whatever action has been made like request event.

## Streams

![Types of streams](./Resources/Streams.jpeg)

### createReadStream and pipe()

- Whenever we use createReadStream, the request sending by it is too fast for the response writable stream and this is called backpressure.
- So the best solution is to use pipe(). It pipes the output from the read stream right into the output of writable stream and this will solve the problem of incoming and outgoing data speed.

```JS

server.on("request" , (res, req) => {
const readable = fs.createReadStream("fileName.txt");

readable.pipe(res);
// readableSource.pipe(writableDestination)
})
```

# Chp 6

## Express

- Express is a minimal node.js framework .
- It is 100% node.js and it makes the work alot easier.

## Routing in express

- We can use different methods like get , post , etc while routing and can send whatever we want.
- We don't need to manually mention the type like we used to do in node (text/html) , express already does it.
- We can easily send the status code before sending.

```JS
const app = express();

app.get('/', (req, res) => {
    res.status(200).send("Hi");
})

app.post('/', (req, res) => {
    res.status(200).json({message : "Hi" , name: "Vansh"});
})
```

## .listen in express

- It is same as in node.js but here it works even if u just give the port number . You dont need to mention the string like localhost or 127.0.0.1 thing. It works on any of the both if the port number like 3000 is correct.
- Port 6000 is considered as unsafe on chrome browser , so don't use it.

## Modules

- There are different modules like require, \_dirname which we often use in express or in nodeJs.
  ![Modules](./Resources/modules.jpeg)

## Rest APIs

- Rest is an architecture of building APIs .
- It is a way which follows some rules of representing APIs in easier way.
  ![Rest_Arch_Rules](./Resources/Rest_Arch_Rules-01.jpeg)
  ![Rest_Arch_Rules](./Resources/Rest_Arch_Rules-02.jpeg)
- RULES
  - There must be different logical data in each resource or in each url.
  - Resource must not contain verbs in the word like getTour, addNewTour etc, just use noun in it.
  - It must be stateless means new resource must not depend on the previous resource because it is handled by client side.

## Object.assign

- It is used to merge 2 objects, good to use where we have to merge existing object and new object.

## sync Vs Async

- Use methods like **writeFile** when we are **in any callback method** like get, post, etc and use **writeFileSync** when we are in **global** ie not in any callback function.

## req.params

- It is the part which we define after : in the url.
- It is in object form.
- It is the best way to extract/find specific id data, based on the url and the json data stored.

```JS
// id is the param
app.get('/api/v1/tours/:id', (req, res) => {});
```

## bodyParser/ req error/ jsonParser

- express.bodyParser() is no longer bundled as part of express. You need to install it separately before loading.
- Use this whenever you **need req parameter** from the client side in our file.

```JS
const jsonParser = bodyParser.json();

const createTour = (req, res) => {
    console.log(req.data)
};

app.route('/api/v1/tours').post(jsonParser, createTour);


```

[Read More](https://stackoverflow.com/questions/9177049/express-js-req-body-undefined)

## 201

- Used to **show success** and has led to the **creation of a resource**.

## Route

- Route is used to **prevents us writing the same urls multiple times**.
- We can chain different methods like get, post, etc if their urls are same.

```JS
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    dataSize: toursRead.length,
    data: { toursRead },
  });
};
// createTour is also defined similarly in the actual code.
app.route('/api/v1/tours').get(getAllTours).post(jsonParser, createTour);
```

## Middleware

- Everything which **connects the requests to the response** is the middleware.
- The process of middleware where it goes to one middleware to another could be said as a **Pipeline**.
- This linear cycle of middlewares is called **Middleware stack**.
- We can also **create our own middleware**.

## Creating own middleware

- The 3rd parameter **next** is a Callback argument to the middleware function which will call the next middleware from the request response cycle once the current has stopped the execution.
- Use middleware after jsonParser, else it will throw error.

```JS
// Correct
router.route('/').post( jsonParser , tourController.checkBody , tourController.createTour);

// Wrong
router.route('/').post( tourController.checkBody , jsonParser , tourController.createTour);

const myModule = (req, res, next) => {
  // content
  next()
}
```

## Morgan middleware

- **morgan** is 3rd party middleware which makes life easier by mentioning the method and the url which has been requested.

```JS
const morgan = require('morgan');

app.use(morgan('dev'));

```

## Param Middleware

- It is inbuilt, so never use 4th parameter while making other custom middlewares.
- These are used with **router** which acceps parameters like `router.param('id', xyz)` where **id** is the param name **(http://localhost:3000/api/v1/tours/:id)** and xyz is the action we want to perform.
- **Before** running route in router, we could check if the **id is valid or not.** This takes out work of repeating the code to check the validity in each function.
- Don't forget to **use return and next()** .
- Return wont go on next which **stops the cycle** if its invalid. Stoping of cycle is important.
- next() will lead us to **next middleware** if its a valid id or url.

```JS
// tourRouter is the file where only router is defined and tourController is the file where the methods are defined and declared.

// in tourRouter
router.param('id', tourController.checkID);

// in tourController
exports.checkID = (req, res, next, val) => {
  console.log(val);

  const id = req.params.id;
  if (id > toursRead.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
}
```

## Mounting

- It like defining a url in the start at one place and then using it as base url.
- It creates many small different applications in one application.

```JS
const router = express.Router()
```

## nodemon

- We can run our application using npm start by using nodemon.
- We can set our package.json file scripts to default file where our server port is defined.
- Whenever we define port in other file, we need to import the content in port file and not the port in content file.
- For eg,

```JS
// server.js file
const app = require('./app')

const port = 3000;
app.listen(port, () => {
  console.log(`App running from port ${port}`);
});

// app.js file
const express = require('express');
const app = express();

/// content///
module.exports = app;

// package.json file
  "scripts": {
    "start": "nodemon server.js"
  },
```

## module.exports

- Whenever we have files in different folders then always export the Router from it.
- If the file only contains methods/ functions , then export each of the methods manually .

```JS
exports.getAllTours = (req, res) => {
// content
};

exports.getTour = (req, res) => {
// content
};
```

## Environment Variables

- It is used to work on different environments which we create.
- By default, its development env.
- We can define it in any file with extension **.env**.
- We can import in other file by using **require(dotenv)** where we need to install the dotenv before using it .
- To log, we can use **process.env**
