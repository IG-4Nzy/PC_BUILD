
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { getRecommendedBuilds } from "@/data/pcData";
import { 
  ChevronLeft, 
  Filter, 
  Sliders, 
  SortDesc, 
  MessageCircle,
  PlusCircle,
  Inbox
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

const RecommendedBuilds = () => {
  const navigate = useNavigate();
  const { 
    selectedPurpose, 
    priceRange, 
    setPriceRange, 
    setSelectedBuild,
    setIsCustomBuild
  } = useAppContext();
  
  const [displayPriceRange, setDisplayPriceRange] = useState<[number, number]>(priceRange);
  const [filteredBuilds, setFilteredBuilds] = useState([]);
  const [sortOption, setSortOption] = useState("recommended");

  // Redirect if no purpose selected
  useEffect(() => {
    if (!selectedPurpose) {
      navigate("/purpose");
    }
  }, [selectedPurpose, navigate]);

  // Filter and sort builds based on criteria
  useEffect(() => {
    if (selectedPurpose) {
      let builds = getRecommendedBuilds(selectedPurpose, priceRange);
      
      // Apply sorting
      switch (sortOption) {
        case "price-low":
          builds = [...builds].sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          builds = [...builds].sort((a, b) => b.price - a.price);
          break;
        case "performance":
          builds = [...builds].sort((a, b) => b.performanceScore - a.performanceScore);
          break;
        default:
          // "recommended" - default sorting from the data source
          break;
      }
      
      setFilteredBuilds(builds);
      console.log(builds)
    }
  }, [selectedPurpose, priceRange, sortOption]);

  const handlePriceChange = (value: number[]) => {
    setDisplayPriceRange([value[0], value[1]]);
  };

  const applyPriceFilter = () => {
    setPriceRange(displayPriceRange);
  };

  const handleBuildSelect = (build) => {
    setSelectedBuild(build);
    navigate(`/builds/${build.id}`);
  };

  const handleCustomBuild = () => {
    setIsCustomBuild(true);
    navigate("/custom");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate("/purpose")}
                className="mr-2"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-pc4u-primary">PC4U</h1>
            </div>
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <SortDesc className="h-4 w-4 mr-2" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort Builds</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSortOption("recommended")}>
                    Recommended
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("price-low")}>
                    Price: Low to High
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("price-high")}>
                    Price: High to Low
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("performance")}>
                    Performance
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Price Range</DropdownMenuLabel>
                  <div className="p-4">
                    <div className="mb-6">
                      <Slider
                        defaultValue={[displayPriceRange[0], displayPriceRange[1]]}
                        max={5000}
                        min={500}
                        step={100}
                        onValueChange={handlePriceChange}
                      />
                    </div>
                    <div className="flex justify-between mb-4 text-sm">
                      <span>${displayPriceRange[0]}</span>
                      <span>${displayPriceRange[1]}</span>
                    </div>
                    <Button size="sm" onClick={applyPriceFilter} className="w-full">
                      Apply Filter
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Purpose & Price Indicator */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            Recommended Builds for {selectedPurpose && selectedPurpose.replace("-", " ")}
          </h2>
          <div className="flex items-center text-sm text-muted-foreground">
            <Sliders className="h-4 w-4 mr-2" />
            <span>Price Range: ${priceRange[0]} - ${priceRange[1]}</span>
          </div>
        </div>

        {/* Build Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredBuilds.length > 0 ? (
            filteredBuilds.map((build, index) => (
              <motion.div
                key={build.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Card
                  className="pc-build-card h-full cursor-pointer"
                  onClick={() => handleBuildSelect(build)}
                >
                  <CardHeader className="p-0">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={build.image}
                        alt={build.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <CardTitle className="mb-2">{build.name}</CardTitle>
                    <CardDescription className="line-clamp-2 mb-4">
                      {build.description}
                    </CardDescription>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <div className="font-semibold">${build.price.toFixed(2)}</div>
                        <div className="text-muted-foreground">
                          Performance: {build.performanceScore}/100
                        </div>
                      </div>
                      <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        View Details
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <Inbox className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium">No builds found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or create a custom build
              </p>
              <Button onClick={handleCustomBuild}>
                <PlusCircle className="mr-2 h-4 w-4" /> Create Custom Build
              </Button>
            </div>
          )}

          {/* Custom Build Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <Card 
              className="pc-build-card h-full cursor-pointer border-dashed border-2 bg-primary/5 hover:bg-primary/10 transition-colors"
              onClick={handleCustomBuild}
            >
              <CardContent className="flex flex-col items-center justify-center h-full py-12">
                <PlusCircle className="h-16 w-16 text-primary mb-4" />
                <CardTitle className="mb-2">Create Custom Build</CardTitle>
                <CardDescription className="text-center">
                  Select your own components to create a personalized PC build
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Chatbot Button */}
      <motion.div
        className="fixed bottom-8 right-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
      >
        <Button
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg"
          onClick={() => navigate("/chatbot")}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  );
};

export default RecommendedBuilds;
