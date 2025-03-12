"use client";

import Hero from "./components/Hero";
import Header from "./components/Header-9c5mxJIsZPqJT48scUISKH0YfagNgE";
import Features from "./components/Features";
import Services from "./components/Services";
import Contact from "./components/Contact";
import FloatingNav from "./components/floating-nav";
import TestimonialSection from "./components/TestimonialSection";
import AboutSection from "./components/AboutSection";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-white dark:bg-gray-900 min-h-screen pt-[80px]">
        <FloatingNav />
        <Hero />
        <AboutSection />
        <Features />
        <Services />
        <TestimonialSection />
        <FAQSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
