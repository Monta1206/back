const Category = require('../models/categories.models');


const createCategory = async (categoryData) => {

    const category = new Category(categoryData);

    return await category.save();

};



const getAllCategories = async () => {

    return await Category.find().sort({ name: 1 });

};



const updateCategory = async (id, data) => {

    return await Category.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );

};



const deleteCategory = async (id) => {

    return await Category.findByIdAndDelete(id);

};



module.exports = {

    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory

};