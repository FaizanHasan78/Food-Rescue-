function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

function initMobileMenu() {
  const btn = $('.mobile-menu-btn');
  const nav = $('.nav-links');
  if (btn && nav) {
    btn.addEventListener('click', () => nav.classList.toggle('open'));
  }
}

function checkAuth() {
  return localStorage.getItem('currentUser') !== null;
}

function showUserState() {
  const authEls = $$('.auth-only');
  const guestEls = $$('.non-auth-only');
  const userEl = $('.user-name');

  const isLoggedIn = checkAuth();

  authEls.forEach(el => el.style.display = isLoggedIn ? 'inline-flex' : 'none');
  guestEls.forEach(el => el.style.display = isLoggedIn ? 'none' : 'inline-flex');

  if (isLoggedIn && userEl) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    userEl.textContent = user.fullName || 'User';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  showUserState();

  const logoutBtn = $('#logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('currentUser');
      location.reload();
    });
  }
});
