// File: components/Hero.tsx

import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

// Define the TypeScript interface for your data
interface HomeData {
  _id: string;
  title: string;
  slogn: string;
  description: string;
  imageUrl: string;
}

// Function to fetch data from Sanity
async function getData(): Promise<HomeData[]> {
  const fetchData = await client.fetch<HomeData[]>(`
    *[_type == "home"] {
      _id,
      slogn,
      title,
      description,
      "imageUrl": image.asset->url
    }
  `);
  return fetchData;
}

// The Hero component
const Hero: React.FC = async () => {
  const data = await getData();
  console.log("Fetched Home Data:", data);

  return (
    <>
      {data.map((val) => (
        <section key={val._id} className="text-gray-400 bg-gray-800 body-font">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            {/* Text Content */}
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 className="title-font sm:text-6xl text-3xl mb-4 py-11 font-medium text-gray-300">
                {val.title} <br/> {val.slogn}
              </h1>
              <p className="mb-8 leading-relaxed text-2xl">
                {val.description}
              </p>
              <div className="flex justify-center">
                <Link href="/products">
                  
                    <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                      Shop All Products
                    </button>
                  
                </Link>
              </div>
            </div>
            {/* Image */}
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <Image
                className="object-cover object-center rounded"
                alt="Hero Image"
                src={val.imageUrl}
                height={500}
                width={500}
                priority // Optional: to prioritize loading
              />
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default Hero;
