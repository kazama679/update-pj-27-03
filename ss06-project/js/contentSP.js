// nút tăng
let valueNumber = document.getElementsByClassName("form-control")[0] || null;
function up() {
    let valueNumber = document.getElementsByClassName("form-control")[0];
    if (valueNumber !== null) {
        valueNumber.value = parseInt(valueNumber.value) + 1;
    }
}

function down() {
    let valueNumber = document.getElementsByClassName("form-control")[0];
    if (valueNumber !== null && parseInt(valueNumber.value) > 1) {
        valueNumber.value = parseInt(valueNumber.value) - 1;
    }
}



// chuyển sang VND
let formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
});


// nút bấm shopee
// Lấy thẻ div bằng class
const shopee = document.getElementsByClassName("shopee")[0];
// Gán sự kiện click cho thẻ div
shopee.addEventListener("click", load);
function load() {
    window.location.href = "../index.html";
}

//nút bấm chuyển giỏ hàng
let flagCheck = JSON.parse(localStorage.getItem("flagCheck"))||[];
if(flagCheck){
    const vart = document.getElementsByClassName("fa-cart-shopping")[0];
    vart.addEventListener("click", gioHang);
    function gioHang() {
        window.location.href = "./cart.html";
    }
    
} else{
    window.location.href = "./login.html";
}



// đăng nhập

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



// ktr xem id, nếu trùng thì hiển thị chi tiết sản phẩm
let id = window.location.href.split(`?`)[1].split(`=`)[1];
let productDetail = JSON.parse(localStorage.getItem("products"))||[];
let product = productDetail.find(function (e, i) {
    return e.id === +id;
});

// lấy về id
document.getElementById("productId").innerHTML = 
    `
    

        <div>
            <div>
                <img src=".${product.image}" alt="" height="450px" width="450px">
            </div>
            <div class="shareProduct">
                <div>Chia sẻ: 
                    <i class="fa-brands fa-facebook-messenger"></i> 
                    <i class="fa-brands fa-facebook"></i> 
                    <i class="fa-brands fa-pinterest"></i> 
                    <i class="fa-brands fa-x-twitter"></i>
                </div>|
                <div><i class="fa-regular fa-heart colorO"></i> Đã thích (217)</div>
            </div>
        </div>
        <div>
            <div class="textContentP">
                <t class="boxYeuThich">Yêu thích</t>${product.content}
            </div>
            <div><b class="colorO">4.5 <i class="fa-regular fa-star"></i></b> | <b>1,1</b> Đánh giá | <b>4k</b> Đã bán</div>
            <div class="colorO numberPrice"><b>${formatter.format(product.price)}</b></div>
            <div>
                <div class="blurredLetters first">
                    <div class="text">Mã Giảm Giá Của Shop</div>
                    <img src="../assets/images/Ảnh chụp màn hình 2024-03-19 091748.png" alt="" style="margin-top: 15px;" height="25px" width="80px">
                </div>
            </div>
            <div>
                <div class="blurredLetters">
                    <div class="text">Chính Sách Trả Hàng</div>
                    <img src="../assets/images/Ảnh chụp màn hình 2024-03-19 092237.png" alt="" style="margin-top: 15px;" height="20px" width="130px">
                </div>
            </div>
            <div>
                <div class="blurredLetters">
                    <div class="text">Deal Sốc</div>
                    <img src="../assets/images/Ảnh chụp màn hình 2024-03-19 091757.png" alt="" style="margin-top: 15px;" height="25px" width="130px">
                </div>
            </div>
            <div>
                <div class="blurredLetters">
                    <div class="text">Vận Chuyển</div>
                    <img src="../assets/images/Ảnh chụp màn hình 2024-03-19 091805.png" alt="" style="margin-top: 15px;" height="20px" width="150px">
                </div>
            </div>
            <div>
                <div class="blurredLetters">
                    <div class="text">Số Lượng</div>


                    <div class="input-group">
                        <div class="input-group-prepend">
                            <button onclick="down()" class="btn btn-outline-secondary" type="button">-</button>
                        </div>
                        <input id="quanlitys" type="text" class="form-control" value="1">
                        <div class="input-group-append">
                            <button onclick="up()" class="btn btn-outline-secondary" type="button">+</button>
                        </div>
                    </div>


                </div>
            </div>
            <div class="cartTo">
                <div class="cartPush"><i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ hàng</div>
                <div class="payCart">Mua ngay</div>
            </div>
            <hr id="hr1">
            <div class="cloneEnd"><img src="../assets/images/Ảnh chụp màn hình 2024-03-19 091814.png" alt="" height="20px"> <p class="blurredLetters">Trả hàng miễn phí 15 ngày</p></div>
        </div>
    `



// thêm vào giỏ hàng
let cartCount = document.getElementsByClassName("numberPay")[0];
let userLogin = JSON.parse(localStorage.getItem("users"));
let checkLogin = JSON.parse(localStorage.getItem("login"));
for (let i = 0; i < userLogin.length; i++) {
  if (checkLogin == userLogin[i].email) {
    cartCount.innerHTML = userLogin[i].cart.length;
  }
}

let addPay = document.getElementsByClassName("cartPush")[0];
addPay.addEventListener("click", addVart);
function addVart() {
  let quantity = document.getElementById("quanlitys");
  for (let i = 0; i < userLogin.length; i++) {
    if (checkLogin === userLogin[i].email) {
      for (let j = 0; j < productDetail.length; j++) {
        if (id == productDetail[j].id) {
          let index = userLogin[i].cart.findIndex((item, index) => {
            return item.id == id;
          });
          if (index == -1) {
            userLogin[i].cart.push({
              ...productDetail[j],
              quantity: +quantity.value,
            });
            cartCount.innerHTML = userLogin[i].cart.length;
            localStorage.setItem("users", JSON.stringify(userLogin));
          } else {
            userLogin[i].cart[index].quantity += +quantity.value;
            localStorage.setItem("users", JSON.stringify(userLogin));
          }
        }
      }
    }
  }
}