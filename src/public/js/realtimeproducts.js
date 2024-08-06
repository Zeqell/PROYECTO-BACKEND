const socket = io()

socket.on("products", (data) =>{
    productsList(data) 
})

const productsList = (products) =>{
    const productsContainer = document.getElementById("productsList")
    productsContainer.innerHTML = ""

    products.forEach(item => {
        const list = document.createElement("div")
        list.innerHTML = ` 
                            <div class=" card" style="width: 18rem;">
                                <img src="..." class="card-img-top" alt="img">
                                <div class="card-body d-flex flex-column mb-3 align-items-center">
                                    <p>ID: ${item.id}</p> 
                                    <h2 class="card-title">${item.title}</h2>
                                    <p class="card-text">${item.description}</p>
                                    <p class="card-text">$ ${item.price}</p>
                                    <button class="btn btn-outline-success">Remove</button>
                                </div>
                            </div>                        
                            <hr>`
        productsContainer.appendChild(list)

        list.querySelector("button").addEventListener("click",()=>{
            deleteProduct(item.id)
        })
    });
}

const deleteProduct = (id) =>{
    socket.emit("deleteProduct", id)
}

const form = document.getElementById("container-list")
form.addEventListener("submit", (e)=>{
    e.preventDefault()

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const img = document.getElementById("img").value;
    const stock = document.getElementById("stock").value;
    const code = document.getElementById("code").value;

    const newproduct = {
        title,
        description,
        price,
        img,
        stock,
        code
    }

    console.log("producto cargado", newproduct);
    socket.emit("addProduct", newproduct)
    
    form.reset()

})

