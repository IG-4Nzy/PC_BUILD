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
import SnackbarAlert from "./components/CustomToast";
import { Provider } from "react-redux";
import store from "./redux/store";
import AdminPage from "./pages/AdminPage";
import ComponentParts from "./pages/PartsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark">
        <AppProvider>
          <TooltipProvider>
            <Toaster />
            <SnackbarAlert />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/purpose" element={<PurposeSelection />} />
                <Route path="/builds" element={<RecommendedBuilds />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route
                  path="/admin/component/:id"
                  element={<ComponentParts />}
                />
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
    </Provider>
  </QueryClientProvider>
);

export default App;
