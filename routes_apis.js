const fs = require("fs");
const http = require("http");

const data = fs.readFileSync("./data.json" , 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req , res) => {
    const pathUrl = req.url;

    if (pathUrl === "/" || pathUrl === "/favAnime"){
        res.end("I love DBZ");
    }
    
    else if (pathUrl === "/favHobby"){
        res.end("Getting improved daily");
    }

    else if (pathUrl === "/Api"){
        res.writeHead(200 , {'Content-type' : 'application/json'})
        res.end(data);
    }

    else {
        res.writeHead(404 , {'Content-type' : 'text/html'})
        res.end('<h1>Page Not found</h1>')
    }
    
})

server.listen(8000 , 'localhost' , () => {
    console.log("Started port");
})