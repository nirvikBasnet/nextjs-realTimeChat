const express = require('express');
const cors = require('cors');
const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "1265293",
    key: "22bb8b6da493812d25dc",
    secret: "97aff4bed53084514560",
    cluster: "ap1",
    useTLS: true
});




const app = express();

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:8080", "http://localhost:4200"]
}));

app.use(express.json);

app.post('/api/messages/', async (req, res) => {

    await pusher.trigger("firenation-chat", "message", {
        username: req.body.username,
        message: req.body.message,
        message: "hello world"
    });

    res.json([]);

})

app.listen(2142);

console.log('listining to the port');