// function getItems() {
//     db.collection("items").get().then((querySnapshot) => {
//         console.log(querySnapshot);
//         let items = [];
//         querySnapshot.forEach((doc) => {
//             items.push({
//                 id: doc.id,
//                 image: doc.data().image,
//                 make: doc.data().make,
//                 name: doc.data().name,
//                 price: doc.data().price,
//                 rating: doc.data().rating
//             })
//         });
//         generateItems(items);
//     });
// }

// function generateItems(items) {
//     let itemsHTML = "";
//     items.forEach((item) => {
//         let doc = document.createElement("div");
//         doc.classList.add("main-product", "mr-5");
//         doc.innerHTML = `
//             <div class="product-image w-48 h-52 bg-white rounded-lg">
//                 <img class="w-full h-full object-contain p-4"
//                     src="${item.image}"
//             </div>
//             <div class="product-name text-gray-700 font-bold mt-2 text-sm ">
//                 ${item.name}
//             </div>
//             <div class="product-make text-green-700">
//                 ${item.make}
//             </div>
//             <div class="product-rating text-yellow-300 font-bold my-1">
//                 ⭐⭐⭐⭐⭐ ${item.rating}
//             </div>
//             <div class="product-price font-bold text-gray-700 text-lg">
//                 ₹ ${item.price}
//             </div>
//         `
//         let addToCartEl = document.createElement("div");
//         //addToCartEl.classList.add("cursor-pointer", "text-md", "text-white", "rounded", "h-8", "w-28", "bg-yellow-500", "flex", "items-center", "justify-center", "hover:bg-yellow-600", "product-add");
//         addToCartEl.classList.add("hover:bg-yellow-600", "cursor-pointer", "product-add", "h-8", "w-28", "rounded", "bg-yellow-500", "text-white", "text-md", "flex", "justify-center", "items-center");
//         addToCartEl.innerHTML = "Add to cart";
//         doc.appendChild(addToCartEl);
//         document.querySelector(".main-section-products").appendChild(doc);
//     })

// }


// getItems();


function getItems() {
    db.collection("items").get().then((querySnapshot) => {
        console.log(querySnapshot);
        let items = [];
        querySnapshot.forEach((doc) => {
            items.push({
                id: doc.id,
                image: doc.data().image,
                make: doc.data().make,
                name: doc.data().name,
                price: doc.data().price,
                rating: doc.data().rating
            })
        });
        generateItems(items);
    });
}

function addToCart(item) {
    console.log(item);
    let cartItem = db.collection("cart-items").doc(item.id);
    cartItem.get()
        .then(function(doc){
            if (doc.exists) {
                cartItem.update({
                    quantity: doc.data().quantity+1
                })
            }
            else {
                cartItem.set({
                    image: item.image,
                    make: item.make,
                    name: item.name,
                    rating: item.rating,
                    price: item.price,
                    quantity: 1
                })
            }
        })
}


function generateItems(items) {
    let itemsHTML = "";
    items.forEach((item) => {
        let doc = document.createElement("div");
        doc.classList.add("main-product", "mr-5");
        doc.innerHTML = `
            <div class="product-image w-48 h-52 bg-white rounded-lg p-4">
                <img class="w-full h-full object-contain"
                    src="${item.image}">
            </div>
            <div class="product-name text-gray-700 font-bold mt-2 text-sm">
                ${item.name}
            </div>
            <div class="product-make text-green-700 font-bold">
                ${item.make}
            </div>
            <div class="product-rating text-yellow-300 font-bold my-1">
                ⭐⭐⭐⭐⭐ ${item.rating}
            </div>
            <div class="product-price font-bold text-gray-700 text-lg">
                ₹ ${numeral(item.price).format('0,0.00')}
            </div>
        `
        let addToCartEl = document.createElement("div");
        addToCartEl.classList.add("hover:bg-yellow-600", "cursor-pointer", "product-add", "h-8", "w-28", "rounded", "bg-yellow-500", "text-white", "text-md", "flex", "justify-center", "items-center");
        addToCartEl.innerHTML = "Add to cart";
        addToCartEl.addEventListener('click', () => {
            addToCart(item);
        })
        doc.appendChild(addToCartEl);
        document.querySelector(".main-section-products").appendChild(doc);
    })

}


getItems();