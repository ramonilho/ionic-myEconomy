
export class Item {
    id: String;
    name: String;
    price: Number;
    date: String;

    constructor(name: String, price: Number, date: String) {
        this.name = name;
        this.price = price;
        this.date = date;
    }
}