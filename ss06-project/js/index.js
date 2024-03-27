// let products = [
//     {
//         image: "./assets/images/125822304.jpeg",
//         id: 111,
//         name: "Ốp điện thoại Iphone15",
//         price: 50000,
//         stock: 100,
//         category: "Điện thoại",
//         content: "Ốp lưng IPhone Hở Táo viền vuông - Tích hợp kính bảo vệ Camera 7Plus/8Plus/X/Xr/Xsmax/11/12/13/14/15 Pro/Promax/ Mini",
//     },
//     {
//         image: "./assets/images/250-8015-vo-case-nzxt-h9-elite-white-1.jpg",
//         id: 222,
//         name: "Vỏ máy tính cây",
//         price: 350000,
//         stock: 23,
//         category: "Máy tính",
//         content: "Vỏ máy tính chính hãng, case Glowy GL021|G339|G803 - Mini-ATX|M-ATX| - Bảo hành 1 Năm",
//     },
//     {
//         image: "./assets/images/2a-1691375040-Y8gFWxwz58.png",
//         id: 333,
//         name: "Màn hình máy tính, 2 tỉ màu",
//         price: 3000000,
//         stock: 42,
//         category: "Máy tính",
//         content: "Màn hình chính hãng Glowy 32|27''-Cong 2K QHD - Chuyên game và văn phòng.- bảo hành 2 năm",
//     },
//     {
//         image: "./assets/images/442ea4f3b51856a7223fa640c145be14.jpg_720x720q80.jpg",
//         id: 444,
//         name: "Ốp điện thoại cute",
//         price: 65000,
//         stock: 67,
//         category: "Điện thoại",
//         content: "Ốp lưng GUMAN mềm ngộ nghĩnh cặp đôi dễ thương đẹp Cho iPhone 15 14 13 12 11 Pro Max SE 2020 X XR XS 8 7 ip 6S 6 Plus kute xyab186",
//     },
// ];
// // lưu data lên trên localStorage
// localStorage.setItem("products", JSON.stringify(products));

//lấy dữ liệu về
let products = JSON.parse(localStorage.getItem("products"));

// chuyển sang VND
let formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
});

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
        break;
    } else{
        relog.style.display= "block";
    }
}


// hiển thị sản phẩm
function renderProduct() {
    let element="";
    for (let i = 0; i < products.length; i++) {
        element+=
        `
        <div class="sanPham">
            <div>
                <img style="height: 180px; width: 180px;" src="${products[i].image}" alt="">
            </div>
            <div style="padding: 5px; padding-top: 0px; height: 35px">${products[i].name}</div>
            <div class="textSp" style="padding: 5px;">${formatter.format(products[i].price)}</div>
        </div>
        `
    }
    document.getElementsByClassName("products")[0].innerHTML= element;
}
renderProduct();


let login = JSON.parse(localStorage.getItem("userLogin"))||[];
// let login = JSON.parse(localStorage.getItem("userLogin"))||[];
// đăng xuất
function logOut(){;
    localStorage.removeItem("login");
    relog.style.display = "block";
    login = [];
    localStorage.setItem("userLogin", JSON.stringify(login));
    document.getElementById("renderUser").innerHTML = "";
    window.location.href = "./pages/login.html";
}

// nút bấm chuyển đến giỏ hàng
// lấy trạng thái người dùng về
let vart = document.getElementsByClassName("fa-cart-shopping")[0];
    vart.addEventListener("click", load);
    function load() {
        if (login.status==false) {
            console.log(login.status);
            alert("Tài khoản của bạn đã bị chặn, không thể mua hàng!");
        } else if(email==""){
            window.location.href = "./pages/login.html";
        } else if (!email=="") {
            window.location.href = "./pages/cart.html";
        } else if(login.status){
            window.location.href = "./pages/cart.html";
        }
}

for (let i = 0; i < products.length; i++) {
    // nút bấm chuyển sang chi tiết sản phẩm
    // Lấy thẻ div bằng class
    const content = document.getElementsByClassName("sanPham")[i];
    // Gán sự kiện click cho thẻ div
    content.addEventListener("click", load2);
    function load2() {
        if (email=="") {
            window.location.href = "./pages/login.html";
        } else{
            window.location.href = `./pages/contentSP.html?id=${products[i].id}`;
        }
    }
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
