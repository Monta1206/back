const categoryService = require('../services/categories.services');


const createCategory = async (req, res) => {

    try {

        const category = await categoryService.createCategory(req.body);

        res.status(201).json(category);


    } catch (error) {

        res.status(400).json({
            message:error.message
        });

    }

};



const getCategories = async (req, res) => {

    try {

        const categories = await categoryService.getAllCategories();

        res.status(200).json(categories);


    } catch (error) {

        res.status(500).json({
            message:error.message
        });

    }

};



const updateCategory = async (req, res) => {

    try {

        const category = await categoryService.updateCategory(
            req.params.id,
            req.body
        );


        res.status(200).json(category);


    } catch(error) {

        res.status(400).json({
            message:error.message
        });

    }

};



const deleteCategory = async (req, res) => {

    try {

        await categoryService.deleteCategory(
            req.params.id
        );


        res.status(200).json({

            message:"Category deleted successfully"

        });


    } catch(error) {

        res.status(400).json({

            message:error.message

        });

    }

};



module.exports = {

    createCategory,
    getCategories,
    updateCategory,
    deleteCategory

};