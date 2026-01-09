import express from 'express';
import bodyParser from 'body-parser';

import {connect} from './config/database.js'
import {PORT} from './config/server-config.js'

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(PORT,async()=>{
    console.log(`server is running at ${PORT}`);
    await connect();
    console.log('Mongo db connected');
    
})