
// nút bấm shopee
// Lấy thẻ div bằng class
const shopee = document.getElementsByClassName("shopee")[0];

// Gán sự kiện click cho thẻ div
shopee.addEventListener("click", load);
function load() {
    window.location.href = "../index.html";
}


// chuyển sang VND
let formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
});

// đăng nhập người dùng
let email = JSON.parse(localStorage.getItem("login"))||[];
let relog = document.getElementById("relog");

let user = JSON.parse(localStorage.getItem("users"))||[];
for (let i = 0; i < user.length; i++) {
    if(email==user[i].email){
        document.getElementById("renderUser").innerHTML = 
        `
        <div class="userInfor">
        <div><i class="fa-regular fa-user"></i></div>
            <div>${user[i].userName}</div>
            <div class="userDown">
                <a href="#">Tài khoản của tôi</a>
                <a href="#">Đơn mua</a>
                <a href="#" onclick="logOut()">Đăng xuất</a>
            </div>
        </div>

        `
        ;
        relog.style.display= "none";
    } else{
        relog.style.display= "block";
    }
}

// đăng xuất
function logOut(){
    flagCheck = false;
    localStorage.setItem("flagCheck", JSON.stringify(flagCheck));
    localStorage.removeItem("login");
    relog.style.display = "block";
    document.getElementById("renderUser").innerHTML = "";
    window.location.href = "./login.html";
}


// thêm vào giỏ hàng
let cartCount = document.getElementsByClassName("numberPay")[0];
let userLogin = JSON.parse(localStorage.getItem("users"))||[];
let checkLogin = JSON.parse(localStorage.getItem("login"))||[];
for (let i = 0; i < userLogin.length; i++) {
  if (checkLogin == userLogin[i].email) {
    cartCount.innerHTML = userLogin[i].cart.length;
  }
}

//hiển thị sản phẩm trong cart
let addVart = document.getElementById("addVart");
let displayPay = document.getElementById("displayPay");
function renderCart() {
    for (let i = 0; i < userLogin.length; i++) {

        if(userLogin[i].email==checkLogin){
            let item = "";
            let all = 0;
            if(userLogin[i].cart ==""){
                addVart.style.display = "none";
                cartProduct.innerHTML = `
                <div class="cart-none">
                    <img src="../assets/images/z5281984542735_00ea7f80a70e87636d194211478a0cc1.jpg" alt="">
                    <div class="textPrice"><b>Giỏ hàng của bạn còn trống</b></div>
                    <div class="priceInput"><a class="priceInputA" href="../index.html" class="btn-cart">Mua ngay</a></div>
                </div>
            `
            } else{
                for (let j = 0; j < userLogin[i].cart.length; j++) {
                    addVart.style.display = "block";
                    item += `<tr>
                    <td class="tableBox boxInput"><input type="checkbox" id="checkbox"></td>
                    <th class="tableBox" scope="row"><img class="imgTable" src=".${userLogin[i].cart[j].image}"/></th>
                    <td class="product-name tableBox">${userLogin[i].cart[j].name}</td>
                    <td class="text-price tableBox">${formatter.format(userLogin[i].cart[j].price)}</td>
                    <td class="tableBox tableBox"><button class="change-count-product down" onclick="reduceProduct(${userLogin[i].cart[j].id})">-</button>
                    <input class="quantityProduct" type="text" value="${userLogin[i].cart[j].quantity}"><button class="change-count-product" onclick="increaseProduct(${userLogin[i].cart[j].id})">+</button></td>
                    <td class="text-price tableBox price">${formatter.format(userLogin[i].cart[j].quantity*userLogin[i].cart[j].price)}</td>
                    <td class="tableBox"><button class="remove-product" onclick="remove(${userLogin[i].cart[j].id})">Xóa</button></td>
                </tr>
                    `
                    addVart.innerHTML = item;
                }
            }
        }
    }
}

renderCart();


function reduceProduct(id) {
    let flag = true;
    for (let i = 0; i < userLogin.length; i++) {
        if(userLogin[i].email===checkLogin){
            for (let j = 0; j < userLogin[i].cart.length; j++) {
                if(userLogin[i].cart[j].id===id){
                    if(userLogin[i].cart[j].quantity == 1){
                        flag = false;
                    }
                    if(flag){
                        userLogin[i].cart[j].quantity = --userLogin[i].cart[j].quantity;
                        localStorage.setItem("users", JSON.stringify(userLogin));   
                    }   
                }
            }
            renderCart();
        }
    }
}

function increaseProduct(id) {
    for (let i = 0; i < userLogin.length; i++) {
        if(userLogin[i].email===checkLogin){
            for (let j = 0; j < userLogin[i].cart.length; j++) {
                if(userLogin[i].cart[j].id===id){
                    userLogin[i].cart[j].quantity = ++userLogin[i].cart[j].quantity;
                    localStorage.setItem("users", JSON.stringify(userLogin));
                }
                renderCart();
            }
        }
    }
}

function remove(id) {
    for(let i=0;i<userLogin.length;i++){
        if(userLogin[i].email===checkLogin){
            for(let j=0;j<userLogin[i].cart.length;j++){
                if(userLogin[i].cart[j].id===id){
                    let check = confirm("Bạn thực sự muốn xóa sản phẩm này chư?");
                    if(check){
                        userLogin[i].cart.splice(j,1);
                        localStorage.setItem("users", JSON.stringify(userLogin));
                        for (let i = 0; i < userLogin.length; i++) {
                            if(userLogin[i].cart != ""){
                                cartCount.style.display = "block";
                                cartCount.innerHTML = userLogin[i].cart.length;
                                break;
                            }else{
                                cartCount.style.display = "none";
                            }
                        }
                    }
                    renderCart();
                }
            } 
        }
    }
}