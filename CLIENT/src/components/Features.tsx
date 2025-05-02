
import React from 'react';
import { MessageSquare, Video, CreditCard, Users } from 'lucide-react';

const features = [
  {
    name: 'Aulas ao vivo pelo Microsoft Teams',
    description:
      'Participe de aulas interativas com professores experientes através da plataforma Microsoft Teams.',
    icon: Video,
  },
  {
    name: 'Suporte via WhatsApp',
    description:
      'Tire suas dúvidas diretamente com os professores através do WhatsApp para um atendimento rápido e personalizado.',
    icon: MessageSquare,
  },
  {
    name: 'Pagamento seguro',
    description:
      'Realize pagamentos de forma segura e prática diretamente em nossa plataforma.',
    icon: CreditCard,
  },
  {
    name: 'Professores qualificados',
    description:
      'Aprenda com os melhores profissionais do mercado, selecionados por sua experiência e didática.',
    icon: Users,
  },
];

const Features = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-base text-aulaazul-600 font-semibold tracking-wide uppercase mb-3">Benefícios</h2>
          <p className="text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
            Uma nova maneira de aprender
          </p>
          <p className="max-w-2xl text-xl text-gray-500 mx-auto">
            Conheça as vantagens da nossa plataforma que conecta alunos e professores de forma simples e eficiente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <div key={feature.name} className="flex items-start p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow duration-300 animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-aulaazul-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{feature.name}</h3>
                <p className="text-base text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
