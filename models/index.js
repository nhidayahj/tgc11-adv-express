const bookshelf = require('../bookshelf');

// create a model for the products table
// first argumaent is a config object
// second argument is a config objects 
const Product = bookshelf.model('Product', {
    tableName:'products'
})

module.exports = {
    Product
}