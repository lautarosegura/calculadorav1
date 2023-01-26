const formElement = document.querySelector('form');
const distanceInput = document.getElementById('distance');
const modalElement = document.getElementById('ventanaModal');
const closeModalSpan = document.getElementsByClassName('cerrar')[0];
const modalTitleElement = document.getElementById('modal-title');
const modalContentElement = document.getElementById('modal-content');

const costPerKilometer = 140;
const longCostPerKilometer = 130;
const comissions = 1.07;
const nightTimeExtra = 1.15;
const returnExtra = 2;
const longReturnExtra = 1.3;

const calculateFare = () => {
	if (isNaN(distanceInput.value) || distanceInput.value <= 0) {
		return displayModal('¡Error!', 'Debes ingresar una distancia válida.');
	}

	// const cashElement = document.getElementById('dot-1');
	// const ccElement = document.getElementById('dot-2');
	// if (!cashElement.checked && !ccElement.checked) {
	// 	return displayModal('¡Error!', 'Debes seleccionar un método de pago.');
	// }
	// const paymentMethod = cashElement.checked ? 'cash' : 'cc';
	const nightTimeElement = document.getElementById('night-time');
	const returnElement = document.getElementById('return');
	let totalFareCost = 0;
	totalFareCost =
		distanceInput.value > 10
			? distanceInput.value * longCostPerKilometer + 160
			: distanceInput.value * costPerKilometer + 160;
	if (nightTimeElement.checked) totalFareCost *= nightTimeExtra;
	if (returnElement.checked) {
		if (distance.value < 30) totalFareCost *= returnExtraa;
		else if (distance.value > 30 && distance.value < 100)
			totalFareCost *= longReturnExtra;
	}
	totalFareCost *= comissions;
	displayModal(
		'Coste estimado de viaje',
		`El costo aproximado sería de \$${totalFareCost.toFixed(2)}`
	);
};

const displayModal = (title, content) => {
	modalTitleElement.textContent = title;
	modalContentElement.innerHTML = content;
	modalElement.style.display = 'block';
};

closeModalSpan.addEventListener('click', () => {
	modalElement.style.display = 'none';
});

formElement.addEventListener('submit', event => {
	event.preventDefault();
	calculateFare();
});

window.addEventListener('click', event => {
	if (event.target == modalElement) {
		modalElement.style.display = 'none';
	}
});

const listElements = document
	.getElementById('shortcuts-list')
	.getElementsByTagName('li');

for (let i = 0; i < listElements.length; i++) {
	const listElement = listElements[i];
	const listElementButton = listElement.querySelector('button');
	const modalsList = [
		{
			title: 'La Plata - Ezeiza (84.0 km)',
			content: `<h3>Sin retorno</h3>Coste aproximado diurno: $11855.60<br>Coste aproximado nocturno: $13633.94<h3>Con retorno</h3>Coste aproximado diurno: $15412.28<br>Coste aproximado nocturno: $17724.12`,
		},
		{
			title: 'Ezeiza - La Plata (84.9 km)',
			content:
				'Recordar que, en caso de enviar un móvil vacío a recoger a un pasajero, este deberá abonar el 50% del valor del viaje por adelantado.<br><br>Coste aproximado diurno: $11980.79<br>Coste aproximado nocturno: $13777.91',
		},
		{
			title: 'La Plata - Aeroparque (67.1 km)',
			content:
				'<h3>Sin retorno</h3>Coste aproximado diurno: $9504.81<br>Coste aproximado nocturno: $10930.53<h3>Con retorno</h3>Coste aproximado diurno: $12356.25<br>Coste aproximado nocturno: $14209.69',
		},
		{
			title: 'Aeroparque - La Plata (65.5 km)',
			content:
				'Recordar que, en caso de enviar un móvil vacío a recoger a un pasajero, este deberá abonar el 50% del valor del viaje por adelantado.<br><br>Coste aproximado diurno: $9282.25<br>Coste aproximado nocturno: $10674.59',
		},
	];
	listElementButton.addEventListener('click', () => {
		displayModal(modalsList[i].title, modalsList[i].content);
	});
}
