let currentPage = 1
document.addEventListener("DOMContentLoaded", async function () {
    let data = await fetchDataService.getImg()
    let copyData = [...data]
    createCardsService.cardsDefault(copyData)
    searchInputService.addSearchEvent(copyData)
    imageFilterService.listenToCategoryFilter(copyData)
    imageFilterService.listenToStockFilter(copyData);
    imageFilterService.listenItemsPerPage(copyData, currentPage)
    itemsInCart.displayItems()
})

let fetchDataService = {
    getImg: async function () {
        try {
            let url = 'https://raw.githubusercontent.com/sedc-codecademy/sp2024-cp02-dsw-3/development/DropshippingStore/images.json'
            let res = await fetch(url)
            let data = await res.json()

            return [...data]

        } catch (error) {
            console.log(error)
        }
    }
}


const createCardsService = {
    items: document.getElementById("itemsPerPAge"),
    divShowingCards: document.getElementById("cardContainer"),
    pageNumber: document.getElementById("pagination"),
    cardsDefault:  function (data) {
        this.createCards(data, currentPage)
        categoriesService.addAscEvent(data)
        categoriesService.addDescEvent(data)


    },
    itemsCart: function(item){
        let itemsInCart = JSON.parse(localStorage.getItem("cart-items")) || []
        console.log(itemsInCart, "itemsInCart")
        let img = itemsInCart.find(i=>i.id==item.id)
        return img
    },
    createCards: function (images, page) {
        let numOfImagesPerPage = parseInt(this.items.value)
        this.divShowingCards.innerHTML = "";
        page--;
        let start = numOfImagesPerPage * page
        let end = start + numOfImagesPerPage
        let pagginatedItems = images.slice(start, end)
        for (let i = 0; i < pagginatedItems.length; i++) {

            this.divShowingCards.innerHTML += `
             <article class="card" >
                <img
                class="card__background"
                src=${pagginatedItems[i].imageUrl}
                alt=${pagginatedItems[i].type}
                width="1920"
                height="2193"/>
                    <div class="card__content | flow" id='card__content'>
                        <div class="card__content--container | flow">
                            <p class="card__description">${pagginatedItems[i].category}</p>
                            <p class="img-price">${pagginatedItems[i].price}$</p>
                            <div class="buttonsContainer" id='${pagginatedItems[i].id}' data-item='${JSON.stringify(pagginatedItems[i])}'>
                                <p class="details__button"><img src='../icons/icons8-info-64.png' alt='info icon' width ='38'/></p>
                            </div>

                        </div>
                        
                    </div>
            </article> 
           
            `;

            let cart = createCardsService.itemsCart(pagginatedItems[i])
            if (pagginatedItems[i].stock == true  && !cart) {
                let parentDiv = document.getElementById(`${pagginatedItems[i].id}`)
                parentDiv.innerHTML += `<p class="card__button"><img src="../icons/icons8-add-to-cart-48.png" alt="Add to cart" width ='38' ></p>`
            }

        }
        addToCartService.addEventsAddToCart()
        const arrayToBeSorted = [...images]
        categoriesService.addAscEvent(arrayToBeSorted)
        categoriesService.addDescEvent(arrayToBeSorted)
        this.setupPagination(images, this.pageNumber)
        popUpImagesService.addEventsImgButtons()//POP UP
        
        

    }, setupPagination(images, wrapper) {
        let numOfImagesPerPage = parseInt(this.items.value)
        wrapper.innerHTML = ""
        let page_count = Math.ceil(images.length / numOfImagesPerPage)
        if(page_count == 1){
            let btn = this.paginationButton(page_count,images)
            wrapper.appendChild(btn)
        }else{
            for (let i = 1; i < page_count + 1; i++) {
                let btn = this.paginationButton(i, images)
                wrapper.appendChild(btn)
            }
        }
        
    },
    paginationButton: function (page, images) {
        let button = document.createElement('button')
        button.innerText = page
        if (currentPage == page) {
            button.classList.add("active")
        }
        button.addEventListener("click", function (event) {
            currentPage = page
            createCardsService.createCards(images, currentPage)
            let current_btn = document.querySelector('.page-numbers button.active')
            current_btn.classList.remove('active')
            event.target.classList.add('active')
            current_btn.style.color = "red"

        })
        return button
    }

}

const imageFilterService = {
    categoryFilter: document.getElementById("categorySelect"),
    stockFilter: document.getElementById("filterStock"),
    items: document.getElementById("itemsPerPAge"),

    listenToCategoryFilter: (data) => {
        imageFilterService.categoryFilter.addEventListener("change", async function () {
            currentPage=1
            imageFilterService.stockFilter.value = "default"
            await imageFilterService.filterImagesCategories(data)
        })
    },
    listenToStockFilter: (data) => {
        imageFilterService.stockFilter.addEventListener("change",async  function () {
            currentPage=1
            await imageFilterService.filterImagesStock(data)
            
        })
    },

    filterImagesCategories: async(images) => {

        const categoryFilter = imageFilterService.categoryFilter.value;
        

        let filteredImages
        if(categoryFilter == "default"){
            filteredImages = await fetchDataService.getImg()
        }
        if (categoryFilter !== "default") {
            
            filteredImages = images.filter(image => image.category === categoryFilter);

        }

        imageFilterService.listenToStockFilter(filteredImages)
        createCardsService.createCards(filteredImages, currentPage);
    },
    filterImagesStock: async function(data){
        let filteredImages
        const stockFilter = imageFilterService.stockFilter.value;
        if (stockFilter === "available") {
            filteredImages = data.filter(image => image.stock === true);
        }else{
            let images = await fetchDataService.getImg() 
            filteredImages = images.filter(i=> i.category === imageFilterService.categoryFilter.value)
        }
        createCardsService.createCards(filteredImages, currentPage);
    },
    listenItemsPerPage: function(data){
        this.items.addEventListener("change", function(){
            if(imageFilterService.categoryFilter.value !== "default"&& imageFilterService.categoryFilter.value !== ""  && imageFilterService.stockFilter.value ==="available"){
                let images = data.filter(i=> i.category == imageFilterService.categoryFilter.value)
                let availableImg = images.filter(i=>i.stock === true)
                createCardsService.createCards(availableImg, currentPage);
                imageFilterService.stockFilter.value ="default"
                
            }else if(imageFilterService.categoryFilter.value !== "default" && imageFilterService.categoryFilter.value !== "" && imageFilterService.stockFilter.value !=="available"){
                let images = data.filter(i=> i.category == imageFilterService.categoryFilter.value)
                createCardsService.createCards(images, currentPage);

            }else if(imageFilterService.categoryFilter.value == "default" || imageFilterService.categoryFilter.value == "" && imageFilterService.stockFilter.value !=="available"){
                createCardsService.cardsDefault(data, currentPage)

            }else if(imageFilterService.categoryFilter.value =="" || imageFilterService.categoryFilter.value =="default"  && imageFilterService.stockFilter.value =="available"){
                let images = data.filter(i=>i.stock === true)
                createCardsService.createCards(images, currentPage);
                imageFilterService.stockFilter.value="default"
            }
            
        })
    }
};


const categoriesService = {
    ascendingBtn: document.getElementById("lowToHigh"),
    descendingBtn: document.getElementById("highToLow"),
    addAscEvent: function (data) {
        this.ascendingBtn.addEventListener("click", function () {
            categoriesService.descendingBtn.classList.remove('activeBtn')
            this.classList.add("activeBtn")
            const arraySorted = data.sort(function (a, b) { return a.price - b.price });
            createCardsService.createCards(arraySorted, currentPage)
        })
    },
    addDescEvent: function (data) {
        this.descendingBtn.addEventListener("click", function () {
            categoriesService.ascendingBtn.classList.remove('activeBtn')
            this.classList.add("activeBtn")
            const arraySorted = data.sort(function (a, b) { return b.price - a.price })
            createCardsService.createCards(arraySorted, currentPage)
        })
    }

}



const searchInputService = {
    searchInput: document.getElementById("searchInput"),
    addSearchEvent: async function (data) {
        if (this.searchInput) {
            searchInputService.searchInput.addEventListener("keydown", async function (event) {
                currentPage = 1
                if (event.code === 'Enter') {
                    document.getElementsByTagName('main')[0].scrollIntoView()
                    const searchedItems = searchInputService.searchDB(data)
                    searchInputService.searchInput.value = '';
                    if (searchedItems.length == 0) {
                        searchInputService.noItemsToShow()
                        createCardsService.cardsDefault(data)
                        imageFilterService.categoryFilter.value = ("")
                        imageFilterService.stockFilter.value = ('default')

                    } else {
                        
                        imageFilterService.categoryFilter.value = ("")
                        imageFilterService.stockFilter.value = ('default')
                        createCardsService.createCards(searchedItems, currentPage)
                        searchInputService.searchInput.value = ""
                        
                    }
                }
            })
        }
    },
    searchDB: function (data) {
        const result = data.filter(item => {
            if (item.tags.find(str => str == searchInputService.searchInput.value.toLowerCase() || str.includes(searchInputService.searchInput.value.toLowerCase()))) {
                return item
            }
        })
        return result
    },
    noItemsToShow: function(){
        const divNoItems = document.getElementById("noItemsFound")
        divNoItems.style.display = "block"
        setTimeout(() => { divNoItems.style.display = "none" }, 4000)
    }

}


const addToCartService = {
    addToCartBtn: document.getElementsByClassName("card__button"),
    addEventsAddToCart: function () {
        for (let button of this.addToCartBtn) {
            button.addEventListener("click", function (event) {
                event.preventDefault()
                let img = button.parentElement.getAttribute('data-item')
                let item = JSON.parse(img)
                addToCartService.cartEvent(item)
                button.style.display = "none"
            })
        }

    }, cartEvent: function (img) {
        let items = JSON.parse(localStorage.getItem("cart-items")) || []
        let check = items.find(i=> i.id ==img.id)
        if(!check){
            items.push(img)
            localStorage.setItem("cart-items", JSON.stringify(items))
            itemsInCart.displayItems()
            console.log(items)
        }

    }
}



const itemsInCart = {
    cart: document.getElementById("cart-count"),
    displayItems: function () {
        let storedCart = JSON.parse(localStorage.getItem("cart-items")) || []
        this.cart.textContent = storedCart.length;
        this.cart.style.display = storedCart.length > 0 ? 'block' : 'none';
    }
}



//For PopUp
const popUpImagesService = {
    addEventsImgButtons: function () {
        const buttons = document.getElementsByClassName("details__button");
        for (let button of buttons) {
            button.addEventListener("click",  function (event) {
                event.preventDefault();
                let item  = button.parentElement.getAttribute('data-item')
                console.log(item)
                let imageData = JSON.parse(item)
                console.log(imageData)
                if (imageData) {
                    showPopup(imageData);
                }
                let cardBtn = document.getElementById(`${imageData.id}`).children[1]
                let cart = createCardsService.itemsCart(imageData)
                if (imageData.stock === true && !cart) {
                    // cardBtn.style.display!=='none'
                    let btn = document.getElementById('add')
                    btn.style.display = "flex"
                    btn.addEventListener("click", function (event) {
                        event.preventDefault()
                        addToCartService.cartEvent(imageData)
                        cardBtn.style.display = 'none'
                        this.style.display = 'none'
                    })
                } else {
                    document.getElementById('add').style.display = "none"
                }
            });
        }
    }
};
//Pop up
function showPopup(imageData) {
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popup-text');
    const popupClose = document.getElementById('popup-close');
    const popupImage = document.getElementById('popup-image');
    const popupHeader = document.getElementById('popup-header')
    const stockStatus = imageData.stock ? ' ✓' : ' ✘';

    // Update the popup image
    popupImage.src = imageData.imageUrl;
    popupImage.alt = imageData.type;
    // Update the popup content

    popupHeader.innerHTML = `<h3>${imageData.category}</h3>`
    popupText.innerHTML = `
        
        <p><span>■ Description:</span>  ${imageData.description}</p>
        <p><span>■ Artist:</span>  ${imageData.artist.userName}</p>
        <p><span>■ Price:</span>  ${imageData.price}$</p>
        <p><span>■ In Stock:</span>  ${stockStatus}</p>
    `;

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

}

