"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-animate", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.to(".sparkle", {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "sine.inOut",
      });

      gsap.from(".cta-button", {
        scale: 0.95,
        duration: 0.8,
        ease: "back.out(1.7)",
      });

      gsap.from(".stat-item", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.3,
        delay: 1.2,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
        <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8 hero-animate">
          <Sparkles className="h-4 w-4 text-blue-400 sparkle" />
          <span className="text-sm text-blue-400 font-medium">
            New Collection Available
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 hero-animate">
          <span className="block text-white">Premium Products</span>
          <span className="block gradient-text">Modern Experience</span>
        </h1>

        <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-8 hero-animate">
          Discover our curated collection of premium products. Built with modern
          technology and designed for the future of ecommerce.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center hero-animate">
          <Link
            href="/products"
            className="group inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 cta-button"
          >
            <span>Shop Now</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 pt-12 border-t border-gray-800">
          <div className="text-center stat-item">
            <div className="text-3xl font-bold gradient-text mb-2">10K+</div>
            <div className="text-gray-400">Happy Customers</div>
          </div>
          <div className="text-center stat-item">
            <div className="text-3xl font-bold gradient-text mb-2">500+</div>
            <div className="text-gray-400">Premium Products</div>
          </div>
          <div className="text-center stat-item">
            <div className="text-3xl font-bold gradient-text mb-2">99%</div>
            <div className="text-gray-400">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
