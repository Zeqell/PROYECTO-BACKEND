export const generateCode = () =>{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const codeLength = 8
    let code = ''

    for(let i = 0; i < codeLength; i++){
        const randomItem = Math.floor(Math.random()* characters.length)
        code += characters.charAt(randomItem)
    }

    const timestamp = Date.now().toString(36)
    return code + '-' + timestamp
}

export const calculateTotal = (products) =>{
    return products.reduce((total, item) => {
        const product = item.product
        if (!product || typeof product.price !== 'number') {
            console.error(`Producto inválido encontrado: ${JSON.stringify(product)}`)
            return total
        }
        return total + (product.price * item.quantity)
    }, 0)
}
