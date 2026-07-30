document.addEventListener("DOMContentLoaded", () => {

    const items = JSON.parse(localStorage.getItem("items")) || [];
    const categories = JSON.parse(localStorage.getItem("categories")) || [];

    // Totals
    let totalItems = items.length;
    let totalLikes = 0;
    let totalViews = 0;

    let categoryScores = {};

    items.forEach(item => {

        totalLikes += Number(item.likes) || 0;
        totalViews += Number(item.views) || 0;

        if (!categoryScores[item.category]) {
            categoryScores[item.category] = 0;
        }

        categoryScores[item.category] +=
            (Number(item.likes) * 2) + Number(item.views);

    });

    // Dashboard Cards
    document.getElementById("totalItems").innerHTML = totalItems;
    document.getElementById("totalViews").innerHTML = totalViews;
    document.getElementById("totalLikes").innerHTML = totalLikes;
    document.getElementById("totalCategories").innerHTML = categories.length;

    // Best Category
    let bestCategory = "No Recommendation";
    let highestScore = -1;

    for (let category in categoryScores) {

        if (categoryScores[category] > highestScore) {

            highestScore = categoryScores[category];
            bestCategory = category;

        }

    }

    document.getElementById("bestCategory").innerHTML = bestCategory;

    document.getElementById("recommendationMessage").innerHTML =
        "Recommended because it has the highest score (" + highestScore + ").";

});