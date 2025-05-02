
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

type Course = {
  id: number;
  title: string;
  description: string;
  instructor: string;
  price: number;
  category: string;
  imageUrl: string;
};

const courses: Course[] = [
  {
    id: 1,
    title: 'Desenvolvimento Web Frontend',
    description: 'Aprenda HTML, CSS e JavaScript para construir websites modernos e responsivos.',
    instructor: 'João Silva',
    price: 149.99,
    category: 'Tecnologia',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
  },
  {
    id: 2,
    title: 'Marketing Digital Completo',
    description: 'Domine as estratégias de marketing digital para impulsionar seus negócios online.',
    instructor: 'Maria Oliveira',
    price: 199.99,
    category: 'Marketing',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2115&q=80',
  },
  {
    id: 3,
    title: 'Inglês para Negócios',
    description: 'Desenvolva habilidades de comunicação em inglês para o ambiente corporativo.',
    instructor: 'Pedro Santos',
    price: 129.99,
    category: 'Idiomas',
    imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
  },
  {
    id: 4,
    title: 'Gestão de Projetos',
    description: 'Aprenda métodos ágeis e tradicionais para gerenciar projetos com eficiência.',
    instructor: 'Ana Costa',
    price: 179.99,
    category: 'Negócios',
    imageUrl: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
];

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <Card className="overflow-hidden h-full bg-white border-none shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in">
      <div className="h-48 overflow-hidden">
        <img 
          src={course.imageUrl} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2 pt-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{course.title}</CardTitle>
          <Badge className="bg-aulaazul-100 text-aulaazul-700 hover:bg-aulaazul-200">{course.category}</Badge>
        </div>
        <CardDescription className="text-sm text-gray-600">Instrutor: {course.instructor}</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <p className="text-sm text-gray-600">{course.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-4 pb-4">
        <div className="text-aulaazul-600 font-bold">
          R$ {course.price.toFixed(2)}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            Contato
          </Button>
          <Button size="sm" className="bg-aulaazul-500 hover:bg-aulaazul-600">
            Inscrever
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const FeaturedCourses = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Cursos em Destaque</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10">
            Conheça nossos cursos mais populares e comece sua jornada de aprendizado
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <div key={course.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <CourseCard course={course} />
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Button size="lg" className="bg-aulaazul-500 hover:bg-aulaazul-600 px-8">
            Ver todos os cursos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
