// profile.js
// Lógica para mostrar y actualizar el perfil del usuario logeado

const API_URL = 'http://localhost:3000/api/auth/profile';

document.addEventListener('DOMContentLoaded', () => {
  // Mostrar reservas activas del usuario logeado
  async function renderActiveBookings(userId) {
    const token = localStorage.getItem('token');
    if (!token || !userId) return;
    try {
      // Obtener todas las reservas y filtrar por usuario y estado activo
      const bookingsRes = await fetch('http://localhost:3000/api/bookings', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      const bookings = await bookingsRes.json();
      const activeBookings = bookings.filter(b => b.User_id === userId && b.booking_status_id === 1);
      const bookingsList = document.getElementById('active-bookings-list');
      if (bookingsList) {
        if (activeBookings.length === 0) {
          bookingsList.innerHTML = '<p>No tienes reservas activas.</p>';
        } else {
          bookingsList.innerHTML = activeBookings.map(b => `
            <div class="card booking-card" data-booking-id="${b.Booking_id}" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <h3 style="text-align: center;">Reserva #${b.Booking_id}</h3>
              <label style="text-align: center;">Experiencia:</label> <span>${b.Experience_id}</span><br>
              <label style="text-align: center;">Cupos:</label> <span>${b.Places}</span><br>
              <label style="text-align: center;">Estado:</label> <span class="active-status">Activa</span><br>
              <button class="btn-cancel-booking btn-delete" data-id="${b.Booking_id}" style="margin: 10px auto; display: block;">Cancelar</button>
            </div>
          `).join('');
          // Agregar eventos a los botones de cancelar
          document.querySelectorAll('.btn-cancel-booking').forEach(btn => {
            btn.addEventListener('click', async function() {
              const bookingId = this.getAttribute('data-id');
              if (confirm('¿Seguro que deseas cancelar esta reserva?')) {
                try {
                  const token = localStorage.getItem('token');
                  const res = await fetch(`http://localhost:3000/api/bookings/${bookingId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': 'Bearer ' + token }
                  });
                  if (res.ok) {
                    alert('Reserva cancelada');
                    renderActiveBookings(userId);
                  } else {
                    alert('No se pudo cancelar la reserva');
                  }
                } catch (err) {
                  alert('Error al cancelar la reserva');
                }
              }
            });
          });
        }
      }
    } catch (err) {
      const bookingsList = document.getElementById('active-bookings-list');
      if (bookingsList) bookingsList.innerHTML = '<p>Error al cargar reservas.</p>';
    }
  }
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
  // Mostrar reservas activas después de cargar el perfil
  renderActiveBookings(data.user_id);
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
