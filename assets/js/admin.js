// Admin Dashboard JavaScript
let adminProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]');
let salesData = JSON.parse(localStorage.getItem('salesData') || '[]');
let currentAdmin = null;

// Initialize admin users if none exist
let adminUsers = JSON.parse(localStorage.getItem('adminUsers') || '[]');
if (adminUsers.length === 0) {
  // Create default admin account
  adminUsers.push({
    id: 1,
    name: 'Administrateur',
    email: 'admin@mojomolado.com',
    password: 'admin123', // In production, this would be hashed
    createdAt: new Date().toISOString()
  });
  localStorage.setItem('adminUsers', JSON.stringify(adminUsers));
}

function showRegisterForm() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('register-screen').style.display = 'block';
}

function showLoginForm() {
  document.getElementById('register-screen').style.display = 'none';
  document.getElementById('login-screen').style.display = 'block';
}

function registerAdmin() {
  const name = document.getElementById('register-name').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm-password').value;

  if (!name || !email || !password) {
    showToast('Veuillez remplir tous les champs');
    return;
  }

  if (password !== confirmPassword) {
    showToast('Les mots de passe ne correspondent pas');
    return;
  }

  if (password.length < 6) {
    showToast('Le mot de passe doit contenir au moins 6 caractères');
    return;
  }

  // Check if email already exists
  const existingUser = adminUsers.find(user => user.email === email);
  if (existingUser) {
    showToast('Un compte avec cet email existe déjà');
    return;
  }

  // Create new admin user
  const newUser = {
    id: Date.now(),
    name,
    email,
    password, // In production, hash this password
    createdAt: new Date().toISOString()
  };

  adminUsers.push(newUser);
  localStorage.setItem('adminUsers', JSON.stringify(adminUsers));

  showToast('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
  showLoginForm();

  // Clear form
  document.getElementById('register-name').value = '';
  document.getElementById('register-email').value = '';
  document.getElementById('register-password').value = '';
  document.getElementById('register-confirm-password').value = '';
}

function loginAdmin() {
  const email = document.getElementById('admin-email').value.trim();
  const password = document.getElementById('admin-password').value;

  if (!email || !password) {
    showToast('Veuillez saisir votre email et mot de passe');
    return;
  }

  const user = adminUsers.find(user => user.email === email && user.password === password);

  if (user) {
    currentAdmin = user;
    localStorage.setItem('currentAdminSession', JSON.stringify({
      userId: user.id,
      loginTime: new Date().toISOString()
    }));

    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('register-screen').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'block';

    // Update header with admin name
    const headerTitle = document.querySelector('#admin-dashboard h1');
    if (headerTitle) {
      headerTitle.textContent = `Tableau de Bord - ${user.name}`;
    }

    loadProducts();
    updateStats();
    showToast(`Bienvenue, ${user.name} !`);
  } else {
    showToast('Email ou mot de passe incorrect');
  }
}

function logoutAdmin() {
  localStorage.removeItem('currentAdminSession');
  currentAdmin = null;
  document.getElementById('login-screen').style.display = 'block';
  document.getElementById('register-screen').style.display = 'none';
  document.getElementById('admin-dashboard').style.display = 'none';
  document.getElementById('admin-email').value = '';
  document.getElementById('admin-password').value = '';
}

function goToShop() {
  // Open shop in new tab so admin can easily switch back
  window.open('index.html', '_blank');
}

function loadProducts() {
  // Load products from data/products.json or fallback to embedded (same as main site)
  fetch('data/products.json')
    .then(res => res.ok ? res.json() : Promise.reject())
    .then(data => {
      adminProducts = data;
      renderProductsTable();
    })
    .catch(() => {
      // Fallback to embedded products (same as in app.js)
      adminProducts = [
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
      ];
      renderProductsTable();
    });
}

function renderProductsTable() {
  const tbody = document.getElementById('products-tbody');
  tbody.innerHTML = '';

  adminProducts.forEach(product => {
    const stockStatus = product.isOutOfStock ? '<span style="color: #dc3545; font-weight: bold;">RUPTURE</span>' :
                       product.isLowStock ? '<span style="color: #ffc107; font-weight: bold;">STOCK FAIBLE</span>' :
                       '<span style="color: #28a745;">EN STOCK</span>';

    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.png'" /></td>
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>${product.priceDisplay}</td>
      <td>${product.stock || 0} <br><small>${stockStatus}</small></td>
      <td>${product.rating || 0} ⭐</td>
      <td>
        <button class="action-btn edit-btn" onclick="editProduct(${product.id})">
          <i class="fas fa-edit"></i> Modifier
        </button>
        <button class="action-btn delete-btn" onclick="deleteProduct(${product.id})">
          <i class="fas fa-trash"></i> Supprimer
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function updateStats() {
  const totalProducts = adminProducts.length;
  const categories = [...new Set(adminProducts.map(p => p.category))].length;
  const totalValue = adminProducts.reduce((sum, p) => sum + p.price, 0);
  const lowStockCount = adminProducts.filter(p => p.isLowStock && !p.isOutOfStock).length;

  // Calculate today's sales
  const today = new Date().toISOString().split('T')[0];
  const todaySales = salesData
    .filter(sale => sale.date === today)
    .reduce((sum, sale) => sum + sale.total, 0);

  document.getElementById('total-products').textContent = totalProducts;
  document.getElementById('total-categories').textContent = categories;
  document.getElementById('total-value').textContent = totalValue.toLocaleString() + ' FCFA';
  document.getElementById('today-sales').textContent = todaySales.toLocaleString() + ' FCFA';
  document.getElementById('low-stock-count').textContent = lowStockCount;
}

function openAddProductModal() {
  document.getElementById('modal-title').textContent = 'Ajouter un produit';
  document.getElementById('product-id').value = '';
  document.getElementById('product-form').reset();
  document.getElementById('product-modal').style.display = 'flex';
}

function editProduct(id) {
  const product = adminProducts.find(p => p.id === id);
  if (!product) return;

  document.getElementById('modal-title').textContent = 'Modifier le produit';
  document.getElementById('product-id').value = product.id;
  document.getElementById('product-name').value = product.name;
  document.getElementById('product-category').value = product.category;
  document.getElementById('product-price').value = product.price;
  document.getElementById('product-stock').value = product.stock || 0;
  document.getElementById('product-rating').value = product.rating || '';
  document.getElementById('product-low-stock-alert').value = product.lowStockAlert || 5;
  document.getElementById('product-image').value = product.image;
  document.getElementById('product-description').value = product.description || '';

  document.getElementById('product-modal').style.display = 'flex';
}

function deleteProduct(id) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
    adminProducts = adminProducts.filter(p => p.id !== id);
    saveProducts();
    renderProductsTable();
    updateStats();
    showToast('Produit supprimé avec succès');
  }
}

function openSalesModal() {
  document.getElementById('sales-modal').style.display = 'flex';
  document.getElementById('sale-date').value = new Date().toISOString().split('T')[0];
  populateProductSelects();
  updateGrandTotal();
}

function closeSalesModal() {
  document.getElementById('sales-modal').style.display = 'none';
  document.getElementById('sales-form').reset();
  document.getElementById('sales-items').innerHTML = `
    <div class="sales-item">
      <div class="form-row">
        <div class="form-group">
          <label>Produit</label>
          <select class="sale-product" required>
            <option value="">Sélectionner un produit</option>
          </select>
        </div>
        <div class="form-group">
          <label>Quantité</label>
          <input type="number" class="sale-quantity" min="1" value="1" required />
        </div>
        <div class="form-group">
          <label>Prix total</label>
          <input type="text" class="sale-total" readonly />
        </div>
      </div>
      <button type="button" class="btn btn-danger btn-sm remove-item" onclick="removeSalesItem(this)">Supprimer</button>
    </div>
  `;
  populateProductSelects();
}

function populateProductSelects() {
  const selects = document.querySelectorAll('.sale-product');
  selects.forEach(select => {
    select.innerHTML = '<option value="">Sélectionner un produit</option>';
    adminProducts.forEach(product => {
      const option = document.createElement('option');
      option.value = product.id;
      option.textContent = `${product.name} - ${product.priceDisplay}`;
      option.dataset.price = product.price;
      select.appendChild(option);
    });
  });
}

function addSalesItem() {
  const salesItems = document.getElementById('sales-items');
  const newItem = document.createElement('div');
  newItem.className = 'sales-item';
  newItem.innerHTML = `
    <div class="form-row">
      <div class="form-group">
        <label>Produit</label>
        <select class="sale-product" required>
          <option value="">Sélectionner un produit</option>
        </select>
      </div>
      <div class="form-group">
        <label>Quantité</label>
        <input type="number" class="sale-quantity" min="1" value="1" required />
      </div>
      <div class="form-group">
        <label>Prix total</label>
        <input type="text" class="sale-total" readonly />
      </div>
    </div>
    <button type="button" class="btn btn-danger btn-sm remove-item" onclick="removeSalesItem(this)">Supprimer</button>
  `;
  salesItems.appendChild(newItem);
  populateProductSelects();
  updateGrandTotal();
}

function removeSalesItem(button) {
  button.closest('.sales-item').remove();
  updateGrandTotal();
}

function updateItemTotal(select, quantityInput, totalInput) {
  const selectedOption = select.options[select.selectedIndex];
  const price = selectedOption.dataset.price ? parseInt(selectedOption.dataset.price) : 0;
  const quantity = parseInt(quantityInput.value) || 0;
  const total = price * quantity;
  totalInput.value = total.toLocaleString() + ' FCFA';
  updateGrandTotal();
}

function updateGrandTotal() {
  let grandTotal = 0;
  const totalInputs = document.querySelectorAll('.sale-total');
  totalInputs.forEach(input => {
    const value = input.value.replace(/[^\d]/g, '');
    grandTotal += parseInt(value) || 0;
  });
  document.getElementById('grand-total').textContent = grandTotal.toLocaleString() + ' FCFA';
}

function closeProductModal() {
  document.getElementById('product-modal').style.display = 'none';
  document.getElementById('product-form').reset();
}

document.getElementById('product-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const id = parseInt(document.getElementById('product-id').value) || Date.now();
  const name = document.getElementById('product-name').value.trim();
  const category = document.getElementById('product-category').value;
  const price = parseInt(document.getElementById('product-price').value);
  const stock = parseInt(document.getElementById('product-stock').value);
  const rating = parseFloat(document.getElementById('product-rating').value) || 0;
  const lowStockAlert = parseInt(document.getElementById('product-low-stock-alert').value) || 5;
  const image = document.getElementById('product-image').value.trim();
  const description = document.getElementById('product-description').value.trim();

  if (!name || !category || !price || !image || stock === undefined || stock < 0) {
    showToast('Veuillez remplir tous les champs obligatoires');
    return;
  }

  const product = {
    id,
    name,
    category,
    price,
    priceDisplay: price.toLocaleString() + ' FCFA',
    image,
    description,
    rating,
    stock,
    lowStockAlert,
    isLowStock: stock <= lowStockAlert,
    isOutOfStock: stock === 0
  };

  const existingIndex = adminProducts.findIndex(p => p.id === id);
  if (existingIndex >= 0) {
    adminProducts[existingIndex] = product;
  } else {
    adminProducts.push(product);
  }

  saveProducts();
  renderProductsTable();
  updateStats();
  closeProductModal();
  showToast('Produit enregistré avec succès');
});

// Sales form event listeners
document.getElementById('sales-form').addEventListener('submit', function(e) {
  e.preventDefault();
  saveSale();
});

document.addEventListener('change', function(e) {
  if (e.target.classList.contains('sale-product') || e.target.classList.contains('sale-quantity')) {
    const item = e.target.closest('.sales-item');
    const select = item.querySelector('.sale-product');
    const quantityInput = item.querySelector('.sale-quantity');
    const totalInput = item.querySelector('.sale-total');
    updateItemTotal(select, quantityInput, totalInput);
  }
});

function saveSale() {
  const date = document.getElementById('sale-date').value;
  const items = [];
  let total = 0;

  const salesItems = document.querySelectorAll('.sales-item');
  salesItems.forEach(item => {
    const select = item.querySelector('.sale-product');
    const quantityInput = item.querySelector('.sale-quantity');
    const productId = parseInt(select.value);
    const quantity = parseInt(quantityInput.value);

    if (productId && quantity > 0) {
      const product = adminProducts.find(p => p.id === productId);
      if (product) {
        // Check stock availability
        if (quantity > product.stock) {
          showToast(`Stock insuffisant pour ${product.name}. Disponible: ${product.stock}`);
          return;
        }

        const itemTotal = product.price * quantity;
        total += itemTotal;
        items.push({
          productId,
          productName: product.name,
          quantity,
          unitPrice: product.price,
          total: itemTotal
        });

        // Update product stock
        product.stock -= quantity;
        product.isLowStock = product.stock <= product.lowStockAlert;
        product.isOutOfStock = product.stock === 0;
      }
    }
  });

  if (items.length === 0) {
    showToast('Veuillez ajouter au moins un produit à la vente');
    return;
  }

  const sale = {
    id: Date.now(),
    date,
    items,
    total,
    timestamp: new Date().toISOString()
  };

  salesData.push(sale);
  localStorage.setItem('salesData', JSON.stringify(salesData));

  // Save updated products
  localStorage.setItem('adminProducts', JSON.stringify(adminProducts));

  updateStats();
  closeSalesModal();
  renderProductsTable(); // Refresh table to show updated stock
  showToast(`Vente enregistrée: ${total.toLocaleString()} FCFA`);
}

function saveProducts() {
  localStorage.setItem('adminProducts', JSON.stringify(adminProducts));
  // In a real app, this would save to a server
}

function exportProducts() {
  const dataStr = JSON.stringify(adminProducts, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

  const exportFileDefaultName = 'products-export.json';

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

function showReviewModeration() {
  document.getElementById('review-moderation-modal').style.display = 'flex';
  loadReviewsForModeration();
}

function closeReviewModerationModal() {
  document.getElementById('review-moderation-modal').style.display = 'none';
}

function loadReviewsForModeration() {
  // Load reviews from main app's localStorage
  const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  const reviewsList = document.getElementById('reviews-list');
  reviewsList.innerHTML = '';

  if (allReviews.length === 0) {
    reviewsList.innerHTML = '<p style="text-align: center; color: #666;">Aucun avis à modérer</p>';
    return;
  }

  allReviews.forEach(review => {
    const product = adminProducts.find(p => p.id === review.productId);
    const productName = product ? product.name : 'Produit inconnu';

    const reviewElement = document.createElement('div');
    reviewElement.className = 'review-item';
    reviewElement.innerHTML = `
      <div class="review-header">
        <span class="review-author"><strong>${review.author}</strong> - ${productName}</span>
        <span class="review-date">${new Date(review.date).toLocaleDateString('fr-FR')}</span>
      </div>
      <div class="review-rating">
        ${generateStars(review.rating)}
        <span style="margin-left: 10px; color: ${review.approved ? 'green' : 'orange'};">${review.approved ? 'Approuvé' : 'En attente'}</span>
      </div>
      <div class="review-comment">${review.comment}</div>
      <div style="margin-top: 10px;">
        ${!review.approved ?
          `<button class="action-btn edit-btn" onclick="approveReview(${review.id})" style="margin-right: 5px;">
            <i class="fas fa-check"></i> Approuver
          </button>` : ''
        }
        <button class="action-btn delete-btn" onclick="deleteReview(${review.id})">
          <i class="fas fa-trash"></i> Supprimer
        </button>
      </div>
    `;
    reviewsList.appendChild(reviewElement);
  });
}

function approveReview(reviewId) {
  const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  const reviewIndex = allReviews.findIndex(r => r.id === reviewId);

  if (reviewIndex >= 0) {
    allReviews[reviewIndex].approved = true;
    localStorage.setItem('reviews', JSON.stringify(allReviews));
    loadReviewsForModeration();
    showToast('Avis approuvé avec succès');
  }
}

function deleteReview(reviewId) {
  const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  const filteredReviews = allReviews.filter(r => r.id !== reviewId);
  localStorage.setItem('reviews', JSON.stringify(filteredReviews));
  loadReviewsForModeration();
  showToast('Avis supprimé avec succès');
}

function showToast(message) {
  const note = document.createElement('div');
  note.className = 'notification';
  note.textContent = message;
  Object.assign(note.style, {
    position: 'fixed', left: '50%', bottom: '24px', transform: 'translateX(-50%)',
    background: 'var(--text-color)', color: 'var(--bg-color)', padding: '12px 18px', borderRadius: '999px', zIndex: 200,
  });
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 3000);
}

// Check if already logged in on page load
window.addEventListener('DOMContentLoaded', () => {
  const session = JSON.parse(localStorage.getItem('currentAdminSession') || 'null');
  if (session) {
    const user = adminUsers.find(u => u.id === session.userId);
    if (user) {
      currentAdmin = user;
      document.getElementById('login-screen').style.display = 'none';
      document.getElementById('register-screen').style.display = 'none';
      document.getElementById('admin-dashboard').style.display = 'block';

      // Update header with admin name
      const headerTitle = document.querySelector('#admin-dashboard h1');
      if (headerTitle) {
        headerTitle.textContent = `Tableau de Bord - ${user.name}`;
      }

      loadProducts();
      updateStats();
    }
  }
});

// Security: Prevent access from main site
if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
  // If someone tries to access admin from main site, redirect to admin login
  if (window.location.hash.includes('admin')) {
    window.location.href = 'admin.html';
  }
}