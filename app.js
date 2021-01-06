const express=require("express");
const https=require("https");
const bodyparser = require("body-parser");

const app=express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

app.listen(3000,function(req,res){
  console.log("Server is listening on port 3000")
});


//Calling the Data from External API
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  var cityNameFromUI=req.body.cityName;

  //Weather API End-Point
  const apiKey="3414188a0f200042b8c5ec0801b7f49b";
  const unitsUser="metric"
  const url="https://api.openweathermap.org/data/2.5/weather?q="+cityNameFromUI+"&appid="+apiKey+"&units="+unitsUser;
  https.get(url,function(response){

   //Getting the body of JSON
    response.on("data",function(data){
      var cityWeatherDetails=JSON.parse(data);
      //res.write(cityWeatherDetails.weather[0].icon);
      res.send("Weather report for "+"<strong>"+cityNameFromUI+"</strong>"+ " is <strong>"+(cityWeatherDetails.main.temp).toString()+"</strong> &degC and it has <strong>"+(cityWeatherDetails.weather[0].description)+"</strong>.")
    });

  });
});
