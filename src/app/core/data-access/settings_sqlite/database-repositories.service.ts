import {Injectable} from '@angular/core';
import {Connection, createConnection, Repository} from 'typeorm';
import {Settings} from './settings';
import {User} from '../entities/user.entity';
import {ItemTicket} from '../entities/item_ticket.entity';
import {TicketSuscriber} from '../repositories/ticket_suscriber';

let connection: Connection;

@Injectable({
  providedIn: 'root'
})
export class DatabaseRepositoriesService {

  constructor() {
    this.createDataBaseConnection().then();
  }

  async createDataBaseConnection(): Promise<Connection> {
    if (connection === undefined) {
      Settings.initialize();
      connection = await createConnection({
          type: 'sqlite',
          database: Settings.dbPath,
          entities: [User, ItemTicket],
          subscribers: [TicketSuscriber],
          synchronize: true,
          logging: 'all',
        }
      );
    }
    return connection;
  }

  async getTicketRepository(): Promise<Repository<ItemTicket>> {
    let connect: Connection = await this.createDataBaseConnection();
    return connect.getRepository(ItemTicket);
  }

  //More Repositories add
}
