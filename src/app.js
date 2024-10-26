import express from 'express'
import multer from 'multer';
import path from 'path'
import __dirname from './utils.js';
import { Server} from 'socket.io'
import {engine} from 'express-handlebars'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import chatRouter from "./routes/chat.router.js"
import sessionsRouter from './routes/sessions.router.js'
import viewRouter from './routes/views.router.js'
import ProductManagerDb from './dao/db/productDb.js'
import passport  from 'passport';
import initializePassport from './config/passport.config.js';
import configObject from './config/config.js';
import DataBase from './conectDb.js';

const Db = DataBase.getInstance()
const app = express();
const {port, mongo_url, secret} = configObject; 

app.use(express.json())
app.use(express.urlencoded({extends: true}))
app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', engine({
     extname: '.hbs',
     defaultLayout: 'main',
     runtimeOptions: {
         allowProtoPropertiesByDefault: true,
         allowProtoMethodsByDefault: true
     }
}));
app.use(cookieParser())
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, '/views'))

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    storage: MongoStore.create({
       mongoUrl: mongo_url, ttl: 100
    }),
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/sessions", sessionsRouter )
app.use("/chat", chatRouter)
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

const httpServer = app.listen(port, ()=>{
    console.log(`Escuchando en el puerto: ${port}`);
})

let messages = []
const io = new Server(httpServer)
const manager = new ProductManagerDb()

io.on("connection", async (socket)=>{
    console.log("Cliente conectado");

    socket.on("message", (data)=>{
        messages.push(data)
        
        io.emit("messagesLogs", messages)
    })
    try {
        const products = await manager.getProducts()
        socket.emit("products", products)
    } catch (error) {
        console.error("Error al obtener productos", error);
        socket.emit("error", "Error al obtener productos")
    }


    socket.on("deleteProduct", async (id) =>{
        try {
            await manager.deleteProduct(id)
            io.sockets.emit("products", await manager.getProducts())
        } catch (error) {
            console.error("Error al eliminar producto", error);
            socket.emit("error", "Error al emiliminar producto")
        }
    })

    socket.on("addProduct", async (newproduct)=>{
        try {
            await manager.addProduct(newproduct)
            const products = await manager.getProducts()
            io.emit("products", products)
        } catch (error) {
            console.error("Error al agregar producto",error);
            socket.emit("error", "Error al agregar producto")
        }
    })
})