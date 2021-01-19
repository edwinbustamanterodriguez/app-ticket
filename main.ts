import {app, BrowserWindow, dialog, ipcMain, Menu, screen, shell} from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow = null;
let winSettings: BrowserWindow = null;
let winGrid: BrowserWindow = null;

const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

const openExternalLinksInOSBrowser = (event, url) => {
  if (url.match(/.*localhost.*/gi) === null && (url.startsWith('http:') || url.startsWith('https:'))) {
    event.preventDefault();
    shell.openExternal(url);
  }
};

function createWindow(): BrowserWindow {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: 800, // size.width / 2,
    height: 110, // size.height / 1.5,
    minHeight: 110,
    maxHeight: 110,
    maxWidth: size.width,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
      contextIsolation: false,  // false if you want to run 2e2 test with Spectron
      enableRemoteModule: true // true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)
    },
  });

  if (serve) {
    win.webContents.openDevTools();

    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');

  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  createMenuMain();
  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null;
  });

  //
  win.webContents.on('new-window', openExternalLinksInOSBrowser);
  win.webContents.on('will-navigate', openExternalLinksInOSBrowser);

  return win;
}

function createWindowSettings(): BrowserWindow {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;
  // Create the browser window.
  winSettings = new BrowserWindow({
    title: 'Settings',
    parent: win,
    width: 900, // size.width / 2,
    height: 200, // size.height / 1.5,
    center: true,
    resizable: false,
    frame: true,
    movable: true,
    transparent: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
      contextIsolation: false,  // false if you want to run 2e2 test with Spectron
      enableRemoteModule: true // true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)
    },
  });

  if (serve) {
    // winSettings.webContents.openDevTools();
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    winSettings.loadURL('http://localhost:4200/#settings');

  } else {
    winSettings.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true,
      hash: 'settings'
    }));
  }
  createMenuSetting();

  winSettings.once('ready-to-show', () => {
    winSettings.show()
  });

  //Force persist Title settings
  winSettings.on('page-title-updated', (evt) => {
    evt.preventDefault();
  });

  // Emitted when the window is closed.
  winSettings.on('closed', () => {
    winSettings = null;
  });

  return winSettings;
}

function createWindowGrid(): BrowserWindow {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;
  // Create the browser window.
  winGrid = new BrowserWindow({
    title: 'View Grid',
    parent: win,
    width: size.width,
    height: size.height,
    center: true,
    resizable: true,
    frame: true,
    movable: true,
    transparent: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
      contextIsolation: false,  // false if you want to run 2e2 test with Spectron
      enableRemoteModule: true // true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)
    },
  });

  if (serve) {
    winGrid.webContents.openDevTools();
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    winGrid.loadURL('http://localhost:4200/#grid');

  } else {
    winGrid.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true,
      hash: 'grid'
    }));
  }
  createMenuGrid();
  winGrid.once('ready-to-show', () => {
    winGrid.show()
  });

  //Force persist Title settings
  winGrid.on('page-title-updated', (evt) => {
    evt.preventDefault();
  });

  // Emitted when the window is closed.
  winGrid.on('closed', () => {
    winGrid = null;
  });

  return winGrid;
}

//MAIN RUN
try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  ipcMain.on('close-settings-win', (event, arg) => {
    win.webContents.send('win-main', arg);
    createMenuMain();
    winSettings.close();
    winSettings = null;
  });

  ipcMain.on('close-grid-win', (event, arg) => {
    createMenuMain();
    winGrid.close();
    winGrid = null;
  });

  //Dialog Confirmation Delete ticket
  ipcMain.on('open-delete-ticket-dialog', (event, ticket: any) => {
    const options = {
      type: 'question',
      buttons: ['Yes', 'No',],
      defaultId: 1,
      title: 'Information',
      message: 'Are you sure to delete this ticket?',
    };
    dialog.showMessageBox(options).then((result) => {
      event.sender.send('delete-ticket-dialog-selection', result.response, ticket);
    });

  });

  //Listen changes in db sqlite tickets
  ipcMain.on('changes-in-tickets-db', (event, any: any) => {
    if (winGrid !== null) {
      winGrid.webContents.send('changes-in-tickets-db', any);
    }
  });

  app.on('ready', () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}


//SETTING MENUS CONFIG
function createMenuMain() {
  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {role: 'about'},
        {type: 'separator'},
        {role: 'quit'}
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'View in Grid',
          click: function () {
            if (winGrid === null) {
              createWindowGrid()
            }
          },
          accelerator: 'CmdOrCtrl + Shift + G'
        }
      ]
    },
    {
      label: 'Window',
      submenu: [
        {
          label: 'Settings',
          click: function () {
            if (winSettings === null) {
              createWindowSettings()
            }
          },
          accelerator: 'CmdOrCtrl + Shift + S'
        },
        {
          type: 'separator'
        },
        {role: 'minimize'},
        {role: 'close'}
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About Clarity Ticker',
          click: function () {
            shell.openExternal('http://development1.utilitytalent.com:8080');
          },
          accelerator: 'CmdOrCtrl + Shift + H'
        }
      ]
    },
  ])

  if (process.platform === 'darwin') {
    Menu.setApplicationMenu(menu);

    win.on('focus', () => {
      Menu.setApplicationMenu(menu);
    });
  } else {
    win.setMenu(menu);
  }
}

function createMenuSetting() {
  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {role: 'about'},
        {type: 'separator'},
        {role: 'quit'}
      ]
    }
  ])
  if (process.platform === 'darwin') {
    Menu.setApplicationMenu(menu);

    winSettings.on('focus', () => {
      Menu.setApplicationMenu(menu);
    });
  } else {
    winSettings.setMenu(menu);
  }
}

function createMenuGrid() {
  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {role: 'about'},
        {type: 'separator'},
        {role: 'quit'}
      ]
    }
  ])
  if (process.platform === 'darwin') {
    Menu.setApplicationMenu(menu);

    winGrid.on('focus', () => {
      Menu.setApplicationMenu(menu);
    });
  } else {
    winGrid.setMenu(menu);
  }
}

// Express Server for Kafka and Socket.io
//setup
const express = require('express');
const appExpress = express();
const cors = require('cors');
const server = appExpress.listen(8182);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
appExpress.use(cors(corsOptions));

//consumer
const consumer = require('./consumer');

//to parse the payload
const bodyParser = require('body-parser')
appExpress.use(bodyParser.json());       // to support JSON-encoded bodies
appExpress.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//to serve images etc
appExpress.use(express.static('public'));

//to load index.html
appExpress.get('/', function (req, res, next) {
  res.sendFile(__dirname + '/public/index.html');
});

//to handle consume requests
appExpress.post('/consume', function (req, res, next) {
  console.log('Kokpit: /consume called \n' + req.body.brokerHost + ':' + req.body.brokerPort, 'kokpitgroup', req.body.topicName);
  consumer(req.body.brokerHost + ':' + req.body.brokerPort, 'kokpitgroup', req.body.topicName, io);
});

consumer('development1.utilitytalent.com:9092', 'kokpitgroup', 'clarity-messages', io);
