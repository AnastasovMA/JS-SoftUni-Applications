const baseURL = `http://localhost:3030`;

window.addEventListener('load', () => {
    fetch(`${baseURL}/jsonstore/cookbook/recipes`)
        .then(res => res.json())
        .then(recipes => {
            renderRecipes(Object.values(recipes))
        })
})

function renderRecipes(recipes) {
    const mainElement = document.querySelector('main');

    mainElement.innerHTML = '';

    recipes.forEach(x => {
        mainElement.appendChild(createRecipe(x));
    });
}

function createRecipe(recipe){
    let recipeElement = document.createElement('article');
    recipeElement.classList.add('preview');

    recipeElement.addEventListener('click', () =>{
        fetch(`${baseURL}/jsonstore/cookbook/details/${recipe._id}`)
        .then(res => res.json())
        .then(recipeDetails => {
            const mainElement = document.querySelector('main');
            mainElement.innerHTML = ``;

            mainElement.appendChild(createRecipesDetails(recipeDetails));
        })
    })

    recipeElement.innerHTML = `
        <div class="title">
            <h2>${recipe.name}</h2>
    </div>
    <div class="small">
            <img src=${recipe.img}>
    </div>
    `;

    return recipeElement;
}

function createRecipesDetails(recipeDetails){
    const recipeElement = document.createElement('article');

    recipeElement.innerHTML = `
        <h2>${recipeDetails.name}</h2>
        <div class="band">
            <div class="thumb">
                <img src="assets/lasagna.jpg">
            </div>
            <div class="ingredients">
                <h3>Ingredients:</h3>
                <ul>
                    ${recipeDetails.ingredients.map(x => `<li> ${x}</li>`)}
                </ul>
            </div>
        </div>
        <div class="description">
            <h3>Preparation:</h3>
            ${recipeDetails.steps.map(x => `<p>${x}</p>`).join('')}
        </div>
    `;

    return recipeElement;
}
