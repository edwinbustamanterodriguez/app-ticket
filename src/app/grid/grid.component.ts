import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {ItemTicket} from '../core/data-access/entities/item_ticket.entity';
import {DatabaseService} from '../core/data-access/database.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  ticketsList: ItemTicket[];

  constructor(private electronService: ElectronService, private ref: ChangeDetectorRef, private databaseService: DatabaseService) {
    /*this.electronService.ipcRenderer.on('delete-ticket-dialog-selection', (event, index, ticket) => {
      if (index === 0) {
        this.dbService.deleteItem(ticket).subscribe((items) => {
          this.ticketsList = items;
          this.ref.detectChanges();
        });
      }
    });*/

    /*this.electronService.ipcRenderer.on('ticketsCurrentList', (event, ticketsCurrentList: ItemTicket[]) => {
      this.ticketsList = ticketsCurrentList;
      this.ref.detectChanges();
    });*/
  }

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets(): void {
    this.databaseService
      .connection
      .then(() => ItemTicket.find())
      .then(tickets => {
        this.ticketsList = tickets;
      })
  }


  deleteItem(item: ItemTicket): void {
   // this.electronService.ipcRenderer.send('open-delete-ticket-dialog', item);
  }

  deleteAllData(): void {

  }

  closeWindow(): void {
    this.electronService.ipcRenderer.send('close-grid-win', null);
  }
}
