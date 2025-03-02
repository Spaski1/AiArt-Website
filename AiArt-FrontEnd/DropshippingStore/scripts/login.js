document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("login-form");

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");

    function validateEmail() {
        const email = emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailError.textContent = "Please enter a valid email address.";
            return false;
        } else {
            emailError.textContent = "";
            return true;
        }
    }

    function validatePassword() {
        const password = passwordInput.value;
        if (password.length < 8) {
            passwordError.textContent = "Password must be at least 8 characters long.";
            return false;
        } else {
            passwordError.textContent = "";
            return true;
        }
    }

    emailInput.addEventListener("input", validateEmail);
    passwordInput.addEventListener("input", validatePassword);

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (isEmailValid && isPasswordValid) {
            const inputEmail = emailInput.value;
            const inputPassword = passwordInput.value;
            const hashedInputPassword = CryptoJS.SHA256(inputPassword).toString();
            const storedCreds = localStorage.getItem('user-creds-check');
            if (storedCreds) {
                const storedUser = JSON.parse(storedCreds);

                if (inputEmail === storedUser.email && hashedInputPassword === storedUser.password) {
                    localStorage.setItem('user-creds', JSON.stringify({
                        email: storedUser.email,
                        fullName: storedUser.fullName,
                        age: storedUser.age
                    }));
                    localStorage.removeItem("user-creds-check");
                    window.location.href = "./salePage.html";
                } else {
                    alert("Invalid email or password.");
                }
            } else {
                alert("No user data found. Please register first.");
            }
        } else {
            alert("Please fix the errors in the form before submitting.");
        }
    });
});
