"use client";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BLOG } from "../graphql/queries";


interface BlogItem {
  title: string;
  description: string;
  image?: {
    url: string;
  };
}

interface BlogData {
  blogSectionCollection: {
    items: BlogItem[];
  };
}

export default function Blog() {
  const { loading, error, data } = useQuery<BlogData>(GET_BLOG);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (loading) return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Our Latest Blogs</h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.blogSectionCollection?.items?.map((blog, index) => (
          <div
            key={index}
            className="relative group bg-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105"
          >
     
            {blog.image?.url && (
              <div className="h-56 w-full overflow-hidden">
                <img
                  src={blog.image.url}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
                />
              </div>
            )}

    
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{blog.title}</h2>

      
              {expandedIndex === index && (
                <p className="text-gray-600 text-sm mb-4">{blog.description}</p>
              )}

          
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="inline-block text-white bg-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all"
              >
                {expandedIndex === index ? "Read Less" : "Read More"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
