
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Member } from '@/types/clanTypes';
import { toast } from 'sonner';

export const useAuthFlow = () => {
  const { user, login, register, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleRoleBasedRedirect = (user: Member) => {
    switch (user.role) {
      case 'elder':
        navigate('/elder-dashboard');
        break;
      case 'youth':
        navigate('/youth-dashboard');
        break;
      case 'women':
        navigate('/women-dashboard');
        break;
      case 'diaspora':
        navigate('/diaspora-dashboard');
        break;
      default:
        navigate('/');
    }
  };

  const handleLogin = async (email: string, password: string) => {
    const success = await login(email, password);
    if (success && user) {
      handleRoleBasedRedirect(user);
      toast.success(`Welcome back, ${user.name}!`);
    }
    return success;
  };

  const handleRegister = async (userData: any) => {
    const success = await register(userData);
    if (success && user) {
      handleRoleBasedRedirect(user);
      toast.success(`Welcome to ClanChain, ${user.name}!`);
    }
    return success;
  };

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  return {
    user,
    isLoading,
    authMode,
    setAuthMode,
    handleLogin,
    handleRegister,
    handleLogout,
    handleRoleBasedRedirect,
  };
};
