const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
    try {
    const categoryData = await Category.findAll(req.params, {
    include: [{model: Product}]
  })
    res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err)
    }
});

// GET a single category
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product, as: 'product_category'}]
    });
    if (!categoryData){
      res.status(404).json({message: 'No Product found at this Category'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

//CREATE a Category
router.post('/', async (req, res) => {
  // create a new category
    try {
    const categoryData = await Category.create({
      "category_name": req.body.category_name
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// UPDATE a Category
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
    try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No Product found at this category, update cannot be made!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
   try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No Product found at this id, cannot delete unknown category!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
