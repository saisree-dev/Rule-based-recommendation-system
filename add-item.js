// ==========================
// Elements
// ==========================

const categorySelect = document.getElementById("category");
const imageInput = document.getElementById("image");
const preview = document.getElementById("preview");
const saveItemBtn = document.getElementById("saveItemBtn");

let imageData = "";

// ==========================
// Load Categories
// ==========================

function loadCategories() {

    const categories = getCategories();

    categorySelect.innerHTML = '<option value="">Select Category</option>';

    categories.forEach(category => {

        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        categorySelect.appendChild(option);

    });

}

loadCategories();

// ==========================
// Image Preview
// ==========================

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) {

        imageData = "";

        preview.style.display = "none";

        return;

    }

    const reader = new FileReader();

    reader.onload = function (e) {

        imageData = e.target.result;

        preview.src = imageData;

        preview.style.display = "block";

    };

    reader.readAsDataURL(file);

});

// ==========================
// Save Item
// ==========================

saveItemBtn.addEventListener("click", function () {

    const itemName = document.getElementById("itemName").value.trim();

    const category = categorySelect.value;

    const price = document.getElementById("price").value.trim();

    const description = document.getElementById("description").value.trim();

    if (itemName === "" || category === "" || price === "") {

        alert("Please fill all required fields.");

        return;
    }

    // ==========================
    // Rule-Based Validation
    // ==========================

    const rules = {

        "laptop": "Electronics",
        "mobile": "Electronics",
        "phone": "Electronics",
        "headphone": "Electronics",
        "earbuds": "Electronics",

        "java book": "Books",
        "python book": "Books",
        "book": "Books",
        "novel": "Books",

        "shirt": "Fashion",
        "jeans": "Fashion",
        "shoe": "Fashion",
        "shoes": "Fashion",
        "watch": "Fashion",

        "football": "Sports",
        "cricket bat": "Sports",
        "bat": "Sports",
        "ball": "Sports",

        "refrigerator": "Home Appliances",
        "washing machine": "Home Appliances",
        "microwave": "Home Appliances",
        "tv": "Home Appliances"
    };

    let expectedCategory = null;

    for (let keyword in rules) {

        if (itemName.toLowerCase().includes(keyword)) {

            expectedCategory = rules[keyword];
            break;
        }
    }

    if (expectedCategory && expectedCategory !== category) {

        alert(
            "❌ Invalid Category!\n\n" +
            "Item : " + itemName +
            "\nExpected Category : " + expectedCategory +
            "\nSelected Category : " + category
        );

        return;
    }

    // ==========================
    // Save Item
    // ==========================

    let items = getItems();

    items.push({

        id: Date.now(),

        itemName,

        category,

        price: Number(price),

        description,

        image: imageData,

        likes: 0,

        views: 0

    });

    saveItems(items);

    alert("✅ Item Added Successfully");

    document.getElementById("itemForm").reset();

    preview.src = "";

    preview.style.display = "none";

    imageData = "";

});