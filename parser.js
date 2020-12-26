const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

const axios = require('axios');
const fs = require('fs');

//get data from requested API
axios.get('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22').then(resp => {

    var report=resp.data;

    /*write data to file*/
    const data=JSON.stringify(report);  //convert json object to string

    //write json string to a file
    fs.writeFile('database.json',data,(err)=>{
        if(err){
            throw err;
        }
        console.log("JSON data is saved");

    });
});

//next part creating server and throwing web page



router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/app.html'));
  //__dirname : It will resolve to your project folder.
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');