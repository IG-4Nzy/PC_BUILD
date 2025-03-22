
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProvider } from "./context/AppContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PurposeSelection from "./pages/PurposeSelection";
import RecommendedBuilds from "./pages/RecommendedBuilds";
import BuildDetails from "./pages/BuildDetails";
import CustomBuild from "./pages/CustomBuild";
import ChatbotAssistance from "./pages/ChatbotAssistance";
import FinalSelection from "./pages/FinalSelection";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/purpose" element={<PurposeSelection />} />
              <Route path="/builds" element={<RecommendedBuilds />} />
              <Route path="/builds/:id" element={<BuildDetails />} />
              <Route path="/custom" element={<CustomBuild />} />
              <Route path="/chatbot" element={<ChatbotAssistance />} />
              <Route path="/final" element={<FinalSelection />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AppProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
