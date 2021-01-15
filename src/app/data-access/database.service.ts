import {Injectable} from '@angular/core';
import {Connection, ConnectionOptions, createConnection} from 'typeorm';
import {Settings} from './repositories/settings';
import {User} from './entities/user.entity';
import {ItemTicket} from './entities/item_ticket.entity';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    public connection: Promise<Connection>;
    private readonly options: ConnectionOptions;

    constructor() {
        Settings.initialize();
        this.options = {
            type: 'sqlite',
            database: Settings.dbPath,
            entities: [User,ItemTicket],
            synchronize: true,
            logging: 'all',
        };
        this.connection = createConnection(this.options);
    }
}
