
import React from 'react';
import { useState, useEffect } from 'react';
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
  image: string;
};



const CourseCard = ({ course }: { course: Course }) => {

  





  return (
    <Card className="overflow-hidden h-full bg-white border-none shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in">
      <div className="h-48 overflow-hidden">
        <img 
          src={course.image} 
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
  const [courses, setCoursesList] = useState([]);

  useEffect(() => {
    const fetchCourses = async ()=>{
      try{
        const coursesList_proto = await fetch('http://129.151.181.243/api/api/cursos/todos')
        const coursesList = await coursesList_proto.json();
        console.log(coursesList);
        setCoursesList(coursesList);
        
      } 
      catch{
        
      }

      
    }    
    fetchCourses(); 

  }, [])


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
          <Button onClick={()=>location.href = '/cursos'} size="lg" className="bg-aulaazul-500 hover:bg-aulaazul-600 px-8">
            Ver todos os cursos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
