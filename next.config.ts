import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.unsplash.com", // Unsplash
      "plus.unsplash.com", // Unsplash Premium
      "images.pexels.com", // Pexels
      "cdn.pixabay.com", // Pixabay
      "images.unsplash.com", // repeat if needed
      "media.istockphoto.com", // iStock
      "www.shutterstock.com", // Shutterstock
      // add more domains as needed
    ],
  },
};

export default nextConfig;
