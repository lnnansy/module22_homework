const wsUri = "wss://echo-ws-service.herokuapp.com/";
const sendBtn = document.querySelector('#sendBtn');
const mapLink = document.querySelector('#map-link');
const geoLocationBtn = document.querySelector('#geoLocationBtn');
const clientMessage = document.querySelector('.clientMessage');
const serverMessage = document.querySelector('.serverMessage');


let websocket;

function writeToScreen(message) {
  console.log(message);
}
if (!websocket) {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function (evt) {
    //writeToScreen("CONNECTED");
  };
  websocket.onclose = function (evt) {
    writeToScreen("DISCONNECTED");
  };
  websocket.onmessage = function (evt) {
    
    if (evt.data==='Геолокация') {
      return;
    } else serverResponce(evt.data);
  };
  websocket.onerror = function (evt) {
    writeToScreen(error);
  };
}

function serverResponce(message) {
  //serverMessage.innerHTML=`${message}`;
  let serverMessage1 = document.createElement("p");
  serverMessage1.innerHTML = `${message}`;
  serverMessage1.setAttribute('class', 'serverMessage');
  document.body.appendChild(serverMessage1);

}
function clientChat(message) {
  let clientMessage1 = document.createElement("p");
  clientMessage1.innerHTML = `${message}`;
  clientMessage1.setAttribute('class', 'clientMessage');
  document.body.appendChild(clientMessage1);
}
const success = (position) => {
  console.log('position', position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  let mapLink1 = document.createElement("a");
  mapLink1.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  mapLink1.setAttribute('style', 'float: right;');
  mapLink1.textContent = 'Геолокация';
  document.body.appendChild(mapLink1);
  let br = document.createElement("br");
  document.body.appendChild(br);
  websocket.send(mapLink1.textContent);
}
const error = () => {
  console.log('Невозможно получить ваше местоположение');
}
sendBtn.addEventListener('click', () => {

  const message = document.querySelector('#sendMessage').value;

  clientChat("SENT: " + message);
  websocket.send(message);
});
geoLocationBtn.addEventListener('click', () => {

  mapLink.href = '';
  mapLink.textContent = '';

  if (!navigator.geolocation) {
    console.log('Geolocation не поддерживается вашим браузером');
  } else {
    navigator.geolocation.getCurrentPosition(success, error);

  }


});
