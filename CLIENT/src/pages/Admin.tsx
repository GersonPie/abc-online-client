import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Edit, Plus } from 'lucide-react';
import { toast } from 'sonner';
import AddCourseForm from '../components/AddCourse-admin';

interface Course {
    _id?: string;
    title: string;
    description: string;
    instructor: string;
    price: number;
    category: string;
    level: string;
    duration: string;
    nextClass?: string;
    image?: string;
    syllabus?: string[];
  }

const AdminPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://129.151.181.243/api/api/cursos/todos', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch courses');
      
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      toast.error('Error loading courses');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://129.151.181.243/api/api/cursos/curso/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete course');
      
      toast.success('Course deleted successfully');
      fetchCourses();
    } catch (error) {
      toast.error('Error deleting course');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </div>

      {loading ? (
        <p>Loading courses...</p>
      ) : courses.length === 0 ? (
        <p>No courses found</p>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course._id} className="border p-4 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-medium">{course.title}</h3>
                <p className="text-sm text-gray-600">
                  {course.category} • {course.level} • ${course.price}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingCourse(course)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteCourse(course._id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Course Dialog */}
      {(isAddDialogOpen || editingCourse) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingCourse ? 'Edit Course' : 'Add New Course'}
            </h2>
            <AddCourseForm 
              course={editingCourse} 
              onSuccess={() => {
                setEditingCourse(null);
                setIsAddDialogOpen(false);
                fetchCourses();
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;