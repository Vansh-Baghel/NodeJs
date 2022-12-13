const fs = require('fs');

fs.writeFile("./text.txt" , "This text is written from index.js" , "utf-8" , (err) => {
    console.log("File written !! 😁");
})

fs.readFile("./greet.txt" , "utf-8" , (err , data) => {
    console.log(data);
})




