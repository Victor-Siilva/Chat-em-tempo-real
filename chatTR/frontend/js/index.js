// elementos login
const login = document.querySelector(".login")
const loginForm = login.querySelector(".login__form")
const loginInput = login.querySelector(".login__input")

// elementos chat
const chat = document.querySelector(".chat")
const chatForm = chat.querySelector(".chat__form")
const chatInput = chat.querySelector(".chat__input")
const chatMessages = chat.querySelector(".chat__messages")

const colors = [
    "green",
    "skyblue",
    "red",
    "cyan",
    "navy",
    "neon"
]

const user = { id: "", name: "", color: "" }

// 1. Definindo a variável socket
let socket;

// 2. Função para conectar ao WebSocket
const connectWebSocket = () => {
    socket = new WebSocket("wss://chat-em-tempo-real-9iwa.onrender.com/");
    
    socket.onopen = () => {
        console.log("Conexão estabelecida");
    };

    // 3. Aqui você pode processar a mensagem recebida
    socket.onmessage = (event) => {
        console.log("Mensagem recebida: ", event.data);
        // Adicione aqui a lógica para exibir a mensagem no chat
    };

    socket.onerror = (error) => {
        console.error("Erro no WebSocket: ", error);
    };
};

// 4. Função para lidar com o login
const handleLogin = (event) => {
    event.preventDefault();

    user.id = crypto.randomUUID();
    user.name = loginInput.value;
    user.color = getRandomColor();

    login.style.display = "none";
    chat.style.display = "flex";

    // Chame a função de conexão após o login
    connectWebSocket();
};

// Adicione os ouvintes de eventos
loginForm.addEventListener("submit", handleLogin);
chatForm.addEventListener("submit", sendMessage);


const imageField = document.querySelector("#image-field");
const imagePreview = document.querySelector("#image-preview");

const loadImage = (e) => {
    const filePath = e.target || window.event.srcElement;

    const file = filePath.files;

    const fileReader = new FileReader();

    fileReader.onload = () => {
        imagePreview.src = fileReader.result;
    };

    fileReader.readAsDataURL(file[0]);
};

imageField.addEventListener("change",loadImage);