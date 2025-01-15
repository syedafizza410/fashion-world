import React from 'react'
import Image from 'next/image'
import img1 from '../pic/image/carsol1.jpg'
import imge2 from '../pic/image/carsol4.jpg'
import imge3 from '../pic/image/carsol5.jpg'
import imge4 from '../pic/image/carsol6.jpg'
const Carousel = () => {
  return (
    <div className="carousel w-full">
    <div id="slide1" className="carousel-item relative w-full">
      <Image
      alt='img1'
        src={img1}
      
        className="w-full" />
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a href="#slide4" className="btn btn-circle">❮</a>
        <a href="#slide2" className="btn btn-circle">❯</a>
      </div>
    </div>
    <div id="slide2" className="carousel-item relative w-full">
      <Image
      alt='img2'
        src={imge2}
        className="w-full" />
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a href="#slide1" className="btn btn-circle">❮</a>
        <a href="#slide3" className="btn btn-circle">❯</a>
      </div>
    </div>
    <div id="slide3" className="carousel-item relative w-full">
      <Image
      alt='img3'
        src={imge3}
        className="w-full" />
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a href="#slide2" className="btn btn-circle">❮</a>
        <a href="#slide4" className="btn btn-circle">❯</a>
      </div>
    </div>
    <div id="slide4" className="carousel-item relative w-full">
      <Image
      alt='4'
        src={imge4}
        className="w-full" />
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a href="#slide3" className="btn btn-circle">❮</a>
        <a href="#slide1" className="btn btn-circle">❯</a>
      </div>
    </div>
  </div>
  )
}

export default Carousel