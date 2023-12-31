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

        setInterval(() => this.sendStockUpdates(), 10000); 

        this.io.on('connection', (socket) => {
            this.sendStocks();
        });
    }

    sendStocks() {
        this.io.emit('stock update', this.stocksManager.getStocks());
    }

    sendStockUpdates() {
        this.stocksManager.updateRandomStock();
        this.sendStocks()
    }
}

new StockServer().start();