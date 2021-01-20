import {Injectable} from '@angular/core';
import {DatabaseRepositoriesService} from '../settings_sqlite/database-repositories.service';
import {ItemTicket} from '../entities/item_ticket.entity';
import {SettingService} from '../../services/settings/setting.service';
import {DeleteResult} from 'typeorm';
import {UpdateResult} from 'typeorm/query-builder/result/UpdateResult';

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

  async updateTicketStatus(itemTicket: ItemTicket): Promise<UpdateResult> {
    let itemTicketRepository = await this.databaseRepositoriesConfigService.getTicketRepository();
    return await itemTicketRepository.update(itemTicket.id, {isRead: true});
  }

  async getTicketsConfig(): Promise<ItemTicket[]> {
    let itemTicketRepository = await this.databaseRepositoriesConfigService.getTicketRepository();
    let maxTicketsShow = this.settingService.getSettings().maxTicketShow;
    const itemsUnRead: number = await itemTicketRepository.count({isRead: false});
    let itemTickets: ItemTicket[];

    if (itemsUnRead < maxTicketsShow) {
      let itemTickets1 = await itemTicketRepository.find({
        order: {
          id: 'DESC',
        },
        skip: 0,
        take: maxTicketsShow
      });
      itemTickets = itemTickets1.reverse();

    } else {
      itemTickets = await itemTicketRepository.find({
        order: {
          id: 'ASC',
        },
        where: {
          isRead: false
        },
        skip: 0,
        take: maxTicketsShow
      });
    }

    for (const itemTicket of itemTickets) {
      await this.updateTicketStatus(itemTicket);
    }
    return itemTickets;
  }

  async removeExcessTickets(): Promise<void> {
    let itemTicketRepository = await this.databaseRepositoriesConfigService.getTicketRepository();
    let maxTicketsShow = this.settingService.getSettings().maxTicketShow;
    const itemsRead: number = await itemTicketRepository.count({isRead: true,});

    if (itemsRead > maxTicketsShow) {
      let take = itemsRead - maxTicketsShow;
      let itemTicketsReadeds = await itemTicketRepository.find({
        order: {
          id: 'ASC',
        },
        where: {
          isRead: true
        },
        skip: 0,
        take: take
      });
      for (const itemTicket of itemTicketsReadeds) {
        await this.deleteTicket(itemTicket);
      }
    }
  }
}
