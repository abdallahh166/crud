


var users = [
    { username: "admin", password: "123" },
    { username: "user", password: "userpass" }
];

function login() {


    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var loginMessage = document.getElementById("loginMessage");

    var user = users.find(u => u.username === username && u.password === password);

    if (user) {
        document.getElementById("logForm").classList.add("d-none");
        document.getElementById("productForm").classList.remove("d-none");

    } else {
        loginMessage.textContent = "Invalid username or password.";
    }
}


var productNameInput = document.getElementById("ProductName")
var productPriceInput = document.getElementById("ProductPrice")
var productCategoryInput = document.getElementById("ProductCategory")
var productDescriptionInput = document.getElementById("ProductDescription")
var productImageInput = document.getElementById("ProductImage")
var productSaleInput = document.getElementById("ProductSale")


var btnAdd = document.getElementById("btnAdd")
var btnUpdate = document.getElementById("btnUpdate")

var productList = []

var searchInput = document.getElementById("searchInput")

if (localStorage.getItem("products") != null) {
    productList = JSON.parse(localStorage.getItem("products"))
    display(productList)
}

function addProduct() {
    if (validation('ProductName') && validation('ProductPrice') && validation('ProductCategory') && validation('ProductDescription') && validation('ProductImage')) {
        var product = {
            code: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            description: productDescriptionInput.value,
            image: productImageInput.files[0] ? `images/${productImageInput.files[0].name}` : `/images/6.jpg`,
            sale: productSaleInput.checked
        };

        productList.push(product)
        localStorage.setItem("products", JSON.stringify(productList))
        display(productList)
        clearInputs()

    } else {
        alert("Data is invalid")
    }
}

function clearInputs() {
    productNameInput.value = null
    productPriceInput.value = null
    productCategoryInput.value = null
    productDescriptionInput.value = null
    productImageInput.value = null
    productSaleInput.checked = null

    productNameInput.classList.remove("is-valid")
    productPriceInput.classList.remove("is-valid")
    productCategoryInput.classList.remove("is-valid")
    productDescriptionInput.classList.remove("is-valid")
    productImageInput.classList.remove("is-valid")
}

function display(array) {
    // Initialize an empty string to hold the HTML for the product cards
    var productCard = "";
    // Loop through each product in the productList array
    for (var i = 0; i < array.length; i++) {
        // Concatenate the HTML for the current product to the productCard string
        productCard +=
            ` <div class="col-md-4">
            <div class="card p-4 shadow">
              <div class="card-body">
                    <img src="${array[i].image}" alt="Product Image" class="w-100 rounded shadow-lg"> 
                    <h2>Titel: ${array[i].code}</h2> 
                    <h3>Price: ${array[i].price}</h3> 
                    <h3>category: ${array[i].category}</h3> 
                    <p>${array[i].description}</p> 

                     ${array[i].sale ? "<span class='badge bg-danger'> sale </span>" : ""}

                    <button onclick="deletProduct(${i})" class="btn btn-outline-danger">Delete <i class="fa-solid fa-trash-can"></i></button> 
                    <button onclick="setFromValueUpdate(${i})" class="btn btn-outline-warning">Update <i class="fa-solid fa-pen"></i></button> 
                </div>
            </div>
         </div>
         `
    }
    // Set the innerHTML of the element with the id "productCard" to the productCard string
    document.getElementById("productCard").innerHTML = productCard;
}

//glopal var to contain the index of the obj i want to edit 
var updateIndex;

function setFromValueUpdate(index) {

    //the var contain the index
    updateIndex = index;
    //hold the attribute and add it at the input field
    productNameInput.value = productList[index].code
    productPriceInput.value = productList[index].price
    productCategoryInput.value = productList[index].category
    productDescriptionInput.value = productList[index].description
    productSaleInput.value = productList[index].description

    btnAdd.classList.add("d-none")
    btnUpdate.classList.remove("d-none")
}

function update() {
    var updateProduct = {
        code: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value,
        image: productImageInput.files[0] ? `images/${productImageInput.files[0].name}` : productList[updateIndex].image,
        sale: productSaleInput.checked
    }

    productList.splice(updateIndex, 1, updateProduct)

    //update in the local storage
    localStorage.setItem("products", JSON.stringify(productList))
    display(productList)

    btnUpdate.classList.add("d-none")
    btnAdd.classList.remove("d-none")

    clearInputs()
}


function deletProduct(index) {

    productList.splice(index, 1)
    localStorage.setItem("products", JSON.stringify(productList))
    display(productList)
}

function search() {
    var term = searchInput.value

    var resultSearch = []

    for (var i = 0; i < productList.length; i++) {
        if (productList[i].code.includes(term.toLowerCase())) {

            resultSearch.push(productList[i])

        }
        if (resultSearch.length === 0) {
            document.getElementById("productCard").innerHTML = "Products not found";
        }
    }

    display(resultSearch)
}


//validation

function validation(id){

    //hold the element that his id pass to the function
   var myElement = document.getElementById(id) 

    var regex = {
        ProductName: /^[a-zA-Z]\w{3,15}$/,
        ProductPrice: /^[1-9][0-9]{1,6}$/,
        ProductCategory: /^(tv|mobile|screens)$/i,
        ProductImage:  /^.+\.(svg|png|jpg|jpeg)$/,
        ProductDescription: /^.{3,100}$/
    }

    //holding the value of the element in variable teststring
    var testString = myElement.value

    //in html add an id = alert(ProductName) this is the id :D
    var alertElement = document.getElementById(`alert${id}`);


    //checking the inpute date 
    // regex[id] if the id passed to the function match any one of the atteribute of the obj regex
    //go check the value enterd by the user it is match the specifc regex pattern or not
    if (regex[id].test(testString)) {
        myElement.classList.add("is-valid")
        myElement.classList.remove("is-invalid")
        alertElement.classList.add("d-none")

        return true

    } else {
        myElement.classList.add("is-invalid")
        myElement.classList.remove("is-valid")
        alertElement.classList.remove("d-none")

        return false
    }
}



