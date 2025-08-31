// dashboard.js
// Funcionalidad para el botón de logout

document.addEventListener('DOMContentLoaded', () => {
  // Ocultar botón de login si el usuario está logeado
  const token = localStorage.getItem('token');
  const loginBtn = document.getElementById('btnlogin');
  if (token && loginBtn) {
    loginBtn.style.display = 'none';
  }
  const logoutBtn = document.querySelector('.btnlogout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      alert('Sesión cerrada');
      window.location.href = './views/login.html';
    });
  }
});
