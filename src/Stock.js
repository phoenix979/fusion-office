class Stock {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }

    updateValue() {
        this.value = Math.floor(Math.random() * (100 - 10 + 1) + 10);
    }
}

module.exports = Stock;