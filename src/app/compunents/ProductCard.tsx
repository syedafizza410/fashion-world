// components/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <div
      className="
        w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg 
        dark:bg-gray-800 dark:border-gray-700 
        transform transition duration-300 hover:scale-105 hover:shadow-2xl
      "
    >
      <Link href={`/products/${product._id}`}>
        
          <Image
            className="p-8 rounded-t-lg"
            src={product.imageUrl}
            alt={product.title}
            width={500}
            height={500}
            loading="lazy"
            objectFit="cover"
          />
        
      </Link>
      <div className="px-5 pb-5">
        <Link href={`/products/${product._id}`}>
          
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
              {product.title}
            </h5>
          
        </Link>
        <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          <button
            className="
              px-5 py-2 text-sm font-medium text-white bg-blue-700 
              rounded-lg transition-colors duration-300 
              hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500
              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-400
            "
            aria-label={`Add ${product.title} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
