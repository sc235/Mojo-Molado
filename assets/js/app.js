// Essai de chargement depuis data/products.json, fallback sur le tableau intégré
const embeddedProducts = [
  { "id": 1, "name": "Robe beige", "category": "Vêtements", "price": 15000, "priceDisplay": "15 000 FCFA", "image": "robes.images/robeBaige.jpg", "description": "Robe beige élégante en tissu africain.", "rating": 4.6 },
  { "id": 2, "name": "Robe blanc et vert", "category": "Vêtements", "price": 15000, "priceDisplay": "15 000 FCFA", "image": "robes.images/robeBlancVert.jpg", "description": "Robe blanche et verte au style raffiné.", "rating": 4.5 },
  { "id": 3, "name": "Robe bleu clair", "category": "Vêtements", "price": 15000, "priceDisplay": "15 000 FCFA", "image": "robes.images/robeBleuClair.jpg", "description": "Robe bleu clair, légère et confortable.", "rating": 4.5 },
  { "id": 4, "name": "Robe gris/bleu", "category": "Vêtements", "price": 15000, "priceDisplay": "15 000 FCFA", "image": "robes.images/robeGreyBlue1.jpg", "description": "Robe bicolore gris/bleu moderne.", "rating": 4.4 },
  { "id": 5, "name": "Robe jaune/rose", "category": "Vêtements", "price": 15000, "priceDisplay": "15 000 FCFA", "image": "robes.images/robeJauneRose.jpg", "description": "Robe lumineuse jaune et rose.", "rating": 4.5 },
  { "id": 6, "name": "Robe rose clair", "category": "Vêtements", "price": 15000, "priceDisplay": "15 000 FCFA", "image": "robes.images/robeRoseClair.jpg", "description": "Robe rose clair, douce et élégante.", "rating": 4.6 },
  { "id": 7, "name": "Robe rouge", "category": "Vêtements", "price": 15000, "priceDisplay": "15 000 FCFA", "image": "robes.images/robeRouge.jpg", "description": "Robe rouge classique et chic.", "rating": 4.7 },
  { "id": 8, "name": "Robe vert/violet", "category": "Vêtements", "price": 15000, "priceDisplay": "15 000 FCFA", "image": "robes.images/robeVertViolet.jpg", "description": "Robe vert et violet au motif unique.", "rating": 4.6 },

  { "id": 20, "name": "Sac vert", "category": "Sacs", "price": 22000, "priceDisplay": "22 000 FCFA", "image": "sac.images/greenBag.jpg", "description": "Sac à main vert tressé, robuste.", "rating": 4.6 },
  { "id": 21, "name": "Sac gris", "category": "Sacs", "price": 22000, "priceDisplay": "22 000 FCFA", "image": "sac.images/greyBag.jpg", "description": "Sac à main gris élégant.", "rating": 4.5 },
  { "id": 22, "name": "Sac LV", "category": "Sacs", "price": 35000, "priceDisplay": "35 000 FCFA", "image": "sac.images/luisVbag.jpg", "description": "Sac inspiré LV, style premium.", "rating": 4.7 },
  { "id": 23, "name": "Sac multicolor", "category": "Sacs", "price": 24000, "priceDisplay": "24 000 FCFA", "image": "sac.images/Multicolorbag1.jpg", "description": "Sac multicolore vibrant.", "rating": 4.5 },
  { "id": 24, "name": "Sac rose", "category": "Sacs", "price": 22000, "priceDisplay": "22 000 FCFA", "image": "sac.images/pinkBag.jpg", "description": "Sac à main rose, féminin.", "rating": 4.4 },
  { "id": 25, "name": "Sac violet", "category": "Sacs", "price": 22000, "priceDisplay": "22 000 FCFA", "image": "sac.images/purplebag.jpg", "description": "Sac violet sophistiqué.", "rating": 4.5 },
  { "id": 26, "name": "Sac à main beige", "category": "Sacs", "price": 22000, "priceDisplay": "22 000 FCFA", "image": "sac.images/sacAmainBaige.jpg", "description": "Sac à main beige, intemporel.", "rating": 4.6 },
  { "id": 27, "name": "Sac à main bleu clair", "category": "Sacs", "price": 22000, "priceDisplay": "22 000 FCFA", "image": "sac.images/sacAmainBleuClair.jpg", "description": "Sac à main bleu clair.", "rating": 4.5 },
  { "id": 28, "name": "Sac YSL", "category": "Sacs", "price": 38000, "priceDisplay": "38 000 FCFA", "image": "sac.images/yslBag.jpg", "description": "Sac style YSL élégant.", "rating": 4.7 },
  { "id": 29, "name": "Grand sac YSL", "category": "Sacs", "price": 42000, "priceDisplay": "42 000 FCFA", "image": "sac.images/YSLbigbag.jpg", "description": "Grand sac style YSL.", "rating": 4.7 },

  { "id": 40, "name": "Parfum Ameena", "category": "Parfums", "price": 9000, "priceDisplay": "9 000 FCFA", "image": "parfum.images/ameena.jpg", "description": "Parfum délicat et frais.", "rating": 4.4 },
  { "id": 41, "name": "Parfum Emaan", "category": "Parfums", "price": 9500, "priceDisplay": "9 500 FCFA", "image": "parfum.images/Emaan.jpg", "description": "Parfum aux notes florales.", "rating": 4.5 },
  { "id": 42, "name": "Gel Bushra", "category": "Parfums", "price": 8000, "priceDisplay": "8 000 FCFA", "image": "parfum.images/GelBushra.jpg", "description": "Gel parfumé, longue tenue.", "rating": 4.3 },
  { "id": 43, "name": "Mix 45", "category": "Parfums", "price": 9000, "priceDisplay": "9 000 FCFA", "image": "parfum.images/mix45parfum.jpg", "description": "Parfum mix intense.", "rating": 4.5 },
  { "id": 44, "name": "Victoria", "category": "Parfums", "price": 9500, "priceDisplay": "9 500 FCFA", "image": "parfum.images/victoria.jpg", "description": "Parfum Victoria classique.", "rating": 4.6 },
  { "id": 45, "name": "Victoria Brown", "category": "Parfums", "price": 9500, "priceDisplay": "9 500 FCFA", "image": "parfum.images/victoriaBrown.jpg", "description": "Parfum Victoria Brown.", "rating": 4.5 },
  { "id": 46, "name": "Victoria Green", "category": "Parfums", "price": 9500, "priceDisplay": "9 500 FCFA", "image": "parfum.images/victoriaGreen.jpg", "description": "Parfum Victoria Green.", "rating": 4.5 },
  { "id": 47, "name": "Victoria Purple", "category": "Parfums", "price": 9500, "priceDisplay": "9 500 FCFA", "image": "parfum.images/victoriaPurple.jpg", "description": "Parfum Victoria Purple.", "rating": 4.5 }
].filter(p => p.category !== 'Chaussures');

let products = embeddedProducts;
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

// Pagination state
let visibleCount = 9; // initial items to show
const PAGE_SIZE = 9;
let lastFocusedBeforeModal = null;

function saveCart() { localStorage.setItem('cart', JSON.stringify(cart)); }
function saveWishlist() { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  let stars = '';
  for (let i = 0; i < fullStars; i++) stars += '<i class="fas fa-star"></i>';
  if (halfStar) stars += '<i class="fas fa-star-half-alt"></i>';
  for (let i = fullStars + halfStar; i < 5; i++) stars += '<i class="far fa-star"></i>';
  return stars;
}

function setStatus(message) {
  const status = document.getElementById('status-message');
  if (!status) return;
  status.textContent = message || '';
}

function renderList(list) {
  const container = document.getElementById('product-list');
  const loader = document.getElementById('loader');
  const loadMoreBtn = document.getElementById('load-more');
  loader.style.display = 'grid';
  container.innerHTML = '';

  const toShow = list.slice(0, visibleCount);

  setTimeout(() => {
    toShow.forEach((p) => {
      const card = document.createElement('div');
      card.className = 'product-card';
      const badges = `
        ${p.isNew ? '<span class=\"badge-chip\">Nouveau</span>' : ''}
        ${p.isFeatured ? '<span class=\"badge-chip\">En vedette</span>' : ''}
      `;
      card.innerHTML = `
        <div class="image-container">
          <div class="image-placeholder"></div>
          <img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async" onload="this.classList.add('loaded'); this.previousElementSibling.style.display='none';" onerror="this.style.display='none'; this.previousElementSibling.innerHTML='<i class=\"fas fa-image\" style=\"font-size: 48px; color: #ccc;\"></i>';">
        </div>
        <div class="product-body">
          <div class="product-badges">${badges}</div>
          <h3>${p.name}</h3>
          <div class="product-price">${p.priceDisplay}</div>
          <div class="rating">${generateStars(p.rating || 0)}</div>
          <div class="product-actions">
            <button class="primary" onclick="addToCart(${p.id})"><i class="fas fa-shopping-cart" aria-hidden="true"></i> Ajouter</button>
            <button class="outline" onclick="openProductModal(${p.id})"><i class="fas fa-eye" aria-hidden="true"></i> Aperçu</button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    loadMoreBtn.style.display = list.length > toShow.length ? 'inline-block' : 'none';
    loader.style.display = 'none';

    if (list.length === 0) setStatus('Aucun produit trouvé.'); else setStatus('');
  }, 200);
}

function baseFiltered() {
  return products.filter(p => p.category !== 'Chaussures');
}

function parseHash() {
  const hash = new URLSearchParams((location.hash || '').replace(/^#/, ''));
  return {
    category: hash.get('cat') || 'Tous',
    q: hash.get('q') || '',
    sort: hash.get('sort') || 'default',
  };
}

function writeHash({ category, q, sort }) {
  const params = new URLSearchParams();
  if (category && category !== 'Tous') params.set('cat', category);
  if (q) params.set('q', q);
  if (sort && sort !== 'default') params.set('sort', sort);
  const newHash = params.toString();
  if ((location.hash || '').replace(/^#/, '') !== newHash) {
    location.hash = newHash;
  }
}

function applyFiltersFromState(state) {
  // category
  document.getElementById('section-title').textContent = state.category === 'Tous' ? 'Tous nos articles' : `Articles : ${state.category}`;
  const qInput = document.getElementById('search-input');
  if (qInput && qInput.value !== state.q) qInput.value = state.q;
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect && sortSelect.value !== state.sort) sortSelect.value = state.sort;

  let list = baseFiltered();
  if (state.category !== 'Tous') list = list.filter(p => p.category === state.category);
  if (state.q) list = list.filter(p => p.name.toLowerCase().includes(state.q.toLowerCase()));

  // sort
  if (state.sort === 'price-asc') list.sort((a,b) => a.price - b.price);
  if (state.sort === 'price-desc') list.sort((a,b) => b.price - a.price);
  if (state.sort === 'name-asc') list.sort((a,b) => a.name.localeCompare(b.name));
  if (state.sort === 'name-desc') list.sort((a,b) => b.name.localeCompare(a.name));

  renderList(list);
}

function filterCategory(category) {
  visibleCount = PAGE_SIZE;
  const state = parseHash();
  state.category = category;
  writeHash(state);
  applyFiltersFromState(state);
}

function searchProducts() {
  visibleCount = PAGE_SIZE;
  const state = parseHash();
  state.q = document.getElementById('search-input').value;
  writeHash(state);
  applyFiltersFromState(state);
}

function sortProducts(listIgnored) {
  visibleCount = PAGE_SIZE;
  const state = parseHash();
  state.sort = document.getElementById('sort-select').value;
  writeHash(state);
  applyFiltersFromState(state);
}

function loadMore() {
  visibleCount += PAGE_SIZE;
  applyFiltersFromState(parseHash());
}

function openProductModal(id) {
  const p = products.find((x) => x.id === id);
  if (!p || p.category === 'Chaussures') return;
  document.getElementById('modal-image').src = p.image;
  document.getElementById('modal-image').setAttribute('loading','lazy');
  document.getElementById('modal-image').setAttribute('decoding','async');
  const nameEl = document.getElementById('modal-name');
  nameEl.textContent = p.name;
  document.getElementById('modal-price').textContent = p.priceDisplay;
  document.getElementById('modal-description').textContent = p.description || '';
  document.getElementById('modal-rating').innerHTML = generateStars(p.rating || 0);
  const modal = document.getElementById('product-modal');
  modal.style.display = 'flex';
  modal.dataset.productId = String(id);

  // focus management
  lastFocusedBeforeModal = document.activeElement;
  setTimeout(() => nameEl.focus(), 0);
}
function closeModal() {
  document.getElementById('product-modal').style.display = 'none';
  if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === 'function') {
    lastFocusedBeforeModal.focus();
  }
}

function addToCartFromModal() {
  const id = parseInt(document.getElementById('product-modal').dataset.productId, 10);
  addToCart(id);
  closeModal();
}
function addToWishlistFromModal() {
  const id = parseInt(document.getElementById('product-modal').dataset.productId, 10);
  addToWishlist(id);
  closeModal();
}

function addToCart(id) {
  const p = products.find((x) => x.id === id);
  if (!p || p.category === 'Chaussures') return;
  const item = cart.find((x) => x.id === id);
  if (item) item.quantity = Math.min(item.quantity + 1, 99); else cart.push({ ...p, quantity: 1 });
  saveCart();
  updateCart();
  showToast(`${p.name} ajouté au panier`);
}
function removeFromCart(id) { cart = cart.filter((x) => x.id !== id); saveCart(); updateCart(); }
function updateCartItemQuantity(id, qty) { if (qty < 1) return removeFromCart(id); const it = cart.find(x => x.id === id); if (it) { it.quantity = Math.min(qty, 99); saveCart(); updateCart(); } }

function toggleCart() {
  const m = document.getElementById('cart-modal');
  m.style.display = m.style.display === 'flex' ? 'none' : 'flex';
  updateCart();
}
function closeCart() { document.getElementById('cart-modal').style.display = 'none'; }

function updateCart() {
  const items = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  const countEl = document.getElementById('cart-count');
  items.innerHTML = '';
  let total = 0; let count = 0;
  cart.forEach((it) => {
    total += it.price * it.quantity; count += it.quantity;
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <div style="flex: 1;">
        <div style="font-weight: 600;">${it.name}</div>
        <div style="font-size: 14px; color: #666;">${it.priceDisplay} chacun</div>
      </div>
      <div class="cart-item-controls">
        <button onclick="updateCartItemQuantity(${it.id}, ${it.quantity - 1})" aria-label="Diminuer quantité">-</button>
        <span>${it.quantity}</span>
        <button onclick="updateCartItemQuantity(${it.id}, ${it.quantity + 1})" aria-label="Augmenter quantité">+</button>
      </div>
      <div style="text-align: right;">
        <div style="font-weight: 600;">${(it.price * it.quantity).toLocaleString()} FCFA</div>
        <button onclick="removeFromCart(${it.id})" style="background: #ff4444; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px; margin-top: 4px;">Supprimer</button>
      </div>
    `;
    items.appendChild(row);
  });
  totalEl.textContent = `${total.toLocaleString()} FCFA`;
  countEl.textContent = String(count);
}

function checkout() {
  if (!cart.length) return showToast('Votre panier est vide');
  
  // Créer le message WhatsApp avec les articles du panier
  let message = "Bonjour ! Je souhaite commander les articles suivants :\n\n";
  let total = 0;
  
  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name} - ${item.priceDisplay} x${item.quantity}\n`;
    total += item.price * item.quantity;
  });
  
  message += `\nTotal : ${total.toLocaleString()} FCFA\n\n`;
  message += "Merci !";
  
  // Encoder le message pour l'URL
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/221710433624?text=${encodedMessage}`;
  
  // Ouvrir WhatsApp
  window.open(whatsappUrl, '_blank');
  
  // Vider le panier après envoi
  cart = [];
  saveCart();
  updateCart();
  closeCart();
}

function addToWishlist(id) {
  const p = products.find((x) => x.id === id);
  if (!p) return;
  if (!wishlist.find((x) => x.id === id)) wishlist.push(p);
  saveWishlist(); updateWishlist();
}
function removeFromWishlist(id) { wishlist = wishlist.filter((x) => x.id !== id); saveWishlist(); updateWishlist(); }
function toggleWishlist() {
  const m = document.getElementById('wishlist-modal');
  m.style.display = m.style.display === 'flex' ? 'none' : 'flex';
  updateWishlist();
}
function closeWishlist() { document.getElementById('wishlist-modal').style.display = 'none'; }
function updateWishlist() {
  const box = document.getElementById('wishlist-items');
  const countEl = document.getElementById('wishlist-count');
  box.innerHTML = '';
  wishlist.forEach((it) => {
    const row = document.createElement('div');
    row.className = 'wishlist-item';
    row.innerHTML = `
      <span>${it.name}</span>
      <span>${it.priceDisplay}</span>
      <button onclick="removeFromWishlist(${it.id})">Supprimer</button>
    `;
    box.appendChild(row);
  });
  countEl.textContent = String(wishlist.length);
}

function subscribeNewsletter() {
  const email = document.getElementById('newsletter-email').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && emailRegex.test(email)) {
    // TODO: Replace with actual server-side integration
    // Example: fetch('/api/newsletter/subscribe', { method: 'POST', body: JSON.stringify({ email }) })
    const subs = JSON.parse(localStorage.getItem('newsletterSubscriptions') || '[]');
    if (!subs.includes(email)) {
      subs.push(email);
      localStorage.setItem('newsletterSubscriptions', JSON.stringify(subs));
      // Simulate server response
      setTimeout(() => {
        document.getElementById('newsletter-modal').style.display = 'flex';
        document.getElementById('newsletter-email').value = '';
      }, 500);
    } else {
      showToast('Vous êtes déjà inscrit à la newsletter');
    }
  } else {
    showToast('Veuillez entrer une adresse email valide');
  }
}
function closeNewsletterModal() { document.getElementById('newsletter-modal').style.display = 'none'; }

function applyThemePreference(initial = false) {
  const saved = localStorage.getItem('theme');
  let theme = saved;
  if (!theme) {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = prefersDark ? 'dark' : 'light';
  }
  document.body.setAttribute('data-theme', theme);
  const icon = document.querySelector('.theme-toggle i');
  if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  if (!initial) localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const current = document.body.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  document.body.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  const icon = document.querySelector('.theme-toggle i');
  if (icon) icon.className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
window.addEventListener('scroll', () => {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  if (window.scrollY > 300) btn.classList.add('visible'); else btn.classList.remove('visible');
});

function showToast(message) {
  const note = document.createElement('div');
  note.className = 'notification';
  note.textContent = message;
  Object.assign(note.style, {
    position: 'fixed', left: '50%', bottom: '24px', transform: 'translateX(-50%)',
    background: 'var(--text-color)', color: 'var(--bg-color)', padding: '12px 18px', borderRadius: '999px', zIndex: 200,
  });
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 1800);
}

function closeModalToHome() {
  closeModal();
  navigateTo('shop');
}


function navigateTo(sectionId) {
  if (sectionId && document.getElementById(sectionId)) {
    const el = document.getElementById(sectionId);
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    try { location.hash = sectionId; } catch (_) {}
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

window.addEventListener('hashchange', () => {
  visibleCount = PAGE_SIZE; // reset pagination on navigation
  applyFiltersFromState(parseHash());
});

window.addEventListener('DOMContentLoaded', async () => {
  // Theme
  applyThemePreference(true);

  const pageLoader = document.getElementById('page-loader');
  setTimeout(() => { pageLoader.style.display = 'none'; }, 300);

  try {
    const res = await fetch('data/products.json', { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json) && json.length) products = json.filter(p => p.category !== 'Chaussures');
    } else {
      setStatus('Impossible de charger les produits (mode démo affiché).');
    }
  } catch (e) {
    setStatus('Hors ligne ou chargement indisponible (mode démo affiché).');
  }

  // initial state
  visibleCount = PAGE_SIZE;
  const state = parseHash();
  // initialize inputs from state
  const qInput = document.getElementById('search-input');
  if (qInput && qInput.value !== state.q) qInput.value = state.q;
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect && sortSelect.value !== state.sort) sortSelect.value = state.sort;

  applyFiltersFromState(state);
});
