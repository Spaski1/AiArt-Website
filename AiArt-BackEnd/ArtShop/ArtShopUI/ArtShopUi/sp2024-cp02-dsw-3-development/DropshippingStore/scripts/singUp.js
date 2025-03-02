document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("stripe-login");

    const emailInput = document.getElementById("email");
    const fullNameInput = document.getElementById("fullName");
    const ageInput = document.getElementById("age");
    const passwordInput = document.getElementById("password");

    const emailError = document.getElementById("email-error");
    const nameError = document.getElementById("name-error");
    const ageError = document.getElementById("age-error");
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

    function validateFullName() {
        const fullName = fullNameInput.value;
        const nameRegex = /^[A-Za-z\s]{2,}$/;
        if (!nameRegex.test(fullName)) {
            nameError.textContent = "Please enter a valid full name (at least 2 letters and spaces only).";
            return false;
        } else {
            nameError.textContent = "";
            return true;
        }
    }

    function validateAge() {
        const age = ageInput.value;
        const ageRegex = /^(?:1[01][0-9]|120|[1-9][0-9]?)$/;
        if (!ageRegex.test(age)) {
            ageError.textContent = "Please enter a valid age (between 1 and 120).";
            return false;
        } else {
            ageError.textContent = "";
            return true;
        }
    }

    function validatePassword() {
        const password = passwordInput.value;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(password)) {
            passwordError.textContent = "Please enter a valid password (at least 8 characters, including at least one number, one uppercase letter, and one lowercase letter).";
            return false;
        } else {
            passwordError.textContent = "";
            return true;
        }
    }

    function saveToLocalStorage() {
        const userCreds = {
            email: emailInput.value,
            fullName: fullNameInput.value,
            age: ageInput.value,
            password: CryptoJS.SHA256(passwordInput.value).toString() 
        };
        localStorage.setItem('user-creds-check', JSON.stringify(userCreds));
    }

    function clearForm() {
        emailInput.value = "";
        fullNameInput.value = "";
        ageInput.value = "";
        passwordInput.value = "";
    }

    emailInput.addEventListener("input", validateEmail);
    fullNameInput.addEventListener("input", validateFullName);
    ageInput.addEventListener("input", validateAge);
    passwordInput.addEventListener("input", validatePassword);

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const isEmailValid = validateEmail();
        const isFullNameValid = validateFullName();
        const isAgeValid = validateAge();
        const isPasswordValid = validatePassword();

        if (isEmailValid && isFullNameValid && isAgeValid && isPasswordValid) {
            saveToLocalStorage();
            alert("Form submitted successfully!");
            clearForm();
            form.submit();
        } else {
            alert("Please fix the errors in the form before submitting.");
        }
    });
});
