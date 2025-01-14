import Footer from "./compunents/Footer";
import Navbar from "./compunents/Navbar";
import Hero from "./hero/page";

import Products from "./products/page";



export default async function Home() {

  
  return (
<>
<Navbar />
 <Hero />
<Products/>
<Footer />

</>

  );
}
