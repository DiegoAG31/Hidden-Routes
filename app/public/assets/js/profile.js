// profile.js
// Lógica para mostrar y actualizar el perfil del usuario logeado

const API_URL = 'http://localhost:3000/api/auth/profile';

document.addEventListener('DOMContentLoaded', () => {
  // Logout
  const logoutBtn = document.querySelector('.btnlogout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      alert('Sesión cerrada');
      window.location.href = './login.html';
    });
  }

  // Cargar datos del usuario logeado
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = './login.html';
    return;
  }
  fetch(API_URL, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.user_name) {
        document.getElementById('nameprofile').value = data.user_name;
      }
      if (data.email) {
        document.getElementById('email').value = data.email;
      }
      if (data.role_id) {
        const roleSelect = document.getElementById('role');
        if (roleSelect) {
          roleSelect.value = data.role_id == 1 ? 'user' : 'admin';
        }
      }
      // Actualizar nombre y foto en la sección superior (cuando tengas esos campos en la BD)
      const profileName = document.querySelector('.container-profile h2');
      if (profileName && data.user_name) profileName.textContent = data.user_name;
      // Foto y verificado: agregar cuando existan en la BD
      // document.querySelector('.container-profile img').src = data.profile_img || ...
      // document.getElementById('verificate').style.display = data.verified ? 'inline' : 'none';
    })
    .catch(() => {
      alert('No se pudo cargar el perfil');
      window.location.href = './login.html';
    });

  // Actualizar perfil
  const form = document.querySelector('.reservation-form');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const user_name = document.getElementById('nameprofile').value;
      const email = document.getElementById('email').value;
      const role = document.getElementById('role').value;
      // Convierte el rol a id (ajusta según tu lógica de roles)
      const role_id = role === 'user' ? 1 : 2;
      try {
        const res = await fetch(API_URL, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({ user_name, email, role_id })
        });
        const data = await res.json();
        if (res.ok) {
          alert('Perfil actualizado');
        } else {
          alert(data.message || 'Error al actualizar perfil');
        }
      } catch (err) {
        alert('No se pudo conectar al servidor');
      }
    });
  }
});
