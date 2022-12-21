const fs = require('fs');
const http = require('http');
const { default: slugify } = require('slugify');
const url = require('url');
const data = fs.readFileSync('./data.json', 'utf-8');
const dataObj = JSON.parse(data);
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateCards = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const replaceTemplate = require('./replaceTemplate/replaceTemplate.js');
const slugs = dataObj.map(el => slugify(el.productName,  {lower : true}));

///////////////////////////////////////
// --------Chaning file contents and read---------
// fs.writeFile("./text.txt" , "This text is written from index.js" , "utf-8" , (err) => {
//     console.log("File written !! 😁");
// })

// fs.readFile("./greet.txt" , "utf-8" , (err , data) => {
//     console.log(data);
// })

///////////////////////////////////////

///////////////////////// PROJECT 1 STARTS //////////////////////////

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  if (pathname === '/' || pathname === '/overView') {
    // We had array of strings , therefore used join to combine them. This will replace the templates (%ANYTEXT%) with properties
    // like productName , id , etc from the data object located in data.json file.
    res.writeHead(200, { 'Content-type': 'text/html' });
    const cardsHtml = dataObj.map((el) => replaceTemplate(templateCards, el)).join('');
    const finalOutput = templateOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
    res.end(finalOutput);
  }

  // const productId = replaceTemplate(templateProduct , dataObj[])
  else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObj[query.id];
    // This will go in replaceTemplate module and will find product.id and replace it. Don't need to worry about rest of the replacements.
    const output = replaceTemplate(templateProduct, product);
    res.end(output);
  } else {
    res.writeHead(404, { 'Content-type': 'text/html' });
    res.end('<h1>Page Not found</h1>');
  }
});

server.listen(8000, 'localhost', () => {
  console.log('Server Started on localhost 8000');
});
///////////////////////// PROJECT 1 ENDS //////////////////////////