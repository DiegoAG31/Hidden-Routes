// Guardian: solo hosts pueden acceder
// Ocultar botón de login si el usuario está logeado
const token = localStorage.getItem('token');
const loginBtn = document.getElementById('btnlogin');
if (token && loginBtn) {
  loginBtn.style.display = 'none';
}
document.addEventListener('DOMContentLoaded', function() {
  if (!token) {
    window.location.href = './experience.html';
    return;
  }
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.roleName !== 'Host') {
      window.location.href = './experience.html';
    }
  } catch (e) {
    window.location.href = './experience.html';
  }
});
// experienceManager.js
// Lógica de gestión de experiencias para experienceManager.html

const API_URL = '/api/experiences';

function renderExperiences(experiences) {
  const container = document.getElementById('experienceList');
  container.innerHTML = '';
  experiences.forEach(exp => {
    const imgSrc = exp.experience_img ? exp.experience_img : '../assets/img/playacristal.webp';
    const destinationName = exp.destination && exp.destination.destination_name ? exp.destination.destination_name : 'Sin destino';
    container.innerHTML += `
      <div class="card" data-id="${exp.Experience_id || exp.id}">
        <img src="${imgSrc}" alt="experience-img" style="width:100%;max-height:180px;object-fit:cover;border-radius:8px;margin-bottom:10px;" />
        <h3>${exp.Experience_title || exp.name}</h3>
        <p><strong>Destination:</strong> ${destinationName}</p>
        <label>Name</label>
        <input type="text" value="${exp.Experience_title || exp.name}" class="input-name" />
        <label>Places</label>
        <input type="number" value="${exp.Capacity || exp.capacity}" class="input-capacity" />
        <label>Price per person</label>
        <input type="number" value="${exp.Price || exp.price}" class="input-price" />
        <label>Description</label>
        <textarea class="input-description">${exp.Experience_description || exp.description}</textarea>
        <div class="actions">
          <button class="btn-edit">Edit</button>
          <button class="btn-delete">Delete</button>
        </div>
      </div>
    `;
  });
}

async function fetchExperiences() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    renderExperiences(data);
      fetchCities();

  async function fetchCities() {
    try {
      const res = await fetch('/api/destinations/cities');
      const cities = await res.json();
      const select = document.getElementById('citySelect');
      if (select) {
        select.innerHTML = '<option value="">Select city</option>';
        cities.forEach(city => {
          // Si la API devuelve objetos, usa city.destination_id y city.destination_name
          if (typeof city === 'object') {
            select.innerHTML += `<option value="${city.destination_id}">${city.destination_name}</option>`;
          } else {
            // Si la API devuelve solo el nombre, usa el nombre como value
            select.innerHTML += `<option value="${city}">${city}</option>`;
          }
        });
      }
    } catch (err) {
      // Si hay error, deja el select con la opción por defecto
    }
  }
  } catch (err) {
    alert('Error al cargar experiencias');
  }
}

document.getElementById('createExperienceForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const Experience_title = document.getElementById('name').value;
  const Capacity = document.getElementById('capacity').value;
  const Price = document.getElementById('price').value;
  const Experience_description = document.getElementById('description').value;
    const destination_id = document.getElementById('citySelect').value;
    const experience_img = document.getElementById('experience_img').files[0];
  const formData = new FormData();
  formData.append('Experience_title', Experience_title);
  formData.append('Capacity', Capacity);
  formData.append('Price', Price);
  formData.append('Experience_description', Experience_description);
    formData.append('destination_id', destination_id);
  if (experience_img) {
    formData.append('experience_img', experience_img);
  }
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      body: formData
    });
    if (!res.ok) throw new Error('Error al crear experiencia');
    await fetchExperiences();
    this.reset();
  } catch (err) {
    alert('No se pudo crear la experiencia');
  }
});

document.getElementById('experienceList').addEventListener('click', async function(e) {
  const card = e.target.closest('.card');
  if (!card) return;
  const id = card.getAttribute('data-id');
  if (e.target.classList.contains('btn-edit')) {
    const Experience_title = card.querySelector('.input-name').value;
    const Price = card.querySelector('.input-price').value;
    const Capacity = card.querySelector('.input-capacity').value;
    const Experience_description = card.querySelector('.input-description').value;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          Experience_title,
          Price,
          Capacity,
          Experience_description
        })
      });
      if (!res.ok) throw new Error('Error al editar experiencia');
      await fetchExperiences();
    } catch (err) {
      alert('No se pudo editar la experiencia');
    }
  }
  if (e.target.classList.contains('btn-delete')) {
    if (!confirm('¿Seguro que deseas eliminar esta experiencia?')) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      if (!res.ok) throw new Error('Error al eliminar experiencia');
      await fetchExperiences();
    } catch (err) {
      alert('No se pudo eliminar la experiencia');
    }
  }
});

// Inicializar
fetchExperiences();
