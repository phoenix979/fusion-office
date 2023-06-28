const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const StocksManager = require('./stocksManager');

class StockServer {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socketIo(this.server);
        this.stocksManager = new StocksManager();

        this.app.use(express.static(path.join(__dirname, '/../public')));
    }

    start() {
        this.server.listen(3000, () => {
            console.log('listening on *:3000');
        });

        // send updates every 10 seconds
        setInterval(() => this.sendStockUpdates(), 10000); 

        // Emit the current stock data whenever a new client connects
        this.io.on('connection', (socket) => {
            this.sendStockUpdates();
        });
    }

    sendStockUpdates() {
        this.stocksManager.updateRandomStock();
        this.io.emit('stock update', this.stocksManager.getStocks());
    }
}

new StockServer().start();