document.addEventListener("DOMContentLoaded", function () {
  const checkoutForm = document.getElementById("checkoutForm");
  const successWindow = document.getElementById("successWindow");
  const closeWindowBtn = document.getElementById("closeWindow");
  const okButton = document.getElementById("okButton");

  checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((msg) => msg.remove());

    if (validateForm()) {
      showSuccessWindow();
    }
  });

  function validateForm() {
    let isValid = true;

    const fields = [
      { id: "f-name", name: "First Name" },
      { id: "l-name", name: "Last Name" },
      { id: "city", name: "City" },
      { id: "state", name: "State" },
      { id: "zip", name: "Zip Code" },
      {
        id: "card-num",
        name: "Credit Card Number",
        pattern: /^\d{4}-\d{4}-\d{4}-\d{4}$/,
      },
      {
        id: "expire",
        name: "Expiration Date",
        pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
      },
      { id: "security", name: "Security Code (CCV)", pattern: /^\d{3}$/ },
    ];

    fields.forEach((field) => {
      const input = document.getElementById(field.id);
      if (!input.value.trim()) {
        showError(input, `${field.name} is required`);
        isValid = false;
      } else if (field.pattern && !field.pattern.test(input.value)) {
        showError(input, `Invalid ${field.name}`);
        isValid = false;
      }
    });

    return isValid;
  }

  function showError(input, message) {
    const errorMessage = document.createElement("div");
    errorMessage.className = "error-message";
    errorMessage.style.color = "red";
    errorMessage.innerText = message;
    input.parentElement.appendChild(errorMessage);
  }

  function showSuccessWindow() {
    successWindow.style.display = "block";
  }

  closeWindowBtn.addEventListener("click", function () {
    successWindow.style.display = "none";
    checkoutForm.reset();
    clearCartItems();
    window.location.href = "./home.html";
  });

  okButton.addEventListener("click", function () {
    successWindow.style.display = "none";
    checkoutForm.reset();
    clearCartItems();
    window.location.href = "./home.html";
  });

  function clearCartItems() {
    localStorage.removeItem("cart-items");
  }
});
