// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'trueProduct',
  onDelete: 'CASCADE'
});// add an as statement here to call within the product routes?

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id', 
  onDelete: 'CASCADE',
  as: 'product_category'
}); // add an as statement here to call within the product routes?
  

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    // unique: false,
    foreignKey: 'product_id',
  },
  as: 'productTag', 
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    // unique: false,
    foreignKey: 'tag_id',
  },
  as: 'tag'
});



module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
