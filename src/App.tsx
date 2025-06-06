
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BusinessModelProvider } from "@/contexts/BusinessModelContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ElderDashboard from "./pages/ElderDashboard";
import YouthDashboard from "./pages/YouthDashboard";
import WomenDashboard from "./pages/WomenDashboard";
import DiasporaDashboard from "./pages/DiasporaDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BusinessModelProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/elder-dashboard" element={<ElderDashboard />} />
            <Route path="/youth-dashboard" element={<YouthDashboard />} />
            <Route path="/women-dashboard" element={<WomenDashboard />} />
            <Route path="/diaspora-dashboard" element={<DiasporaDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </BusinessModelProvider>
  </QueryClientProvider>
);

export default App;
