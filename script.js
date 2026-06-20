
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
