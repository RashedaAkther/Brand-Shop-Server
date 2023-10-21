const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId, } = require("mongodb");
const port =process.env.PORT||5000


app.use(cors());
app.use(express.json());

// assignment-ten
// 3BxN00oIlSHSxicx


// const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://assignment-ten:3BxN00oIlSHSxicx@cluster0.ninjyyh.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
 
    // await client.connect();
    const ProductCollection = client.db("productDb").collection("product");
    const MyCollection = client.db("myCartDb").collection("cart");


    app.post("/AddProduct", async(req,res) => {
      const Product = req.body;
        // console.log(Product);
      const result = await ProductCollection.insertOne(Product);
      console.log(result);
      res.send(result);
    });
    app.post("/AddCart", async(req,res) => {
      const Product = req.body;
        console.log(Product);
      const result = await  MyCollection.insertOne(Product);
      console.log(result);
      res.send(result);
    });
    app.get("/AddProduct", async (req, res) => {
      const result = await ProductCollection.find().toArray();
      res.send(result);
    });
app.get('/AddProduct/:id',async(req,res) =>{
  const id =req.params.id;
  const quary  ={_id:new ObjectId(id)}
  const result =await ProductCollection.findOne(quary)
  res.send(result)
})


app.get("/AddCart", async (req, res) => {
  const result = await MyCollection.find().toArray();
  res.send(result);
});
app.get('/AddCart/:id',async(req,res) =>{
  const id =req.params.id;
  const quary  ={_id:new ObjectId(id)}
  const result =await MyCollection.findOne(quary)
  res.send(result)
})


    app.put('/AddProduct/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const updatedProduct = req.body;
      console.log(updatedProduct);

      const Product = {
          $set: {
              name:updatedProduct.name,
              img:updatedProduct.img,
              BrandName:updatedProduct.BrandName,
              Price:updatedProduct.Price,
              Type:updatedProduct.Type,
              ShortDescription:updatedProduct.ShortDescription,
              Ratting:updatedProduct.Ratting

          }
      }
      const result = await ProductCollection.updateOne(filter,Product , options);
      console.log(result);
      res.send(result);
  })

  app.delete('/AddCart/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const query = { _id: new ObjectId(id) }
    const result = await MyCollection.deleteOne(query);
    console.log(result);
    res.send(result);
})



    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('Assignment 10 is running ')
})

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
  });