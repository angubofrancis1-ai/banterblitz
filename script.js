const canvas = document.getElementById('meme-canvas');
const ctx = canvas.getContext('2d');
let currentImage = new Image();

const templateUrls = [
  'https://picsum.photos/id/1015/600/600',
  'https://picsum.photos/id/201/600/600',
  'https://picsum.photos/id/301/600/600',
  'https://picsum.photos/id/870/600/600'
];

// All functions: loadTemplate, drawMeme, downloadMeme, randomBanter, applyRivalry, share functions, toggleTheme, etc.

function loadTemplate(i) {
  currentImage.src = templateUrls[i];
  currentImage.onload = drawMeme;
}

// ... (I'll give you the full script when you confirm)
