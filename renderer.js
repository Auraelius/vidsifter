// renderer.js
const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

let currentFilePath;
let videoFiles = [];
let currentFileIndex = 0;

document.getElementById('select-file').addEventListener('click', () => {
  ipcRenderer.send('select-files');
});

document.getElementById('keep').addEventListener('click', () => {
  if (currentFilePath) {
    moveFile(currentFilePath, 'keep');
    playNextFile();
  }
});

document.getElementById('discard').addEventListener('click', () => {
  if (currentFilePath) {
    moveFile(currentFilePath, 'discard');
    playNextFile();
  }
});

ipcRenderer.on('files-selected', async (event, filePaths) => {
  videoFiles = [];
  currentFileIndex = 0;

  for (const filePath of filePaths) {
    try {
      const stat = await fs.promises.stat(filePath);

      if (stat.isDirectory()) {
        const filesInDirectory = await fs.promises.readdir(filePath);
        const videoFilesInDirectory = filesInDirectory
          .map((file) => path.join(filePath, file))
          .filter((file) => /\.(mkv|avi|mp4|mov|flv|wmv)$/i.test(file));

        videoFiles.push(...videoFilesInDirectory);
      } else {
        videoFiles.push(filePath);
      }
    } catch (error) {
      console.error(`Error reading file or directory: ${error.message}`);
    }
  }

  playNextFile();
});

function playNextFile() {
  if (currentFileIndex < videoFiles.length) {
    currentFilePath = videoFiles[currentFileIndex++];
    const video = document.getElementById('video-player');
    video.src = currentFilePath;
    video.loop = false;
    video.play();
  } else {
    const video = document.getElementById('video-player');
    video.pause();
    video.src = '';
    alert("That's all, folks!");
  }
}




function moveFile(filePath, destination) {
  const video = document.getElementById('video-player');
  video.pause();
  video.src = '';

  const fileName = path.basename(filePath);
  const fileDirectory = path.dirname(filePath);
  const destinationDirectory = path.join(fileDirectory, destination);
  const newFilePath = path.join(destinationDirectory, fileName);

  if (!fs.existsSync(destinationDirectory)) {
    fs.mkdirSync(destinationDirectory);
  }

  fs.rename(filePath, newFilePath, (error) => {
    if (error) {
      console.error(`Error moving file: ${error.message}`);
      return;
    }
    console.log(`File moved to "${destination}" folder.`);
  });

  currentFilePath = null;
}
