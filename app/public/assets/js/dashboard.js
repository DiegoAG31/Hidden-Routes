// dashboard.js
// Funcionalidad para el botón de logout

document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.querySelector('.btnlogout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      alert('Sesión cerrada');
      window.location.href = './views/login.html';
    });
  }
});
