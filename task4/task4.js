const status = document.querySelector('#status');
const date_time = document.querySelector('#date_time');
const timezone = document.querySelector('#timezone');
const mapLink = document.querySelector('#map-link');
const btn = document.querySelector('.j-btn-test');


// Функция, выводящая текст об ошибке
const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  console.log('position', position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  //status.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
  //mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  //mapLink.textContent = 'Ссылка на карту';
  fetch(`https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`)
    .then((response) => {
      // Объект ответа на запрос
      console.log('response', response);
      // Превращаем объект в JSON. Мы не можем его сразу прочитать,
      // надо отдать в следующий then
      const result = response.json();
      console.log('result', result);
      return result;
    })
    .then((data) => {
      // Объект результата в формате JSON
      console.log(data.date_time_txt);
      console.log(data.timezone);
      date_time.textContent = `Местные дата и время:${data.date_time_txt}`;
      timezone.textContent = `Временная зона:${data.timezone}`;

    })
    .catch(() => { console.log('error') });


}

btn.addEventListener('click', () => {
  mapLink.href = '';
  mapLink.textContent = '';

  if (!navigator.geolocation) {
    status.textContent = `Информация о местоположении недоступна`;
  } else {
    // status.textContent = `Определение местоположения…`;

    navigator.geolocation.getCurrentPosition(success, error);
  }

});

