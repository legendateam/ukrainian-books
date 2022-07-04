import express from 'express';

import { AppDataSource, mainConfig } from './configs';
import { apiRouter } from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

const { PORT } = mainConfig;

app.listen(PORT, async () => {
    console.log(`Server is running on PORT:${PORT}!`);
    try {
        const connection = await AppDataSource.initialize();
        if (connection) {
            console.log('Data Base has been connected!');
        }
    } catch (e) {
        console.error('Error connection to Data Base', e);
    }
});
