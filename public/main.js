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
    webPreferences: {
      enableRemoteModule: true,
    },
  });
  win.setTitle('Streamy');
  win.loadURL('http://localhost:3000/');
}

app.setName('Streamy');
app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
