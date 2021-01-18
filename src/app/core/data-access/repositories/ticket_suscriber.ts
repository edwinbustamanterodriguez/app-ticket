import {EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent} from 'typeorm';
import {ItemTicket} from '../entities/item_ticket.entity';

@EventSubscriber()
export class TicketSuscriber implements EntitySubscriberInterface<ItemTicket> {

  constructor() {
  }

  listenTo(): any {
    return ItemTicket;
  }

  afterUpdate(event: UpdateEvent<ItemTicket>): Promise<any> | void {
  }

  afterInsert(event: InsertEvent<ItemTicket>): Promise<any> | void {

  }
}
