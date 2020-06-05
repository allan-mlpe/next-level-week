import express from 'express';

const app = express();

app.get('/hello', (req, res) => {
    return res.send({message: 'Hello world - Next level week!!'});
});

app.listen(3000);