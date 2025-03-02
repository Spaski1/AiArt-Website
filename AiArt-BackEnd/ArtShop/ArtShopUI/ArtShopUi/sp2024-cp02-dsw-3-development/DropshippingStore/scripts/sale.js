document.addEventListener("DOMContentLoaded", function() {
    let ITEMS_PER_PAGE = 12;
    let currentPage = 1;
    let allData = [];
    const cartBadge = document.getElementById("cart-count");
    updateCartBadge();
    function isAuthenticated() {
        return localStorage.getItem("user-creds") !== null;
    }

    if (!isAuthenticated()) {
        document.location.href = "./loginPage.html";
        return;
    }

    async function fetchImages(url) {
        try {
            let res = await fetch(url);
            let data = await res.json();
            return [...data];
        } catch (error) {
            console.log(error);
        }
    }

    function calculatePercentage(part, whole) {
        return Math.round((part / whole) * 100);
    }

    function createCards(data) {
        const divShowingCards = document.getElementById("cardContainer");
        divShowingCards.innerHTML = "";
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        const pageItems = data.slice(start, end);

        for (let i = 0; i < pageItems.length; i++) {
            const item = pageItems[i];
            if (item) {
                const cardHTML = `
                    <article class="card">
                        <div class="first">
                            <img class="card__background" src="${item.imageUrl}" alt="${item.type}" width="1920" height="2193"/>
                            <div class="salePercentage">Sale - ${100 - calculatePercentage(item.discPrice, item.price)}%</div>
                        </div>
                        <div class="card__content | flow">
                            <div class="card__content--container | flow">
                                <p class="card__description">${item.category}</p>
                                <p class="img-price">${item.discPrice}$</p>
                                <div class="buttonsContainer" id="${item.id}" data-item='${JSON.stringify(item)}'>
                                    <p class="details__button"><img src='../icons/icons8-info-64.png' alt='info icon' width ='38'/></p>
                                    ${item.stock ? `<p class="card__button"><img src="../icons/icons8-add-to-cart-48.png" alt="Add to cart" width="38" data-item='${JSON.stringify(item)}'></p>` : ''}
                                </div>
                            </div>
                        </div>
                    </article>
                `;
                divShowingCards.innerHTML += cardHTML;
            }
        }

        addEventsAddToCart();
        addEventsShowDetails();
        renderPaginationControls(data.length);
    }

    function renderPaginationControls(totalItems) {
        const paginationContainer = document.getElementById("pagination");
        paginationContainer.innerHTML = "";

        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.textContent = i;
            pageButton.classList.add("page-button");
            if (i === currentPage) {
                pageButton.classList.add("active");
            }

            pageButton.addEventListener("click", function() {
                currentPage = i;
                createCards(allData);
            });

            paginationContainer.appendChild(pageButton);
        }
    }

    async function showDefaultCards(url) {
        const data = await fetchImages(url);
        let dataDiscount = data.filter((data) => data.onDiscount);
        allData = dataDiscount;
        createCards(dataDiscount);
    }

    async function filterImages() {
        const categorySelect = document.getElementById("categorySelect").value;
        const filterStock = document.getElementById("filterStock").value;

        let filteredData = [...allData];

        if (categorySelect !== "default" && categorySelect !== "") {
            filteredData = filteredData.filter(item => item.category === categorySelect);
        }

        if (filterStock === "available") {
            filteredData = filteredData.filter(item => item.stock);
        }

        currentPage = 1;
        createCards(filteredData);
    }

    async function AscBtn(url) {
        const data = await fetchImages(url);
        const ascendingBtn = document.getElementById("lowToHigh");
        let dataDiscount = data.filter((data) => { return data.onDiscount });
        ascendingBtn.addEventListener("click", function() {
            const arraySorted = [...dataDiscount].sort((a, b) => a.discPrice - b.discPrice);
            allData = arraySorted;
            currentPage = 1;
            createCards(arraySorted);
        });
    }

    async function DscBtn(url) {
        const data = await fetchImages(url);
        const descendingBtn = document.getElementById("highToLow");
        let dataDiscount = data.filter((data) => { return data.onDiscount });
        descendingBtn.addEventListener("click", function() {
            const arraySorted = [...dataDiscount].sort((a, b) => b.discPrice - a.discPrice);
            allData = arraySorted;
            currentPage = 1;
            createCards(arraySorted);
        });
    }

    function addSearchEvent() {
        const searchInput = document.getElementById("searchInput");

        searchInput.addEventListener("keydown", async function(event) {
            if (event.code === 'Enter') {
                const searchedItems = await searchDB(url);
                searchInput.value = '';
                document.getElementsByTagName('main')[0].scrollIntoView()
                if (searchedItems.length == 0) {
                    const divNoItems = document.getElementById("noItemsFound");
                    divNoItems.style.display = "block";
                    setTimeout(() => { divNoItems.style.display = "none" }, 4000);
                    await showDefaultCards(url);
                } else {
                    allData = searchedItems;
                    currentPage = 1;
                    createCards(searchedItems);
                }
            }
        });
    }

    async function searchDB(url) {
        const data = await fetchImages(url);
        let dataDiscount = data.filter((data) => data.onDiscount);
        const searchInput = document.getElementById("searchInput").value;

        const result = dataDiscount.filter(item => item.tags.includes(searchInput));
        return result;
    }

    function addEventsAddToCart() {
        const addToCartBtns = document.getElementsByClassName("card__button");

        for (let button of addToCartBtns) {
            const item = JSON.parse(button.querySelector("img").getAttribute('data-item'));
            const storedCart = JSON.parse(localStorage.getItem("cart-items")) || [];

            if (storedCart.find(cartItem => cartItem.id === item.id)) {
                button.classList.add("added-to-cart");
                button.innerHTML = "Added to Cart";
            } else {
                button.addEventListener("click", async function(event) {
                    event.preventDefault();
                    const item = JSON.parse(event.target.getAttribute('data-item'));
                    await addToCart(item);
                    updateCartBadge();
                });
            }
        }
    }

    async function addToCart(item) {
        try {
            const storedCart = JSON.parse(localStorage.getItem("cart-items")) || [];

            if (storedCart.some(cartItem => cartItem.id === item.id)) {
                alert("This item already exists in the cart");
                return;
            }

            storedCart.push(item);
            localStorage.setItem("cart-items", JSON.stringify(storedCart));
            console.log("Item added to cart:", item);

            const buttonContainer = document.getElementById(item.id);
            if (buttonContainer) {
                const addToCartButton = buttonContainer.querySelector(".card__button");
                if (addToCartButton) {
                    addToCartButton.classList.add("added-to-cart");
                    addToCartButton.innerHTML = "Added to Cart";
                }
            }
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    }

    function updateCartBadge() {
        const storedCart = JSON.parse(localStorage.getItem("cart-items")) || [];
        cartBadge.innerText = storedCart.length;
        cartBadge.style.display = storedCart.length > 0 ? 'block' : 'none';
    }

    function displayUserCreds() {
        const userCreds = document.getElementById("userCreds");
        const storedData = JSON.parse(localStorage.getItem("user-creds"));
        userCreds.innerHTML += " " + "<b>" + storedData.fullName + "</b>" + " " + "with email: " + "<b>" + storedData.email + "</b>";
    }

    function logOut() {
        const logOutBtn = document.getElementById("LogOutBtn");

        logOutBtn.addEventListener("click", () => {
            localStorage.removeItem("user-creds");
            localStorage.removeItem("cart-items");
            document.location.href = "../templates/home.html";
        });
    }

    function getCartItems() {
        return JSON.parse(localStorage.getItem('cart-items')) || [];
    }

    function showPopup(imageData) {
        const popup = document.getElementById('popup');
        const popupText = document.getElementById('popup-text');
        const popupClose = document.getElementById('popup-close');
        const popupImage = document.getElementById('popup-image');
        const popupHeader = document.getElementById('popup-header');
        const stockStatus = imageData.stock ? ' ✓' : ' ✘';
        const btnDiv = document.getElementById("btnDiv");

        const cartItems = getCartItems();
        const isInCart = cartItems.some(item => item.id === imageData.id);
    
        popupImage.src = imageData.imageUrl;
        popupImage.alt = imageData.type;
    
        popupHeader.innerHTML = `<h3>${imageData.category}</h3>`;
        popupText.innerHTML = `
            <p><span>■ Description:</span> ${imageData.description}</p>
            <p><span>■ Artist:</span> ${imageData.artist.userName}</p>
            <p><span>■ Price:</span> ${imageData.discPrice}$</p>
            <p><span>■ In Stock:</span> ${stockStatus}</p>`;
            btnDiv.innerHTML = !isInCart && imageData.stock ? `<p class="proba"><img src="../icons/icons8-add-to-cart-black.png" alt="Add to cart" width="38" data-item='${JSON.stringify(imageData)}'></p>` : '';


        popup.classList.remove('hidden');
        popup.style.display = 'flex';
    
        popupClose.addEventListener('click', () => {
            popup.classList.add('hidden');
            popup.style.display = 'none';
        });
    
        popup.addEventListener('click', (event) => {
            if (event.target === popup) {
                popup.classList.add('hidden');
                popup.style.display = 'none';
            }
        });
    
        // Add to cart button event listener
        const addToCartButton = popup.querySelector('.proba img');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', async function(event) {
                event.preventDefault();
                const item = JSON.parse(event.target.getAttribute('data-item'));
                await addToCart(item);
                updateCartBadge();
                btnDiv.innerHTML = '';
            });
        }
    }
    
    

    function addEventsShowDetails() {
        const detailButtons = document.getElementsByClassName("details__button");

        for (let button of detailButtons) {
            button.addEventListener("click", function(event) {
                const item = JSON.parse(event.target.closest(".buttonsContainer").getAttribute('data-item'));
                showPopup(item);
            });
        }
    }

    const url = "https://raw.githubusercontent.com/sedc-codecademy/sp2024-cp02-dsw-3/development/DropshippingStore/images.json";
    showDefaultCards(url);
    AscBtn(url);
    DscBtn(url);
    addSearchEvent();
    displayUserCreds();
    logOut();
 

    document.getElementById("categorySelect").addEventListener("change", filterImages);
    document.getElementById("filterStock").addEventListener("change", filterImages);

    document.getElementById("itemsPerPage").addEventListener("change", function() {
        ITEMS_PER_PAGE = parseInt(this.value);
        currentPage = 1;
        renderPaginationControls(allData.length);
        createCards(allData);
    });

    addEventsShowDetails();
});
