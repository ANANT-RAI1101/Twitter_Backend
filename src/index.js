import express from 'express';
import bodyParser from 'body-parser';
import { connect } from './config/database.js'
import { PORT } from './config/server-config.js'
import passport from 'passport';
import { passportAuth } from './config/jwt-config.js';
import v1Routes from "./routes/index.js"

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize())
passportAuth(passport)

app.use("/api",v1Routes)

app.listen(PORT, async () => {
    console.log(`server is running at ${PORT}`);
    await connect();
    console.log('Mongo db connected');
})