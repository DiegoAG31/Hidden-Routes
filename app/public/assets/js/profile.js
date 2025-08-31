// profile.js
// Lógica para mostrar y actualizar el perfil del usuario logeado

const API_URL = 'http://localhost:3000/api/auth/profile';

document.addEventListener('DOMContentLoaded', () => {
  // Ocultar botón de login si el usuario está logeado
  const token = localStorage.getItem('token');
  const loginBtn = document.getElementById('btnlogin');
  if (token && loginBtn) {
    loginBtn.style.display = 'none';
  }
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
      // Rellenar campos del formulario
      if (data.user_name) {
        document.getElementById('nameprofile').value = data.user_name;
      }
      if (data.email) {
        document.getElementById('email').value = data.email;
      }
      if (data.role_id) {
        const roleSelect = document.getElementById('role');
        if (roleSelect) {
          roleSelect.value = data.role_id == 1 ? 'Host' : 'Tourist';
        }
      }
      // Renderizar perfil dinámicamente
      const profileSection = document.getElementById('dynamic-profile');
      if (profileSection) {
        let imgSrc = '../assets/img/usuario3.webp';
        if (data.user_img) {
          imgSrc = '../assets/img/' + data.user_img;
        }
        profileSection.innerHTML = `
          <img src="${imgSrc}" alt="profile photo" id="profile-photo-dyn">
          <h2>${data.user_name || ''}</h2>
          <img src="../assets/img/verificate.png" alt="verificate" id="verificate" style="display:${data.verification_id == 1 ? 'inline' : 'none'}">
        `;
      }
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
      const role_id = role === 'Host' ? 1 : 2;
      const photoInput = document.getElementById('profilePhoto');
      let verification_id = null;
      // Usar FormData para enviar imagen y datos
      const formData = new FormData();
      formData.append('user_name', user_name);
      formData.append('email', email);
      formData.append('role_id', role_id);
      if (photoInput && photoInput.files.length > 0) {
  formData.append('user_img', photoInput.files[0]);
      }
      if (verification_id !== null) {
        formData.append('verification_id', verification_id);
      }
      try {
        const res = await fetch(API_URL, {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + token
          },
          body: formData
        });
        const data = await res.json();
        if (res.ok) {
          alert('Perfil actualizado');
          // Volver a cargar y renderizar el perfil dinámico
          fetch(API_URL, {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
            .then(res => res.json())
            .then(data => {
              const profileSection = document.getElementById('dynamic-profile');
              if (profileSection) {
                let imgSrc = '../assets/img/usuario3.webp';
                if (data.user_img) {
                  imgSrc = '../assets/img/' + data.user_img + '?t=' + new Date().getTime();
                }
                profileSection.innerHTML = `
                  <img src="${imgSrc}" alt="profile photo" id="profile-photo-dyn">
                  <h2>${data.user_name || ''}</h2>
                  <img src="../assets/img/verificate.png" alt="verificate" id="verificate" style="display:${data.verification_id == 1 ? 'inline' : 'none'}">
                `;
              }
            });
        } else {
          alert(data.message || 'Error al actualizar perfil');
        }
      } catch (err) {
        alert('No se pudo conectar al servidor');
      }
    });
  }
});
