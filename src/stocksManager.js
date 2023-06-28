const Stock = require('./Stock');

class StocksManager {
    constructor() {
        this.stocks = [
            new Stock('google', 40),
            new Stock('amazon', 50),
            new Stock('intel', 100),
            new Stock('microsoft', 80),
            new Stock('apple', 75),
            new Stock('facebook', 55),
            new Stock('netflix', 90),
            new Stock('nvidia', 85),
            new Stock('tesla', 95),
            new Stock('ibm', 60)
        ];
    }

    updateRandomStock() {
        let randomStock = this.stocks[Math.floor(Math.random() * this.stocks.length)];
        randomStock.updateValue();
    }

    getStocks() {
        return this.stocks;
    }
}

module.exports = StocksManager;