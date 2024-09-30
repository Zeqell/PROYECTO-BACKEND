const authorization = (role) =>{
    return async (req, res, next)=>{
        if(req.user.role !== role){
            return res.status(403).send("Credenciales invalidas")
        }next()
    }
}

export default authorization