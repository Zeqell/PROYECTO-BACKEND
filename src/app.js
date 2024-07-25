import express from 'express'
import multer from 'multer';
//import handlebars from 'express-handlebars'
//import usersRouter from "./routes/users.router.js"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
//import viewsRouter from "./routes/views.router.js"
//import chatRouter from "./routes/chat.router.js"

const app = express();
const PORT = 8080; 

app.use(express.json())
app.use("/static", express.static("./src/public"))

//app.engine("handlebars", handlebars.engine())
//app.set("view engine", "handlebars")
//app.set("views", "./src/views")

//app.use("/api/users", usersRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
//app.use("/api/views", viewsRouter)
//app.use("/chat", chatRouter)


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

app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto: ${PORT}`);
})