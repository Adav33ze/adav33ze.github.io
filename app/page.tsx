'use client';

import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import AnimationWrapper from './components/AnimationWrapper';
import ThreeScene from './components/ThreeScene';

export default function Home() {
  return (
    <main className="relative">
      <NavBar />
      <HeroSection />
      
      {/* Three.js Scene Section */}
      <section className="h-screen flex items-center justify-center">
        <div className="w-full h-full">
          <ThreeScene />
        </div>
      </section>
      
      {/* Portfolio Section */}
      <section className="py-20 px-4">
        <AnimationWrapper animationType="fade-up">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Featured Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div 
                  key={item} 
                  className="group relative overflow-hidden rounded-xl h-80 bg-gray-200"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                  <div className="relative z-20 p-6 h-full flex flex-col justify-end">
                    <h3 className="text-xl font-bold text-white">Project {item}</h3>
                    <p className="text-gray-200">Architecture & Interior Design</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimationWrapper>
      </section>
      
      {/* About Section */}
      <section className="py-20 px-4">
        <AnimationWrapper animationType="fade-up">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">About</h2>
            <p className="text-lg text-gray-600 mb-6">
              Abdulrahman is an Architect and Interior Designer based in Abuja, Nigeria, 
              working across residential, hospitality, and institutional projects. 
              Available for collaborations locally and internationally.
            </p>
            <button className="px-6 py-3 bg-black text-white font-medium rounded-full hover:bg-white hover:text-black border-2 border-black transition-all duration-300">
              Get in Touch
            </button>
          </div>
        </AnimationWrapper>
      </section>
    </main>
  );
}