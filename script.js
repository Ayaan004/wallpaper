/* ========================================
   WallVault — Wallpaper App (Wallhaven API)
   ======================================== */

// Determine API base dynamically
// 1. If loaded from python server (e.g. http://localhost:5000), use '/api/v1'
// 2. If loaded from VS Code Live Server (e.g. http://localhost:5500) or file://, use 'http://localhost:5000/api/v1'
// 3. Fallback to direct Wallhaven API or curated dataset if offline/blocked
let API_BASE = window.location.port === '5000' ? '/api/v1' : 'http://localhost:5000/api/v1';
let PROXY_BASE = window.location.port === '5000' ? '' : 'http://localhost:5000';

// Built-in curated Wallhaven wallpapers catalog for instant offline / CORS fallback
const FALLBACK_WALLPAPERS = [
  {
    id: "jel1jq",
    category: "general",
    resolution: "3840x2160",
    dimension_x: 3840,
    dimension_y: 2160,
    views: 25469,
    favorites: 242,
    file_size: 3840120,
    file_type: "image/jpeg",
    colors: ["#000000", "#424153", "#333399", "#663399", "#663300"],
    path: "https://w.wallhaven.cc/full/je/wallhaven-jel1jq.jpg",
    thumbs: {
      large: "https://th.wallhaven.cc/lg/je/jel1jq.jpg",
      original: "https://th.wallhaven.cc/orig/je/jel1jq.jpg",
      small: "https://th.wallhaven.cc/small/je/jel1jq.jpg"
    },
    tags: [{ name: "cyberpunk" }, { name: "neon" }, { name: "city" }, { name: "night" }]
  },
  {
    id: "pomle9",
    category: "general",
    resolution: "4096x2731",
    dimension_x: 4096,
    dimension_y: 2731,
    views: 20104,
    favorites: 221,
    file_size: 4210500,
    file_type: "image/jpeg",
    colors: ["#996633", "#999999", "#cc6633", "#424153", "#663300"],
    path: "https://w.wallhaven.cc/full/po/wallhaven-pomle9.jpg",
    thumbs: {
      large: "https://th.wallhaven.cc/lg/po/pomle9.jpg",
      original: "https://th.wallhaven.cc/orig/po/pomle9.jpg",
      small: "https://th.wallhaven.cc/small/po/pomle9.jpg"
    },
    tags: [{ name: "mountain" }, { name: "nature" }, { name: "sunset" }, { name: "landscape" }]
  },
  {
    id: "5ypy88",
    category: "general",
    resolution: "3840x2160",
    dimension_x: 3840,
    dimension_y: 2160,
    views: 19094,
    favorites: 217,
    file_size: 2950000,
    file_type: "image/jpeg",
    colors: ["#000000", "#424153", "#999999", "#660000", "#ffff00"],
    path: "https://w.wallhaven.cc/full/5y/wallhaven-5ypy88.jpg",
    thumbs: {
      large: "https://th.wallhaven.cc/lg/5y/5ypy88.jpg",
      original: "https://th.wallhaven.cc/orig/5y/5ypy88.jpg",
      small: "https://th.wallhaven.cc/small/5y/5ypy88.jpg"
    },
    tags: [{ name: "space" }, { name: "planet" }, { name: "galaxy" }, { name: "nebula" }]
  },
  {
    id: "lygm3y",
    category: "anime",
    resolution: "2840x4500",
    dimension_x: 2840,
    dimension_y: 4500,
    views: 15455,
    favorites: 198,
    file_size: 3200100,
    file_type: "image/png",
    colors: ["#000000", "#424153", "#cccc33", "#663300", "#ffffff"],
    path: "https://w.wallhaven.cc/full/ly/wallhaven-lygm3y.png",
    thumbs: {
      large: "https://th.wallhaven.cc/lg/ly/lygm3y.jpg",
      original: "https://th.wallhaven.cc/orig/ly/lygm3y.jpg",
      small: "https://th.wallhaven.cc/small/ly/lygm3y.jpg"
    },
    tags: [{ name: "anime" }, { name: "illustration" }, { name: "fantasy" }]
  },
  {
    id: "94x38z",
    category: "anime",
    resolution: "3840x2160",
    dimension_x: 3840,
    dimension_y: 2160,
    views: 34120,
    favorites: 420,
    file_size: 5070446,
    file_type: "image/jpeg",
    colors: ["#000000", "#abbcda", "#424153", "#66cccc", "#333399"],
    path: "https://w.wallhaven.cc/full/94/wallhaven-94x38z.jpg",
    thumbs: {
      large: "https://th.wallhaven.cc/lg/94/94x38z.jpg",
      original: "https://th.wallhaven.cc/orig/94/94x38z.jpg",
      small: "https://th.wallhaven.cc/small/94/94x38z.jpg"
    },
    tags: [{ name: "anime girl" }, { name: "aesthetic" }, { name: "sky" }]
  },
  {
    id: "ze1p56",
    category: "anime",
    resolution: "3779x2480",
    dimension_x: 3779,
    dimension_y: 2480,
    views: 18240,
    favorites: 184,
    file_size: 1011043,
    file_type: "image/jpeg",
    colors: ["#424153", "#e7d8b1", "#cc3333", "#ffffff", "#cccccc"],
    path: "https://w.wallhaven.cc/full/ze/wallhaven-ze1p56.jpg",
    thumbs: {
      large: "https://th.wallhaven.cc/lg/ze/ze1p56.jpg",
      original: "https://th.wallhaven.cc/orig/ze/ze1p56.jpg",
      small: "https://th.wallhaven.cc/small/ze/ze1p56.jpg"
    },
    tags: [{ name: "scenery" }, { name: "art" }, { name: "clouds" }]
  },
  {
    id: "6o8j9w",
    category: "people",
    resolution: "3840x2160",
    dimension_x: 3840,
    dimension_y: 2160,
    views: 29540,
    favorites: 310,
    file_size: 4500000,
    file_type: "image/jpeg",
    colors: ["#2d1b4e", "#a78bfa", "#1a102f", "#f43f5e", "#0f081d"],
    path: "https://w.wallhaven.cc/full/6o/wallhaven-6o8j9w.jpg",
    thumbs: {
      large: "https://th.wallhaven.cc/lg/6o/6o8j9w.jpg",
      original: "https://th.wallhaven.cc/orig/6o/6o8j9w.jpg",
      small: "https://th.wallhaven.cc/small/6o/6o8j9w.jpg"
    },
    tags: [{ name: "portrait" }, { name: "cosplay" }, { name: "model" }]
  },
  {
    id: "72g5kv",
    category: "general",
    resolution: "3840x2160",
    dimension_x: 3840,
    dimension_y: 2160,
    views: 42100,
    favorites: 654,
    file_size: 4120300,
    file_type: "image/jpeg",
    colors: ["#0066cc", "#0099cc", "#ffffff", "#424153", "#66cccc"],
    path: "https://w.wallhaven.cc/full/72/wallhaven-72g5kv.jpg",
    thumbs: {
      large: "https://th.wallhaven.cc/lg/72/72g5kv.jpg",
      original: "https://th.wallhaven.cc/orig/72/72g5kv.jpg",
      small: "https://th.wallhaven.cc/small/72/72g5kv.jpg"
    },
    tags: [{ name: "ocean" }, { name: "waves" }, { name: "blue" }, { name: "minimal" }]
  }
];

// ========== STATE ==========
const state = {
  wallpapers: [],
  currentPage: 1,
  lastPage: 1,
  totalResults: 0,
  query: '',
  categories: '111',
  purity: '100', // SFW only
  sorting: 'date_added',
  order: 'desc',
  ratios: '',
  atleast: '',
  topRange: '1M',
  seed: null,
  isLoading: false,
  selectedWallpaper: null,
  selectedDownloadSize: 'original',
};

// ========== DOM REFERENCES ==========
const dom = {
  grid: document.getElementById('wallpaper-grid'),
  searchInput: document.getElementById('search-input'),
  searchBtn: document.getElementById('search-btn'),
  sortSelect: document.getElementById('sort-select'),
  ratioSelect: document.getElementById('ratio-select'),
  resolutionSelect: document.getElementById('resolution-select'),
  categoryFilters: document.getElementById('category-filters'),
  pagination: document.getElementById('pagination'),
  resultsCount: document.getElementById('results-count'),
  modalOverlay: document.getElementById('modal-overlay'),
  modalImage: document.getElementById('modal-image'),
  modalClose: document.getElementById('modal-close'),
  modalTitle: document.getElementById('modal-title'),
  modalResolution: document.getElementById('modal-resolution'),
  modalCategory: document.getElementById('modal-category'),
  modalFilesize: document.getElementById('modal-filesize'),
  modalStats: document.getElementById('modal-stats'),
  modalColors: document.getElementById('modal-colors'),
  modalTags: document.getElementById('modal-tags'),
  sizeOptions: document.getElementById('size-options'),
  downloadBtn: document.getElementById('download-btn'),
  navbar: document.getElementById('navbar'),
  scrollTopBtn: document.getElementById('scroll-top'),
  toastContainer: document.getElementById('toast-container'),
  heroSection: document.getElementById('hero-section'),
  navLinks: document.querySelectorAll('.nav-link[data-sort]'),
};

// ========== UTILITY FUNCTIONS ==========

function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '—';
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatNumber(num) {
  if (!num) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    ${type === 'success' ? '✅' : 'ℹ️'} ${message}
  `;
  dom.toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ========== API FUNCTIONS ==========

function buildSearchURL(base = API_BASE) {
  const params = new URLSearchParams();

  if (state.query) params.set('q', state.query);
  params.set('categories', state.categories);
  params.set('purity', state.purity);
  params.set('sorting', state.sorting);
  params.set('order', state.order);
  params.set('page', state.currentPage);

  if (state.ratios) params.set('ratios', state.ratios);
  if (state.atleast) params.set('atleast', state.atleast);
  if (state.sorting === 'toplist') params.set('topRange', state.topRange);
  if (state.seed && state.sorting === 'random') params.set('seed', state.seed);

  return `${base}/search?${params.toString()}`;
}

async function fetchWithFallback(url) {
  // First attempt: current API_BASE (local server proxy or current origin)
  try {
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`Primary fetch failed for ${url}:`, err);
  }

  // Second attempt: if primary was port 5000 and failed, try direct Wallhaven
  if (API_BASE !== 'https://wallhaven.cc/api/v1') {
    try {
      const directUrl = buildSearchURL('https://wallhaven.cc/api/v1');
      const res = await fetch(directUrl);
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('Direct fetch failed:', err);
    }
  }

  return null;
}

async function fetchWallpapers() {
  if (state.isLoading) return;
  state.isLoading = true;

  showSkeletonLoading();

  try {
    const url = buildSearchURL();
    let data = await fetchWithFallback(url);

    if (data && data.data && data.data.length > 0) {
      state.wallpapers = data.data;
      state.lastPage = data.meta?.last_page || 1;
      state.totalResults = data.meta?.total || data.data.length;
      state.currentPage = data.meta?.current_page || 1;
      if (data.meta?.seed) state.seed = data.meta.seed;
    } else {
      // Offline / CORS fallback filter
      let filtered = [...FALLBACK_WALLPAPERS];
      if (state.query) {
        const q = state.query.toLowerCase();
        filtered = filtered.filter(w =>
          w.tags.some(t => t.name.toLowerCase().includes(q)) ||
          w.category.toLowerCase().includes(q)
        );
      }
      if (state.categories === '100') filtered = filtered.filter(w => w.category === 'general');
      if (state.categories === '010') filtered = filtered.filter(w => w.category === 'anime');
      if (state.categories === '001') filtered = filtered.filter(w => w.category === 'people');

      state.wallpapers = filtered;
      state.lastPage = 1;
      state.totalResults = filtered.length;
    }

    renderWallpapers();
    renderPagination();
    updateResultsCount();

  } catch (error) {
    console.error('Failed to fetch wallpapers:', error);
    state.wallpapers = FALLBACK_WALLPAPERS;
    state.totalResults = FALLBACK_WALLPAPERS.length;
    renderWallpapers();
    renderPagination();
    updateResultsCount();
  } finally {
    state.isLoading = false;
  }
}

async function fetchWallpaperDetails(id) {
  // Check local state first
  const existing = state.wallpapers.find(w => w.id === id);
  
  try {
    const res = await fetch(`${API_BASE}/w/${id}`);
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (error) {
    console.warn('Detailed API fetch failed, using cached state:', error);
  }

  return existing || null;
}

// ========== RENDERING ==========

function showSkeletonLoading() {
  const skeletons = Array.from({ length: 12 }, () => `
    <div class="skeleton-card">
      <div class="skeleton-image"></div>
      <div class="skeleton-info">
        <div class="skeleton-text"></div>
        <div class="skeleton-badge"></div>
      </div>
    </div>
  `).join('');
  dom.grid.innerHTML = skeletons;
}

function renderWallpapers() {
  if (state.wallpapers.length === 0) {
    dom.grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h3>No wallpapers found</h3>
        <p>Try searching for different keywords or removing filters.</p>
      </div>
    `;
    return;
  }

  const cards = state.wallpapers.map((wp, index) => {
    const thumb = wp.thumbs?.large || wp.thumbs?.original || wp.thumbs?.small || wp.path || '';
    const category = wp.category || 'general';
    const resolution = wp.resolution || `${wp.dimension_x}x${wp.dimension_y}` || '—';
    const views = formatNumber(wp.views);
    const favorites = formatNumber(wp.favorites);

    return `
      <div class="wallpaper-card" data-id="${wp.id}" style="animation-delay: ${index * 35}ms">
        <span class="card-category ${category}">${category}</span>
        <div class="card-image-wrapper">
          <img src="${thumb}" alt="Wallpaper ${wp.id}" loading="lazy" onerror="this.src='https://picsum.photos/seed/${wp.id}/800/500'">
          <div class="card-overlay">
            <div class="card-actions">
              <button class="card-action-btn primary" onclick="openModal('${wp.id}'); event.stopPropagation();">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download
              </button>
              <button class="card-action-btn secondary" onclick="openModal('${wp.id}'); event.stopPropagation();">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                Preview
              </button>
            </div>
          </div>
        </div>
        <div class="card-info">
          <div class="card-meta">
            <span class="card-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              ${views}
            </span>
            <span class="card-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              ${favorites}
            </span>
          </div>
          <span class="card-resolution">${resolution}</span>
        </div>
      </div>
    `;
  }).join('');

  dom.grid.innerHTML = cards;

  // Click handler for cards
  dom.grid.querySelectorAll('.wallpaper-card').forEach(card => {
    card.addEventListener('click', () => {
      openModal(card.dataset.id);
    });
  });
}

function updateResultsCount() {
  if (state.totalResults > 0) {
    dom.resultsCount.innerHTML = `Showing <strong>${state.wallpapers.length}</strong> of <strong>${formatNumber(state.totalResults)}</strong> wallpapers`;
  } else {
    dom.resultsCount.innerHTML = '';
  }
}

function renderPagination() {
  if (state.lastPage <= 1) {
    dom.pagination.innerHTML = '';
    return;
  }

  const current = state.currentPage;
  const last = state.lastPage;
  let buttons = [];

  buttons.push(`
    <button class="pagination-btn" ${current <= 1 ? 'disabled' : ''} onclick="goToPage(${current - 1})">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="15 18 9 12 15 6"/></svg>
      Prev
    </button>
  `);

  const pages = getPageNumbers(current, last);
  pages.forEach(p => {
    if (p === '...') {
      buttons.push(`<span class="pagination-info">…</span>`);
    } else {
      buttons.push(`
        <button class="pagination-btn ${p === current ? 'active' : ''}" onclick="goToPage(${p})">${p}</button>
      `);
    }
  });

  buttons.push(`
    <button class="pagination-btn" ${current >= last ? 'disabled' : ''} onclick="goToPage(${current + 1})">
      Next
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
  `);

  dom.pagination.innerHTML = buttons.join('');
}

function getPageNumbers(current, last) {
  const delta = 2;
  const pages = [];
  const range = [];

  for (let i = Math.max(2, current - delta); i <= Math.min(last - 1, current + delta); i++) {
    range.push(i);
  }

  if (range.length > 0) {
    if (range[0] > 2) pages.push(1, '...');
    else pages.push(1);

    pages.push(...range);

    if (range[range.length - 1] < last - 1) pages.push('...', last);
    else if (last > 1) pages.push(last);
  } else {
    pages.push(1);
    if (last > 1) pages.push(last);
  }

  return pages;
}

// ========== MODAL / LIGHTBOX ==========

async function openModal(id) {
  dom.modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Fast preview from existing card data
  const quick = state.wallpapers.find(w => w.id === id);
  if (quick) {
    dom.modalImage.src = quick.thumbs?.large || quick.path || '';
    dom.modalTitle.textContent = `Wallpaper #${quick.id}`;
    dom.modalResolution.textContent = quick.resolution || `${quick.dimension_x}x${quick.dimension_y}`;
    dom.modalCategory.textContent = (quick.category || 'General').toUpperCase();
    dom.modalFilesize.textContent = formatBytes(quick.file_size || 3500000);
    dom.modalStats.textContent = `${formatNumber(quick.views)} views · ${formatNumber(quick.favorites)} favorites`;
    
    if (quick.colors) {
      dom.modalColors.innerHTML = quick.colors.map(color => `
        <div class="modal-color-swatch" style="background: ${color}" data-color="${color}"></div>
      `).join('');
    }
    
    if (quick.tags) {
      dom.modalTags.innerHTML = quick.tags.map(tag => `
        <span class="modal-tag" data-tag="${tag.name}">#${tag.name}</span>
      `).join('');
    }

    state.selectedWallpaper = quick;
    buildSizeOptions(quick);
  }

  // Fetch full details
  const details = await fetchWallpaperDetails(id);
  if (details) {
    state.selectedWallpaper = details;
    dom.modalImage.src = details.path || details.thumbs?.large || '';
    buildSizeOptions(details);
  }
}

function closeModal() {
  dom.modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
  state.selectedWallpaper = null;
}

function buildSizeOptions(wallpaper) {
  const dimX = wallpaper.dimension_x || 3840;
  const dimY = wallpaper.dimension_y || 2160;

  const sizes = [
    {
      key: 'original',
      label: `Original (${dimX} × ${dimY})`,
      desc: `Full resolution · ${formatBytes(wallpaper.file_size || 4000000)}`,
      url: wallpaper.path,
    },
  ];

  const commonRes = [
    { w: 3840, h: 2160, label: '4K Ultra HD' },
    { w: 2560, h: 1440, label: 'QHD 1440p' },
    { w: 1920, h: 1080, label: 'Full HD 1080p' },
    { w: 1280, h: 720,  label: 'HD 720p' },
  ];

  commonRes.forEach(res => {
    if (res.w < dimX && res.h < dimY) {
      sizes.push({
        key: `${res.w}x${res.h}`,
        label: `${res.label} (${res.w} × ${res.h})`,
        desc: `Custom resize · ~${estimateSize(wallpaper.file_size || 4000000, dimX, dimY, res.w, res.h)}`,
        url: wallpaper.path,
        width: res.w,
        height: res.h,
      });
    }
  });

  if (dimY > dimX) {
    sizes.push(
      { key: '1080x1920', label: 'Mobile FHD (1080 × 1920)', desc: 'Optimized for Smartphones', url: wallpaper.path, width: 1080, height: 1920 },
      { key: '1440x2560', label: 'Mobile QHD (1440 × 2560)', desc: 'High-res Phone Wallpaper', url: wallpaper.path, width: 1440, height: 2560 }
    );
  }

  state.selectedDownloadSize = 'original';

  dom.sizeOptions.innerHTML = sizes.map((size, i) => `
    <div class="size-option ${i === 0 ? 'selected' : ''}" data-key="${size.key}" data-url="${size.url}" ${size.width ? `data-width="${size.width}" data-height="${size.height}"` : ''}>
      <div class="size-option-info">
        <span class="size-option-label">${size.label}</span>
        <span class="size-option-desc">${size.desc}</span>
      </div>
      <div class="size-option-check"></div>
    </div>
  `).join('');

  dom.sizeOptions.querySelectorAll('.size-option').forEach(option => {
    option.addEventListener('click', () => {
      dom.sizeOptions.querySelectorAll('.size-option').forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
      state.selectedDownloadSize = option.dataset.key;
    });
  });
}

function estimateSize(originalSize, origW, origH, newW, newH) {
  const ratio = (newW * newH) / (origW * origH);
  return formatBytes(Math.round(originalSize * ratio));
}

// ========== DOWNLOAD SYSTEM ==========

async function downloadWallpaper() {
  if (!state.selectedWallpaper) return;

  const selectedOption = dom.sizeOptions.querySelector('.size-option.selected');
  if (!selectedOption) return;

  const rawUrl = selectedOption.dataset.url;
  const targetWidth = selectedOption.dataset.width ? parseInt(selectedOption.dataset.width) : null;
  const targetHeight = selectedOption.dataset.height ? parseInt(selectedOption.dataset.height) : null;

  dom.downloadBtn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" style="animation: spin 1s linear infinite"><circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="12"/></svg>
    Preparing Download...
  `;
  dom.downloadBtn.disabled = true;

  try {
    // If targetWidth/targetHeight specified, perform client-side canvas resize
    if (targetWidth && targetHeight) {
      // Use local proxy if available to avoid canvas cross-origin taint
      const fetchUrl = `${PROXY_BASE}/proxy-image?url=${encodeURIComponent(rawUrl)}`;
      let imgBlob;
      try {
        const res = await fetch(fetchUrl);
        if (res.ok) imgBlob = await res.blob();
      } catch (e) {
        console.warn('Proxy image fetch failed, trying direct:', e);
      }

      if (!imgBlob) {
        const res = await fetch(rawUrl, { mode: 'cors' });
        imgBlob = await res.blob();
      }

      const resizedBlob = await resizeImage(imgBlob, targetWidth, targetHeight);
      triggerDownload(resizedBlob, `wallvault_${state.selectedWallpaper.id}_${targetWidth}x${targetHeight}.jpg`);
      showToast('Wallpaper resized and downloaded!');
    } else {
      // Original download
      const ext = state.selectedWallpaper.file_type?.split('/')[1] || 'jpg';
      const fetchUrl = `${PROXY_BASE}/proxy-image?url=${encodeURIComponent(rawUrl)}`;
      
      try {
        const res = await fetch(fetchUrl);
        if (res.ok) {
          const blob = await res.blob();
          triggerDownload(blob, `wallvault_${state.selectedWallpaper.id}_original.${ext}`);
          showToast('Original wallpaper downloaded!');
          return;
        }
      } catch (err) {
        console.warn('Proxy download failed, attempting direct download:', err);
      }

      // Direct fallback
      const link = document.createElement('a');
      link.href = rawUrl;
      link.target = '_blank';
      link.download = `wallvault_${state.selectedWallpaper.id}.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Download started in new tab');
    }
  } catch (error) {
    console.error('Download error:', error);
    window.open(rawUrl, '_blank');
    showToast('Direct download blocked by CORS. Opened full image in new tab.', 'error');
  } finally {
    dom.downloadBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      Download Selected Size
    `;
    dom.downloadBtn.disabled = false;
  }
}

function resizeImage(blob, width, height) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(resolve, 'image/jpeg', 0.92);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(blob);
  });
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ========== NAVIGATION & SEARCH ==========

function goToPage(page) {
  if (page < 1 || page > state.lastPage) return;
  state.currentPage = page;
  fetchWallpapers();
  window.scrollTo({ top: dom.grid.offsetTop - 100, behavior: 'smooth' });
}

function performSearch() {
  state.query = dom.searchInput.value.trim();
  state.currentPage = 1;
  state.seed = null;
  if (state.query) {
    dom.heroSection.style.display = 'none';
  } else {
    dom.heroSection.style.display = '';
  }
  fetchWallpapers();
}

// ========== EVENT LISTENERS ==========

dom.searchBtn.addEventListener('click', performSearch);
dom.searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') performSearch();
});

dom.categoryFilters.addEventListener('click', (e) => {
  const chip = e.target.closest('.filter-chip');
  if (!chip) return;

  dom.categoryFilters.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');

  state.categories = chip.dataset.cat;
  state.currentPage = 1;
  state.seed = null;
  fetchWallpapers();
});

dom.sortSelect.addEventListener('change', () => {
  state.sorting = dom.sortSelect.value;
  state.currentPage = 1;
  state.seed = null;

  dom.navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.sort === state.sorting);
  });

  fetchWallpapers();
});

dom.ratioSelect.addEventListener('change', () => {
  state.ratios = dom.ratioSelect.value;
  state.currentPage = 1;
  fetchWallpapers();
});

dom.resolutionSelect.addEventListener('change', () => {
  state.atleast = dom.resolutionSelect.value;
  state.currentPage = 1;
  fetchWallpapers();
});

dom.navLinks.forEach(link => {
  link.addEventListener('click', () => {
    dom.navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    state.sorting = link.dataset.sort;
    state.currentPage = 1;
    state.seed = null;
    dom.sortSelect.value = state.sorting;

    fetchWallpapers();
  });
});

dom.modalClose.addEventListener('click', closeModal);
dom.modalOverlay.addEventListener('click', (e) => {
  if (e.target === dom.modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

dom.downloadBtn.addEventListener('click', downloadWallpaper);

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  dom.navbar.classList.toggle('scrolled', scrollY > 60);
  dom.scrollTopBtn.classList.toggle('visible', scrollY > 500);
});

dom.scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('logo-link').addEventListener('click', (e) => {
  e.preventDefault();
  dom.searchInput.value = '';
  state.query = '';
  state.currentPage = 1;
  state.sorting = 'date_added';
  state.categories = '111';
  state.seed = null;
  dom.sortSelect.value = 'date_added';
  dom.heroSection.style.display = '';

  dom.navLinks.forEach(l => l.classList.remove('active'));
  document.getElementById('nav-latest').classList.add('active');
  dom.categoryFilters.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  document.getElementById('filter-all').classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
  fetchWallpapers();
});

dom.modalTags.addEventListener('click', (e) => {
  const tag = e.target.closest('.modal-tag');
  if (!tag) return;
  dom.searchInput.value = tag.dataset.tag;
  closeModal();
  performSearch();
});

// Animation helper
const styleSheet = document.createElement('style');
styleSheet.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
document.head.appendChild(styleSheet);

// Initial Load
fetchWallpapers();
