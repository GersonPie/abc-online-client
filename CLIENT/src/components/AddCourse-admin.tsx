import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

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

interface AddCourseFormProps {
  course?: Course;
  onSuccess: () => void;
}

const AddCourseForm = ({ course, onSuccess }: AddCourseFormProps) => {
  const [formData, setFormData] = useState<Omit<Course, '_id'>>({
    title: '',
    description: '',
    instructor: '',
    price: 0,
    category: '',
    level: '',
    duration: '',
    nextClass: '',
    image: '',
    syllabus: []
  });
  const [isLoading, setIsLoading] = useState(false);
  
  // Available categories and levels
  const categories = ['Tecnologia', 'Negócio', 'Design', 'Idiomas', 'Ciencia'];
  const levels = ['Iniciante', 'Intermediario', 'Avancado'];

  useEffect(() => {
    const user = localStorage.getItem('user');
    const username = user ? JSON.parse(user).name : '';
    
    if (course) {
      setFormData({
        title: course.title,
        description: course.description,
        instructor: username,
        price: course.price,
        category: course.category,
        level: course.level,
        duration: course.duration,
        nextClass: course.nextClass || '',
        image: course.image || '',
        syllabus: course.syllabus || []
      });
    } else {
      // Set default instructor when creating new course
      setFormData(prev => ({
        ...prev,
        instructor: username
      }));
    }
  }, [course]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required');

      const url = course ? `http://localhost:8000/api/cursos/curso/${course._id}` : 'http://localhost:8000/api/cursos/addcurso';
      const method = course ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Operation failed');
      }

      toast.success(`Course ${course ? 'updated' : 'created'} successfully!`);
      onSuccess();
      
    } catch (error) {
      toast.error(error.message || 'Operation failed');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <Label htmlFor="title">Title*</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Description*</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
        />
      </div>

      {/* Instructor */}
      <div>
        <Label htmlFor="instructor">Instructor*</Label>
        <Input
          id="instructor"
          name="instructor"
          value={formData.instructor}
          onChange={handleChange}
          required
          disabled // Assuming instructor can't be changed
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category */}
        <div>
          <Label htmlFor="category">Category*</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => handleSelectChange('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Level */}
        <div>
          <Label htmlFor="level">Level*</Label>
          <Select
            value={formData.level}
            onValueChange={(value) => handleSelectChange('level', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Price */}
        <div>
          <Label htmlFor="price">Price*</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>

        {/* Duration */}
        <div>
          <Label htmlFor="duration">Duration*</Label>
          <Input
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            placeholder="e.g., 4 Semanas"
          />
        </div>
      </div>

      {/* Next Class */}
      <div>
        <Label htmlFor="nextClass">Next Class Date</Label>
        <Input
          id="nextClass"
          name="nextClass"
          type="date"
          value={formData.nextClass}
          onChange={handleChange}
        />
      </div>

      {/* Image URL */}
      <div>
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {/* Submit Buttons */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => onSuccess()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Course'}
        </Button>
      </div>
    </form>
  );
};

export default AddCourseForm;