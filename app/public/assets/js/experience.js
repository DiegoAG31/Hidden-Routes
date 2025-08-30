// experience.js - Renderizar experiencias dinámicamente desde la base de datos


const API_URL = 'http://localhost:3000/api/experiences';
let allExperiences = [];

function renderExperiences(experiences) {
  const container = document.getElementById('experiencesContainer');
  if (!container) return;
  container.innerHTML = '';
  experiences.forEach(exp => {
    const imgSrc = exp.experience_img ? exp.experience_img : '../assets/img/playacristal.webp';
    const destinationName = exp.destination && exp.destination.destination_name ? exp.destination.destination_name : 'Sin destino';
    container.innerHTML += `
      <div class="grid-exp-card">
        <img src="${imgSrc}" alt="experience-img" />
        <h2>${exp.Experience_title || exp.name}</h2>
        <p>
          <strong>Destination:</strong> ${destinationName}<br><br>
          ${exp.Experience_description || exp.description}<br><br>
          <strong>Places:</strong> ${exp.Capacity || exp.capacity}<br><br>
          <strong>Price per person:</strong> $${exp.Price || exp.price}<br><br>
        </p>
        <a href="./booking.html"><button type="button" id="btn-exp-card">Reserve</button></a>
      </div>
    `;
  });
}

function updateSliderLabels() {
  const placesRange = document.getElementById('quotasrange');
  const priceRange = document.getElementById('pricerange');
  const valuePlaces = document.getElementById('valuequota');
  const valuePrice = document.getElementById('valueprice');
  if (placesRange && valuePlaces) valuePlaces.textContent = `${placesRange.value}`;
  if (priceRange && valuePrice) valuePrice.textContent = `$${priceRange.value}`;
}

function applyFilters() {
  const placesRange = document.getElementById('quotasrange');
  const priceRange = document.getElementById('pricerange');
  const citySelect = document.getElementById('citySelect');
  let filtered = allExperiences;
  if (citySelect && citySelect.value) {
    filtered = filtered.filter(exp => {
      // Asume que la experiencia tiene una propiedad city_name
      return String(exp.destination_id) === String(citySelect.value);
    });
  }
  if (placesRange) {
    const placesValue = parseInt(placesRange.value, 10);
    filtered = filtered.filter(exp => {
      const cap = parseInt(exp.Capacity || exp.capacity || 0, 10);
      return cap >= placesValue;
    });
  }
  if (priceRange) {
    const priceValue = parseFloat(priceRange.value);
    filtered = filtered.filter(exp => {
      const price = parseFloat(exp.Price || exp.price || 0);
      return price <= priceValue;
    });
  }
  renderExperiences(filtered);
}

async function fetchExperiences() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    allExperiences = data;
    renderExperiences(data);
    updateSliderLabels();
  } catch (err) {
    const container = document.getElementById('experiencesContainer');
    if (container) container.innerHTML = '<p>No experiences found.</p>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Ocultar botón Manage si el usuario no es host
  const manageNav = document.getElementById('manageNav');
  if (manageNav) {
    const token = localStorage.getItem('token');
    if (!token) {
      manageNav.style.display = 'none';
    } else {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.roleName !== 'Host') {
          manageNav.style.display = 'none';
        }
      } catch (e) {
        manageNav.style.display = 'none';
      }
    }
  }
  fetchExperiences();
  fetchCities().then(() => {
    // Leer el parámetro destination_id de la URL
    const params = new URLSearchParams(window.location.search);
    const destId = params.get('destination_id');
    const select = document.getElementById('citySelect');
    if (destId && select) {
      select.value = destId;
      // Solo filtrar por ciudad al cargar desde dashboard
      const filtered = allExperiences.filter(exp => String(exp.destination_id) === String(destId));
      renderExperiences(filtered);
    }
  });
  const placesRange = document.getElementById('quotasrange');
  const priceRange = document.getElementById('pricerange');
  if (placesRange) placesRange.addEventListener('input', updateSliderLabels);
  if (priceRange) priceRange.addEventListener('input', updateSliderLabels);
  const filterBtn = document.querySelector('.btn-filter button');
  if (filterBtn) filterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    applyFilters();
  });

  // Funcionalidad para el botón de logout en experience.html
  const logoutBtn = document.querySelector('.btnlogout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      alert('Sesión cerrada');
      window.location.href = './login.html';
    });
  }
});

async function fetchCities() {
  try {
    const res = await fetch('http://localhost:3000/api/destinations/cities');
    const cities = await res.json();
    const select = document.getElementById('citySelect');
    if (select) {
      select.innerHTML = '<option value="">All cities</option>';
      cities.forEach(city => {
        select.innerHTML += `<option value="${city.destination_id}">${city.destination_name}</option>`;
      });
    }
  } catch (err) {
    // Si hay error, deja el select con la opción por defecto
  }
  // Permitir encadenar con .then()
  return Promise.resolve();
}
