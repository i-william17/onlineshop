import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import Header from '../components/Layout/Header';
import Hero from '../components/Route/Hero/Hero';
import Categories from '../components/Route/Categories/Categories';
import BestDeals from '../components/Route/BestDeals/BestDeals';
import FeaturedProduct from '../components/Route/FeaturedProduct/FeaturedProduct';
import Events from '../components/Events/Events';
import Sponsored from '../components/Route/Sponsored';
import Footer from '../components/Layout/Footer';
import ImageCarousel from '../components/Layout/ImageCarousel';
import Engine from '../components/SupportEngine/Engine';
import LoadingVideo from "../Assests/shop.mp4";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 8000);

    AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
    
    return () => clearTimeout(timer);
  }, []);

  const images = [
    'https://res.cloudinary.com/ducckh8ip/image/upload/v1724918079/4_ha4fg5.jpg',
    'https://res.cloudinary.com/ducckh8ip/image/upload/v1724918075/1_mddrut.jpg',
    'https://res.cloudinary.com/ducckh8ip/image/upload/v1724918080/2_zfg1hz.jpg',
    'https://res.cloudinary.com/ducckh8ip/image/upload/v1724918081/3_txnr1p.jpg',
    'https://res.cloudinary.com/ducckh8ip/image/upload/v1724918088/5_qnbydc.jpg',
  ];

  return (
    <div>
      {loading ? (
        <div data-aos="fade-in" className={`fixed inset-0 flex items-center justify-center bg-black transition-opacity duration-1000 ${!loading ? 'opacity-0' : 'opacity-100'}`}>
          <video
            autoPlay
            loop
            muted
            src={LoadingVideo}
            type="video/mp4"
            aria-label="Loading..."
            className="w-full h-full object-cover"
          ></video>
        </div>
      ) : (
        <div data-aos="fade-in" className={`transition-opacity duration-10000 ${!loading ? 'opacity-100' : 'opacity-0'}`}>
          <Header activeHeading={1} />
          <Hero data-aos="fade-in" /> {/* Add AOS fade-up effect */}
          <br />
          <hr className="border-black border-1" />
          <br />
          <div data-aos="fade-in">
            <ImageCarousel images={images} />
          </div>
          <div data-aos="fade-right">
            <Categories />
          </div>
          <div data-aos="fade-left">
            <BestDeals />
          </div>
          <div data-aos="fade-up">
            <Events />
          </div>
          <div data-aos="fade-down">
            <FeaturedProduct />
          </div>
          <div data-aos="fade-right">
            <Sponsored />
          </div>
          <div data-aos="fade-up">
            <Engine />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default HomePage;
