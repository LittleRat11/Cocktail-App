const search = document.querySelector(".search-btn");
const result = document.querySelector("#result");
let apiUrl = `https://thecocktaildb.com/api/json/v1/1/search.php?s=`;
const userInput = document.querySelector("#cocktaiInput");




async function fetchCocktail() {
    let cocktailName = userInput.value;
    if (cocktailName.length === 0) {
        result.innerHTML = `<h3 class="msg">Please enter cocktail name</h3>`
    } else {

        fetch(apiUrl + cocktailName)
            .then(result => result.json())
            .then(data => {

               
                userInput.value = "";
                let index = 0;
                let drink = data.drinks[index];

                let count = 1;
                let ingredients = [];
                for (let i in drink) {
                    let ingredient = '';
                    let measure = '';
                    if (i.startsWith("strIngredient") && drink[i]) {
                        ingredient = drink[i];
                        if (drink[`strMeasure` + count]) {
                            measure = drink[`strMeasure` + count];
                        } else {
                            measure = "";
                        }
                        count += 1;
                        ingredients.push(`${measure} ${ingredient}`)
                    }
                }
                console.log(ingredients);
                result.innerHTML = `
        <img src= ${drink.strDrinkThumb} class="cocktailImg">
        <h2>${drink.strDrink}</h2>
        <h3>Ingredients</h3>
        <ul class="ingredients">
        
        </ul>
        <h3>Instructions</h3>
        <p>${drink.strInstructions}</p>
       
        `;

                let ingredientCon = document.querySelector(".ingredients");
                ingredients.forEach((ingre) => {
                    let listItem = document.createElement("li");
                    listItem.innerText = ingre;
                    ingredientCon.appendChild(listItem);
                });

            })
            .catch(() => {
                result.innerHTML = `<h3 class="msg'>Please enter a valid input</h3>`
            });
    }
}
search.addEventListener("click", fetchCocktail);
document.body.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        fetchCocktail();
    }
})
