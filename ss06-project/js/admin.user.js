const shopee = document.getElementsByClassName("shopee")[0];

// Gán sự kiện click cho thẻ div
shopee.addEventListener("click", load);
function load() {
    window.location.href = "../index.html";
}

//lấy dữ liệu về
let userADM = JSON.parse(localStorage.getItem("users"))||[];

for (let i = 0; i < userADM.length; i++) {
    document.getElementById("ADMuser").innerHTML += 
    `
        <tr>
            <td>${i+1}</td>
            <td>${userADM[i].userName}</td>
            <td>${userADM[i].userId}</td>   
            <td>${userADM[i].email}</td>
            <td>${userADM[i].address}</td>
            <td class="Tdbutton"><button class="button blockUser" onclick="blockUser(${userADM[i].userId})">Chặn</button></td>
        </tr>
    `
}

/* nút bấm về home */
let comeback = document.getElementsByClassName("topSonHeader")[0];
comeback.addEventListener("click", back);
function back() {
    window.location.href = "./admin.home.html";
}



// chặn người dùng
let change = document.getElementsByClassName("blockUser")[0];
let login = JSON.parse(localStorage.getItem("users"));
function blockUser(id){
    for (let i = 0; i < login.length; i++) {
        if(login[i].userId==id){
            if (login[i].status==true) {
                login[i].status = false;
                console.log(login[i].status);
                change.innerHTML = "Chặn";
                console.log(login);
                localStorage.setItem("userLogin", JSON.stringify(login));
            } else if(login[i].status==false){
                login[i].status = true; 
                console.log(login[i].status);
                change.innerHTML = "Bỏ chặn";
                localStorage.setItem("userLogin", JSON.stringify(login));
                console.log(login);
            }
        }
    }
}