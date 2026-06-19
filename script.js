const canvas = document.getElementById('meme-canvas');
const ctx = canvas.getContext('2d');
let currentImage = new Image();

const templateUrls = [
  'https://picsum.photos/id/1015/600/600',
  'https://picsum.photos/id/201/600/600',
  'https://picsum.photos/id/301/600/600',
  'https://picsum.photos/id/870/600/600'
];

// Render templates
function renderTemplates() {
  const container = document.getElementById('templates');
  container.innerHTML = '';
  templateUrls.forEach((url, i) => {
    const div = document.createElement('div');
    div.className = 'template-card cursor-pointer rounded-2xl overflow-hidden border border-zinc-700 aspect-square';
    div.innerHTML = `<img src="${url}" class="w-full h-full object-cover">`;
    div.onclick = () => loadTemplate(i);
    container.appendChild(div);
  });
}

function loadTemplate(i) {
  currentImage.src = templateUrls[i];
  currentImage.onload = drawMeme;
}

function drawMeme() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (currentImage.src) {
    ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
  }

  const top = document.getElementById('top-text').value.toUpperCase();
  const bottom = document.getElementById('bottom-text').value.toUpperCase();

  ctx.textAlign = 'center';
  ctx.shadowBlur = 12;
  ctx.shadowColor = 'black';
  ctx.lineWidth = 9;
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'white';
  ctx.font = `bold 42px Impact`;

  ctx.strokeText(top, 260, 85);
  ctx.fillText(top, 260, 85);
  ctx.strokeText(bottom, 260, 445);
  ctx.fillText(bottom, 260, 445);
}

function downloadMeme() {
  const link = document.createElement('a');
  link.download = `banterblitz-${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
  document.getElementById('share-section').classList.remove('hidden');
}

function randomBanter() {
  const tops = ["VAR DECISION", "90+7 GOAL", "HAALAND AGAIN", "PLOT ARMOUR", "CRYING FANS"];
  const bottoms = ["PAIN.", "WE MOVE", "NEXT SEASON", "STILL CELEBRATING", "SCENES"];
  document.getElementById('top-text').value = tops[Math.floor(Math.random()*tops.length)];
  document.getElementById('bottom-text').value = bottoms[Math.floor(Math.random()*bottoms.length)];
  drawMeme();
}

function applyRivalry() {
  const val = document.getElementById('rivalry').value;
  if (val === 'liverpool') {
    document.getElementById('top-text').value = "LIVERPOOL FANS AFTER LOSS";
    document.getElementById('bottom-text').value = "PAIN.";
  } else if (val === 'arsenal') {
    document.getElementById('top-text').value = "ARSENAL FANS";
    document.getElementById('bottom-text').value = "WHEN SPURS SCORE";
  }
  drawMeme();
}

function shareToX() {
  const text = "Just roasted my rival with BanterBlitz 😂⚽️";
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${window.location.href}`);
}

function shareToWhatsApp() {
  window.open(`https://wa.me/?text=${encodeURIComponent("Check this football meme 🔥 " + window.location.href)}`);
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href + " - Made on BanterBlitz");
  alert("✅ Link copied! Go spam your group chats");
}

function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  const icon = document.getElementById('theme-icon');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
}

function showGallery() {
  document.getElementById('gallery').classList.toggle('hidden');
}

// Init
function init() {
  renderTemplates();
  loadTemplate(0);
  document.getElementById('top-text').value = "WHEN YOUR RIVAL WINS";
  document.getElementById('bottom-text').value = "IN THE 90TH MINUTE";
  setTimeout(drawMeme, 500);
}

window.onload = init;
// ... existing code ...

// NEW: AI Prompt Helper
function generateAICaptions() {
  const prompt = document.getElementById('ai-prompt').value.trim();
  const container = document.getElementById('ai-suggestions');
  container.innerHTML = '';

  if (!prompt) {
    alert("Enter a scenario first!");
    return;
  }

  const suggestions = [
    `TOP: WHEN ${prompt.toUpperCase()}`,
    `BOTTOM: PAIN. ABSOLUTE PAIN.`,
    `TOP: ${prompt.toUpperCase()} AGAIN`,
    `BOTTOM: STILL CELEBRATING IN 90+7`,
    `TOP: MY RIVAL AFTER ${prompt}`,
    `BOTTOM: PLOT ARMOUR ACTIVATED`,
    `TOP: VAR DECISION ON ${prompt}`,
    `BOTTOM: WE DONT TALK ABOUT IT`
  ];

  suggestions.forEach(text => {
    const div = document.createElement('div');
    div.className = "bg-zinc-800 hover:bg-zinc-700 p-4 rounded-2xl cursor-pointer text-sm";
    div.textContent = text;
    div.onclick = () => {
      document.getElementById('top-text').value = text.includes("TOP:") ? text.replace("TOP: ", "") : text;
      drawMeme();
    };
    container.appendChild(div);
  });
}

// Better Gallery with football memes
function renderGallery() {
  const galleryItems = [
    { img: "https://picsum.photos/id/1015/600/600", caption: "VAR Robbery" },
    { img: "https://picsum.photos/id/201/600/600", caption: "90+7 Heartbreak" },
    { img: "https://picsum.photos/id/301/600/600", caption: "Haaland vs Defence" },
    { img: "https://picsum.photos/id/870/600/600", caption: "Crying Arsenal Fan" },
    { img: "https://picsum.photos/id/133/600/600", caption: "El Clasico Drama" },
    { img: "https://picsum.photos/id/180/600/600", caption: "Maguire Special" }
  ];

  const container = document.getElementById('gallery-grid');
  container.innerHTML = '';

  galleryItems.forEach(item => {
    const div = document.createElement('div');
    div.className = "group relative rounded-3xl overflow-hidden cursor-pointer";
    div.innerHTML = `
      <img src="${item.img}" class="w-full h-full object-cover">
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 p-4">
        <p class="text-sm font-medium">${item.caption}</p>
      </div>
    `;
    div.onclick = () => {
      currentImage.src = item.img;
      currentImage.onload = drawMeme;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    container.appendChild(div);
  });
}

// Call this in init()
function init() {
  renderTemplates();
  renderGallery();           // ← New
  loadTemplate(0);
  // ... existing defaults
}

window.onload = init;
