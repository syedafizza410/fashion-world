// app/products/page.tsx
import { client } from "@/sanity/lib/client";
import ProductCard from "@/app/compunents/ProductCard";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

async function getData(): Promise<Product[]> {
  const fetchData = await client.fetch(
    `*[_type == "products"] {
      _id,
      title,
      description,
      price,
      "imageUrl": image.asset->url
    }`
  );
  console.log("Fetched Products:", fetchData);
  return fetchData;
}

const ProductsPage = async () => {
  const data: Product[] = await getData();

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Our Products
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Explore our latest collection of products!
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      
    </div>
  );
};

export default ProductsPage;
