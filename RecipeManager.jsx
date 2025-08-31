import React, { useState, useEffect } from "react";


function App() {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [showForm, setShowForm] = useState(false);

 
  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(savedRecipes);
  }, []);

 
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

 
  const addRecipe = (recipe) => {
    setRecipes([...recipes, { ...recipe, id: Date.now(), favorite: false }]);
    setShowForm(false);
  };

  
  const updateRecipe = (updatedRecipe) => {
    setRecipes(
      recipes.map((r) => (r.id === updatedRecipe.id ? updatedRecipe : r))
    );
    setEditingRecipe(null);
    setShowForm(false);
  };

  
  const deleteRecipe = (id) => {
    setRecipes(recipes.filter((r) => r.id !== id));
  };

  const toggleFavorite = (id) => {
    setRecipes(
      recipes.map((r) => (r.id === id ? { ...r, favorite: !r.favorite } : r))
    );
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("currentUser"); // clear current user
    window.location.href = "/signup"; // redirect to login page
  };

  const outerContainerStyle = {
    minHeight: "100vh",
    width: "1850px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    background: "linear-gradient(to bottom, #E0C3FC, #FBC2EB, #FDE68A)",
    padding: "20px",
    boxSizing: "border-box",
  };

  const innerContainerStyle = {
    width: "100%",
    maxWidth: "900px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    position: "relative",
  };

  const logoutButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "#DC2626",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  return (
    <div style={outerContainerStyle}>
      <div style={innerContainerStyle}>
        {/* Logout Button */}
        <button style={logoutButtonStyle} onClick={handleLogout}>
          🚪 Logout
        </button>

        <h1 style={{ textAlign: "center", color: "#6B21A8" }}>
          🍲 Recipe Manager
        </h1>

        <Dashboard recipes={recipes} />

        <button
          style={{
            backgroundColor: "#6B21A8",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => {
            setEditingRecipe(null);
            setShowForm(true);
          }}
        >
          ➕ Add Recipe
        </button>

        {/* Recipe Form */}
        {showForm && (
          <RecipeForm
            onSubmit={editingRecipe ? updateRecipe : addRecipe}
            editingRecipe={editingRecipe}
            onCancel={() => {
              setEditingRecipe(null);
              setShowForm(false);
            }}
          />
        )}

        {/* Recipes */}
        <h2 style={{ textAlign: "center", color: "#7E22CE" }}>All Recipes</h2>
        <RecipeList
          recipes={recipes}
          onEdit={(recipe) => {
            setEditingRecipe(recipe);
            setShowForm(true);
          }}
          onDelete={deleteRecipe}
          onToggleFavorite={toggleFavorite}
        />

        {/* Favorite Recipes */}
        <Favourite
          recipes={recipes.filter((r) => r.favorite)}
          onToggleFavorite={toggleFavorite}
        />
      </div>
    </div>
  );
}

export default App;



/* ---------------- RecipeForm ---------------- */
function RecipeForm({ onSubmit, editingRecipe, onCancel }) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [calories, setCalories] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (editingRecipe) {
      setTitle(editingRecipe.title);
      setIngredients(editingRecipe.ingredients);
      setCalories(editingRecipe.calories);
      setInstructions(editingRecipe.instructions);
      setImage(editingRecipe.image || "");
    }
  }, [editingRecipe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !ingredients || !calories || !instructions) {
      return alert("All fields except image are required!");
    }

    onSubmit({
      id: editingRecipe ? editingRecipe.id : null,
      title,
      ingredients,
      calories,
      instructions,
      image,
      favorite: editingRecipe ? editingRecipe.favorite : false,
    });

    setTitle("");
    setIngredients("");
    setCalories("");
    setInstructions("");
    setImage("");
  };

  return (
    <div style={{
      backgroundColor: "#fff", padding: "30px", borderRadius: "20px",
      boxShadow: "0px 5px 20px rgba(0,0,0,0.2)", width: "100%", maxWidth: "500px",
      display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", marginBottom: "20px"
    }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#DB2777" }}>
        {editingRecipe ? "✏ Edit Recipe" : "➕ Add Recipe"}
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", display: "flex", flexDirection: "column", gap: "15px", alignItems: "center" }}
      >
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
        <input type="text" placeholder="Ingredients (comma separated)" value={ingredients} onChange={(e) => setIngredients(e.target.value)} style={inputStyle} />
        <input type="number" placeholder="Calories" value={calories} onChange={(e) => setCalories(e.target.value)} style={inputStyle} />
        <textarea placeholder="Instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} style={textareaStyle} />
        <input type="text" placeholder="Image URL (optional)" value={image} onChange={(e) => setImage(e.target.value)} style={inputStyle} />

        <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "10px" }}>
          <button type="submit" style={{ ...buttonStyle, backgroundColor: "#16A34A" }}>
            {editingRecipe ? "Update" : "Add"}
          </button>
          <button type="button" onClick={onCancel} style={{ ...buttonStyle, backgroundColor: "#9CA3AF" }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------------- RecipeList ---------------- */
function RecipeList({ recipes, onEdit, onDelete, onToggleFavorite }) {
  if (recipes.length === 0)
    return <p style={{ textAlign: "center", color: "#4B5563", marginTop: "20px", fontSize: "16px" }}>No recipes added yet.</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

/* ---------------- RecipeCard ---------------- */
function RecipeCard({ recipe, onEdit, onDelete, onToggleFavorite }) {
  return (
    <div
      style={{
        backgroundColor: "#fff", boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
        borderRadius: "20px", padding: "20px", width: "320px", textAlign: "center",
        transition: "transform 0.2s",
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px", color: "#7E22CE" }}>
        {recipe.title}
      </h3>
      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>Calories:</strong> {recipe.calories}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      {recipe.image && <img src={recipe.image} alt={recipe.title} style={{ marginTop: "10px", width: "100%", height: "160px", objectFit: "cover", borderRadius: "15px" }} />}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginTop: "15px" }}>
        <button onClick={() => onToggleFavorite(recipe.id)} style={{
          ...buttonStyle,
          backgroundColor: recipe.favorite ? "#FACC15" : "#D1D5DB",
          color: "#000"
        }}>
          {recipe.favorite ? "⭐ Unfavorite" : "☆ Favorite"}
        </button>
        <button onClick={() => onEdit(recipe)} style={{ ...buttonStyle, backgroundColor: "#3B82F6" }}>✏ Edit</button>
        <button onClick={() => onDelete(recipe.id)} style={{ ...buttonStyle, backgroundColor: "#EF4444" }}>🗑 Delete</button>
      </div>
    </div>
  );
}

/* ---------------- Favourite ---------------- */
function Favourite({ recipes, onToggleFavorite }) {
  if (recipes.length === 0) return null;

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", marginTop: "30px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "600", color: "#DB2777", textAlign: "center" }}>
        ⭐ Favorite Recipes
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", width: "100%" }}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} onToggleFavorite={onToggleFavorite} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- Dashboard ---------------- */
function Dashboard({ recipes }) {
  const totalCalories = recipes.reduce((sum, r) => sum + Number(r.calories), 0);

  return (
    <div style={{
      backgroundColor: "#fff", boxShadow: "0px 5px 15px rgba(0,0,0,0.2)", borderRadius: "20px",
      padding: "25px", width: "100%", maxWidth: "400px", textAlign: "center", marginBottom: "20px"
    }}>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#7E22CE", marginBottom: "10px" }}>📊 Dashboard</h2>
      <p><strong>Total Recipes:</strong> {recipes.length}</p>
      <p><strong>Total Calories:</strong> {totalCalories}</p>
    </div>
  );
}

/* ---------------- Common Styles ---------------- */
const inputStyle = {
  width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #ccc", fontSize: "16px",
};
const textareaStyle = {
  width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #ccc", fontSize: "16px", resize: "vertical", minHeight: "80px",
};
const buttonStyle = {
  padding: "10px 20px", borderRadius: "10px", border: "none", fontSize: "16px", cursor: "pointer", color: "#fff",
};
