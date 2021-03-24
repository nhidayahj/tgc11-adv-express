const express = require('express')
const router = express.Router()

const {createUserForm, bootstrapField} = require('../forms')

router.get('/register', (req,res) => {
    let registerForm = createUserForm();
    res.render('users/register', {
        'form':registerForm.toHTML(bootstrapField)
    })
})

// router.post('/register', (req,res) => {

// })

module.exports =router