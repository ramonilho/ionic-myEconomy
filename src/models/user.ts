import { Item } from '../models/item';

export class User {
    id: Number;
    username: String;
    password: String;
    items: [Item];

    constructor(username: String, password: String, id?: Number, items?: [Item]) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.items = items;
    }
}