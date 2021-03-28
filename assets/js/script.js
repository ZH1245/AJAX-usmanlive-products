$(function () {
  $("#CreateProduct").click(createProduct);
  $("#CanselCreate").click(CanselCreate);
  loadProducts();
});

function CanselCreate() {
  alert("Cancelled Successfully");
  $("#Createname").val("");
  $("#Createprice").val("");
  $("#Createcolor").val("");
  $("#Createdepartment").val("");
  $("#Createdescription").val("");
  $("#collapseCreate").collapse("toggle");
}
// function editProduct() {
//   console.log("INSIDE EDIT");
// }
function deleteProduct(e) {
  console.log("INSIDE DEL", e);
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products/" + e,
    method: "DELETE",
    error: function (response) {
      if (response.log == undefined) {
        alert("INTERNET DOWN. Please Check your Internet Connection");
      } else {
        alert(response.log);
      }
    },
    success: function (response) {
      console.log(response);
      alert("Delete was Successful");
      loadProducts();
    },
  });
}
function createProduct() {
  console.log("INSIDE Create");
  const name = $("#Createname").val();
  const price = $("#Createprice").val();
  const color = $("#Createcolor").val();
  const department = $("#Createdepartment").val();
  const description = $("#Createdescription").val();

  if (name === "" || price === "" || department === "" || description === "") {
    alert("Please Do not leave any field Empty");
  } else {
    console.log(name, price, color, department, description);
    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/products",
      method: "POST",
      data: { name, price, color, department, description },
      error: function (response) {
        if (response.log == undefined) {
          alert("INTERNET DOWN. Please Check your Internet Connection");
        } else {
          alert(response.log);
        }
      },
      success: function (response) {
        $("#Createname").val("");
        $("#Createprice").val("");
        $("#Createcolor").val("");
        $("#Createdepartment").val("");
        $("#Createdescription").val("");
        $("#collapseCreate").collapse("toggle");
        alert("Sending POST req. Please Check page for your product!");
        loadProducts();
      },
    });
  }
  // $("#toggle_collapse").addClass(" collapsed");
  // $("#toggle_collapse").attr("aria-expanded", "false");
  // $("#collapseCreate").removeClass("show");
}

function loadProducts() {
  $("#mainDiv").empty();
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products",
    method: "GET",
    error: function (response) {
      if (response.log == undefined) {
        alert("INTERNET DOWN. Please Check your Internet Connection");
      }
    },
    success: function (response) {
      let maind = $("#mainDiv");
      for (let i = 0; i < response.length; i++) {
        let products = document.createElement("div");
        let delbtn = document.createElement("button");
        // let Editbtn = document.createElement("button");
        let para = document.createElement("p");
        para.innerHTML = `<p>Price: $${response[i].price}</br>Department: <em>${response[i].department}</em></br>Description: ${response[i].description}</p>`;

        delbtn.className = "btn btn-danger";
        delbtn.id = "delBtn";
        delbtn.innerHTML = "Delete";
        // delbtn.onclick = () => deleteProduct(response[i]._id);
        delbtn.onclick = () => deleteProduct($(products).attr("id"));
        // Editbtn.className = "btn btn-warning";
        // Editbtn.id = "editBtn";
        // Editbtn.innerHTML = "Edit";
        // Editbtn.onclick = editProduct;

        products.id = response[i]._id;
        // products.attributes = ("_id", response[i]._id);
        // console.log(products.attributes);
        // console.log(response[i]._id);
        products.className = "products";

        products.innerHTML = `<h3>${response[i].name}</h3>`;
        products.append(delbtn);
        // products.appendChild(Editbtn);
        products.append(para);
        maind.append(products);
      }
    },
  });
}
