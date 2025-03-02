let user = isAuthenticated()
if(!user){
    document.getElementById('LogOutBtn').style.display = 'none'
    
    document.getElementById('LoginBtn').style.display = 'block'
}else{
    document.getElementById('LogOutBtn').style.display = 'block'
    
    document.getElementById('LoginBtn').style.display = 'none'
}

function isAuthenticated() {
    return localStorage.getItem("user-creds") !== null;
}

const logOutBtn = document.getElementById("LogOutBtn");
logOutBtn.addEventListener("click", () => {
    localStorage.removeItem("user-creds");
    localStorage.removeItem("cart-items");
    document.location.href = "../templates/home.html";
});
