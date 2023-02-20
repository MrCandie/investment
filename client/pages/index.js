import Head from "next/head";
import { Inter } from "@next/font/google";
import Hero from "../components/homepage/hero/Hero";
import Description from "../components/homepage/description/Description";
import House from "../components/homepage/houses/House";
import Services from "../components/homepage/services/Services";
import Layout from "../components/UI/layout/Layout";
import Header from "../components/UI/header/Header";
import Plan from "../components/homepage/plans/Plan";
import Footer from "../components/UI/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Description />
      <House />
      <Services />
      <Plan />
      <Footer />
    </>
  );
}
