import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ItemTicket} from '../core/data-access/entities/item_ticket.entity';
import {TicketsRepositoryService} from '../core/data-access/repositories/ticketsRepository';
import {shell} from 'electron';
import {ElectronService} from 'ngx-electron';
import {DocumentChangeColorService} from '../core/services/settings/document_change_color.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  ticketsList: ItemTicket[];

  constructor(private electronService: ElectronService,
              private ref: ChangeDetectorRef,
              private ticketsRepositoryService: TicketsRepositoryService,
              private documentChangeColorService: DocumentChangeColorService
  ) {


    this.electronService.ipcRenderer.on('delete-ticket-dialog-selection', (event, index, ticket) => {
      if (index === 0) {
        this.ticketsRepositoryService.deleteTicket(ticket).then(result => {
          this.getTickets();
        });
      }
    });
    this.electronService.ipcRenderer.on('changes-in-tickets-db', (event, any) => {
      this.getTickets();
    });
    this.electronService.ipcRenderer.on('change-color-theme', (event, any) => {
        this.documentChangeColorService.applyPersistColor();
      }
    );
  }

  ngOnInit(): void {
    this.getTickets();
    this.documentChangeColorService.applyPersistColor();
  }

  getTickets(): void {
    this.ticketsRepositoryService.getTickets().then(
      tickets => {
        this.ticketsList = tickets;
        this.ref.detectChanges();
      }
    );
  }

  deleteItem(itemTicket: ItemTicket): void {
    this.electronService.ipcRenderer.send('open-delete-ticket-dialog', itemTicket);
  }

  deleteAllData(): void {
    this.ticketsRepositoryService.clearTickets().then(() => {
        this.getTickets();
      }
    );
  }

  closeWindow(): void {
    this.electronService.ipcRenderer.send('close-grid-win', null);
  }

  openUrl(url: string): void {
    shell.openExternal(url);
  }
}
