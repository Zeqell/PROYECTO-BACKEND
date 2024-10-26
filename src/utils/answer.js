export const answer = (res, status, message)=>{
    res.status(status).json({message: message})
}