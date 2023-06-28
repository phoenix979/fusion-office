const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public'))); // serve static files from 'public' directory

let stocks = [
    {name: 'google', value: 40},
    {name: 'amazon', value: 50},
    {name: 'intel', value: 100},
    {name: 'microsoft', value: 80},
    {name: 'apple', value: 75},
    {name: 'facebook', value: 55},
    {name: 'netflix', value: 90},
    {name: 'nvidia', value: 85},
    {name: 'tesla', value: 95},
    {name: 'ibm', value: 60}
];

/* this function is that after the stock is updated it is sent to the client */

function sendStockUpdates() {
    let randomStock = stocks[Math.floor(Math.random() * stocks.length)];
    randomStock.value = Math.floor(Math.random() * (100 - 10 + 1) + 10);
    io.emit('stock update', stocks);
}

server.listen(3000, () => {
    console.log('listening on *:3000');
});

/* this is to make every 10 second a push notification to the client */

setInterval(sendStockUpdates, 10000); 
