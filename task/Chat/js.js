
const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const locationButton = document.getElementById('location-button');

    const socket = new WebSocket('wss://echo-ws-service.herokuapp.com');

    // Обработчик открытия соединения
    socket.addEventListener('open', (event) => {
    console.log('WebSocket соединение установлено');
    });

    // Обработчик получения сообщения от сервера
    socket.addEventListener('message', (event) => {
    const message = event.data;
    displayMessage(message);
    });

    // Обработчик закрытия соединения
    socket.addEventListener('close', (event) => {
    console.log('WebSocket соединение закрыто');
    });

    // Функция отображения сообщения в чате
    function displayMessage(message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    }

    // Обработчик клика на кнопку "Отправить"
    sendButton.addEventListener('click', (event) => {
    const message = messageInput.value;
    if (message !== '') {
        socket.send(message);
        displayMessage(message);
        messageInput.value = '';
    }
    });

    // Обработчик клика на кнопку "Геолокация"
    locationButton.addEventListener('click', (event) => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const mapLink = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}&zoom=15`;

            displayMessage(`Моя геолокация: ${mapLink}`);
            socket.send(mapLink);
        },
        (error) => {
            console.log('Ошибка геолокации:', error);
        }
        );
    } else {
        console.log('Геолокация не поддерживается');
    }
    });