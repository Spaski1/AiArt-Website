document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("stripe-login");
    const passwordInput = document.getElementById("password");
    const passwordError = document.getElementById("password-error");
    const userCreds = JSON.parse(localStorage.getItem("user-creds-check"));
    console.log(userCreds.password);

    function validatePassword(password) {
      return password.length >= 8;
    }
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      const newPassword = passwordInput.value.trim();
  
      passwordError.textContent = "";
  
      if (!validatePassword(newPassword)) {
        passwordError.textContent = "Password must be at least 8 characters long.";
        return;
      }
  
      const encryptedPassword = CryptoJS.SHA256(newPassword).toString();
  
      userCreds.password = encryptedPassword;
      localStorage.setItem("user-creds-check", JSON.stringify(userCreds));
  
      alert("Password updated successfully!");
  
      window.location.href = "loginPage.html";
    });
  });
  