
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import Cursos from "./pages/Cursos";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";
import AdminLoginPage from "./pages/AdminLogin";
import { toast } from "sonner";
import { User } from "lucide-react";

const queryClient = new QueryClient();
interface UserInfo {
  name?: string;
  email?: string;
  phone?: string;
}

const App = () => {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null)

useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogin(true);
      toast.success("Está Logado como " + user?.name, {
        description: "Seja bem-vindo de volta!"});
    } else {
      setLogin(false);
    }
  }
  , [login]);
  useEffect( () => {
    const login = async () => {
      if(!localStorage.getItem("token")) {
        setLogin(false);
        setUser(null); 
        return;
      }
      const login_response = await fetch('http://129.151.181.243/api/api/auth/profile', 
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token") || ''} ` ,
        },
      });
      if (!login_response.ok) {
        console.log("Login failed");
        return;
      }
      if (login_response.status === 401) {
        console.log("Unauthorized");
        toast.error("Sessão expirada ou inválida. Faça login novamente.");
        localStorage.removeItem('token');
        setLogin(false);
        setUser(null); 
        return;
      }
      
      const data = await login_response.json();
      console.log(data);
      setLogin(data.login);
      setUser(data);
    };
    login();
   
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/admin" element={<AdminLoginPage/>} />
          {/* ADD ALL CUSTOM ROUTES BELOW THE CATCH-ALL "*" ROUTE */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
  )
};

export default App;
