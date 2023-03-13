const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

const PAGE_ACCESS_TOKEN = 'EAAImsIrZBcS8BAPrZCqfSTJtRbLxOFyvd5KMTUzrPWgqkeGZAy1zORtioGbwBcI4ny8dbytnuECtvVUjg5o0QSODNgXHsI7RKGTbtatgSwM7X3C9ROyQA3TuDAMr5oZCQUkhBKViGb7WgOfZAnF2apvV4Tb3EiX7aZCP90dpatNfapcJIaWpo4';

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/webhook', (req, res) => {
    if (req.query['hub.verify_token'] === 'verify') {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong validation token');
});

app.post('/webhook', (req, res) => {
    let messaging_events = req.body.entry[0].messaging;
    for (let i = 0; i < messaging_events.length; i++) {
        let event = messaging_events[i];
        let sender = event.sender.id;
        if (event.message && event.message.text) {
            let text = event.message.text.toLowerCase();
            if (text === 'hi') {
                sendTextMessage(sender, 'Hello World');
            }
        }
    }
    res.sendStatus(200);
});

function sendTextMessage(sender, text) {
    let messageData = {text: text};
    request({
        url: 'https://graph.facebook.com/v11.0/me/messages',
        qs: {access_token: PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: messageData,
        },
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});
const http = require('http');

const hostname = '0.0.0.0';
const port = 8080;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
