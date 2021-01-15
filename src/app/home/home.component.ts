import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DatabaseService} from '../data-access/database.service';
import {User} from '../data-access/entities/user.entity';
import {SettingService} from '../core/services/setting.service';
import {Setting} from '../core/model/setting.model';
import {ElectronService} from '../core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  currentTime = new Date();
  speedTicker: number;
  tickerText: string = 'PRIMER TEXTO';

  constructor(private router: Router,
              private databaseService: DatabaseService,
              private settingService: SettingService,
              private electronService: ElectronService) {
    this.getUsers();
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
  }

  getUsers() {
    this.databaseService
      .connection
      .then(() => User.find())
      .then(users => {
        this.users = users;
        console.log('Users: '+users);
      })
  }

  addUser() {
    const user = new User();

    user.FirstName = 'EDWIN';
    user.LastName = 'Bustamante';
    user.Age = 25;

    this.databaseService
      .connection
      .then(() => user.save())
      .then(() => {
        this.getUsers();
      })
      .then(() => {

      })
  }
  completeIteration(completeIterationEvent: String): void {
    console.log(completeIterationEvent);
    this.tickerText = 'Nuevo data';
  }
}
