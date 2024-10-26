export function adminOnly(req, res, next){
    if(req.user.role === "admin"){
        next()
    }else{
        res.status(403).send("Acceso denegado, solo admin")
    }
}

export function usersOnly (req, res, next){
    if(req.user.role === "user"){
        next()
    }else{
        res.status(403).send("Acceso denegado, solo users")
    }
}