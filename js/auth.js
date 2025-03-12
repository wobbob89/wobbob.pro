document.addEventListener("DOMContentLoaded", function () {
    console.log("Authentication System Loaded 🔑");

    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (username === "dj-wobbob" && password === "securepassword") {
                alert("Login Successful 🎉");
                localStorage.setItem("userLoggedIn", "true");
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid Credentials ❌");
            }
        });

        if (localStorage.getItem("userLoggedIn") === "true") {
            console.log("User Already Logged In ✅");
        }
    }
});
