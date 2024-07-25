import { Server } from "socket.io";

const io = new Server(httpServer)

io.on("connection", ()=>{
    console.log("Cliente conectado");

    socket.on("mensaje", (data)=>{
        console.log(data);
    })

    socket.emit("saludo", "Hola cliente")

    socket.emit("usuarios", usuarios)
})

const usuarios = [
    {id:1, nombre:"Luis", apellido:"Suarez"},
    {id:2, nombre:"Lionel", apellido:"Messi"},
    {id:3, nombre:"Juan Roman", apellido:"Riquelme"},
    {id:4, nombre:"Neymar", apellido:"Junior"},
    {id:5, nombre:"Diego Armando", apellido:"Maradona"}
]


export default io
