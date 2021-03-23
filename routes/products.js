const express = require('express')
const router = express.Router()

// import in the Product model 
const { Product } = require('../models')
const { createProductForm, bootStrapField } = require('../forms')


router.get('/', async (req, res) => {
    // fetch all data from database

    // const query = SELECT
    // 


    let products = await Product.collection().fetch()
    res.render('products/index', {
        'products': products.toJSON()
    })
})


router.get('/create', (req, res) => {
    const productForm = createProductForm();
    res.render('products/create', {
        'form': productForm.toHTML(bootStrapField)
    })
})


router.post('/create', (req, res) => {
    const productForm = createProductForm();
    productForm.handle(req, {
        'success': async (form) => {
            //use Product model to save
            // a new instance of Product 
            const newProduct = new Product()
            newProduct.set('name', form.data.name)
            newProduct.set('cost', form.data.cost)
            newProduct.set('description', form.data.description)
            await newProduct.save();
            res.redirect('/products')
        },
        'error': (form) => {
            res.render('products/create', {
                'form': form.toHTML(bootStrapField)
            })
        }
    })
})

router.get('/:product_id/update', async (req, res) => {
    // 1. get the product we want to update
    // select * from products where id = ${product_id}
    const productToEdit = await Product.where({
        'id': req.params.product_id
    }).fetch({
        required: true
    });

    // 2. send the product to the view
    // manual way of updating
    const form = createProductForm();
    form.fields.name.value = productToEdit.get('name')
    form.fields.cost.value = productToEdit.get('cost')
    form.fields.description.value = productToEdit.get('description')

    res.render('products/update', {
        'form': form.toHTML(bootStrapField),
        'product': productToEdit.toJSON()
    })

})

router.post('/:product_id/update', async (req, res) => {
    // 1. get the product we want to update
    // select * from products where id = ${product_id}
    const productToEdit = await Product.where({
        'id': req.params.product_id
    }).fetch({
        required: true
    });

    const productForm = createProductForm()

    productForm.handle(req, {
        'success': async (form) => {
            // below line works if we follow the database column names
            productToEdit.set(form.data)
            productToEdit.save();
            res.redirect('/products')
        },
        'error': async (form) => {
            res.render('products/update', {
                'form': form.toHTML(bootStrapField)
            })
        }
    })


})

router.get('/:product_id/delete', async(req,res) => {
    // 1. get the product we want to update
    // select * from products where id = ${product_id}
    const productToDelete = await Product.where({
        'id': req.params.product_id
    }).fetch({
        required: true
    });

    res.render('products/delete', {
        'product':productToDelete.toJSON()
    })
})

router.post('/:product_id/delete', async(req,res) => {
    const productToDelete = await Product.where({
        'id': req.params.product_id
    }).fetch({
        required: true
    });

    res.render('products/delete', {
        'product':productToDelete.toHTML()
    })
})

module.exports = router