import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

async function addImage(itemID, image, imageName) {
    const { data, error } = await supabase.storage
        .from('productImages')
        .upload(`${itemID}/image1.jpeg`, image);
    if (error) {
        console.log(error.message);
    }
    else {
        console.log(data);
    }

}

export async function addProduct(itemName, itemPrice, itemImage, imageName) {
    const { data, error } = await supabase
        .from('products')
        .insert([
            { itemName: itemName, itemPrice: itemPrice },
        ])
        .select()
    if (error) {
        console.log(error.message);
    }
    else {
        console.log(data);
        addImage(data[0].id, itemImage, imageName);
    }
}

export async function getProductbyID(id) {
    let { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()
    if (error) console.log(error.message);
    else {
        return products;
    }
}
export async function getImage(id) {
    const { data, error } = supabase.storage
        .from('productImages')
        .getPublicUrl(id + '/image1.jpeg')
    if (error) {
        console.log(error.message);
    }
    else {
        return data
    }
}

export async function getAllProductsWithImages() {
    // 1. Fetch all products in one go
    const { data: products, error: productsError } = await supabase
        .from('products')
        .select()
        .order('id', { ascending: true })

    if (productsError) {
        console.error('Error fetching products:', productsError.message);
    }

    // 2. Create an array of promises to fetch images concurrently
    const imagePromises = products.map(async (product) => {
        const { data: imageData, error: imageError } = await supabase.storage
            .from('productImages')
            .getPublicUrl(product.id + '/image1.jpeg')

        if (imageError) {
            console.error('Error fetching image for product', product.id, imageError.message);
        }

        // 3. If image exists, return an object with product and image data
        return { ...product, image: imageData.publicUrl }; // Assuming the first element is the image
    });

    // 4. Wait for all image fetching promises to resolve
    const productsWithImages = await Promise.all(imagePromises);
    return productsWithImages;
}

export async function signUpNewUser(username, email, password) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                display_name: username,
            },
        },
    })
    if (error) return error.message;
    else return "Signed up successfully";
}

export async function loginUser(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })
    if (error) return error.message;
    else return "Logged in successfully";
}

export async function getSession() {
    const { data, error } = await supabase.auth.getSession()
    if (error) return error.message;
    else return data.session.user.id;
}