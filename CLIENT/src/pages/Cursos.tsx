import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import CourseDetailsDialog from '@/components/CourseDetailsDialog';
import EnrollDialog from '@/components/EnrollDialog';
import { toast } from 'sonner';

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
  instructor?: {
    name: string;
    bio: string;
  };
  syllabus?: string[];
}

// Filter options
const categories = ['Todos', 'Tecnologia', 'Marketing', 'Negócios', 'Idiomas', 'Design'];
const levels = ['Todos', 'Básico', 'Intermediário', 'Avançado'];

const Cursos = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedLevel, setSelectedLevel] = useState('Todos');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [coursesList, setCoursesList] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://129.151.181.243/api/api/cursos/todos');
        const data = await response.json();
        
        const formattedCourses = data.map((course: any) => ({
          id: course.id,
          title: course.title || "Curso sem título",
          description: course.description || "Descrição não disponível",
          price: course.price ? `MZN ${course.price}` : "Preço não disponível",
          category: course.category || "Sem categoria",
          level: course.level || "Nível não especificado",
          duration: course.duration || "Duração não especificada",
          nextClass: course.nextClass || "Data não definida",
          image: course.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
          instructor: course.instructor || undefined,
          syllabus: course.syllabus || undefined
        }));
        
        setCoursesList(formattedCourses);
        if (formattedCourses.length === 0) {
          toast.error('Nenhum curso encontrado. Tente novamente mais tarde.');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast.error('Erro ao carregar cursos. Tente novamente mais tarde.');
      }
    };
    
    fetchCourses(); 
  }, []);

  const filteredCourses = coursesList.filter(course => {
    const categoryMatch = selectedCategory === 'Todos' || course.category === selectedCategory;
    const levelMatch = selectedLevel === 'Todos' || course.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  const handleOpenDetails = (course: Course) => {
    const detailedCourse = {
      ...course,
      instructor: course.instructor || {
        name: "Instrutor não especificado",
        bio: "Informações do instrutor não disponíveis"
      },
      syllabus: course.syllabus || ["Ementa não disponível no momento"]
    };
    setSelectedCourse(detailedCourse);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

  const handleOpenEnroll = () => {
    setIsDetailsOpen(false);
    setIsEnrollOpen(true);
  };

  const handleCloseEnroll = () => {
    setIsEnrollOpen(false);
  };

  const handleDirectEnroll = (course: Course) => {
    setSelectedCourse(course);
    setIsEnrollOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-aulaazul-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4 font-playfair">Nossos Cursos</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Descubra cursos de alta qualidade ministrados por especialistas da indústria. 
                Todas as aulas são realizadas via Microsoft Teams com suporte via WhatsApp.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-8">
            <div className="mb-4">
              <h2 className="text-lg font-medium mb-2">Categorias</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Badge 
                    key={category}
                    className={`cursor-pointer px-3 py-1 text-sm ${
                      selectedCategory === category 
                        ? 'bg-aulaazul-500 hover:bg-aulaazul-600' 
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-2">Níveis</h2>
              <div className="flex flex-wrap gap-2">
                {levels.map(level => (
                  <Badge 
                    key={level}
                    className={`cursor-pointer px-3 py-1 text-sm ${
                      selectedLevel === level 
                        ? 'bg-aulaazul-500 hover:bg-aulaazul-600' 
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                    onClick={() => setSelectedLevel(level)}
                  >
                    {level}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">Nenhum curso encontrado com os filtros selecionados.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <Card key={course.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-playfair">{course.title}</CardTitle>
                      <Badge variant="secondary">{course.category}</Badge>
                    </div>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Duração:</span>
                        <span className="font-medium">{course.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Nível:</span>
                        <span className="font-medium">{course.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Próxima turma:</span>
                        <span className="font-medium">{new Date(course.nextClass).toLocaleDateString('pt-PT')}</span>
                      </div>
                      <div className="flex justify-between mt-4">
                        <span className="text-gray-500">Investimento:</span>
                        <span className="font-bold text-lg text-aulaazul-700">{course.price}</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline"
                      onClick={() => handleOpenDetails(course)}
                    >
                      Mais detalhes
                    </Button>
                    <Button 
                      className="bg-aulaazul-500 hover:bg-aulaazul-600"
                      onClick={() => location.href = 'https://www.paypal.com/ncp/payment/FN8LP58VYUP4Y'}
                    >
                      Inscrever-se
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      {selectedCourse && (
        <>
          <CourseDetailsDialog 
            isOpen={isDetailsOpen} 
            onClose={handleCloseDetails} 
            course={selectedCourse} 
            onEnroll={handleOpenEnroll}
          />
          <EnrollDialog 
            isOpen={isEnrollOpen} 
            onClose={handleCloseEnroll} 
            course={selectedCourse}
          />
        </>
      )}
      
      <Footer />
    </div>
  );
};

export default Cursos;