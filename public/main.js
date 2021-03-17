const { app, BrowserWindow } = require('electron');

require('@electron/remote/main').initialize();

function createWindow() {
  const win = new BrowserWindow({
    width: 784,
    height: 720,
    resizable: false,
    minimizable: true,
    maximizable: false,
    autoHideMenuBar: true,
    frame: true,
    title: 'Streamy',
    show: false,
    webPreferences: {
      enableRemoteModule: true,
    },
    icon: __dirname + '/favicon.ico',
  });
  const splash = new BrowserWindow({
    width: 400,
    height: 200,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
  });
  win.setTitle('Streamy');
  win.loadURL('http://localhost:3000/');
  splash.loadURL(`${__dirname}/splashscreen.html`);

  // if main window is ready to show, then destroy the splash window and show up the main window
  win.once('ready-to-show', () => {
    splash.destroy();
    win.show();
  });
}

app.setName('Streamy');
app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
