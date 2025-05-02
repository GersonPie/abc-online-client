
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { User, Users, BookOpen, Award, Globe, Target } from 'lucide-react';

const Sobre = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-aulaazul-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Sobre a Aula Azul Connect</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transformando o aprendizado online através da conexão humana e tecnologia de ponta.
              </p>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa História</h2>
                <p className="text-lg text-gray-600 mb-4">
                  A Aula Azul Connect foi fundada em 2022 com uma missão clara: tornar a educação de qualidade acessível a todos, independentemente de sua localização geográfica ou disponibilidade de tempo.
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  Nascemos da percepção de que muitas pessoas talentosas não conseguiam acessar conteúdos educacionais de qualidade devido a barreiras como distância, horários rígidos ou custos elevados.
                </p>
                <p className="text-lg text-gray-600">
                  Hoje, contamos com mais de 50 especialistas em diversas áreas do conhecimento e já impactamos positivamente a vida de mais de 10.000 alunos em todo o Brasil e países lusófonos.
                </p>
              </div>
              <div className="mt-10 lg:mt-0">
                <img 
                  src="https://placehold.co/600x400/E6F7FF/0072F5?text=Nossa+História" 
                  alt="Nossa História" 
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Our Mission & Values */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossa Missão e Valores</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Orientamos nossas decisões e ações com base em princípios sólidos que nos guiam diariamente.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-aulaazul-50 p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 flex items-center justify-center bg-aulaazul-100 rounded-full mb-4">
                  <Target className="w-6 h-6 text-aulaazul-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Missão</h3>
                <p className="text-gray-600">
                  Democratizar o acesso à educação de qualidade através de tecnologia e metodologias inovadoras.
                </p>
              </div>

              <div className="bg-aulaazul-50 p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 flex items-center justify-center bg-aulaazul-100 rounded-full mb-4">
                  <User className="w-6 h-6 text-aulaazul-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Excelência</h3>
                <p className="text-gray-600">
                  Buscamos continuamente a excelência em nossos cursos, metodologias e atendimento aos alunos.
                </p>
              </div>

              <div className="bg-aulaazul-50 p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 flex items-center justify-center bg-aulaazul-100 rounded-full mb-4">
                  <Users className="w-6 h-6 text-aulaazul-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Comunidade</h3>
                <p className="text-gray-600">
                  Acreditamos no poder da comunidade de aprendizado e na troca de experiências entre alunos.
                </p>
              </div>

              <div className="bg-aulaazul-50 p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 flex items-center justify-center bg-aulaazul-100 rounded-full mb-4">
                  <BookOpen className="w-6 h-6 text-aulaazul-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Conhecimento Prático</h3>
                <p className="text-gray-600">
                  Focamos em conhecimento aplicável que transforma vidas e carreiras de forma concreta.
                </p>
              </div>

              <div className="bg-aulaazul-50 p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 flex items-center justify-center bg-aulaazul-100 rounded-full mb-4">
                  <Award className="w-6 h-6 text-aulaazul-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Qualidade</h3>
                <p className="text-gray-600">
                  Compromisso inabalável com a qualidade de nossos cursos, materiais e experiência do aluno.
                </p>
              </div>

              <div className="bg-aulaazul-50 p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 flex items-center justify-center bg-aulaazul-100 rounded-full mb-4">
                  <Globe className="w-6 h-6 text-aulaazul-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Inclusão</h3>
                <p className="text-gray-600">
                  Promovemos inclusão e acessibilidade em todas as nossas iniciativas e plataformas.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Our Team */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossa Equipe</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Conheça os profissionais dedicados que tornam a Aula Azul Connect possível.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: 'Ana Silva',
                  role: 'CEO & Fundadora',
                  bio: 'Especialista em Educação Digital com mais de 15 anos de experiência.',
                  image: 'https://placehold.co/300x300/E6F7FF/0072F5?text=Ana+Silva'
                },
                {
                  name: 'Carlos Oliveira',
                  role: 'Diretor Acadêmico',
                  bio: 'Doutor em Metodologias de Ensino pela USP.',
                  image: 'https://placehold.co/300x300/E6F7FF/0072F5?text=Carlos+Oliveira'
                },
                {
                  name: 'Marina Santos',
                  role: 'Coordenadora de Tecnologia',
                  bio: 'Especialista em plataformas educacionais e experiência do usuário.',
                  image: 'https://placehold.co/300x300/E6F7FF/0072F5?text=Marina+Santos'
                },
                {
                  name: 'Pedro Costa',
                  role: 'Diretor de Parcerias',
                  bio: 'Responsável por parcerias estratégicas e expansão internacional.',
                  image: 'https://placehold.co/300x300/E6F7FF/0072F5?text=Pedro+Costa'
                }
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-aulaazul-600 font-medium mb-2">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sobre;
