"use client";

import React from "react";
import Navbar from "./components/navigation/Navbar";
import Hero from "./components/hero/Hero";
import Sections from "./components/smallSections/Sections";
import Footer from "./components/footer/Footer";

const page = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Hero></Hero>
      <Sections></Sections>
      <Footer></Footer>
    </div>
  );
};

export default page;
