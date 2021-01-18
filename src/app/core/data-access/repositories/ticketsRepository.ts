import {Injectable} from '@angular/core';
import {DatabaseRepositoriesService} from '../settings_sqlite/database-repositories.service';
import {ItemTicket} from '../entities/item_ticket.entity';
import {SettingService} from '../../services/setting.service';
import {DeleteResult} from 'typeorm';


@Injectable({
  providedIn: 'root'
})
export class TicketsRepositoryService {
  constructor(private databaseRepositoriesConfigService: DatabaseRepositoriesService,
              private settingService: SettingService,) {
  }

  async getTickets(): Promise<ItemTicket[]> {
    let itemTicketRepository = await this.databaseRepositoriesConfigService.getTicketRepository();
    return itemTicketRepository.find();
  }

  async saveTicket(itemTicket: ItemTicket): Promise<ItemTicket> {
    let itemTicketRepository = await this.databaseRepositoriesConfigService.getTicketRepository();
    /*let maxTicket = this.settingService.getSettings().maxTicket;
    const itemsNum: number = await itemTicketRepository.count();*/

   /* //NUMBERS TICKETS IN DATABASE
    if (itemsNum >= maxTicket) {
      const tickets: ItemTicket[] = await itemTicketRepository.find({
        order: {
          id: 'ASC',
        },
        take: 1,
      });

      if (tickets.length > 0) {
        await itemTicketRepository.delete(tickets[0].id);
      }
    }*/
    return await itemTicketRepository.save(itemTicket);
  }

  async clearTickets(): Promise<void> {
    let itemTicketRepository = await this.databaseRepositoriesConfigService.getTicketRepository();
    return itemTicketRepository.clear();
  }

  async deleteTicket(itemTicket: ItemTicket): Promise<DeleteResult> {
    let itemTicketRepository = await this.databaseRepositoriesConfigService.getTicketRepository();
    return itemTicketRepository.delete(itemTicket);
  }
}
