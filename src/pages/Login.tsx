
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Linkedin } from 'lucide-react';

const Login = () => {
  const { login } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <img 
              src="https://www.ltimindtree.com/wp-content/uploads/2023/05/LTIMindtree_Logo.svg" 
              alt="LTIMindtree Logo" 
              className="h-12"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
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
              />
            </div>
            <div className="space-y-2">
              <p className="text-xs text-gray-500">
                For demo purposes, use:
                <br />
                Admin: admin@example.com
                <br />
                Employee: john@example.com or jane@example.com
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-resource hover:bg-resource-dark" disabled={loading}>
              {loading ? "Logging in..." : "Login with Email"}
            </Button>
            
            <div className="flex items-center w-full my-2">
              <Separator className="flex-grow" />
              <span className="px-4 text-sm text-gray-500">OR</span>
              <Separator className="flex-grow" />
            </div>
            
            <div className="flex justify-center gap-4 w-full">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => handleSocialLogin('GitHub')}
              >
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => handleSocialLogin('LinkedIn')}
              >
                <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => handleSocialLogin('Twitter')}
              >
                <Twitter className="mr-2 h-4 w-4" /> Twitter
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
