const shopee = document.getElementsByClassName("shopee")[0];

// Gán sự kiện click cho thẻ div
shopee.addEventListener("click", load);
function load() {
    window.location.href = "../index.html";
}

//lấy dữ liệu về
let products = JSON.parse(localStorage.getItem("products"));

function load2() {
    let text = ""
    for (let i = 0; i < products.length; i++) {
        text += 
        `
        <tr>
            <td>${i+1}</td>
            <td>${products[i].name}</td>
            <td class="td"><img src=".${products[i].image}" alt="" width="150px"></td>
            <td>${products[i].price}</td>
            <td>${products[i].stock}</td>
            <td class="editAll"><button onclick="delete2(${i+1})" class="button">Xóa</button></td>
        </tr>
        `
    }
    ADMproduct.innerHTML = text;
}


//nút xóa sản phẩm
function delete2(id) {
    let check =confirm("Xóa sản phẩm");
    if(check){
        if(id==products.length){
            products.pop();
            localStorage.setItem("products", JSON.stringify(products));
            load2();
        } else{
            products.splice(id-1, 1);
            localStorage.setItem("products", JSON.stringify(products));
            load2();
        }
    }
}
load2();



/* nút bấm về home */
let comeback = document.getElementsByClassName("topSonHeader")[0];
comeback.addEventListener("click", back);
function back() {
    window.location.href = "./admin.home.html";
}


//lấy dữ liệu về
let category = JSON.parse(localStorage.getItem("category"));
for (let i = 0; i < category.length; i++) {
    document.getElementById("select").innerHTML += 
    `
        <option>${category[i].name}</option>
    `
}

