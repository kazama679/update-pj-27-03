let d = new Date();
let dd = d.getDate();
let mm = d.getMonth();
let yy = d.getFullYear();
let date = dd + '/' + mm +'/' + yy;
// let category = [
//     {
//         id: 1,
//         name: "Màn hình máy tính",
//         date: date
//     },  
//     {
//         id: 2,
//         name: "Điện thoại",
//         date: date
//     }, 
//     {
//         id: 3,
//         name: "Ốp điện thoại",
//         date: date
//     },
//     {
//         id: 4,
//         name: "Chuột",
//         date: date
//     },
//     {
//         id: 5,
//         name: "Lót chuột",        
//         date: date
//     },
// ];
// //đẩy dữ liệu category lên
// localStorage.setItem("category", JSON.stringify(category));
//lấy dữ liệu category về
let categorys = JSON.parse(localStorage.getItem("category"));

/* nút bấm về home */
let comeback = document.getElementsByClassName("topSonHeader")[0];
comeback.addEventListener("click", back);
function back() {
    window.location.href = "./admin.home.html";
}
//nút bấm về Shopee
const shopee = document.getElementsByClassName("shopee")[0];
shopee.addEventListener("click", load2);
function load2() {
    window.location.href = "../index.html";
}
function load() {
    let text = ""
    for (let i = 0; i < categorys.length; i++) {
        text += 
        `
        <tr>
            <td>${categorys[i].id}</td>
            <td>${categorys[i].name}</td>
            <td>${categorys[i].date}</td>
            <td class="editAll">
            <button onclick="edit(${categorys[i].id})" class="button">Sửa</button> 
            <button onclick="delete1(${categorys[i].id})" class="button">Xóa</button></td>
        </tr>
        `
    }
    editProduct.innerHTML = text;
}
load();

function delete1(id) {
    for (let i = 0; i < categorys.length; i++) {
        if(id==categorys[i].id){
            categorys.splice(i, 1);
            localStorage.setItem("category", JSON.stringify(categorys));
            break;
        }
    }
    load();
}