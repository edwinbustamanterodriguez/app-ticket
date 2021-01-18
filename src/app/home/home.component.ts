import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {SettingService} from '../core/services/setting.service';
import {Setting} from '../shared/model/setting.model';
import {ElectronService} from '../core/services';
import {io} from 'socket.io-client';
import {Ticket} from '../shared/model/ticket';
import {ItemTicket} from '../core/data-access/entities/item_ticket.entity';
import {TicketsRepositoryService} from '../core/data-access/repositories/ticketsRepository';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  criticalIndicator: number;
  errorIndicator: number;
  warningIndicator: number;
  tickets: ItemTicket[] = [];
  currentTime = new Date();
  speedTicker: number;
  tickerText: string;
  private socket: any;

  constructor(private router: Router,
              private ticketsRepositoryService: TicketsRepositoryService,
              private settingService: SettingService,
              private electronService: ElectronService) {
    this.socket = io('http://localhost:8182');
    this.getTickets();
  }

  ngOnInit(): void {
    const setting: Setting = this.settingService.getSettings();
    this.speedTicker = setting.speed;
    //Listen Changes
    this.electronService.ipcRenderer.on('win-main', (event, args) => {
      console.log(args);
      if (args !== null) {
        const args1 = args as Setting;
        this.speedTicker = args1.speed;
      }
    });
    // Timer for Date
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);

    // Socket IO
    this.socket.on('message', (ticket: Ticket) => {
      this.saveTicketInDB(ticket);
      this.criticalIndicator = 0;
      this.errorIndicator = 0;
      this.warningIndicator = 0;
    });
  }

  saveTicketInDB(ticket: Ticket): void {
    let item = new ItemTicket();
    item.source = ticket.source;
    item.postedDateTime = ticket.postedDateTime;
    item.createdDateTime = ticket.createdDateTime;
    item.url = ticket.url;
    item.logo = ticket.logo;
    item.servility = ticket.servility;
    item.timeToLive = ticket.timeToLive;
    item.order = ticket.order;
    item.chime = ticket.chime;
    item.header = ticket.header;
    item.body1 = ticket.body1;
    item.body2 = ticket.body2;
    item.body3 = ticket.body3;
    item.extra1 = ticket.extra1;
    item.extra2 = ticket.extra2;
    this.saveTicket(item);
  }


  getTickets(): void {
    this.ticketsRepositoryService.getTickets().then(tickets => {
        let composeText = '';
        tickets.forEach(item => {
          composeText = composeText + this.getTicketHTML(item);
        });
        this.tickerText = composeText;
      }
    );
  }

  getTicketHTML(ticket: ItemTicket): string {
    let startTag: string;
    const endTag = '</span>';
    const providerLogo = ticket.logo;
    const url = ticket.url;
    startTag = '<span class="alert-red">'

    const imageTag = '<img class="provider-icon" src="assets/icons/' + providerLogo + '">';

    const anchorTag = '<a href="' + url + '" target="_blank" class="device-text">';

    return imageTag + '<strong>' + anchorTag + ticket.header + '</a></strong>' + ': ' + startTag + ticket.body1 + endTag;
  }

  async saveTicket(itemTicket: ItemTicket) {
    this.ticketsRepositoryService.saveTicket(itemTicket).then();
  }

  completeIteration(completeIterationEvent: String): void {
    this.getTickets();
  }
}
