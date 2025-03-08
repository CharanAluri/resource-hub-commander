
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import { Layout } from "@/components/Layout";

// Pages
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Resources from "@/pages/Resources";
import Users from "@/pages/Users";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route 
              path="/" 
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              } 
            />
            
            <Route 
              path="/dashboard" 
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              } 
            />
            
            <Route 
              path="/resources" 
              element={
                <Layout>
                  <Resources />
                </Layout>
              } 
            />
            
            <Route 
              path="/users" 
              element={
                <Layout adminOnly>
                  <Users />
                </Layout>
              } 
            />
            
            <Route 
              path="/settings" 
              element={
                <Layout adminOnly>
                  <Settings />
                </Layout>
              } 
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
