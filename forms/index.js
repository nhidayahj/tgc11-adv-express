const forms = require('forms')

const fields = forms.fields;
const validators = forms.validators;
const widgets = forms.widgets;

var bootstrapField = function (name, object) {
    if (!Array.isArray(object.widget.classes)) { object.widget.classes = []; }

    if (object.widget.classes.indexOf('form-control') === -1) {
        object.widget.classes.push('form-control');
    }

    var validationclass = object.value && !object.error ? 'is-valid' : '';
    validationclass = object.error ? 'is-invalid' : validationclass;
    if (validationclass) {
        object.widget.classes.push(validationclass);
    }

    var label = object.labelHTML(name);
    var error = object.error ? '<div class="invalid-feedback">' + object.error + '</div>' : '';

    var widget = object.widget.toHTML(name, object);
    return '<div class="form-group">' + label + widget + error + '</div>';
};


// create a form funciton
// categories shld be an array of possible options
const createProductForm = (categories) => {
    return forms.create({
        'name': fields.string({
            required: true,
            errorAfterField: true,
            cssClass: {
                label: ['form-label']
            }
        }),
        'cost': fields.string({
            required: true,
            errorAfterField: true,
            cssClass: {
                label: ['form-label']
            },
            //integer is a function call
            validators:[validators.integer()]
        }),
        'description': fields.string({
            required: true,
            errorAfterField: true,
            cssClass: {
                label: ['form-label']
            }
        }),
        'category_id': fields.string({
            label: 'Category',
            required:true,
            errorAfterField: true,
            cssClass: {
                label: ['form-label']
            },
            widgets:widgets.select(),
            // choices: [[1, "Fruits"], [2, "Grains"]]
            choices:categories
        })
    })
}

module.exports = {createProductForm, bootstrapField}