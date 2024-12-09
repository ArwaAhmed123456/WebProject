const express = require('express');
const Category = require('../models/category'); // Import the Category Model
const router = express.Router();


//Get All the categories
router.get('/', async (req, res) => {
  try {
      const categories = await Category.find();
      res.status(200).json(categories);
  } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ message: 'Failed to fetch categories.' });
  }
});




/**
 * CREATE a new category
 */
router.post('/add-category', async (req, res) => {
  try {
      const newCategory = await Category.create(req.body);
      res.status(201).json(newCategory); // Respond with the created category
  } catch (error) {
      console.error('Error adding category:', error);
      res.status(500).json({ message: 'Failed to create category.' });
  }
});


/**
 * READ all categories
 */
//For Add
router.get('/update-category/:id', (req, res) => {
       const id = req.params.id;
       Category.findById({_id:id})
       .then(c => res.json(c))
       .catch(err => res.json(err))

  });
  

/**
 * READ a single category by ID
 */
router.get('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id).populate('products');
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching the category', error });
  }
});

/**
 * UPDATE a category by ID
 */
router.put('/update-category/:id',  (req, res) => {
    const  id  = req.params.id;
    Category.findByIdAndUpdate({_id: id},
      {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        products: req.body.products,
        status: req.body.status
      })
    .then(c => res.json(c))
    .catch(err => res.json(err))
});


/**
 * DELETE a category by ID
 */
router.delete('/deleteCategory/:id', (req, res) => {
     const  id  = req.params.id;
     Category.findByIdAndDelete({_id: id})
     .then(res => res.json(res))
     .catch(err => res.json(err))
});

// GET /api/categories/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    console.log('Fetching category with ID:', id);

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error('Error in fetching category:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
