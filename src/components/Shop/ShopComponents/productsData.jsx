// Sample product data structure with discounted prices
export const sampleProducts = [
  {
    "_id": "687bd362b75b06007b185e9c",
    "name": "Himalayan Shilajit",
    "description": "Pure Himalayan Shilajit resin for improved stamina and recovery",
    "price": 1349,
    "discountedPrice": 999,
    "categories": ["6731f3f4039bd54cd8f6b44c"],
    "subcategories": ["687bd362b75b06007b185e9a"],
    "stock": 53,
    "isFeatured": true,
    "isBestSelling": true,
    "manufacturer": "Wellvas",
    "brand": "Wellvas",
    "images": [
      {
        "_id": "687bd362b75b06007b185e9d",
        "url": "http://res.cloudinary.com/dyrlpntpl/image/upload/v1752945479/cxjbl0snknkyqtnd886c.png"
      }
    ],
    "createdAt": "2025-07-19T17:18:26.930Z",
    "updatedAt": "2025-07-19T17:18:26.930Z"
  },
  {
    "_id": "687bd362b75b06007b185e9d",
    "name": "Ashwazen Max",
    "description": "Premium Ashwagandha supplement for stress relief and energy",
    "price": 899,
    "discountedPrice": null, // No discount
    "categories": ["6731f3f4039bd54cd8f6b44c"],
    "subcategories": ["687bd362b75b06007b185e9a"],
    "stock": 25,
    "isFeatured": false,
    "isBestSelling": false,
    "manufacturer": "Wellvas",
    "brand": "Wellvas",
    "images": [
      {
        "_id": "687bd362b75b06007b185e9e",
        "url": "http://res.cloudinary.com/dyrlpntpl/image/upload/v1752945479/ashwazen.png"
      }
    ],
    "createdAt": "2025-07-19T17:18:26.930Z",
    "updatedAt": "2025-07-19T17:18:26.930Z"
  },
  {
    "_id": "687bd362b75b06007b185e9f",
    "name": "EVAS Pro",
    "description": "Advanced energy and vitality supplement",
    "price": 1200,
    "discountedPrice": 899,
    "categories": ["6731f3f4039bd54cd8f6b44c"],
    "subcategories": ["687bd362b75b06007b185e9a"],
    "stock": 40,
    "isFeatured": true,
    "isBestSelling": false,
    "manufacturer": "Wellvas",
    "brand": "Wellvas",
    "images": [
      {
        "_id": "687bd362b75b06007b185ea0",
        "url": "http://res.cloudinary.com/dyrlpntpl/image/upload/v1752945479/evas.png"
      }
    ],
    "createdAt": "2025-07-19T17:18:26.930Z",
    "updatedAt": "2025-07-19T17:18:26.930Z"
  }
];

// Example of how the new product structure works:
/*
{
    "categories": ["6731f3f4039bd54cd8f6b44c"],
    "subcategories": ["687bd362b75b06007b185e9a"],
    "stock": 53,
    "isFeatured": false,
    "isBestSelling": false,
    "_id": "687bd362b75b06007b185e9c",
    "name": "Product Name",
    "description": "Product description",
    "price": 233,           // Original price
    "discountedPrice": 199, // Discounted price (null if no discount)
    "manufacturer": "Manufacturer Name",
    "brand": "Brand Name",
    "images": [
        {
            "_id": "687bd362b75b06007b185e9d",
            "url": "http://res.cloudinary.com/dyrlpntpl/image/upload/v1752945479/cxjbl0snknkyqtnd886c.png"
        }
    ],
    "createdAt": "2025-07-19T17:18:26.930Z",
    "updatedAt": "2025-07-19T17:18:26.930Z",
    "__v": 0
}
*/
