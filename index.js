import  {menuArray} from 'data.js' 

const menuContainer = document.getElementById('menu');
const orderList = document.getElementById('order-items');
const totalPriceEl = document.getElementById('total-price');
const completeOrderButton = document.getElementById('complete-order');
const paymentModal = document.getElementById('payment-modal');
const closeModalButton = document.getElementById('close-modal');
const payNowButton = document.getElementById('pay-now');
const userNameInput = document.getElementById('user-name');
const themeToggle = document.getElementById('theme-toggle');

let orderItems = [];

function displayMenu() {
  menuArray.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.classList.add('menu-item');
    itemEl.setAttribute('role', 'listitem');
    itemEl.innerHTML = `
      <h3>${item.emoji} ${item.name}</h3>
      <p>${item.ingredients.join(', ')}</p>
      <p><strong>$${item.price}</strong></p>
      <button aria-label="Add ${item.name} to order" onclick="addToOrder(${item.id})">+</button>
    `;
    menuContainer.appendChild(itemEl);
  });
}

function addToOrder(itemId) {
  const item = menuArray.find(i => i.id === itemId);
  orderItems.push(item);
  updateOrderSummary();
}

function updateOrderSummary() {
  orderList.innerHTML = '';
  let total = 0;
  orderItems.forEach(item => {
    const li = document.createElement('li');
    li.innerText = `${item.name} - $${item.price}`;
    orderList.appendChild(li);
    total += item.price;
  });

  const discount = total * 0.15;
  const finalTotal = total - discount;
  totalPriceEl.innerText = `Total (Meal Deal 15% off): $${finalTotal.toFixed(2)}`;
}

completeOrderButton.addEventListener('click', () => {
  if (orderItems.length === 0) return alert('Add items first!');
  paymentModal.style.display = 'flex';
});

payNowButton.addEventListener('click', () => {
  const card = document.getElementById('card-number').value;
  const exp = document.getElementById('expiry-date').value;
  const cvv = document.getElementById('cvv').value;
  const payment = document.getElementById('payment-method').value;
  if (!card || !exp || !cvv || !userNameInput.value || !payment) {
    alert('Complete all payment details.');
    return;
  }

  alert(`Thanks ${userNameInput.value}! Your order is on its way!`);
  resetOrder();
  paymentModal.style.display = 'none';
});

function resetOrder() {
  orderItems = [];
  updateOrderSummary();
}

closeModalButton.addEventListener('click', () => {
  paymentModal.style.display = 'none';
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  document.body.classList.toggle('light-theme');
  themeToggle.innerText = document.body.classList.contains('dark-theme') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

displayMenu();
