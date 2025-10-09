import React, { createContext, useState } from 'react'
import { addProduct, deleteProduct, getAllProducts } from '../../services/product.services';

export const productDataContext = createContext();
const ProductContext = ({ children }) => {

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);

    const [backendImage1, setBackendImage1] = useState(null);
    const [backendImage2, setBackendImage2] = useState(null);
    const [backendImage3, setBackendImage3] = useState(null);
    const [backendImage4, setBackendImage4] = useState(null);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("TopWear");
    const [sizes, setSizes] = useState([]);
    const [bestSeller, setBestSeller] = useState(false);


    // HANDLE ADD PRODUCT
    const handleAddProduct = async () => {
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("sizes", JSON.stringify(sizes));
            formData.append("bestSeller", bestSeller);

            if (backendImage1) formData.append("image1", backendImage1);
            if (backendImage2) formData.append("image2", backendImage2);
            if (backendImage3) formData.append("image3", backendImage3);
            if (backendImage4) formData.append("image4", backendImage4);

            const result = await addProduct(formData);
            console.log(result);
            return result;

        } catch (error) {
            console.log(error);
            return {
                success: false,
                handleAddProductError: error.message
            }
        }
    }


    // GET ALL PRODUCTS
    const handleAllProducts = async () => {
        try {
            const result = await getAllProducts();
            return result.data;
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: error,
            }
        }
    }

    // DELETE PRODUCT BY ID
    const deleteProductById = async (id) => {
        try {
            const result = await deleteProduct(id);
            console.log(result.data)
            return result.data

        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: error,
            }
        }
    }

    // CLEAR FORMDATA
    const clearFormData = () => {
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setSubCategory("");
        setSizes([]);
        setBestSeller(false);
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setBackendImage1(null);
        setBackendImage2(null);
        setBackendImage3(null);
        setBackendImage4(null);
    }

    const value = {
        name, setName,
        description, setDescription,
        price, setPrice,
        category, setCategory,
        subCategory, setSubCategory,
        sizes, setSizes,
        bestSeller, setBestSeller,

        image1, setImage1,
        image2, setImage2,
        image3, setImage3,
        image4, setImage4,

        backendImage1, setBackendImage1,
        backendImage2, setBackendImage2,
        backendImage3, setBackendImage3,
        backendImage4, setBackendImage4,

        handleAddProduct, handleAllProducts, deleteProductById,
        clearFormData,
    }

    return (
        <productDataContext.Provider value={value}>
            {children}
        </productDataContext.Provider>
    )
}

export default ProductContext