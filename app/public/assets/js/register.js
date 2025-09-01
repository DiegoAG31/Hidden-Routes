// register.js
const API_URL = '/api/auth/register';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (!form) return;
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const user_name = document.getElementById('Name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role_id = document.getElementById('Role').value;
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_name, email, password, role_id })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Registro exitoso');
        window.location.href = './login.html';
      } else {
        alert(data.message || 'Error en registro');
      }
    } catch (err) {
      alert('No se pudo conectar al servidor');
    }
  });
});
