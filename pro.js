const form = document.getElementById("recipe-form");
const recipesContainer = document.getElementById("recipes-container");
let editIndex = null;

const loadRecipes = () => {
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  recipesContainer.innerHTML = "";
  recipes.forEach((recipe, index) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");
    recipeCard.innerHTML = `
      <h3>${recipe.title}</h3>
      <p><b>Ingredients:</b><br>${recipe.ingredients.join(",")}</p>
      ${recipe.image ? `<img src="${recipe.image}" alt="${recipe.title}">` : ""}
      <button onclick="editRecipe(${index})">Edit</button>
      <button onclick="deleteRecipe(${index})">Delete</button>
    `;
    recipesContainer.appendChild(recipeCard);
  });
};

const addRecipe = (title, ingredients, image) => {
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  if (editIndex !== null) {
    recipes[editIndex] = { title, ingredients, image };
    editIndex = null;
  } else {
    recipes.push({ title, ingredients, image });
  }
  localStorage.setItem("recipes", JSON.stringify(recipes));
  loadRecipes();
};

const deleteRecipe = (index) => {
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  recipes.splice(index, 1);
  localStorage.setItem("recipes", JSON.stringify(recipes));
  loadRecipes();
};

const editRecipe = (index) => {
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  const recipe = recipes[index];
  document.getElementById("title").value = recipe.title;
  document.getElementById("ingredients").value = recipe.ingredients.join(", ");
  editIndex = index;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const ingredients = document.getElementById("ingredients").value.split(",");
  const imageInput = document.getElementById("image");
  const reader = new FileReader();

  reader.onload = function () {
    addRecipe(title, ingredients, reader.result);
    form.reset();
  };

  if (imageInput.files[0]) {
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    addRecipe(title, ingredients, null);
    form.reset();
  }
});

document.addEventListener("DOMContentLoaded", loadRecipes);
