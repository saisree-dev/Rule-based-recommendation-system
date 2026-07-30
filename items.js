// ==========================
// Elements
// ==========================

const tableBody = document.getElementById("itemsTableBody");
const searchInput = document.getElementById("searchItem");

// ==========================
// Display Items
// ==========================

function displayItems(list = getItems()) {

    tableBody.innerHTML = "";

    if (list.length === 0) {

        tableBody.innerHTML = `
        <tr>
            <td colspan="9" style="text-align:center;">
                No Items Available
            </td>
        </tr>
        `;

        return;

    }

    list.forEach((item, index) => {

        tableBody.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>

                <img src="${item.image || 'images/no-image.png'}"
                width="70"
                height="70">

            </td>

            <td>${item.itemName}</td>

            <td>${item.category}</td>

            <td>$${item.price}</td>

            <td>

                ${item.likes}

                <button onclick="likeItem(${item.id})">

                    ❤️

                </button>

            </td>

            <td>

                ${item.views}

                <button onclick="viewItem(${item.id})">

                    👁

                </button>

            </td>

            <td>

                <button class="edit"
                onclick="editItem(${item.id})">

                Edit

                </button>

            </td>

            <td>

                <button class="delete"
                onclick="deleteItem(${item.id})">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

}

displayItems();


// ==========================
// Like Item
// ==========================

function likeItem(id) {

    let items = getItems();

    const item = items.find(i => i.id === id);

    if (!item) return;

    item.likes++;

    saveItems(items);

    displayItems();

}


// ==========================
// View Item
// ==========================

function viewItem(id) {

    let items = getItems();

    const item = items.find(i => i.id === id);

    if (!item) return;

    item.views++;

    saveItems(items);

    displayItems();

}


// ==========================
// Delete Item
// ==========================

function deleteItem(id) {

    if (!confirm("Delete this item?")) {

        return;

    }

    let items = getItems();

    items = items.filter(item => item.id !== id);

    saveItems(items);

    displayItems();

}


// ==========================
// Edit Item
// ==========================

function editItem(id) {

    let items = getItems();

    const item = items.find(i => i.id === id);

    if (!item) return;

    let newName = prompt("Enter Item Name", item.itemName);
    if (newName === null) return;

    let newPrice = prompt("Enter Price", item.price);
    if (newPrice === null) return;

    let newLikes = prompt("Enter Likes", item.likes);
    if (newLikes === null) return;

    let newViews = prompt("Enter Views", item.views);
    if (newViews === null) return;

    item.itemName = newName.trim();
    item.price = Number(newPrice);
    item.likes = Number(newLikes);
    item.views = Number(newViews);

    saveItems(items);

    displayItems();

    alert("Item Updated Successfully!");

}


// ==========================
// Search
// ==========================

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const keyword = this.value.toLowerCase();

        const filtered = getItems().filter(item =>

            item.itemName.toLowerCase().includes(keyword) ||

            item.category.toLowerCase().includes(keyword)

        );

        displayItems(filtered);

    });

}