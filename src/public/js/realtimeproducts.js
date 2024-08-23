const socket = io()

socket.on("products", (data) =>{
    console.log("productos recibidos", data);
    productsList(data.docs) 
})

const productsList = (products) =>{

    const productsContainer = document.getElementById("productsList")
    productsContainer.innerHTML = ""

    products.forEach(item => {
        const list = document.createElement("div")
        list.innerHTML = ` 
                            <div class=" card" style="width: 18rem;">
                                <thumbnails src="${item.thumbnails}" class="card-thumbnails-top" alt="thumbnails">
                                <div class="card-body d-flex flex-column mb-3 align-items-center">
                                    <p>ID: ${item._id}</p> 
                                    <h2 class="card-title">${item.title}</h2>
                                    <p class="card-text">${item.description}</p>
                                    <p class="card-text">$ ${item.price}</p>
                                    <button class="btn btn-outline-success">Remove</button>
                                </div>
                            </div>                        
                            <hr>`
        productsContainer.appendChild(list)

        list.querySelector("button").addEventListener("click",()=>{
            deleteProduct(item._id)
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
    const thumbnails = document.getElementById("thumbnails").value;
    const stock = document.getElementById("stock").value;
    const code = document.getElementById("code").value;
    const status = document.getElementById("status").value
    const category = document.getElementById("category").value

    const newproduct = {
        title,
        description,
        price,
        thumbnails,
        stock,
        code,
        status,
        category
    }

    console.log("producto cargado", newproduct);
    socket.emit("addProduct", newproduct)
    
    form.reset()

})

