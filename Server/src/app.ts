import express from 'express';

import { AppDataSource } from './ormconfig';
import {apiRouter} from "./routes/api.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter)

app.listen('2600', async () => {
    console.log('Server is running on PORT:2600!');
    try {
        const connection = await AppDataSource.initialize();
        if (connection) {
            console.log('Data Base has been connected!');
        }
    } catch (e) {
        console.error('Error connection to Data Base', e);
    }
});
