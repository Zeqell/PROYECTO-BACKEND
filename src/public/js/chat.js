const socket = io()

let user;
const chatBox = document.getElementById("chatBox")

Swal.fire({
    title: "identificate",
    input: "text",
    text: "Ingresa un usuario para identificarte",
    inputValidator: (value)=>{
        return !value && "Necesitas un usuario para continuar";
    },
    allowOutsideClick: false
}).then(result =>{
    user = result.value
})

chatBox.addEventListener("keyup", (event)=>{
    if(event.key === "Enter"){
        if(chatBox.value.trim().length > 0){
            socket.emit("message", {user: user, message: chatBox.value})
            chatBox.value = "";
        }
    }
})

socket.on("messagesLogs", data =>{
    const log = document.getElementById("messageLogs")
    let messages = "";
    data.forEach(message =>{
        messages = messages + `${message.user} dice: ${message.message} <br>`
    })
    log.innerHTML = messages
})