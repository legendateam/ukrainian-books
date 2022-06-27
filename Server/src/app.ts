import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen('2600', () => {
    console.log('Server is running!');
});
