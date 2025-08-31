// booking.js - Conexión frontend con backend para reservas
const API_URL = 'http://localhost:3000/api/bookings';

document.addEventListener('DOMContentLoaded', () => {
	// Variables para experiencia y precio
	let selectedExperience = null;
	let pricePerPerson = 0;

	// Mostrar información ampliada de la experiencia seleccionada
	const params = new URLSearchParams(window.location.search);
	const expId = params.get('experience_id');
	if (expId) {
		fetch('http://localhost:3000/api/experiences/' + expId)
			.then(res => res.json())
			.then(exp => {
				selectedExperience = exp;
				pricePerPerson = exp.Price || exp.price || 0;
				const detail = document.getElementById('experience-detail');
				if (detail && exp) {
					detail.innerHTML = `
						<div class="exp-detail-card" style="margin-bottom:20px;padding:15px;border-radius:8px;background:#f7f7f7;box-shadow:0 2px 8px #0001;display:flex;gap:20px;align-items:center;">
							<img src="${exp.experience_img || '../assets/img/playacristal.webp'}" alt="experience-img" style="width:120px;height:120px;object-fit:cover;border-radius:8px;" />
							<div>
								<h3>${exp.Experience_title || exp.name}</h3>
								<p><strong>Destination:</strong> ${exp.destination?.destination_name || 'Sin destino'}</p>
								<p><strong>Description:</strong> ${exp.Experience_description || exp.description}</p>
								<p><strong>Places:</strong> ${exp.Capacity || exp.capacity}</p>
								<p><strong>Price per person:</strong> $${pricePerPerson}</p>
								<div id="total-pay" style="margin-top:10px;font-weight:bold;"></div>
							</div>
						</div>
						<div id="booking-message" style="margin-bottom:10px;"></div>
					`;
				}
			});
	}
	// Ocultar botón de login si el usuario está logeado
	const token = localStorage.getItem('token');
	const loginBtn = document.getElementById('btnlogin');
	if (token && loginBtn) {
		loginBtn.style.display = 'none';
	}
		const form = document.querySelector('.reservation-form');
		if (!form) return;

		form.addEventListener('submit', async function (e) {
			e.preventDefault();

				// Obtener datos del usuario desde el token
				let User_id = null;
				const booking_status_id = 1;
				const Experience_id = expId;
						const Places = document.getElementById('quota').value;
				const messageDiv = document.getElementById('booking-message');
				const token = localStorage.getItem('token');
				if (token) {
					try {
						const payload = JSON.parse(atob(token.split('.')[1]));
						User_id = payload.userId;
					} catch (e) {
						User_id = null;
					}
				}

			// Validación
				if (!User_id) {
					if (messageDiv) messageDiv.textContent = 'No se encontró el usuario logeado.';
					return;
				}
				if (!Experience_id) {
					if (messageDiv) messageDiv.textContent = 'No se encontró la experiencia seleccionada.';
					return;
				}
						if (!Places || Places < 1) {
							if (messageDiv) messageDiv.textContent = 'Debes ingresar la cantidad de cupos antes de reservar.';
							return;
						}

			// Mostrar resumen total
			const totalPayDiv = document.getElementById('total-pay');
					if (totalPayDiv) {
						const total = pricePerPerson * Places;
						totalPayDiv.textContent = `Total a pagar: $${pricePerPerson} x ${Places} = $${total}`;
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
										Places,
										booking_status_id
									})
				});
				if (!res.ok) throw new Error('Error al crear la reserva');
				if (messageDiv) messageDiv.textContent = '¡Reserva realizada con éxito! Recibirás un correo con los detalles.';
				form.reset();
				if (totalPayDiv) totalPayDiv.textContent = '';
			} catch (err) {
				if (messageDiv) messageDiv.textContent = 'No se pudo realizar la reserva. Intenta nuevamente.';
			}
		});

		// Actualizar el total a pagar en tiempo real
		const quotaInput = document.getElementById('quota');
		quotaInput?.addEventListener('input', function() {
					const Places = parseInt(quotaInput.value, 10);
					const totalPayDiv = document.getElementById('total-pay');
					if (selectedExperience && totalPayDiv && Places > 0) {
						const total = pricePerPerson * Places;
						totalPayDiv.textContent = `Total a pagar: $${pricePerPerson} x ${Places} = $${total}`;
					} else if (totalPayDiv) {
						totalPayDiv.textContent = '';
					}
		});
});
