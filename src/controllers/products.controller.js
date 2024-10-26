import productService from "../services/product.service.js";

class ProductController {
    async getProducts(req, res) {
        try {
            const {limit, page, sort, category} = req.query
    
            const productlimit = limit || 10
            const pageNumber = page || 1
            const sortOrder = sort || ''
    
            const productsData = await productService.getProduct({
                limit: productlimit,
                page: pageNumber,
                sort: sortOrder,
                category: category || ''
            })
            res.json({
                status: 'success',
                payload: productsData
            })      
        } catch (error) {
            console.log("Error al obtener los productos", error)
    
            res.status(500).send("Error interno del servidor")
        }
    }
    async getProductById(req, res){
        let pid = req.params.pid;
        try {
            const productId = await productService.getProductById(pid)
            console.log("Producto encontrado", productId);
            if(!productId){
                res.send("Producto no encontrado")
            }else{
                res.send(productId)
            }
        } catch (error) {
            console.log("Error al obtener el producto", error)
    
            res.status(500).send("Errro interno del servidor")
        }
    }
    async addProduct(req, res){
        const newProducts = req.body
        try {
            await productService.addProduct(newProducts)
            res.status(201).send("Producto agregado exitosamente")
        } catch (error) {
            res.status(500).json({status: "error", message: error.message})
        }
    }
    async updateProduct(req, res){
        try {
            const pid = req.params.pid;
            const updatedProduct = req.body;
            const update = await productService.updateProduct(pid, updatedProduct, {new: true})
            console.log("Producto actualizado", update);
            if(!update){
                res.send("Producto no encontrado")
            }else{
                res.send(update)
            }
        } catch (error) {
            console.log("Error al actualizar el producto", error)
    
            res.status(500).send("Error interno del servidor")
        }
    }
    async deleteProduct(req, res){
        const pid = req.params.pid;
        try {
            const deletProduct = await productService.deleteProduct(pid)
            if(!deletProduct){
                return res.status(404).send("Producto no encontrado")
            }
            res.status(201).send("Producto eliminado")
            
        } catch (error) {
            console.log("Error al eliminar producto", error)
    
            res.status(500).send("Error interno del servidor")
        }
    }
}
export default ProductController