const chatForm = document.getElementById('chat-form'); 
const chatMessages = document.querySelector('.chat-messages');

const socket = io();

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
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
                     <p class="text">
                        ${message}
                     </p>`

    chatMessages.appendChild(div);  

}
