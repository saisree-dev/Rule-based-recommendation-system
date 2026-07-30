// ==========================
// Elements
// ==========================

const categoryInput = document.getElementById("categoryName");
const addCategoryBtn = document.getElementById("addCategoryBtn");
const tableBody = document.getElementById("categoryTableBody");

// ==========================
// Display Categories
// ==========================

function displayCategories() {

    const categories = getCategories();

    tableBody.innerHTML = "";

    if (categories.length === 0) {

        tableBody.innerHTML = `
        <tr>
            <td colspan="4" style="text-align:center;">
                No Categories Added
            </td>
        </tr>
        `;

        return;
    }

    categories.forEach((category, index) => {

        tableBody.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${category}</td>

            <td>

                <button class="edit"
                    onclick="editCategory(${index})">

                    <i class="fa-solid fa-pen"></i>

                </button>

            </td>

            <td>

                <button class="delete"
                    onclick="deleteCategory(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}

// ==========================
// Add Category
// ==========================

addCategoryBtn.addEventListener("click", function () {

    let category = categoryInput.value.trim();

    if (category === "") {

        alert("Please enter a category.");

        return;

    }

    let categories = getCategories();

    // Prevent duplicate categories
    if (categories.some(c => c.toLowerCase() === category.toLowerCase())) {

        alert("Category already exists.");

        return;

    }

    categories.push(category);

    saveCategories(categories);

    categoryInput.value = "";

    displayCategories();

});

// ==========================
// Delete Category
// ==========================

function deleteCategory(index) {

    if (!confirm("Delete this category?")) {

        return;

    }

    let categories = getCategories();

    categories.splice(index, 1);

    saveCategories(categories);

    displayCategories();

}

// ==========================
// Edit Category
// ==========================

function editCategory(index) {

    let categories = getCategories();

    let newCategory = prompt("Edit Category", categories[index]);

    if (newCategory === null) {

        return;

    }

    newCategory = newCategory.trim();

    if (newCategory === "") {

        alert("Category cannot be empty.");

        return;

    }

    categories[index] = newCategory;

    saveCategories(categories);

    displayCategories();

}

// ==========================
// Load Categories
// ==========================

displayCategories();