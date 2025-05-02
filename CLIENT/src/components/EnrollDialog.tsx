
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

type EnrollDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  course: {
    id: number;
    title: string;
    price: string;
  };
};

const EnrollDialog = ({ isOpen, onClose, course }: EnrollDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: true,
    termsAccepted: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCheckboxChange = (checked: boolean, name: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    if (!formData.termsAccepted) {
      toast.error('Você precisa aceitar os termos para continuar.');
      return;
    }
    
    // Here you would normally submit to your API
    toast.success(`Inscrição no curso "${course.title}" realizada com sucesso! Você receberá instruções por WhatsApp em breve.`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Inscrição no Curso</DialogTitle>
          <DialogDescription>
            Preencha seus dados para se inscrever em <span className="font-semibold">{course.title}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo *</Label>
            <Input 
              id="name" 
              name="name" 
              placeholder="Seu nome completo" 
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">E-mail *</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="seu@email.com" 
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">WhatsApp/Telefone *</Label>
            <Input 
              id="phone" 
              name="phone" 
              placeholder="(00) 00000-0000" 
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="whatsapp" 
              checked={formData.whatsapp}
              onCheckedChange={(checked) => 
                handleCheckboxChange(checked as boolean, 'whatsapp')
              }
            />
            <Label htmlFor="whatsapp" className="text-sm cursor-pointer">
              Este número possui WhatsApp
            </Label>
          </div>
          
          <div className="flex items-start space-x-2 pt-2">
            <Checkbox 
              id="terms" 
              checked={formData.termsAccepted}
              onCheckedChange={(checked) => 
                handleCheckboxChange(checked as boolean, 'termsAccepted')
              }
            />
            <Label htmlFor="terms" className="text-sm cursor-pointer">
              Concordo com os termos de uso e política de privacidade da Aula Azul Connect
            </Label>
          </div>
          
          <div className="flex justify-between border-t border-gray-200 pt-4 mt-6">
            <div>
              <p className="text-sm font-medium">Valor do curso:</p>
              <p className="text-lg font-bold text-aulaazul-700">{course.price}</p>
            </div>
            <DialogFooter className="mt-0 pt-0 pb-0 sm:pb-0">
              <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
              <Button 
                type="submit" 
                className="bg-aulaazul-500 hover:bg-aulaazul-600"
              >
                Confirmar inscrição
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EnrollDialog;
