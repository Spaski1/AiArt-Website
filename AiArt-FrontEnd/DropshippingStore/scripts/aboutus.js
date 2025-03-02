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
