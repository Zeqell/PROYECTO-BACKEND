import express from 'express'
import multer from 'multer';
import path from 'path'
import __dirname from './utils.js';
import { Server} from 'socket.io'
import handlebars from 'express-handlebars'
import usersRouter from "./routes/users.router.js"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import chatRouter from "./routes/chat.router.js"
import registerRouter from './routes/register.router.js';
import viewRouter from './routes/views.router.js'
import ProductManager from './managers/productsManager.js';

const app = express();
const PORT = 8080; 

app.use(express.json())
app.use(express.static(__dirname +'/public'))

app.engine("hbs", handlebars.engine())
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, '/views'))

app.use("/api/users", usersRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/chat", chatRouter)
app.use("/user", registerRouter)
app.use("/", viewRouter)



const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./src/public/img")
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
})
const upload = multer({storage: storage})

app.post("/imagenes", upload.array("imagen"), (req, res)=>{
    res.send("imagen cargada")
})

const httpServer = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto: ${PORT}`);
})

let messages = []
const io = new Server(httpServer)
const manager = new ProductManager("./src/data/products.json")

io.on("connection", async (socket)=>{
    console.log("Cliente conectado");

    socket.on("message", (data)=>{
        messages.push(data)
        
        io.emit("messagesLogs", messages)
    })

    socket.emit("products", await manager.getProducts())

    socket.on("deleteProduct", async (id) =>{
        await manager.deleteProduct(id)

        io.sockets.emit("products", await manager.getProducts())
    })

    socket.on("addProduct", async (newproduct)=>{
        await manager.addProduct(newproduct)
        io.emit("products", await manager.getProducts())
    })
})