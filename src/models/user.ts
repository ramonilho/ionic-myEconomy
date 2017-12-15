import { Item } from '../models/item';

export class User {
    id: Number;
    username: String;
    password: String;
    items: [Item];

    constructor(id: Number, username: String, password: String, items: [Item]) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.items = items;
    }
}