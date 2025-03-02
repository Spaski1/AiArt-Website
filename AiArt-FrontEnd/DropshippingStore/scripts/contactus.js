const itemsInCart = {
    cart: document.getElementById("cart-count"),
    displayItems: function () {
        let storedCart = JSON.parse(localStorage.getItem("cart-items")) || []
        this.cart.textContent = storedCart.length;
        this.cart.style.display = storedCart.length > 0 ? 'block' : 'none';
    }
}
document.addEventListener("DOMContentLoaded", function(){
    itemsInCart.displayItems()
})


const inputs = document.querySelectorAll(".input");

function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add("focus");
}

function blurFunc() {
    let parent = this.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");
    }
}

inputs.forEach((input) => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const messageField = document.getElementById('message');


    const nameError = document.createElement('div');
    const emailError = document.createElement('div');
    const phoneError = document.createElement('div');
    const messageError = document.createElement('div');

    nameError.className = 'error-message';
    emailError.className = 'error-message';
    phoneError.className = 'error-message';
    messageError.className = 'error-message';

    nameField.parentNode.appendChild(nameError);
    emailField.parentNode.appendChild(emailError);
    phoneField.parentNode.appendChild(phoneError);
    messageField.parentNode.appendChild(messageError);

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Validate the form
        if (validateForm()) {
            feedback.textContent =
                "Thank you for your message. We will get back to you shortly.";
            feedback.style.color = "white";
            feedback.style.display = "block";
            feedback.style.marginLeft = "10px";
            feedback.style.fontStyle = "italic";
            feedback.style.marginBottom = "10px";
            feedback.style.padding = "10px";
            feedback.style.textShadow = "-4px -1px 7px #707070, 5px 5px 10px #765656";
            form.reset();
        }
    });

    function validateForm() {
        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const phone = phoneField.value.trim();
        const message = messageField.value.trim();

        let valid = true;

        const namePattern = /^[A-Za-z\s]+$/;
        if (name === '') {
            nameError.textContent = 'Your Name is requiwhite.';
            nameError.style.color = 'white';
            valid = false;
        } else if (!namePattern.test(name)) {
            nameError.textContent = 'Please enter a valid name with letters only.';
            nameError.style.color = 'white';
            valid = false;
        } else {
            nameError.textContent = '';
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            emailError.textContent = 'Email is requiwhite.';
            emailError.style.color = 'white';
            valid = false;
        } else if (!emailPattern.test(email)) {
            emailError.textContent = 'Please enter a valid email address.';
            emailError.style.color = 'white';
            valid = false;
        } else {
            emailError.textContent = '';
        }

        const phonePattern = /^\d{9}$/;
        if (phone === "") {
            phoneError.textContent = "Phone is required.";
            phoneError.style.color = "white";
            valid = false;
        } else if (!phonePattern.test(phone)) {
            phoneError.textContent = "Please enter a valid phone number.";
            phoneError.style.color = "white";
            valid = false;
        } else {
            phoneError.textContent = "";
        }

        if (message === '') {
            messageError.textContent = 'Message is requiwhite.';
            messageError.style.color = 'white';
            valid = false;
        } else {
            messageError.textContent = '';
        }

        return valid;
    }

    // Real-time validation
    nameField.addEventListener('input', validateField);
    emailField.addEventListener('input', validateField);
    phoneField.addEventListener('input', validateField);
    messageField.addEventListener('input', validateField);

    function validateField(event) {
        const field = event.target;
        const value = field.value.trim();
        let errorElement;

        switch (field.id) {
            case 'name':
                errorElement = nameError;
                break;
            case 'email':
                errorElement = emailError;
                break;
            case 'phone':
                errorElement = phoneError;
                break;
            case 'message':
                errorElement = messageError;
                break;
        }

        if (value === '') {
            errorElement.textContent = `${field.previousElementSibling.textContent} is requiwhite.`;
            errorElement.style.color = 'white';
        } else if (field.id === 'name') {
            const namePattern = /^[A-Za-z\s]+$/;
            if (!namePattern.test(value)) {
                errorElement.textContent = 'Please enter a valid name with letters only.';
                errorElement.style.color = 'white';
            } else {
                errorElement.textContent = '';
            }
        } else if (field.id === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                errorElement.textContent = 'Please enter a valid email address.';
                errorElement.style.color = 'white';
            } else {
                errorElement.textContent = '';
            }
        } else if (field.id === "phone") {
            const phonePattern = /^\d{9}$/;
            if (!phonePattern.test(value)) {
                errorElement.textContent = "Please enter a valid phone number.";
                errorElement.style.color = "white";
            } else {
                errorElement.textContent = "";
            }
        } else {
            errorElement.textContent = "";
        }
    }
});
