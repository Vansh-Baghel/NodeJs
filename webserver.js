const http = require("http");

const server = http.createServer((req , res) => {
    const pathUrl = req.url;

    if (pathUrl === "/" || pathUrl === "/favAnime"){
        res.end("I love DBZ");
    }
    
    else if (pathUrl === "/favHobby"){
        res.end("Getting improved daily");
    }

    else {
        res.end('<h1>Page Not found</h1>')
    }
    
})

server.listen(8000 , 'localhost' , () => {
    console.log("Started port");
})