// login.js
const API_URL = '/api/auth/login';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (!form) return;
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
  body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Login exitoso');
        localStorage.setItem('token', data.token);
        window.location.href = '../dashboard.html';
      } else {
        alert(data.message || 'Error en login');
      }
    } catch (err) {
      alert('No se pudo conectar al servidor');
    }
  });
});
