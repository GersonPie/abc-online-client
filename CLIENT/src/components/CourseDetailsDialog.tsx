
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type CourseDetailsProps = {
  isOpen: boolean;
  onClose: () => void;
  course: {
    id: number;
    title: string;
    description: string;
    price: string;
    category: string;
    level: string;
    duration: string;
    nextClass: string;
    image: string;
    syllabus?: string[];
    instructor?: {
      name: string;
      bio: string;
      image?: string;
    };
  };
  onEnroll: () => void;
};

const CourseDetailsDialog = ({ isOpen, onClose, course, onEnroll }: CourseDetailsProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{course.title}</DialogTitle>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary">{course.category}</Badge>
            <Badge variant="outline">{course.level}</Badge>
          </div>
          <DialogDescription className="text-base mt-2">
            {course.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-56 object-cover rounded-lg"
            />
            
            <div className="mt-4 space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Duração:</span>
                <span>{course.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Próxima turma:</span>
                <span>{course.nextClass}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Investimento:</span>
                <span className="font-bold text-aulaazul-700">{course.price}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3">Conteúdo do curso</h3>
            {course.syllabus ? (
              <ul className="space-y-2 pl-5 list-disc">
                {course.syllabus.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-2 pl-5 list-disc">
                <li>Introdução aos conceitos fundamentais</li>
                <li>Aplicações práticas e estudos de caso</li>
                <li>Exercícios e projetos para fixação</li>
                <li>Avaliação e certificação</li>
              </ul>
            )}

            {course.instructor && (
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-3">Instrutor</h3>
                <div className="flex items-center gap-3">
                  {course.instructor.image ? (
                    <img 
                      src={course.instructor.image} 
                      alt={course.instructor.name}
                      className="w-12 h-12 rounded-full object-cover" 
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-aulaazul-100 flex items-center justify-center text-aulaazul-700 font-bold">
                      {course.instructor.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{course.instructor.name}</p>
                    <p className="text-sm text-gray-600">{course.instructor.bio}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex justify-between mt-6">
          <Button variant="outline" onClick={onClose}>Voltar</Button>
          <Button 
            className="bg-aulaazul-500 hover:bg-aulaazul-600" 
            onClick={onEnroll}
          >
            Inscrever-se agora
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDetailsDialog;
