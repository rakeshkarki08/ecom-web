import Hero from "@/components/ui/Hero";
import Image from "next/image";
import ProductsPage from "./products/page";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductsPage />
    </>
  );
}
