const bookshelf = require('../bookshelf');

// create a model for the products table
// first argumaent is a config object
// second argument is a config objects 
const Product = bookshelf.model('Product', {
    tableName:'products',
   //make sure the name of the fucntion is the same as the FK without the _id
   category() {
       // first argumnet is the name of the model
        //that the current model is related to
        return this.belongsTo('Category')
   }
})

const Category = bookshelf.model('Category', {
    tableName:'categories',
    // name of the 
    products() {
        return this.hasMany('Product')
    }
})

module.exports = {
    Product, Category
}