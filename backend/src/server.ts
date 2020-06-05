import express from 'express';

const app = express();

app.get('/hello', (req, res) => {
    return res.send({message: 'Hello world!!'});
});

app.listen(3000);