import Image from "next/image";

export default function FashionLanding() {
  return (
    <section style={{background:"#f3f0f1",height:"573px"}} className="flex flex-col lg:flex-row items-center justify-between px-10 py-16 ">
      {/* Left Side - Text Content */}
      <div className="lg:w-1/2 text-center lg:text-left">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
          FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
        </h1>
        <p className="text-gray-600 text-lg mt-4">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of style.
        </p>
        <button className="mt-6 px-6 py-3 bg-black text-white text-lg rounded-full shadow-lg hover:bg-gray-800">
          Shop Now
        </button>
        <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-8">
          <div style={{fontSize:"21px"}} className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">200+</h2>
            <p className="text-gray-600">International Brands</p>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">2000+</h2>
            <p className="text-gray-600">High-Quality Products</p>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">3000+</h2>
            <p className="text-gray-600">Happy Customers</p>
          </div>
        </div>
      </div>
      
      {/* Right Side - Image */}
      <div className="lg:w-1/2 flex justify-center relative mt-10 lg:mt-0">
        <Image
          src="/images/header-res-homepage.png" // Update with actual image path
          alt="Fashion Models"
          width={500}
          height={500}
          className="object-contain"
        />
        {/* Decorative elements */}
        <span className="absolute top-10 left-10 w-6 h-6 bg-black rotate-45"></span>
        <span className="absolute bottom-10 right-10 w-6 h-6 bg-black rotate-45"></span>
      </div>
    </section>
  );
}