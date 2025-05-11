import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { FaClock, FaLevelUpAlt, FaCalendarAlt, FaTag } from 'react-icons/fa';

interface Course {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  level: string;
  duration: string;
  nextClass: string;
  image: string;
}

const categories = ['Todos', 'Tecnologia', 'Marketing', 'Negócios', 'Idiomas', 'Design'];
const levels = ['Todos', 'Básico', 'Intermediário', 'Avançado'];

const ABCCoursesGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedLevel, setSelectedLevel] = useState('Todos');
  const [coursesList, setCoursesList] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://129.151.181.243/api/api/cursos/todos');
        const data = await response.json();
        const formatted = data.map((course: any) => ({
          ...course,
          price: course.price ? `MZN ${course.price}` : 'Preço não disponível',
          image: course.image || 'https://source.unsplash.com/600x400/?classroom,learning'
        }));
        setCoursesList(formatted);
      } catch (err) {
        toast.error('Erro ao carregar cursos.');
      }
    };
    fetchCourses();
  }, []);

  const filtered = coursesList.filter(course => {
    const matchCategory = selectedCategory === 'Todos' || course.category === selectedCategory;
    const matchLevel = selectedLevel === 'Todos' || course.level === selectedLevel;
    return matchCategory && matchLevel;
  });

  return (
    <section className="py-12 bg-gradient-to-br from-white to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-aulaazul-800 font-playfair mb-2">
          Cursos da ABC Online
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Aprenda com os melhores em um ambiente online confortável e dinâmico.
        </p>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                className="whitespace-nowrap"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {levels.map(level => (
              <Button
                key={level}
                variant={selectedLevel === level ? 'default' : 'outline'}
                className="whitespace-nowrap"
                onClick={() => setSelectedLevel(level)}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(course => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="relative h-48">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="text-white text-lg font-semibold">{course.title}</h3>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <p className="text-sm text-gray-600 line-clamp-3">{course.description}</p>
                <div className="flex flex-wrap items-center text-sm text-gray-500 gap-2 mt-2">
                  <div className="flex items-center gap-1"><FaTag className="text-aulaazul-600" /> {course.category}</div>
                  <div className="flex items-center gap-1"><FaLevelUpAlt className="text-aulaazul-600" /> {course.level}</div>
                  <div className="flex items-center gap-1"><FaClock className="text-aulaazul-600" /> {course.duration}</div>
                  <div className="flex items-center gap-1"><FaCalendarAlt className="text-aulaazul-600" /> {new Date(course.nextClass).toLocaleDateString('pt-PT')}</div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-aulaazul-700 font-bold">{course.price}</span>
                  <Button
                    className="bg-aulaazul-500 hover:bg-aulaazul-600 text-white text-sm"
                    onClick={() => location.href = 'https://www.paypal.com/ncp/payment/FN8LP58VYUP4Y'}
                  >
                    Inscrever-se
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center mt-16 text-gray-600">
            Nenhum curso encontrado com os filtros aplicados.
          </div>
        )}
      </div>
    </section>
  );
};

export default ABCCoursesGallery;
