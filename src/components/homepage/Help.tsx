"use client";

import { ChevronRight, Search } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Help() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Sample data with more collections to demonstrate scrolling
  const collections = [
    {
      title: "Getting Started with M&P",
      description: "Yay! We're excited to get you on board.",
      articles: 2,
      highlighted: false,
    },
    {
      title: "Customer Support",
      description: "Hey there question. Can I interest you in some answers?",
      articles: 58,
      highlighted: true,
    },
    {
      title: "Shipping",
      description: "We love packing boxes. This is how we send them to you.",
      articles: 2,
      highlighted: false,
    },
    {
      title: "Frequently Asked Questions (FAQ)",
      description: "Answers to Common Questions",
      articles: 6,
      highlighted: false,
    },
    {
      title: "Returns & Refunds",
      description: "How to return items and get your money back.",
      articles: 4,
      highlighted: false,
    },
    {
      title: "Account Management",
      description: "Managing your M&P account settings and preferences.",
      articles: 7,
      highlighted: false,
    },
    {
      title: "Product Information",
      description: "Details about our products and how to use them.",
      articles: 12,
      highlighted: false,
    },
    {
      title: "Payment Methods",
      description: "Information about accepted payment methods and billing.",
      articles: 5,
      highlighted: false,
    },
  ];

  // Simulate scrolling to show the scrollbar
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 1;
        setTimeout(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
          }
        }, 100);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Fixed header */}
      <div className="p-4 border-b bg-white z-10">
        <h1 className="text-xl font-semibold text-center mb-4">Help</h1>

        {/* Search Bar */}
        <div className="relative mb-1">
          <input
            type="text"
            placeholder="Search for help"
            className="w-full py-2 px-4 bg-gray-100 rounded-md pr-10 focus:outline-none border border-gray-300"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500">
            <Search className="h-4 w-4 stroke-[3] text-[#f46117]" />
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4">
        <div className="mb-4">
          <p className="text-gray-700 font-medium">
            {collections.length} collections
          </p>
        </div>

        <div className="space-y-4">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="p-4 rounded-md cursor-pointer bg-white border border-gray-100 hover:bg-[#f46117]/20 transition-colors duration-300 group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900 transition-colors duration-200 group-hover:text-[#f46117]">
                    {collection.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {collection.description}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    {collection.articles} articles
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-[#f46117] stroke-[2] mt-1 flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>

        <div className="h-4"></div>
      </div>
    </div>
  );
}
