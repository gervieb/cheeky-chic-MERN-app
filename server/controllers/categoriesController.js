const Categories = require('../models/categoriesModel');

class CategoriesController {

    async findAll(req, res){
        try{
            const myCategories = await Categories.find({});
            res.status(200).send({myCategories});
        }
        catch(error){
            res.send({error})
        }
    }
  
    async findOne(req ,res){
        let { categoryName } = req.body;
        try{
            const myCategory = await Products.findOne({categoryName});
            res.status(200).send({myCategory});
        }
        catch(error){
            res.send({error})
        }

    }
    async create (req, res) {
        let { category } = req.body;
        try{
            const addCategory= await Categories.create({category});
            res.status(200).send({addCategory})
        }
        catch(error){
            res.send({error})
        }
    }
  
    async delete (req, res){
        let id = req.body;
        try{
            const removeCategory = await Categories.remove({_id:id});
            res.status(200).send({removeCategory});
        }
        catch(error){
            res.send({error});
        };
    }

    async update (req, res){
        let { id, newCategory } = req.body;
        try{
            const updateCategory = await Categories.updateOne(
                {_id:id}, {$set: 
                            { category:newCategory } 
        })
            res.status(200).send({updateCategory});
        }
        catch(error){
            res.send({error});
        };
    }


};
module.exports = new CategoriesController();