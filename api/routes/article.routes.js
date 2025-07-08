const express = require('express');
const app = express();
const multer = require('multer');
const articleExpressRoute = express.Router();
let ArticleSchema = require('../model/article.model');
const articleModel = require('../model/article.model');



articleExpressRoute.get('/', async (req,res) => {
  try {
    const data = await ArticleSchema.find({});
   
    res.json(data)
  } catch (err) {
    throw err;
  }
});







// For Latest post in home page
articleExpressRoute.get('/latest', async (req,res) => {
    try {
//const data = await courseModel.find().sort({ title: -1 }).limit(limit)
    
 const limit = req.query.limit || 2;
const data = await articleModel.find().sort({ title: -1 }).limit(limit);
return res.json(data);
   
     
     // res.json(data)
    } catch (err) {
      throw err;
    }
  });




articleExpressRoute.get('/cat/:id', async (req,res) => {
    try {

     cat_ids = req.params.id;
      const data = await ArticleSchema.find({cat_id:cat_ids});
     
      res.json(data)
    } catch (err) {
      throw err;
    }
  });
  



articleExpressRoute.get('/article/:id', async (req, res) => {
//console.log('DDD',cat_id)
    try{
        ids = req.params.id;
       // let  cat_id = (ids).split('_');

        //console.log('JJ',ids)

      //  console.log('KK',cat_id[0])

        const data = await ArticleSchema.findById(ids);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})



// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Specify the destination directory for storing uploaded files
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Specify the filename for the uploaded file
  }
});

// Initialize Multer upload
const upload = multer({ storage: storage });

// Your existing routes
// Your existing routes
articleExpressRoute.post('/add-article', upload.array('article_images', 5), async (req, res) => {
  try {
      let category_name = (req.body.category_name).split('_');
      const data = new ArticleSchema({
          category_name: category_name[0],
          cat_id: category_name[1],
          article_name: req.body.article_name,
          article_description: req.body.article_description,
          article_images: req.files.map(file => file.filename) // Save only file names
      });

      const dataToSave = await data.save();
      res.status(200).json(dataToSave);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

articleExpressRoute.put('/update-article/:id', upload.array('article_images', 5), async (req, res) => {
  try {
      const id = req.params.id;
      const updatedData = req.body;
      // Check if new images were uploaded
      if (req.files && req.files.length > 0) {
          updatedData.article_images = req.files.map(file => file.filename); // Save only file names
      }
      const options = { new: true };
      const result = await ArticleSchema.findByIdAndUpdate(id, updatedData, options);
      res.send(result);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});


articleExpressRoute.delete('/del-article/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await ArticleSchema.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})



//  articleExpressRoute.put('/update-article/:id', async (req, res) => {


//     try {
//         const id = req.params.id;
//         const updatedData = req.body;
//         const options = { new: true };
//         const result = await ArticleSchema.findByIdAndUpdate(
//             id, updatedData, options
//         )

//         res.send(result)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })



module.exports = articleExpressRoute;