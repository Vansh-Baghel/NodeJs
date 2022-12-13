const http = require("http");

const server = http.createServer((req , res) => {
    console.log(req);
    res.end("Text from server side");
})

server.listen(8000 , 'localhost' , () => {
    console.log("Started port");
})