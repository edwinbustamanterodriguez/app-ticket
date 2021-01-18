import {Injectable} from '@angular/core';
import {DatabaseRepositoriesService} from '../settings_sqlite/database-repositories.service';
import {ItemTicket} from '../entities/item_ticket.entity';
import {SettingService} from '../../services/setting.service';
import {DeleteResult} from 'typeorm';
import {Subject} from 'rxjs/Rx';
import {UpdateResult} from 'typeorm/query-builder/result/UpdateResult';

@Injectable({
  providedIn: 'root'
})
export class TicketsRepositoryService {
  // public listCurrentTickets: ReplaySubject<ItemTicket[]> = new ReplaySubject();
  listCurrentTickets = new Subject<ItemTicket[]>();

  //public listCurrentTickets: BehaviorSubject<ItemTicket[]> = new BehaviorSubject([]);

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

  /* changesInDB(itemTicket: ItemTicket) {
     this.getTickets().then(tickets => {
       console.log(`New DATA IN CHANGES: `, tickets);
         this.listCurrentTickets.next(tickets);
       console.log(`OBSERVABLE DATE: `, this.listCurrentTickets);
       }
     );
   }*/

  async getTicketsConfig(): Promise<ItemTicket[]> {
    let itemTicketRepository = await this.databaseRepositoriesConfigService.getTicketRepository();

    let maxTicketsShow = this.settingService.getSettings().maxTicket;

    const itemsNum: number = await itemTicketRepository.count();

    //NUMBERS TICKETS IN DATABASE
    /* if (itemsNum >= maxTicketsShow) {
       return await itemTicketRepository.find({
         order: {
           id: 'ASC',
         },
         where: {
           isRead: false
         },
         skip: 0,
         take: 2
       });

       /!*if (tickets.length > 0) {
         await itemTicketRepository.delete(tickets[0].id);
       }*!/
     } else {
       return new Promise(function (resolve, reject) {
         // not taking our time to do the job
         resolve([]); // immediately give the result: 123
       });
     }*/

    let itemTickets = await itemTicketRepository.find({
      order: {
        id: 'ASC',
      },
      where: {
        isRead: false
      },
      skip: 0,
      take: maxTicketsShow
    });

    for (const itemTicket of itemTickets) {
      await this.updateTicketStatus(itemTicket);
    }
    return itemTickets;
  }


}
