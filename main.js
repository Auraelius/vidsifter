// main.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const electronPrompt = require('electron-prompt');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800, // Adjust the initial window width as needed
    height: 700, // Adjust the initial window height as needed
    minWidth: 800, // Set the minimum window width
    minHeight: 700, // Set the minimum window height
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('index.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('select-files', async (event) => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections', 'openDirectory'],
    filters: [
      {
        name: 'Videos',
        extensions: ['mkv', 'avi', 'mp4', 'mov', 'flv', 'wmv'],
      },
    ],
  });

  if (!result.canceled) {
    event.reply('files-selected', result.filePaths);
  }
});
