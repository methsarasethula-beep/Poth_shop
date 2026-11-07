// ආරම්භක පොත් දත්ත (Sample Books Data)
let books = [
  {
    id: 1,
    title: "මඩොල් දූව (Madol Doova)",
    author: "මාර්ටින් වික්‍රමසිංහ",
    category: "sinhala",
    price: 650,
    condition: "Used: Like New",
    location: "කොළඹ"
  },
  {
    id: 2,
    title: "A/L Combined Maths Past Papers",
    author: "Resource Guide",
    category: "academic",
    price: 1200,
    condition: "Used: Good",
    location: "මහනුවර"
  },
  {
    id: 3,
    title: "ගම්පෙරළිය (Gamperaliya)",
    author: "මාර්ටින් වික්‍රමසිංහ",
    category: "sinhala",
    price: 850,
    condition: "Brand New",
    location: "ගාල්ල"
  },
  {
    id: 4,
    title: "Atomic Habits (English)",
    author: "James Clear",
    category: "fiction",
    price: 1800,
    condition: "Used: Excellent",
    location: "නුගේගොඩ"
  }
];

let cart = [];

// පොත් ලැයිස්තුව වෙබ් පිටුවේ පෙන්වීම
function renderBooks(bookList) {
  const container = document.getElementById("bookGrid");
  container.innerHTML = "";

  bookList.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <div class="card-header">
        <span class="cond-badge">${book.condition}</span>
        <span style="font-size:0.8rem; color:#a39c94;"><i class="fa-solid fa-location-dot"></i> ${book.location}</span>
      </div>
      <h3 style="font-size:1.15rem; margin-bottom:0.2rem;">${book.title}</h3>
      <p style="font-size:0.85rem; color:#a39c94;">${book.author}</p>
      <div class="price">රු. ${book.price.toLocaleString()}</div>
      <div class="card-actions">
        <button class="btn btn-primary" style="flex:1;" onclick="addToCart(${book.id})">
          <i class="fa-solid fa-cart-plus"></i> මිලදී ගන්න
        </button>
        <button class="btn btn-outline" onclick="contactSeller('${book.title}')">
          <i class="fa-brands fa-whatsapp"></i> WhatsApp
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// කාණ්ඩ අනුව Filter කිරීම
function filterCategory(cat) {
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
  event.target.classList.add("active");

  if (cat === "all") {
    renderBooks(books);
  } else {
    const filtered = books.filter(b => b.category === cat);
    renderBooks(filtered);
  }
}

// පොතක් පළකිරීමේ Modal එක පාලනය
function openSellModal() {
  document.getElementById("sellModal").style.display = "flex";
}
function closeSellModal() {
  document.getElementById("sellModal").style.display = "none";
}

// නව පොතක් එකතු කිරීම
function handleBookSubmit(e) {
  e.preventDefault();
  const newBook = {
    id: books.length + 1,
    title: document.getElementById("newBookTitle").value,
    author: document.getElementById("newBookAuthor").value,
    category: "sinhala",
    price: parseInt(document.getElementById("newBookPrice").value),
    condition: document.getElementById("newBookCondition").value,
    location: "දිවයින පුරා"
  };

  books.unshift(newBook); // මුලට එක් කිරීම
  renderBooks(books);
  closeSellModal();
  alert("ඔබේ පොත සාර්ථකව විකිණීමට පළකරන ලදී!");
  document.getElementById("sellBookForm").reset();
}

// Cart එකට එක් කිරීම
function addToCart(bookId) {
  cart.push(bookId);
  document.getElementById("cartCount").innerText = cart.length;
  alert("පොත Cart එකට එක් කරන ලදී!");
}

// WhatsApp විමසීම
function contactSeller(title) {
  const msg = encodeURIComponent(`හෙලෝ, මම PothKade හි පළ කර ඇති '${title}' පොත මිලදී ගැනීමට කැමතියි.`);
  window.open(`https://wa.me/94771234567?text=${msg}`, '_blank');
}

// පිටුව Load වන විට ආරම්භ කිරීම
window.onload = () => {
  renderBooks(books);
};