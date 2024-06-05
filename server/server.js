//Imports
import express from "express";
import multer from "multer";
import cors from "cors";
import { addProduct, getProductbyID, signUpNewUser, loginUser, getSession, getAllProductsWithImages, getImage } from "./supabase.js";


const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } });

app.listen(5050, () => {
    console.log('App listening on port 5050');
})

//GETS
app.get('/api', (req, res) => {
    res.send({
        message: 'Welcome to E-com-Collab'
    })
})

app.get('/api/getProducts', async (req, res) => {
    const productsWithImages = await getAllProductsWithImages();
    res.json(productsWithImages);
})

app.get('/api/getProductById/:id', async (req, res) => {
    const { id } = req.params;
    const product = await getProductbyID(id);
    const image = await getImage(id);
    product.Image = image.publicUrl;
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

//POSTS
app.post('/api/addProduct', upload.single('selectedImage'), (req, res) => {
    const { Name, Price } = req.body;
    const Image = req.file;
    addProduct(Name, Price, Image.buffer, Image.originalname);
    res.send('200')
})

app.post('/api/login', async (req, res) => {
    const { Email, Password } = req.body;
    res.send(await loginUser(Email, Password));
    console.log(await getSession());
})

app.post('/api/signup', async (req, res) => {
    const { Email, Password, Username } = req.body;
    res.send(await signUpNewUser(Username, Email, Password));
})
