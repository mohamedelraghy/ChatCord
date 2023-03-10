const chatForm = document.getElementById('chat-form'); 
const chatMessages = document.querySelector('.chat-messages');

//Get Uesr name and Room
const {username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
}); 

const socket = io();

//Join chatRoom
socket.emit('joinRoom', {username, room});

//Get room and users

// messge from the server
socket.on('message', message => {
    console.log(message);  
    outputMessage(message);

    //Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get message text
    const msg = e.target.elements.msg.value;

    //emiting message to  server
    socket.emit('chatMessage', msg);

    //clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();  
});

// output message to DOM

function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
                     <p class="text">
                        ${message.text}
                     </p>`

    chatMessages.appendChild(div);  

}
