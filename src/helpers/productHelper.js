
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/products.json'); 


// Function to read JSON data from the products file


function readProductsData() {
  const data = fs.readFileSync(productsFilePath, 'utf8');
  return JSON.parse(data);
}

// Function to write JSON data to the products file

function writeProductsData(data) {
  fs.writeFileSync(productsFilePath, JSON.stringify(data, null, 2), 'utf8');
}


// Function to find a product by ID

function findProductById(id) {
  const products = readProductsData();
  return products.find(product => product.id === id);
}


// Function to create a new product

function createProduct(newProduct) {
  const products = readProductsData();
  id = products.length + 1;
  const obj ={
    id : id,
    productName :newProduct.name,
    price :newProduct.price,
    seller:newProduct.seller
  }
  products.push(obj);
  writeProductsData(products);
  return obj;
}


// Function to update an existing product

function updateProduct(Product) {
  const products = readProductsData();
  const findIndex = findProductById(Product.id)
  if(!findIndex)return false

  if(!Product.name){Product.name =findIndex.productName}
  if(!Product.seller){Product.seller =findIndex.seller}
  if(!Product.price){Product.price =findIndex.price}

  const index = products.findIndex(product => product.id === Product.id);
  if (index !== -1) {
    products[index] = Product;
    writeProductsData(products);
    return Product;
  }
  return null;
  
}




// Function to delete a product by ID

function ProductDelete(id) {
  const products = readProductsData();
  const index = products.findIndex(product => product.id === id);
  if (index !== -1) {
    const deletedProduct = products.splice(index, 1)[0];
    writeProductsData(products);
    return deletedProduct;
  }
  return null;
}

module.exports = {
  findProductById,
  createProduct,
  updateProduct,
  ProductDelete,
  readProductsData
};
