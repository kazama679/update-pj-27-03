// Lấy ra element của trang
const formRegister = document.getElementById("formRegister");
const userNameElement = document.getElementById("userName");
const emailElement = document.getElementById("email");
const passwordElement = document.getElementById("password");
const rePasswordElement = document.getElementById("rePassword");
const addressElement = document.getElementById("address");

// Element liên quan tới lỗi
const userNameError = document.getElementById("userNameError");
const emailError = document.getElementById("emailError");
const emailError2 = document.getElementById("emailError2");
const passwordError = document.getElementById("passwordError");
const rePasswordError = document.getElementById("rePasswordError");

// Lấy dữ liệu từ localStorage
const userLocal = JSON.parse(localStorage.getItem("users")) || [];

emailElement.addEventListener("input", function () {
    emailError2.style.display = "none";
});

/**
 * Validate địa chỉ email
 * @param {*} email: chuỗi email người dùng nhập vào
 * @returns: true nếu email đúng định dạng, false nếu email không đúng định dạng
 * Author: NXQuang(02/07/2005)
 */

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
// Lắng nghe sự kiện blur (khi người dùng rời khỏi trường nhập liệu) để kiểm tra định dạng email
emailElement.addEventListener("blur", function () {
    // Kiểm tra định dạng email khi người dùng rời khỏi trường nhập liệu
    if (emailElement.value && !validateEmail(emailElement.value)) {
        // Hiển thị thông báo lỗi về định dạng email không hợp lệ
        emailError2.style.display = "block";
        emailError2.innerHTML = "Email không hợp lệ";
    }
});





// Lắng nghe sự kiện submit form đăng ký tài khoản
formRegister.addEventListener("submit", function (event) {
    // Ngăn chặn sự kiện load lại trang
    event.preventDefault();

    // Validate dữ liệu đầu vào
    let hasError = false;

    if (!userNameElement.value) {
        // Hiển thị lỗi
        userNameError.style.display = "block";
        hasError = true;
    } else {
        // Ẩn lỗi
        userNameError.style.display = "none";
    }

    if (!emailElement.value) {
        // Hiển thị lỗi
        emailError.style.display = "block";
        hasError = true;
    } else if (!validateEmail(emailElement.value)) {
        // Hiển thị lỗi về định dạng email không hợp lệ
        emailError2.style.display = "block";
        hasError = true;
    } else {
        // Ẩn lỗi
        emailError.style.display = "none";
        emailError2.style.display = "none";
    }

    if (!passwordElement.value) {
        // Hiển thị lỗi
        passwordError.style.display = "block";
        hasError = true;
    } else {
        // Ẩn lỗi
        passwordError.style.display = "none";
    }

    if (!rePasswordElement.value) {
        // Hiển thị lỗi
        rePasswordError.style.display = "block";
        hasError = true;
    } else {
        // Ẩn lỗi
        rePasswordError.style.display = "none";
    }

    // Kiểm tra mật khẩu với nhập lại mật khẩu
    if (passwordElement.value !== rePasswordElement.value) {
        // Hiển thị lỗi
        rePasswordError.style.display = "block";
        rePasswordError.innerHTML = "Mật khẩu không khớp";
        hasError = true;
    }

    if (!hasError) {
        // Kiểm tra xem email đã tồn tại trong danh sách người dùng chưa
        for (let i = 0; i < userLocal.length; i++) {
            if (emailElement.value === userLocal[i].email) {
                emailError2.style.display = "block";
                hasError = true;
                break;
            }
        }
    }

    if (!hasError) {
        // Gửi dữ liệu từ form lên localStorage
        const user = {
            userId: Math.floor(Math.random() * 100000000) + 1,
            userName: userNameElement.value,
            email: emailElement.value,
            password: passwordElement.value,
            address: addressElement.value,
            cart: [],
            status: true
        };
        // Push user vào trong mảng userLocal
        userLocal.push(user);

        // Lưu trữ dữ liệu lên local
        localStorage.setItem("users", JSON.stringify(userLocal));

        // Xử lý sau khi đăng ký thành công (ví dụ: chuyển hướng đến trang đăng nhập)
        window.location.href = "./login.html";
    }
});
