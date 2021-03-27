$(function () {
  $("#createProduct").click(createProduct);
  loadProducts();
});

function editProduct() {
  console.log("INSIDE EDIT");
}
function deleteProduct() {
  console.log("INSIDE DEL");
}
function createProduct() {
  console.log("INSIDE Create");
}

function loadProducts() {
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products",
    method: "GET",
    success: function (response) {
      let maind = $("#mainDiv");
      for (let i = 0; i < response.length; i++) {
        let products = document.createElement("div");
        let delbtn = document.createElement("button");
        let Editbtn = document.createElement("button");
        let para = document.createElement("p");
        para.innerHTML = `<p>Price: $${response[i].price}</br>Department: <em>${response[i].department}</em></br>Description: ${response[i].description}</p>`;

        delbtn.className = "btn btn-danger";
        delbtn.id = "delBtn";
        delbtn.innerHTML = "Delete";
        delbtn.onclick = deleteProduct;

        Editbtn.className = "btn btn-warning";
        Editbtn.id = "editBtn";
        Editbtn.innerHTML = "Edit";
        Editbtn.onclick = editProduct;

        // products.id = response[i]._id;
        products.attributes = ("_id", response[i]._id);
        console.log(products.attributes);
        // console.log(response[i]._id);
        products.className = "products";

        products.innerHTML = `<h3>${response[i].name}</h3>`;
        products.append(delbtn);
        products.appendChild(Editbtn);
        products.append(para);
        maind.append(products);
      }
    },
  });
}
