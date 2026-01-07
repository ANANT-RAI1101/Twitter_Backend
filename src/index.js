import express from 'express';
import bodyParser from 'body-parser';

const{connect}=require("./config/database")
const{PORT}=require("./config/server-config")

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(PORT,async()=>{
    console.log(`server is running at ${PORT}`);
    await connect();
    console.log('Mongo db connected');
    
})