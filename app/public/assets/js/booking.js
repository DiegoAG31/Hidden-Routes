// Poblar el select de experiencias desde la base de datos
async function cargarExperiencias() {
	const select = document.getElementById('experience');
	if (!select) return;
	try {
		const res = await fetch('http://localhost:3000/api/experiences');
		const data = await res.json();
		// Limpiar opciones excepto la primera
		select.innerHTML = '<option value="">-- Select --</option>';
		data.forEach(exp => {
			select.innerHTML += `<option value="${exp.experience_id || exp.Experience_id || exp.id}">${exp.experience_title || exp.Experience_title || exp.name}</option>`;
		});
	} catch (err) {
		select.innerHTML = '<option value="">No experiences found</option>';
	}
}

// booking.js - Conexión frontend con backend para reservas
const API_URL = 'http://localhost:3000/api/bookings';

document.addEventListener('DOMContentLoaded', () => {
	cargarExperiencias();
	const form = document.querySelector('.reservation-form');
	if (!form) return;

	form.addEventListener('submit', async function (e) {
		e.preventDefault();

		// Valores fijos temporales
		const user_id = 1; // Cambiar cuando tengas autenticación

		// Obtener datos del formulario
		const experienceSelect = document.getElementById('experience');
		const experience_id = parseInt(experienceSelect.value);
		const places = parseInt(document.getElementById('quota').value);

		if (!experience_id || !places) {
			alert('Por favor completa todos los campos.');
			return;
		}

		console.log('Datos a enviar:', { user_id, experience_id, places });

		try {
			const requestData = {
				user_id,
				experience_id,
				places,
				booking_status_name: 'pending'
			};
			
			console.log('Enviando petición:', requestData);
			
			const res = await fetch(API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestData)
			});
			
			console.log('Status de respuesta:', res.status);
			
			const result = await res.json();
			console.log('Respuesta del servidor:', result);
			
			if (!res.ok) {
				throw new Error(result.message || `Error HTTP ${res.status}`);
			}
			
			alert('Reserva realizada con éxito');
			form.reset();
			console.log('Reserva creada:', result);
		} catch (err) {
			console.error('Error completo:', err);
			console.error('Tipo de error:', typeof err);
			alert(`No se pudo realizar la reserva: ${err.message}`);
		}
	});
});
