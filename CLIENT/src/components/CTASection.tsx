
import React from 'react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="bg-gradient-to-r from-aulaazul-600 to-aulaazul-800 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              <span className="block mb-2">Pronto para começar sua jornada?</span>
              <span className="block text-aulaazul-200">Inscreva-se hoje e transforme seu futuro.</span>
            </h2>
            <p className="mt-4 text-lg text-aulaazul-100">
              Junte-se a milhares de alunos que já estão aprendendo com os melhores professores.
            </p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 lg:mt-0 lg:flex-shrink-0">
            <Button className="px-6 py-3 text-base font-medium rounded-md text-aulaazul-600 bg-white hover:bg-gray-50">
              Começar agora
            </Button>
            <Button variant="outline" className="px-6 py-3 text-base font-medium rounded-md text-white border-white hover:bg-aulaazul-500">
              Conhecer cursos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
