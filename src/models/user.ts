import { Item } from '../models/item';

export class User {
    id: Number;
    username: String;
    password: String;
    items: [Item];
    limit: Number;

    constructor(username: String, password: String, id?: Number, items?: [Item], limit?: Number) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.items = items;
        this.limit = limit;
    }
}