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

## \_\_dirname VS ./

- This in node indicates the current directory in which we are in.
- **./** indicates the home directory ie the outermost files section.

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

# Chp 6, 7 , 8 , 9

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

## Express Middleware

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

## How to connect MongoDb to project

- First copy the url from atlas website database and paste in the env file to save it.
- Replace <password> with the new password which you create from **Database Access** on the Atlas website.
- Create New Collection in **MongoDbCompass** and paste that url with proper password.
- Then in **server.js**, use **mongoose.connect** to connect the database with the project.

## Creating Database and pushing data

- First we create Schema.
- Second we create a model with model name and Schema name.
- Third step is to create data from that model.
- Last step is to save the data.

## Schema

- We can define its property with many different parameters like type, required: [boolean , message], default, etc .

```JS
const tourSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: [true, 'Tour must have a name'] },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: { type: Number, required: [true, 'Tour must have a price'] },
});
```

## Mongoose Model

- Accepts the name of the model and the Schema of it.

```JS
const Tour = mongoose.model("Tour" ,tourSchema);

```

## Mongoose Data related to Model

- MongoDBCompass automatically creates a plural name conventional data like here it create tours in the Compass.

```JS
const testTour = new Tour({
  name: 'Test Tour',
  rating: 5.4,
  price: 400,
});
```

## Mongoose save

```JS
testTour.save().then(data => console.log(data)).catch(err => {
  console.log("Made an error: ", err);
})
```

## Another way of sending data in Model (First was save)

- Model have many inbuilt methods to use like create, save, etc which could be used.

```JS
// Here Tour is a model imported from another file.
  const newTour = await Tour.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      tour : newTour
    }
  });
```

## MCV Achitecture (Model Controller View)

- Model is related to application data and business logic.
- Controller is to handle application request, to interact with models and send back responses to client.
- View is used when we have graphical representation.
  ![MVC_arch](../Notes/Resources/MVC_Model.jpeg)

  ![app_bus_logic](../Notes/Resources/app_bus_logic.jpeg)

## findOne and findById

- Both does the **same work**, as we are using mongoose then it just ease the task by creating **findById**.
- **findById** works same as **findOne behind the scenes** and we just need to pass params.id in the **findById** .

```JS
  const tour = await Tour.findById(req.params.id);
  // const tour = Tour.findOne({_id: req.params.id})
```

## error: Cast to ObjectId failed for value "3" (type string) at path "\_id" for model "Tour"

- This occurs when we pass the user defined **id** instead of MongoDb inbuilt made **\_id**.
- Usually when we use **req.params.id**, we have numbers like 1,2,3, etc but \_id is unique and its value is too big like string of 32 characters.

## Delete Tour

- It is a convention to not send or log any data when we delete anything.

## deleteMany

- If we want to delete everything in data, just use **deleteMany()** with empty paranthesis.

## process.argv

- The process.argv property is an inbuilt application programming interface of the process module which is used to get the arguments passed to the node.js process when run in the command line.

```JS
// in terminal
// node filePath --import, here filePath is the local path where the file is located
INPUT : node dev-data/data/import-dev-data.js --import

OUTPUT : [
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\vansh\\Desktop\\NodeJs_Things\\dev-data\\data\\import-dev-data.js',
  '--import'
]
DB connection successful
Data successfully imported

// in file.
if (process.argv[2] == '--import') {
  importData();
} else if (process.argv[2] == '--delete') {
  deleteData();
}
```

## process.exit()

- Used to exit/close the port.

## req.query

- This returns the string part of the url where we specify the conditions we want.
- Used to filter different data through those conditions.
- In the example, duration, difficulty and page are the keys in the query object.

```JS
// Url
http://localhost:3000/api/v1/tours?duration=5&difficulty=easy&page=30

// Query Object
// { duration: '5', difficulty: 'easy' }

```

## Finding queries and Filtering

- We can **filter** some of the queries we don't require from the **query object**.
- Like if we **don't need** page from the above example then we can **make array** of different queries we don't want and then **delete** each from the query object.
- We have used **await after all the task** has been completed on the queryObj, else it would **return the string without filtering** and then **again return once the filter** has been done. It is a fast process which we wouldnt have seen on the website as the data is too small in this example.

```JS

// Query Object Before Filtering
// { duration: '5', difficulty: 'easy', page: 30 }

    const queryObj = req.query;
    // exludeFields contains all the keys which we don't want.
    const exludeFields = ['page', 'limit'];
    // Here we are filtering the not needed query properties from the query object.
    exludeFields.forEach(el => delete queryObj[el]);

// Used to find the conditional query in the object.
    const query = Tour.find(queryObj);

    const tours = await query;
    // Query Object After Filtering
// { duration: '5', difficulty: 'easy' }
```

- Another way of filtering is to use special mongoose methods like **where, equals, lt**, etc. Check the documentation for it.

## Sorting

- We can sort the API based on the properties mentioned in the URL like **..?sort=price,ratingAverage**.
- Here we need to split the price and ratingAverage and then join by space as we want it in the form "price ratingAverage" . `const sortBy = req.query.sort.split(',').join(' ');`
- Here if the price is same in any case then it will sort wrt ratingsAverage.

```JS
   // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    }
```

## Use of - sign in select method

- We can exclude few methods so that client couldn't see that property.
- By this, we can hide the password from the clients and abstract it.

```JS
// This is remove all the __v named properties from the objects.
      query = query.select("-__v");

```

## - sign with price property

- Whenever we use - sign, it indicates that we want the order as descending.

```JS
// Here ratingAverage with be sorted in descending order.
    req.query.sort = '-ratingAverage';

```

## Limiting

- Used to display only the properties which has been asked.

```JS
// URL
// http://localhost:3000/api/v1/tours?fields=name,duration,difficulty,price

    if (req.query.fields){
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else{
      query = query.select("-__v");
    }

```

## Pagination

- Used to **display pages for limited datas** like if there are 100k data then we dont want it to display everything data on 1 page.
- We set **limited datas** on each page and move to the user required page number.
- We use **countDocuments()** method if the requested page exceeds the number of pages present .

```JS
    const page = req.query.page * 1 || 1;
    // Limit says the number of data in one page. Setting default as 100 datas.
    const limit = req.query.limit * 1 || 100;
    // skip is used to skip the starting datas if the page requested is not 1. Like if user needs 3rd page, then we need to skip the initial datas
    // on each page which could be found out by relating with the limit.
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('This page exceeds limit of pages.');
    }

```

## return this

- We use return this to return the whole object.
- A trick when we have nothing to return.

## Aggregate pipeline and Aggregate operations

[Aggregate pipeline Doc](https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/)
[Aggregate operators Doc](https://www.mongodb.com/docs/manual/reference/operator/aggregation/)

- Can refer the doc, as many useful things could run by refering it.
- Aggregate pipeline **$group** must have **\_id** field which separates different datas.
- **Aggregate pipelines** are written outside and inside pipelines we write **operations**.

```JS
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gt: 4.5 } }
      },
      {
        $group: {
          _id : "$difficulty",
          numTours : {$sum : 1},
          avgRating : {$avg : "$ratingsAverage"},
          minPrice : {$min : "$price"},
          maxPrice : {$max : "$price"}
        }
      }
      ])
```

## $sort

- To get in descending order, use **-1** and to get in ascending order use **1**.

```JS
$sort : { numToursStart: -1 }
```

## $addFields

- Used to add any extra data property to display with the group.

```JS
      {
        $addFields : {month: "$_id"}
      },
```

## $project

- Used to remove any property which we dont want to display.

```JS
      {
        $project : {
          _id: 0
        }
      }
```

## round

- Used to round the decimal number.

```JS
          avgRating: { $avg: {$round: [
          "$ratingsAverage",
          0 ]}, },

```

## Virtual Properties

- Virtuals properties are document properties you can **get** and **set** but are **not saved in MongoDB**.
- We have to **define virtual properties in Schema** as well, else it won't work.
- It is a **business logic** therefore will define it in the **Model files** to follow **lean controllers and fat models** which says to write business logic in Models as much as possible and keep controller lean with the business models.
- These are used for combining fields and showing a combined result in the **document** (document is the data we get after calling any url from postman).
- We **cannot use arrow functions** here because we need this keyword, which are not applicable for arrow functions.
- We **cannot use any query** on it (like Tour.find(xyz)) as it doesn't exist in MongoDB.

## Mongoose Middleware

- There are 3 types of middlewares in mongoose to **handle something between the 2 events** like between saving document and actual saving into the database.
- Therefore these are also called **pre** and **post hooks**.

## Document Middleware

- Document Middleware can be used to do actions before and after creating any new document like when we use create operation, we could add slug in it before it gets inserted in the documents.
- Dont forget to add slug in the Schema as String because it is inserted in the documents with other properties.
- Runs for **save** and **create** only and **not for update**.

```JS
tourSchema.pre("save", function(next) {
  this.slug = slugify(this.name, {lower: true})
  next();
})
```

## Query Middleware

- Can be used to hide certain documents before any query runs like Tour.find().
- Can be used to calculate the time taken before and after query is triggered.
- The find used here is the **regular expression** used because we want it to be **applied to all queries** which **starts with find**.

```JS
tourSchema.pre(/^find/, function(next) {

  // Displays only the tours which are not equal to true ie not secretTour.
  // secretTour is defined in the Schema and is set as true by us while posting the secret tour document from the postman.

  this.find({secretTour : {$ne : true}})
  next();
})

```

## Renaming document column name

- To rename the column name, we can use aggregate function and query in the mongosh from Command prompt.
- We can use one command and change it.

```JS
// To use mongosh in cmd, type mongosh
db.tours.updateMany({}, {$rename: "duration" , "durationDays"})
```

## Validators and Inbuilt Validators

- We can use validators to get **correct/valid inputs** from the user.
- We can use it on post, patch methods to meet those conditions.
- While **patch**, we must set **runValidators as true** to check those conditions.
- **Inbuilt validators** could be min, max, enum, maxLength, minLength, etc.
- **enum** is used to mention the specific input values and if the input doesn't match any of those then it will throw error.

```JS
// In Schema
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },

// At update place
exports.updatingTours = async (req, res) =>
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true
    });
```

## Custom Validators

- We can also import the validator from npm, it has many such validators which are useful and its document is [here](https://github.com/validatorjs/validator.js/)
- Creating validator is also not tough.

```JS
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
      // here
      validate: {
        validator: function(val){
          return val < 50;
        },
        message: "Group size must be smaller than 50"
      }
      //  validate: function(val){return val < 50} This is validate without any other condition like message.
    },
```

## Error middleware and how to call it

- To call error middleware, pass **next(err)**.
- We never pass anything inside next but only in error case we do so and therefore express directly jumps to the handling middleware.
- Error Middleware contains 4 args, and we can define our error handling in that.

## Global Error Handling

- Doing try catch block at every method is not efficient and makes our code kinda too big.
- Instead, create 2 errorHandling files . 1 as utils and 1 as errorController.
- ErrorController must have:

```JS
module.exports = (err, req, res, next) => {
  // Where 500 is set to default if there are no values
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Failed';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

```

- Another file could handle every error by using classes which contains:

```JS
class AppError extends Error{
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
```

- Lastly, wherever we want to handle the error we can use this (here in tourController.js)

```JS
const catchAsync = (fn) => {
  // Here return is used because we want to stop the middleware from executing after this. Otherwise it would continue to go to other middlewares.
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};


exports.getAllTours = catchAsync(async (req, res) => {
  const features = new APIfeatures(Tour.find(), req.query).sortApi().limitingFields().pagination();
  const tours = await features.apiData;

  res.status(200).json({
    status: 'success',
    dataSize: tours.length,
    data: tours,
  });
});
```

# Chp 10

## Create signin for user

- Whenever we've created any tour, we used:

```JS
const tour = Tour.create(req.body)
```

- But to create user, we cannot use the same format of code because anyone can authenticate as admin and pass in the role as admin.
- To make someone as admin, we manually add that line in the database.
- So to fix this serious problem, we can specify the specific fields which must be imported from the user.

```JS
// In userRouter.js ie ie in any router
// Didn't use route wala syntax because we won't be using any other method on authentication. //
router.post('/signup' , jsonParser, authController.signup);

// In authController.js ie in any controller
// 1st way //
  // Destructing the input object
  const {name, email,password, passwordConfirm} = req.body;
  const users = await User.create(name,email,password,passwordConfirm);

// 2nd way
  const users = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
```

## JWT

![](./Resources/How-JWT-works.jpeg)

- JsonWebToken is the **easiest** and **secured way of authenticating** and **authorizing** the user.
- JWT are made using **Signature** which is made using **Secret String** (which we store in the env.js file) and **Header + Payload**.
- Anyone can alter the JWT but JWT **stores the version** which **we created** and then **checks with the one which is passed**. If both Older Header & Payload and the Header & Payload received from the client **aint same** then it'll mean that **someone has altered** the data.
- In this case, it will **not verify** the client as that user.
- We can alter the Header and Payload on jwt.io and could also check the token, which will have same id as our \_id.
- We can use these tokens to verify the user.

![](./Resources/how-tomake-JWT.jpeg)

## sign method of jwt

- It takes parameters like **\_id of the user** (which is created by MongoDB whenever any data is saved), a **secret string** (which we define in env) and options which is not necessary.
- In options, we can specify the expiresIn property which will automatically detact special codes like 90d where d is saved as day in sign method.

## Error: Cannot set headers after they are sent to client

- We will get this error if when we dont return the **next()** statement in the error block because it will then go to other middlewares as well and get multiple status and data which is not valid.

## Passing Password security

- To store user's password in the database, there are **few responsibilities** of developers to keep it safe.
- We must set **select** as false which will **hide the password** from the document we receive from the **get** method therefore it will be **hidden on the client** side.
- **passwordConfirm step** is really important, here we use document middleware **pre** to hide the password after its added and before its passed on the client side.
- Run the document middleware only when **there are changes in the password**. Also, pre and post are only applicable for **save** and **create** and **not for post, get, etc** methods .
- We must validate if the passwordConfirm entered is same as the password or not, using functions.
- We use **bcrypt npm library** which is an **algorithm to convert** the **string** into **some hash coded** value.
- Lastly, hide the **passwordConfirm** too by setting it as **undefined** because its work was just to confirm and not to store.

```JS
        password : {
            type: String,
            required : [true, "Please provide a password"],
            minLength: [8, "Please Enter password with atleast 8 letters"],
            select: false
        },
        passwordConfirm : {
            type: String,
            required : [true, "Please confirm your password"],
            validate: {
                validator: function (el) {
                    return el === this.password;
                },
                message: "Passwords must match!!"
            }
        }

        userSchema.pre("save", async function(next) {
    // To only edit if the password is modified
    if (!this.isModified('password')) return next();
    else{
//      Converting the password string in the database as random numbers. here 12 is the level of security, how safe it is.
//      The high the number, more will the safety and more will be the time taken to convert into hash code.
        this.password = await bcrypt.hash(this.password, 12);

//      Converting passwordConfirm is set to undefined to hide it from the database, we don't really need to save the confirm,
//      its work is to just compare both the passwords.
        this.passwordConfirm = undefined;
        next();
    }
})
```

## Explicitly adding password

- Whenever we add **select** in the model as **false**, it hides that property from the document.
- To add that property in the document, we can use **select method with + sign** which is the syntax to add password type fields:

```JS

  const user = await User.findOne({email}).select('+password');

```

## Checking the login

- To check if the **user exist or not**, we need to get a **connection between** the database and the **user details** which were sent during login.
- This connection is done **via email**, if **email matches** then we **check the password** and if thats **true** then we get access to its token and will load the data stored for that token.
- For login, we must:
  1. Check if **email and password is filled** or not
  2. Check if the **email and password is correct from time of signup** or not .
  3. If everything is ok , **send the token** to client
- We can use **findOne method** to find if the email exist or not.

```JS
exports.login = catchAsync(async (req, res, next) => {
  // Destructing from the body
  const { email, password } = req.body;

  // 1. Checking if email and password exists
  if (!email || !password) {
    return next(new AppError('Please provide email and password!! ', 404));
  }

  // 2. Check if the email and password is correct from first entered or not.
  const user = await User.findOne({ email }).select('+password');

  // const correct = await user.correctPassword(password, user.password);
  // We need to add the correct variable body inside the if statement because user.password will not exist if there is no user,
  // which will cause error.
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3. Everything is ok , send the token to client
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});
```

## Protecting before getting tours

- We are **minimizing the users** which could get access to the tours, **without the authorization token**, it will **throw error**.
- Steps to check it are:
  1. **Get** the token and **check** if its there or not.
  2. **Verify** the token.
  3. Check if **user exist or not**.
  4. If the **password** is **changed** then **token** must be **changed**.
- In first step, we need pass the **authorization token** which starts with **Bearer** and contains the token of user.
- In the second step, we decode the token and get the output as we get at jwt.io.
- In third step, we find the user by using the decoded id which is same as the \_id stored in the data.
- In the last step, we compare the dates of modification of password and its creation. If modification is greater than the creation, then we throw error that password has recently been changed, else we simply pass the token.
- **decoded.iat** is the time of creation.

```JS
exports.protect = catchAsync(async (req, res, next) => {
  let token;

  // 1. Get the token and check if its there or not
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please signup to create the account.', 401));
  }

  // 2. Verify the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);

  // 3. Check if user exist or not
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError('The user which belongs to this token no longer exist.'));
  }

  // 4. If the password is changed then token must be changed
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed the password! Please login again.', 401));
  }

  // Here it is saving the req.user data, otherwise in all the methods after this, req.user will be undefined.
  req.user = freshUser;
  next();
});
```

## Restricting roles

- We can allow only few roles to perform certain tasks, like delete could only be done by **admin and lead**.

```JS

// in tourRouter
  .delete(
    jsonParser,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

// in authController
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // role will be admin and lead-guide
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};
```

## Forget password handling

- When a user forgets the password, there are few standard steps that are followed.
- Those steps are: Entering the email, sending gmail message on that email to change the password and confirm the password.
- STEPS:
  1. Once the user enters the email, developers check if this email exist in the database or not.
  2.
  - If it does, then we send the **new reset token** to the user and that token be stored in the model as decripted string. This decription could be done using **crypto**.
  * **Crypto** is another way of decripting any string just like brcypt (which we use for password) but as we dont need high safety measures in it, no need to use bcrypt. crpyto is just little less secured but faster.
  * After we generate the newToken, we need to save it in the next step.
  3. Lastly, we send the user the token with some message. We will have these methods defined in userModel files and will access it in userController.
- We use [mailtrap.io](https://mailtrap.io/inboxes) for this which fakes sending the email to theh users but gets trapped the emails in the development inbox which we could see.
- We have to save its PORT, USERNAME, PASSWORD and HOST in the env file and use it in email.js file.
- We are setting the **encrypted token** in the **database** and **sending another token** to the **user** so that if hacker gets **access to the database**, then the **token couldnt be used** to change someone's password.
- Then email will be received at **mailtrap website** if proper PORT, USERNAME, PASSWORD and HOST were provided.
- In the database, we will see 2 new properties been added, which would be **passwordResetToken** and **passwordResetExpires**, and **both will be cleared** if the **resetPassword fails** or if the **time expires**.

```JS

// in authController
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email,
      subject: 'Your password reset token (valid for 10 min)',
      message
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

// in email.js
const nodemailer = require('nodemailer');

const sendEmail = async(options) => {
  // 1. Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2. Define email options
  const mailOptions = {
    from : "Vansh Baghel",
    to: options.email,
    subject: options.subject,
    text: options.message
  }

  // 3. Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

```

## jwt malformed error

- This is caused when your authentication is not defined to the token.
- When we set the tests in Postman, make sure to set the path correctly.

```JS
// Output in console
{
    "status": "success",
    "data": {
        "user": "63b1425b1407f2af260ed31c",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjE0MjViMTQwN2YyYWYyNjBlZDMxYyIsImlhdCI6MTY3Mjc0MDA2NCwiZXhwIjoxNjgwNTE2MDY0fQ.gvEXsM0UaXeDXHhhVl6OH93pLM8MrByfd-sNYxgClkk"
    }
}

// In Tests in postman (Corrected one)
pm.environment.set("jwt", pm.response.json().data.token);

// In Tests in postman (Wrong one)
pm.environment.set("jwt", pm.response.json().token);
```

## Cookies

- It is a piece of text which server sends to clients and when clients receives it, it gets saved automatically and return it with all further requests to the server.
- res.cookie accepts cookieName, token/content to be stored and conditions.

```JS
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    // Will open only on http web pages.
    httpOnly: true,
  }

  res.cookie('jwt', token, cookieOptions);
}
```

## Setting limit

- This is done so that if there are any attacks on website for guessing any number of passwords, then it must show error after few number of tryouts.
- We use express-rate-limit npm package and pass the max number of try a user could give till a reload, and the time in millisecond which the user needs to be waited if the limit exceeds.
- Reset means that the login or logout has been done.

```JS
// In app.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 100,  // Setting for 1 hour
    message: "Too many requests from this IP, please try again after an hour!"
})
// Will affect all routes starting with api
app.use('/api', limiter);

```

## Sanitizing inputs

- When we use {$gt : ""} in the email input field, it accepts the user if the password matches with another user.
- To prevent these types of unknown errors, we use **express-mongo-sanitize**.

## xss-clean

- If anyone tries to write HTML code in the input field, then it can cause error.
- So XSS converts that code into safe String.

## Prevent Parameter Pollution

- Whenever we pass multiple conditions in url like `{{URL}}api/v1/tours?ratingsAverage=2&ratingsAverage=6`, then it may cause error because it stores value 2 and 6 (here) as array elements.
- We've used .split and .join methods which are for strings and not for arrays.
- Therefore to prevent this, we use **hpp** npm package.
- It will only accept the last condition and will not give error.
- To be able to use all conditions, we can use whitelist in it .
- So both 2 and 6 will be used.

# Chp 11

## Data Modelling

- Data Modelling is taking an **unstructured data** which depends on our **web page requirement** and then **structuring it into logical data model** inside database.
- There are different relationships between the data in the database ie how are they linked to each other.

  ![](./Resources/Types-of-relationships.jpeg)

- Referenced and Embedded both are supported in MongoDB. Embedded is supported as MongoDB is noSQL query language.
  ![](./Resources/Referencing-VS-Embed.jpeg)

- When to use Referenced or Embedded depends on these points:
  ![](./Resources/When-to-EmbedOrReference.jpeg)

- There are different ways of referencing:
  ![](./Resources/Types-of-References.jpeg)

- Summary :

  ![](./Resources/Summary_of_DataModelDesign.jpeg)

## Referencing

- We can reference any property in a Model by passing a **type** and **ref** properties in the model.

```JS
    guides : [{
      // where ObjectId refers to inbuilt _id
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }]
```

## Populate

- Whenever we want to show full data from a small part of a data like its id, then we can use Populate.
- It slows down the website if there are many calls of this method because it creates a new query which will only be seen in the document and not in the DB.
- We can add it in front of any method we want to use, also could add it in the Model file as a query middleware function.
- Middleware just takes 50 or 100ms more time then regular one.
- We could also specify the fields which must be visible using select property.

```JS
// 1. Method 1
// In reviewController
  const reviews = await Review.find().populate('tour');

// In reviewModel as query Middleware
// 2. Method 2

reviewSchema.pre(/^find/ , function(next) {
    this.populate({
        path: 'tour',
        select: 'name'
    }).populate({
        path: 'user',
        select: 'name '
    })

    next();
})
```

## Virtual populate

- We **don't need to populate tour inside the reviews** because when we **populate reviews inside get tours**, then there will be **double tours** and any other array inside it.
- This will lead to **chain of populates** inside our document which is **not at all efficient**.
- Therefore instead of **populating tour and user** in reviews, we can **populate only user** and use **Virtual populate** to **populate reviews** inside the tour.
- This will show details of reviews inside getAllTours but only the **id of tour** which is present inside **reviews string** of reviewModel.
- **foreignField** and **localField** are the ways of connecting 2 different models where **both have same data** and **foreignField** means the **data property name inside the ref** and **localField** means that **data inside the current model**.
- Here foreignField: 'tour' because in reviewModel, tour contains id of the tour and the localField: '\_id' which is the id of tour.

```JS
// In reviewModel.js
reviewSchema.pre(/^find/ , function(next) {
    this.populate({
        path: 'user',
        select: 'name '
    })
    next();
})

// In tourModel.js

// Virtual Population
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id'
})

```

## Nested Routes

- This means we **pass** the id or any other **unique data** in the **url itself**.
- We can use this url id to **set default id** in other **controller** like we are **connecting tour controller** and **review controller** and setting the **tourId as params** and adding the tour id in the url which could be used by **reviewController** to set the id of the tour.
- To get access in **reviewRouter** from **tourRouter**, we use **mergeParams** which will help us to use tourId in reviewController via reviewRouter.
  > We **use** the router in the one we set the param, here in tourRouter we are using **router.use**.

```JS
// In reviewRouter
const router = express.Router({mergeParams: true});

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(jsonParser, authController.protect, authController.restrictTo('user'), reviewController.createReview);

// In tourRouter
router.use('/:tourId/reviews', reviewRouter);

// In reviewController
exports.createReview = catchAsync(async (req, res) => {
    if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  const inputData = {
    review: req.body.review,
    rating: req.body.rating,
    createdAt: req.body.createdAt,
    tour: req.body.tour,
    user: req.body.user,
  };
});
```

## Factory Function

- It is a great way of representing same type of functions from once place to every file.
- We can use the same piece of code to perform operations like delete, post, etc.

```JS
// In handlerFactory
exports.deleteOne = (Model) =>
    catchAsync(async (req, res, next) => {
    const doc =  await Model.findByIdAndDelete(req.params.id);

    if (!doc) return next(new AppError('No document found with this ID', 404));

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// In tourController
exports.deleteTour = factory.deleteOne(Tour);

```

## Middleware sequence and authentication

- We must know that middleware runs in sequence.
- So if we use any file at the top, then all the middlewares below it will be affected.
- In the example below, both patch and get router middlewares are affected/protected by authController.protect file.

```JS
router.use(authController.protect);

router.patch('/updateMyPassword', jsonParser, authController.updateMyPassword);
router.get('/me', userController.getMe, userController.getUser);


// Its same as:
router.patch('/updateMyPassword', jsonParser, authController.protect , authController.updateMyPassword);
router.get('/me', userController.getMe, authController.protect , userController.getUser);
```

## Perfomance improve using Indexes

- It is a **1 liner code** which we can **write in our Model** files which **can boost** our website performance.
- When we want to filter anything, it'll search every data behind the scenes and will return only those data which meets the condition, but this is not efficient in larger code bases.
- We can see this by explain() method which return the number of outputs and number of checked data to get that output.
- To **optimize** it, we can use **index method** in our schema.

```JS

// In tourModel.js
tourSchema.index({ price: 1, ratingsAverage: -1 });

```
