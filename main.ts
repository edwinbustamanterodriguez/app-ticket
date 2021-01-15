import {app, BrowserWindow, ipcMain, Menu, screen, shell} from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow = null;
let winSettings: BrowserWindow = null;
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
    width: 900,
    height: 200,
    minWidth: size.width,
    minHeight: 100,
    maxHeight: 150,
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
    title: "Settings",
    parent: win,
    width: 900, // size.width / 2,
    height: 200, // size.height / 1.5,
    minWidth: 800,
    minHeight: 200,
    maxHeight: 250,
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

  // Emitted when the window is closed.
  winSettings.on('closed', () => {
    createMenuMain();
    winSettings = null;
  });

  return winSettings;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  ipcMain.on('close-settings-win', (event, arg) => {
    win.webContents.send('win-main', arg);
    winSettings.close();
    winSettings = null;
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


//SETTING MENUS
function createMenuMain() {
  var menu = Menu.buildFromTemplate([
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
  Menu.setApplicationMenu(menu);
}

function createMenuSetting() {
  var menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {role: 'about'},
        {type: 'separator'},
        {role: 'quit'}
      ]
    }
  ])
  Menu.setApplicationMenu(menu);
}
