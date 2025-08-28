// experienceManager.js
// Lógica de gestión de experiencias para experienceManager.html

const API_URL = 'http://localhost:3000/api/experiences';

function renderExperiences(experiences) {
  const container = document.getElementById('experienceList');
  container.innerHTML = '';
  experiences.forEach(exp => {
    container.innerHTML += `
      <div class="card" data-id="${exp.id}">
        <h3>${exp.Experience_title || exp.name}</h3>
        <label>Name</label>
        <input type="text" value="${exp.Experience_title || exp.name}" class="input-name" />
        <label>Price</label>
        <input type="number" value="${exp.Price || exp.price}" class="input-price" />
        <label>Quotas</label>
        <input type="number" value="${exp.Capacity || exp.capacity}" class="input-capacity" />
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
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer TU_TOKEN' // Si usas autenticación
      },
      body: JSON.stringify({
        Experience_title,
        Experience_description,
        Price,
        Capacity
      })
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
    const name = card.querySelector('.input-name').value;
    const price = card.querySelector('.input-price').value;
    const capacity = card.querySelector('.input-capacity').value;
    const description = card.querySelector('.input-description').value;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer TU_TOKEN' // Si usas autenticación
        },
        body: JSON.stringify({
          name,
          price,
          capacity,
          description
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
          // 'Authorization': 'Bearer TU_TOKEN' // Si usas autenticación
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
