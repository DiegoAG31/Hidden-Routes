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
			select.innerHTML += `<option value="${exp.Experience_id || exp.id}">${exp.Experience_title || exp.name}</option>`;
		});
	} catch (err) {
		select.innerHTML = '<option value="">No experiences found</option>';
	}
}

// booking.js - Conexión frontend con backend para reservas
const API_URL = 'http://localhost:3000/api/bookings';

document.addEventListener('DOMContentLoaded', () => {
	// Ocultar botón de login si el usuario está logeado
	const token = localStorage.getItem('token');
	const loginBtn = document.getElementById('btnlogin');
	if (token && loginBtn) {
		loginBtn.style.display = 'none';
	}
	cargarExperiencias();
	const form = document.querySelector('.reservation-form');
	if (!form) return;

	form.addEventListener('submit', async function (e) {
		e.preventDefault();

		// Valores fijos temporales
		const User_id = 1;
		const booking_status_id = 1;

		// Obtener datos del formulario
		const experienceSelect = document.getElementById('experience');
		const Experience_id = experienceSelect.value;
		const Quotes = document.getElementById('quota').value;

		if (!Experience_id || !Quotes) {
			alert('Por favor completa todos los campos.');
			return;
		}

		try {
			const res = await fetch(API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					User_id,
					Experience_id,
					Quotes,
					booking_status_id
				})
			});
			if (!res.ok) throw new Error('Error al crear la reserva');
			alert('Reserva realizada con éxito');
			form.reset();
		} catch (err) {
			alert('No se pudo realizar la reserva');
		}
	});
});
