import express from 'express';
import { json } from 'body-parser';
import userRoute from './routers/user.router';

const app = express();
import cors from 'cors';


app.use(json());

app.use('/', userRoute);

app.use(cors());


export default app;