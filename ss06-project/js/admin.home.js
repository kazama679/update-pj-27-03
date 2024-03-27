const shopee = document.getElementsByClassName("shopee")[0];
// Gán sự kiện click cho thẻ div
shopee.addEventListener("click", load);
function load() {
    window.location.href = "../index.html";
}