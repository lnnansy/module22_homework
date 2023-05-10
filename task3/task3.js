const status = document.querySelector('#status');
const hw = document.querySelector('#hw');
const mapLink = document.querySelector('#map-link');
const btn = document.querySelector('.j-btn-test');

// Функция, выводящая текст об ошибке
const error = () => {
  status.textContent = 'Информация о местоположении недоступна';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  console.log('position', position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  status.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
  mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  mapLink.textContent = 'Ссылка на карту';
}

btn.addEventListener('click', () => {
  mapLink.href = '';
  mapLink.textContent = '';

  if (!navigator.geolocation) {
    status.textContent = `Информация о местоположении недоступна`;
  } else {
    status.textContent = `Определение местоположения…`;
    hw.textContent = `Ширина экрана: ${window.screen.width}. Высота экрана: ${window.screen.height}.`;
    navigator.geolocation.getCurrentPosition(success, error);
  }
});