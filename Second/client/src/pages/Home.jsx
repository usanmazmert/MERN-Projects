import React from 'react'
import Navbar from "../components/Navbar";
import Header from "../components/Header"; 
import Featured from "../components/Featured";
import PropertyList from '../components/PropertyList';
import FeaturedProperties from '../components/FeaturedProperties';
import MailList from '../components/MailList';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className='relative'>
      <Navbar/>
      <Header/>
      <div className='mt-[50px] flex flex-col items-center gap-[30px]'>
        <Featured/>
        <h1 className='w-[1024px] text-xl font-bold'>Browse by Property Type</h1>
        <PropertyList/>
        <h1 className='w-[1024px] text-xl font-bold'>Homes Guests Love</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home