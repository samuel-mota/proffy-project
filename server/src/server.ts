import express from 'express';
import cors from 'cors'; // allows different addresses to access our API
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes); // file routes.ts

app.listen(3333); // localhost:3333