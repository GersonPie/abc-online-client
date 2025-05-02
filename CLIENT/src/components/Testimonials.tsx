
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    id: 1,
    content:
      'Os cursos são excelentes! A metodologia de ensino e o suporte via WhatsApp fizeram toda a diferença no meu aprendizado.',
    name: 'Ana Souza',
    role: 'Estudante de Marketing Digital',
    avatar: 'AS',
  },
  {
    id: 2,
    content:
      'A plataforma é muito intuitiva e as aulas pelo Microsoft Teams são de ótima qualidade. Recomendo a todos!',
    name: 'Carlos Mendes',
    role: 'Desenvolvedor Web',
    avatar: 'CM',
  },
  {
    id: 3,
    content:
      'O atendimento personalizado e a facilidade de comunicação com os professores são diferenciais que me fizeram escolher essa plataforma.',
    name: 'Juliana Lima',
    role: 'Analista de Negócios',
    avatar: 'JL',
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">O que nossos alunos dizem</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Veja as experiências de quem já aproveitou nossos cursos
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={testimonial.id} className="bg-aulaazul-50 border-none shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              <CardContent className="p-8">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <svg width="40" height="32" className="text-aulaazul-300" viewBox="0 0 45 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.5 36C9.3 36 5.85 34.65 3.15 31.95C1.05 29.25 0 25.95 0 22.05C0 17.55 1.35 13.35 4.05 9.45C6.75 5.55 10.65 2.4 15.75 0L18 4.8C14.1 6.6 11.1 8.85 9 11.55C6.9 14.25 5.85 17.1 5.85 20.1C6.45 19.5 7.5 19.2 9 19.2C10.8 19.2 12.45 19.95 13.95 21.45C15.45 22.95 16.2 24.75 16.2 26.85C16.2 29.25 15.45 31.2 13.95 32.7C12.45 34.9 10.5 36 13.5 36ZM40.5 36C36.3 36 32.85 34.65 30.15 31.95C28.05 29.25 27 25.95 27 22.05C27 17.55 28.35 13.35 31.05 9.45C33.75 5.55 37.65 2.4 42.75 0L45 4.8C41.1 6.6 38.1 8.85 36 11.55C33.9 14.25 32.85 17.1 32.85 20.1C33.45 19.5 34.5 19.2 36 19.2C37.8 19.2 39.45 19.95 40.95 21.45C42.45 22.95 43.2 24.75 43.2 26.85C43.2 29.25 42.45 31.2 40.95 32.7C39.45 34.9 37.5 36 40.5 36Z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 mb-8 flex-grow leading-relaxed">{testimonial.content}</p>
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 border-2 border-aulaazul-100">
                      <AvatarFallback className="bg-aulaazul-500 text-white">{testimonial.avatar}</AvatarFallback>
                      <AvatarImage src="" />
                    </Avatar>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
