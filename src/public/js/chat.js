const socket = io()

socket.emit("mensaje", "Hola backend")

socket.on("saludo", (data)=>{
    console.log(data);
})

socket.on("usuarios", (arrayUsuarios)=>{
    const listaUsuarios = document.getElementById("lista-usuarios")
    arrayUsuarios.forEach(usuarios =>{
        listaUsuarios.innerHTML += `<li> ${usuarios.nombre} - ${usuarios.apellido} <li>`
    });
})