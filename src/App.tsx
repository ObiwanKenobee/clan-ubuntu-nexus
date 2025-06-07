
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import DataExplorer from "./pages/DataExplorer";
import ElderDashboard from "./pages/ElderDashboard";
import YouthDashboard from "./pages/YouthDashboard";
import WomenDashboard from "./pages/WomenDashboard";
import DiasporaDashboard from "./pages/DiasporaDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/data-explorer" element={<DataExplorer />} />
                <Route path="/elder-dashboard" element={<ElderDashboard />} />
                <Route path="/youth-dashboard" element={<YouthDashboard />} />
                <Route path="/women-dashboard" element={<WomenDashboard />} />
                <Route path="/diaspora-dashboard" element={<DiasporaDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
