
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-aulaazul-700 to-aulaazul-900">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] opacity-10 bg-cover bg-center"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-20 md:py-28 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="font-heading text-white mb-6 leading-tight">
              Aprenda Com Os Melhores <span className="text-aulaazul-200">Cursos Online</span>
            </h1>
            <p className="text-aulaazul-100 text-lg md:text-xl mb-8 font-body">
              Expanda seus conhecimentos com nossos cursos online ministrados através do Microsoft Teams. 
              Tenha acesso direto aos professores via WhatsApp e amplie suas oportunidades.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-aulaazul-700 hover:bg-aulaazul-50 font-medium">
                Ver cursos
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 font-medium">
                Saiba mais
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16 md:h-24 lg:h-32 text-background fill-current" viewBox="0 0 1440 96" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 96L60 80C120 64 240 32 360 32C480 32 600 64 720 69.3C840 75 960 53 1080 42.7C1200 32 1320 32 1380 32L1440 32V0L1380 0C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0L0 0Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
