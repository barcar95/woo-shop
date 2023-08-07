const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({ 
      include: [{model: Product}]
    })
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
  // be sure to include its associated Products
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  try {
    const singleCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    })
    if(!singleCategory){
      return res.status(404).json({message: 'Category Not Found'})
    }
    res.status(200).json(singleCategory);
  } catch (error) {
    res.status(500).json(error);
  }
  // be sure to include its associated Products
});

router.post('/', async(req, res) => {
  // create a new category
  try {
    const createCat = await Category.create(req.body)
    res.status(200).json(createCat);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try {
    const updateCat = await Category.update(req.body, {
      where: {id: req.params.id}
    });
    res.status(200).json(updateCat);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCat = await Category.destroy({
      where: {id: req.params.id}
    });
    res.status(200).json({message: `${deleteCat} categories deleted.`})
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
