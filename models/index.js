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
     // the name of the function must match the name of the model
    // involved in the relationship, but lowercase and in plural
    products() {
        return this.hasMany('Product')
    },
    tags(){
        return this.belongsToMany('Tag')
    }
})

const Tag = bookshelf.model('Tag', {
    tableName:'tags',
    products(){
        return this.belongsToMany('Product')
    }
})

const User = bookshelf.model('User', {
    tableName:'users'
})

module.exports = {
    Product, Category,Tag,User
}