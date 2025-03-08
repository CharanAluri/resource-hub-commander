
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Linkedin, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { login } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      toast({
        title: "Error",
        description: "Please enter a password",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    
    const success = login(email);
    
    if (success) {
      navigate('/dashboard');
    } else {
      toast({
        title: "Login Failed",
        description: "No user found with that email address. Try 'admin@example.com' or 'john@example.com'.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: "Social Login",
      description: `${provider} login not implemented in this demo. Please use email login.`,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#0a0a29] via-[#101045] to-[#1a1a5c] bg-no-repeat bg-cover">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/94eb6bee-3ab6-475b-8c46-112efba66ff6.png')] bg-cover bg-center opacity-20 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a29] via-[#101045] to-[#1a1a5c] opacity-90 z-0"></div>
      
      <Card className="w-full max-w-md relative z-10 border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <img 
              src="https://www.ltimindtree.com/wp-content/uploads/2023/05/LTIMindtree_Logo.svg" 
              alt="LTIMindtree Logo" 
              className="h-12 sm:h-14 md:h-16"
            />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold text-center">
            Resource Management System
          </CardTitle>
          <CardDescription className="text-center">
            Login with your email to access your resources
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/80"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/80 pr-10"
                />
                <button 
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-gray-500">
                For demo purposes, use:
                <br />
                Admin: admin@example.com
                <br />
                Employee: john@example.com or jane@example.com
                <br />
                Password: any value will work
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-[#0a0a29] hover:bg-[#1a1a5c] transition-colors" 
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login with Email"}
            </Button>
            
            <div className="flex items-center w-full my-2">
              <Separator className="flex-grow" />
              <span className="px-4 text-sm text-gray-500">OR</span>
              <Separator className="flex-grow" />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 w-full">
              <Button 
                variant="outline" 
                className="w-full sm:flex-1"
                onClick={() => handleSocialLogin('GitHub')}
              >
                <Github className="mr-2 h-4 w-4" /> 
                <span className="sm:inline">GitHub</span>
              </Button>
              <Button 
                variant="outline" 
                className="w-full sm:flex-1"
                onClick={() => handleSocialLogin('LinkedIn')}
              >
                <Linkedin className="mr-2 h-4 w-4" /> 
                <span className="sm:inline">LinkedIn</span>
              </Button>
              <Button 
                variant="outline" 
                className="w-full sm:flex-1"
                onClick={() => handleSocialLogin('Twitter')}
              >
                <Twitter className="mr-2 h-4 w-4" /> 
                <span className="sm:inline">Twitter</span>
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
