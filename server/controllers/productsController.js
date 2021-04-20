const Products = require('../models/productsModel'); 

class ProductsController {
  
    async findAll(req, res){
        try{
            const products = await Products.find({});
            res.status(200).send({products});
        }
        catch(error){
            res.send({error})
        }
    }

    async findOne(req ,res){
        let id = req.params.id;
        try{
            const myProduct = await Products.findOne({_id:id});
            res.status(200).send({myProduct});
        }
        catch(error){
            res.send({error})
        }

    }


    async findByCategory(req ,res){
        let categoryID = req.params.categoryID;
        try{
            const productsByCategory = await Products.find({_id: categoryID});
            res.status(200).send({productsByCategory});
        }
        catch(error){
            res.send({error})
        }
    }

    async create (req, res) {
        let { title, description, price, image, category} = req.body;
        try{
            const addProduct = await Products.create({title, description, price, image, category });
            res.status(200).send({addProduct})
        }
        catch(error){
            res.send({error})
        }
    }
    
    async delete (req, res){
        let id = req.body.product_id;
        try{
            const removedProduct = await Products.remove({_id:id});
            res.status(200).send({removedProduct});
        }
        catch(error){
            res.send({error});
        };
    }

    async update (req, res){
        let { newTitle, newPrice, newDescription, newCategory, newImage, id } = req.body;
        try{
            const oldProduct = await Products.findOne({_id:id})
            const updateProduct = await Products.updateOne(
                {_id:id },{$set:{
                            title:newTitle || oldProduct.title, 
                            price:newPrice || oldProduct.price,
                            description:newDescription || oldProduct.description, 
                            category:newCategory || oldProduct.category,
                            image: newImage || oldProduct.image,
                            _id: id || oldProduct._id
                        }
            });
            res.status(200).send({updateProduct});
        }
        catch(error){
            res.send({error});
        };
    }

};
module.exports = new ProductsController();