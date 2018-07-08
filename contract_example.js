class ExampleContract {
    constructor() {
        LocalContractStorage.defineProperty(this, "num");
    }

    init() {
        this.num = 0;
    }

    save(num) {
        this.num = num;
        return `${num} is saved`;
    }

    read() {
        return this.num;
    }
}

module.exports = ExampleContract;