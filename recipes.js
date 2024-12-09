// Import the Recipe model
const Recipe = require('./models/recipe');  // Adjust the path based on where your recipe model is

// Recipe API - Fetch all recipes from the database
app.get('/api/recipes', async (req, res) => {
  try {
    // Fetch all recipes from the database
    const recipes = await Recipe.find();  // This queries all recipes in the database
    res.json({ recipes });  // Send the recipes as JSON
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});
