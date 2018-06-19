const path=require('path');
const express=require('express');

var app=express();
var port=process.env.PORT || 3000;

//path.join is used to omit the relative path
publicPath=path.join(__dirname,'../public');

//use to define the middleware
app.use(express.static(publicPath));


app.listen(port,()=>{
  console.log(`app is started at port ${port}`);
});
