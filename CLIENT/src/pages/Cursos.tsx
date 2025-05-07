
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import CourseDetailsDialog from '@/components/CourseDetailsDialog';
import EnrollDialog from '@/components/EnrollDialog';
import { toast } from 'sonner';
import { redirect } from 'react-router-dom';


const cousePrototype = {
    id: 1,
    title: 'Desenvolvimento Web Completo',
    description: 'Aprenda HTML, CSS, JavaScript, React e Node.js para criar aplicações web modernas.',
    price: 'MZN 500,00',
    category: 'Tecnologia',
    level: 'Intermediário',
    duration: '80 horas',
    nextClass: '15 de Maio, 2025',
    image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=2070&auto=format&fit=crop',
    instructor: {
      name: 'Ricardo Oliveira',
      bio: 'Desenvolvedor web com mais de 10 anos de experiência em projetos internacionais'
    }
 }
// Mock data for courses with better images
// const coursesList = [
//   {
//     id: 1,
//     title: 'Desenvolvimento Web Completo',
//     description: 'Aprenda HTML, CSS, JavaScript, React e Node.js para criar aplicações web modernas.',
//     price: 'MZN 500,00',
//     category: 'Tecnologia',
//     level: 'Intermediário',
//     duration: '80 horas',
//     nextClass: '15 de Maio, 2025',
//     image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=2070&auto=format&fit=crop',
//     instructor: {
//       name: 'Ricardo Oliveira',
//       bio: 'Desenvolvedor web com mais de 10 anos de experiência em projetos internacionais'
//     },
//     syllabus: [
//       'Fundamentos de HTML5 e CSS3',
//       'JavaScript moderno e ES6+',
//       'React.js: componentes, hooks e context API',
//       'Node.js e Express para backend',
//       'Integração com bancos de dados',
//       'Deploy e CI/CD',
//       'Projeto final completo'
//     ]
//   },
//   {
//     id: 2,
//     title: 'Marketing Digital',
//     description: 'Estratégias avançadas de marketing digital para aumentar visibilidade e vendas.',
//     price: 'MZN 500,00',
//     category: 'Marketing',
//     level: 'Básico',
//     duration: '40 horas',
//     nextClass: '22 de Maio, 2025',
//     image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
//     instructor: {
//       name: 'Ana Carolina Silva',
//       bio: 'Especialista em marketing digital com experiência em grandes marcas'
//     }
//   },
//   {
//     id: 3,
//     title: 'Excel Avançado para Negócios',
//     description: 'Domine fórmulas avançadas, dashboards e análise de dados para impulsionar sua carreira.',
//     price: 'MZN 500,00',
//     category: 'Negócios',
//     level: 'Avançado',
//     duration: '30 horas',
//     nextClass: '10 de Maio, 2025',
//     image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070&auto=format&fit=crop'
//   },
//   {
//     id: 4,
//     title: 'Inglês para Negócios',
//     description: 'Desenvolva habilidades de comunicação em inglês voltadas para o ambiente corporativo.',
//     price: 'MZN 500,00',
//     category: 'Idiomas',
//     level: 'Intermediário',
//     duration: '60 horas',
//     nextClass: '5 de Junho, 2025',
//     image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop'
//   },
//   {
//     id: 5,
//     title: 'Liderança e Gestão de Equipes',
//     description: 'Desenvolva habilidades essenciais para liderar equipes de alto desempenho.',
//     price: 'MZN 500,00',
//     category: 'Negócios',
//     level: 'Intermediário',
//     duration: '45 horas',
//     nextClass: '12 de Junho, 2025',
//     image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop'
//   },
//   {
//     id: 6,
//     title: 'Design UX/UI',
//     description: 'Aprenda a criar interfaces intuitivas e experiências de usuário memoráveis.',
//     price: 'MZN 500,00',
//     category: 'Design',
//     level: 'Intermediário',
//     duration: '70 horas',
//     nextClass: '20 de Maio, 2025',
//     image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop'
//   }
// ];

// Filter options
const categories = ['Todos', 'Tecnologia', 'Marketing', 'Negócios', 'Idiomas', 'Design'];
const levels = ['Todos', 'Básico', 'Intermediário', 'Avançado'];

const Cursos = () => {
  
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedLevel, setSelectedLevel] = useState('Todos');
  const [selectedCourse, setSelectedCourse] = useState<typeof cousePrototype | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [coursesList, setCoursesList] = useState<typeof cousePrototype[]>([]);

  useEffect(() => {
    const fetchCourses = async ()=>{
      try{
        const coursesList_proto = await fetch('http://129.151.181.243/api/api/cursos/todos')
        const coursesList = await coursesList_proto.json();
        console.log(coursesList);
        setCoursesList(coursesList);
        if(coursesList.length === 0){
          toast.error('Nenhum curso encontrado. Tente novamente mais tarde.');
        }
      } 
      catch{
        toast.error('Erro ao carregar cursos. Tente novamente mais tarde.');
      }

      
    }    
    fetchCourses(); 

  }, [])
  
  const filteredCourses = coursesList.filter(course => {
    const categoryMatch = selectedCategory === 'Todos' || course.category === selectedCategory;
    const levelMatch = selectedLevel === 'Todos' || course.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  const handleOpenDetails = (course: typeof cousePrototype) => {
    setSelectedCourse(course);
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

  const handleDirectEnroll = (course: typeof cousePrototype) => {
    
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
                        <span className="font-medium">{new Date(course.nextClass).toDateString()}</span>
                      </div>
                      <div className="flex justify-between mt-4">
                        <span className="text-gray-500">Investimento:</span>
                        <span className="font-bold text-lg text-aulaazul-700">{course.price} MZN</span>
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
                      onClick={() => /*handleDirectEnroll(course)*/ location.href = 'https://www.paypal.com/ncp/payment/FN8LP58VYUP4Y'}
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
