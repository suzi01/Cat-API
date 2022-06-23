const express = require("express");
const https = require("https");
const app = express();
require('dotenv').config()
app.use(express.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname +"/index.html");
});


const axios = require('axios');
const { stringify } = require("querystring");



app.post("/", function(req, res){
  const query = req.body.catNum;
  const apiKey = process.env.CAT_API_KEY;
  const url = "https://api.thecatapi.com/v1/breeds?limit=" + query;
  path = "?limit=" + query;
  const headers = {'x-api-key': apiKey};
  axios.get(url,headers)
  .then(response => {
      catData = (response.data)
      var htmlString = `
        <h1 style> Here are the kitty Kats</h1>
        <ul>`;
      for(let i = 0; i< parseInt(query); i++){
        catName = "This cat's name is: " + catData[i].name
        catDescrip = "Description:  " + catData[i].description
        catTemper = "Cat Temper:  " + catData[i].temperament
        catOrigin = "Place of Origin:  " + catData[i].origin
        catImage = "<img src=" + catData[i].image.url + " width="+  catData[i].image.width/2 +" height="+ catData[i].image.height/2 + " style=padding:25px >"

        htmlString += `<li>${catName}</li>`
        htmlString += `<li>${catDescrip}</li>`
        htmlString += `<li>${catTemper}</li>`
        htmlString += `<li>${catOrigin}</li>`
        htmlString += `${catImage}`

      }
      htmlString += "</ul>"
      res.send(htmlString)

  })
  .catch(error => {
    console.log(error);
  });
});


app.listen(3000, function(){
  console.log("Server is running port 3000")
})
