# Mojo Molado — Site e‑commerce statique (HTML/CSS/JS)

Boutique de mode africaine basée à Dakar. Site moderne, responsive, 100% client-side (pas de backend).

## ✨ Fonctionnalités
- Catalogue produits (grille responsive, badges « Nouveau » / « En vedette »)
- Filtres par catégories (Vêtements, Chaussures, Sacs, Parfums)
- Recherche instantanée + Tri (prix ↑/↓, nom A–Z / Z–A)
- Aperçu rapide (modal)
- Panier complet (ajout, suppression, quantités, total) — persistance localStorage
- Favoris (wishlist) — persistance localStorage
- Thème clair/sombre (variables CSS)
- UX: loader, back-to-top, transitions, newsletter (localStorage)

## 🗂️ Structure
```
mojomolado/
├── index.html
├── assets/
│   ├── css/
│   │   └── main.css
│   └── js/
│       └── app.js
├── data/
│   └── products.json
├── images/
└── README.md
```

## 🚀 Démarrage
1. Ouvrir `index.html` dans un navigateur moderne (Chrome, Edge, Firefox, Safari)
2. Optionnel: servir via un petit serveur local pour tester `fetch` (chargement JSON)
   - Exemple rapide (Python): `python -m http.server 8080`
   - Puis: `http://localhost:8080/`

## ⚙️ Tech et Design
- HTML5 sémantique
- CSS3: variables, Flexbox, Grid, media queries
- JavaScript ES6+: DOM, events, localStorage
- Google Fonts (Poppins), Font Awesome
- Palette: or / bordeaux / vert émeraude / beige

## 🔧 Données produits
- Par défaut, un tableau intégré est utilisé
- Si `data/products.json` est accessible (via serveur), il sera chargé automatiquement
- Format exemple (`data/products.json`):
```json
[
  {
    "id": 1,
    "name": "Robe en wax",
    "category": "Vêtements",
    "price": 15000,
    "priceDisplay": "15 000 FCFA",
    "image": "images/robeRouge.jpg",
    "description": "Robe en wax colorée, élégante et confortable.",
    "rating": 4.5,
    "isNew": true
  }
]
```

## 🧩 Personnalisation
- Couleurs / thèmes: éditer les variables CSS dans `assets/css/main.css`
- Produits: mettre à jour `data/products.json` ou le tableau intégré dans `assets/js/app.js`
- Icônes: Font Awesome, police Poppins (Google Fonts)

## 📱 Responsive
- 3 colonnes desktop, 2 tablettes, 1 mobile
- Touch-friendly: gros boutons, transitions douces

## ⚠️ Notes
- Paiement: démonstratif uniquement (pas d’intégration réelle)
- Données: aucune base de données; persistance simple via localStorage

## 📞 Contact
- Dakar, Sénégal — Mojo Molado
- WhatsApp: `+221 77 627 6363`
- Instagram / Facebook: `@modjomolado`
# Mojo-Molado
