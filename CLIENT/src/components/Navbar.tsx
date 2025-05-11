import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MenuIcon, X } from 'lucide-react';
import AuthDialogs from './AuthDialogs';
import { useAuth } from '@/hooks/use-context';

interface UserInfo {
  name?: string;
  email?: string;
  phone?: string;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);


  const {user}= useAuth();

  useEffect(()=>{
    if(user){
      setUserInfo(user);
    }
  }, [user])
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          
          return;
        }
  
        const response = await fetch('http://129.151.181.243/api/api/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        if(response.status === 401) {
          // Token is invalid or expired
          console.log("Unauthorized");
          console.error("Sessão inspirada ou inválida. Faça login novamente.");
          localStorage.removeItem('token');
          setUserInfo(null); 
          return;
        }
  
        const data = await response.json();
        setUserInfo(data);
  
      } catch (error) {
        console.error('Profile fetch error:', error);
        // Clear invalid token
        localStorage.removeItem('token');
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfile();
  }, []);

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const handleOpenRegister = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  const handleCloseRegister = () => {
    setIsRegisterOpen(false);
  };

  const switchToRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const switchToLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="flex items-center">
                  <span className="text-2xl font-bold text-aulaazul-600">ABC</span>
                  <span className="ml-1 text-2xl font-light text-aulaazul-400">ONLINE</span>
                </Link>
              </div>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-6">
                <Link to="/perfil" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-900 hover:border-aulaazul-300">
                  {userInfo?.name ? userInfo.name : ''}
                </Link>
                <Link to="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-aulaazul-300">
                  Início
                </Link>
                <Link to="/cursos" className="inline-flex items-center px-1 pt-1 border-aulaazul-500 text-sm font-medium text-gray-900">
                  Cursos
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {userInfo ? (
                <Link to="/perfil">
                  <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                    Minha Conta
                  </Button>
                </Link>
              ) : (
                <>
                  <Button variant="ghost" className="text-gray-600 hover:text-gray-900" onClick={handleOpenLogin}>
                    Entrar
                  </Button>
                  <Button 
                    className="bg-aulaazul-500 hover:bg-aulaazul-600 ml-4"
                    onClick={handleOpenRegister}
                  >
                    Cadastrar
                  </Button>
                </>
              )}
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-aulaazul-500"
              >
                <span className="sr-only">Abrir menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden bg-white pb-3 border-t border-gray-200">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-aulaazul-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link
                to="/cursos"
                className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-aulaazul-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Cursos
              </Link>
              <Link
                to="/perfil"
                className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-aulaazul-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {userInfo?.name ? userInfo.name : 'Perfil'}
              </Link>
            </div>
            <div className="pt-4 px-4 flex space-x-4">
              {userInfo ? (
                <Link to="/perfil" className="w-full">
                  <Button className="w-full">
                    Minha Conta
                  </Button>
                </Link>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      handleOpenLogin();
                      setIsMenuOpen(false);
                    }}
                  >
                    Entrar
                  </Button>
                  <Button 
                    className="bg-aulaazul-500 hover:bg-aulaazul-600 w-full"
                    onClick={() => {
                      handleOpenRegister();
                      setIsMenuOpen(false);
                    }}
                  >
                    Cadastrar
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      
      <AuthDialogs 
        isLoginOpen={isLoginOpen}
        isRegisterOpen={isRegisterOpen}
        onLoginClose={handleCloseLogin}
        onRegisterClose={handleCloseRegister}
        switchToRegister={switchToRegister}
        switchToLogin={switchToLogin}
      />
    </>
  );
};

export default Navbar;