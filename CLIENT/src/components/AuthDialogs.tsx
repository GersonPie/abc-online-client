
import React, { useState } from 'react';


import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useContext } from 'react';
import { useAuth } from '@/hooks/use-context';


type AuthDialogsProps = {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  onLoginClose: () => void;
  onRegisterClose: () => void;
  switchToRegister: () => void;
  switchToLogin: () => void;
};

export const LoginDialog = ({ 
  isOpen, 
  onClose, 
  switchToRegister 
}: { 
  isOpen: boolean;
  onClose: () => void;
  switchToRegister: () => void;
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const {login} = useAuth()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Por favor, informe email e senha.');
      return;
    }
    
    // Here you would normally handle authentication
    fetch('http://129.151.181.243/api/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: formData.password,
        email: formData.email,
        remember: formData.remember
      })
    }).then(async response => {
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success('Login realizado com sucesso!');
        login(data.user);
        onClose();
      } else {
        response.json().then(data => toast.error(data.message) || 'Erro ao fazer login');
        
      }
    })
    
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Entrar</DialogTitle>
          <DialogDescription className="text-center">
            Acesse sua conta para gerenciar seus cursos
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input 
              id="login-email" 
              name="email" 
              type="email" 
              placeholder="123@info.gmail.com" 
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="login-password">Senha</Label>
              <Button variant="link" className="text-xs h-auto p-0 text-aulaazul-600">
                Esqueceu a senha?
              </Button>
            </div>
            <Input 
              id="login-password" 
              name="password" 
              type="password" 
              placeholder="••••••••" 
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remember" 
              name="remember"
              checked={formData.remember}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, remember: checked as boolean }))
              }
            />
            <Label htmlFor="remember" className="text-sm">Lembrar de mim</Label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-aulaazul-500 hover:bg-aulaazul-600"
          >
            Entrar
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Button 
              variant="link" 
              className="p-0 h-auto text-aulaazul-600"
              onClick={switchToRegister}
            >
              Cadastre-se agora
            </Button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const RegisterDialog = ({ isOpen, onClose, switchToLogin} : { isOpen: boolean; onClose: () => void; switchToLogin: () => void;}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('As senhas não coincidem.');
      return;
    }
    
    if (!formData.termsAccepted) {
      toast.error('Você precisa aceitar os termos para se cadastrar.');
      return;
    }
    
    fetch('http://129.151.181.243/api/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password 

        
      })
    }).then(response => {
      if (response.ok) {
        toast.success('Cadastro realizado com sucesso!');
        onClose();
        switchToLogin();
      } else {
        response.json().then(data => toast.error(data.message) || 'Erro ao cadastrar');
        
      }
    }).catch(error => {
      console.error('Error:', error);
      toast.error(error.message);
      
    })
    
    
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Cadastrar</DialogTitle>
          <DialogDescription className="text-center">
            Crie sua conta para acessar os cursos da abc Online
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleRegister} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="register-name">Nome completo</Label>
            <Input 
              id="register-name" 
              name="name" 
              placeholder="Seu nome completo" 
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="register-email">E-mail</Label>
            <Input 
              id="register-email" 
              name="email" 
              type="email" 
              placeholder="seu@email.com" 
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="register-phone">Telefone/WhatsApp</Label>
            <Input 
              id="register-phone" 
              name="phone" 
              placeholder="(00) 00000-0000" 
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="register-password">Senha</Label>
            <Input 
              id="register-password" 
              name="password" 
              type="password" 
              placeholder="••••••••" 
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="register-confirm-password">Confirmar senha</Label>
            <Input 
              id="register-confirm-password" 
              name="confirmPassword" 
              type="password" 
              placeholder="••••••••" 
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="terms" 
              checked={formData.termsAccepted}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, termsAccepted: checked as boolean }))
              }
            />
            <Label htmlFor="terms" className="text-sm">
              Concordo com os <Button variant="link" className="p-0 h-auto">termos de uso</Button> e{' '}
              <Button variant="link" className="p-0 h-auto">política de privacidade</Button>
            </Label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-aulaazul-500 hover:bg-aulaazul-600"
          >
            Criar conta
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Button 
              variant="link" 
              className="p-0 h-auto text-aulaazul-600"
              onClick={switchToLogin}
            >
              Faça login
            </Button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const AuthDialogs = ({
  isLoginOpen,
  isRegisterOpen,
  onLoginClose,
  onRegisterClose,
  switchToRegister,
  switchToLogin
}: AuthDialogsProps) => {
  return (
    <>
      <LoginDialog 
        isOpen={isLoginOpen} 
        onClose={onLoginClose} 
        switchToRegister={switchToRegister} 
      />
      <RegisterDialog 
        isOpen={isRegisterOpen} 
        onClose={onRegisterClose} 
        switchToLogin={switchToLogin} 
      />
    </>
  );
};

export default AuthDialogs;
