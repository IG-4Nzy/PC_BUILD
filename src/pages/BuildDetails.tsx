
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { getBuildById } from "@/data/pcData";
import { 
  ChevronLeft, 
  Star, 
  Info, 
  ShoppingCart, 
  Share2, 
  Cpu, 
  Video, 
  MemoryStick, 
  HardDrive, 
  CircuitBoard, 
  BatteryCharging, 
  Package, 
  Snowflake 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { PcBuild, PcComponent } from "@/context/AppContext";

const BuildDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setSelectedBuild, setFinalBuild, setIsCustomBuild, selectedBuild } = useAppContext();
  const [build, setBuild] = useState<PcBuild | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Use the cached build if available, otherwise fetch it
    if (selectedBuild && selectedBuild.id === id) {
      setBuild(selectedBuild);
      setLoading(false);
    } else {
      const fetchedBuild = getBuildById(id);
      if (fetchedBuild) {
        setBuild(fetchedBuild);
        setSelectedBuild(fetchedBuild);
      } else {
        // Redirect to builds page if build not found
        navigate("/builds");
      }
      setLoading(false);
    }
  }, [id, navigate, setSelectedBuild, selectedBuild]);

  if (loading || !build) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-light text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  const handleSelectBuild = () => {
    setFinalBuild(build);
    setIsCustomBuild(false);
    navigate("/final");
    toast.success("Build selected successfully!");
  };

  const handleShareBuild = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const componentIcons = {
    cpu: <Cpu className="h-5 w-5" />,
    gpu: <Video className="h-5 w-5" />,
    ram: <MemoryStick className="h-5 w-5" />,
    storage: <HardDrive className="h-5 w-5" />,
    motherboard: <CircuitBoard className="h-5 w-5" />,
    psu: <BatteryCharging className="h-5 w-5" />,
    case: <Package className="h-5 w-5" />,
    cooling: <Snowflake className="h-5 w-5" />,
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
                onClick={() => navigate("/builds")}
                className="mr-2"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-pc4u-primary">PC4U</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleShareBuild}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Build Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Image */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-lg overflow-hidden border border-border">
              <img
                src={build.image}
                alt={build.name}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold mb-2">{build.name}</h2>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= build.rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {build.rating.toFixed(1)}
                </span>
              </div>
              <div className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
                {build.purpose.map(p => p.replace("-", " ")).join(", ")}
              </div>
            </div>

            <p className="text-muted-foreground mb-6">{build.description}</p>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Performance Score</span>
                <span className="font-semibold">{build.performanceScore}/100</span>
              </div>
              <Progress value={build.performanceScore} className="h-2" />
            </div>

            <div className="bg-card rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-muted-foreground">Price</div>
                  <div className="text-3xl font-bold">${build.price.toFixed(2)}</div>
                </div>
                <Button size="lg" onClick={handleSelectBuild}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Select This Build
                </Button>
              </div>
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              <Info className="h-4 w-4 mr-2" />
              <span>Available from multiple retailers with varying prices and availability.</span>
            </div>
          </motion.div>
        </div>

        {/* Detailed Specs Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="specs" className="mb-12">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="details">Performance Details</TabsTrigger>
            </TabsList>
            <TabsContent value="specs" className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {Object.entries(build.components).map(([key, component]) => {
                  const comp = component as PcComponent;
                  return (
                    <AccordionItem key={key} value={key}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center">
                          <div className="mr-3 text-primary">
                            {componentIcons[key as keyof typeof componentIcons]}
                          </div>
                          <div>
                            <div className="font-medium text-left">
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </div>
                            <div className="text-sm text-muted-foreground text-left">
                              {comp.name}
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-10 pr-4">
                          <div className="mb-4">
                            <div className="text-sm text-muted-foreground mb-1">Brand</div>
                            <div>{comp.brand}</div>
                          </div>
                          <div className="mb-4">
                            <div className="text-sm text-muted-foreground mb-1">Price</div>
                            <div>${comp.price.toFixed(2)}</div>
                          </div>
                          <div className="mb-4">
                            <div className="text-sm text-muted-foreground mb-1">Rating</div>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= comp.rating
                                      ? "text-yellow-500 fill-yellow-500"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="ml-2 text-sm">
                                {comp.rating.toFixed(1)}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Description</div>
                            <div className="text-sm">{comp.description}</div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </TabsContent>
            <TabsContent value="details" className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Gaming Performance</span>
                        <span className="font-medium">
                          {Math.min(100, Math.round(build.performanceScore * 1.1))}%
                        </span>
                      </div>
                      <Progress 
                        value={Math.min(100, Math.round(build.performanceScore * 1.1))} 
                        className="h-2" 
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Content Creation</span>
                        <span className="font-medium">
                          {Math.min(100, Math.round(build.performanceScore * 0.95))}%
                        </span>
                      </div>
                      <Progress 
                        value={Math.min(100, Math.round(build.performanceScore * 0.95))} 
                        className="h-2" 
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>General Productivity</span>
                        <span className="font-medium">
                          {Math.min(100, Math.round(build.performanceScore * 1.05))}%
                        </span>
                      </div>
                      <Progress 
                        value={Math.min(100, Math.round(build.performanceScore * 1.05))} 
                        className="h-2" 
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Estimated Performance in Popular Games</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      <div className="text-sm">Cyberpunk 2077 (1440p, Ultra)</div>
                      <div className="text-sm font-medium">
                        {Math.round(60 * build.performanceScore / 85)} FPS
                      </div>
                      
                      <div className="text-sm">Fortnite (1440p, High)</div>
                      <div className="text-sm font-medium">
                        {Math.round(144 * build.performanceScore / 85)} FPS
                      </div>
                      
                      <div className="text-sm">Call of Duty: Warzone (1440p, High)</div>
                      <div className="text-sm font-medium">
                        {Math.round(120 * build.performanceScore / 85)} FPS
                      </div>
                      
                      <div className="text-sm">Red Dead Redemption 2 (1440p, High)</div>
                      <div className="text-sm font-medium">
                        {Math.round(70 * build.performanceScore / 85)} FPS
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Power & Thermal Performance</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-card rounded-lg p-4">
                      <div className="text-sm text-muted-foreground mb-1">Estimated Power Draw</div>
                      <div className="text-lg font-medium">
                        {Math.round(350 + (build.price / 50))} Watts
                      </div>
                    </div>
                    <div className="bg-card rounded-lg p-4">
                      <div className="text-sm text-muted-foreground mb-1">Heat Generation</div>
                      <div className="text-lg font-medium">
                        {build.price > 2000 ? "High" : build.price > 1000 ? "Medium" : "Low"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Retailers Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Available Retailers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">Amazon</div>
                  <div className="text-sm text-muted-foreground">
                    ${(build.price * 1.05).toFixed(2)}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View
                </Button>
              </div>
              <div className="bg-card rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">Newegg</div>
                  <div className="text-sm text-muted-foreground">
                    ${(build.price * 0.98).toFixed(2)}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View
                </Button>
              </div>
              <div className="bg-card rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">Micro Center</div>
                  <div className="text-sm text-muted-foreground">
                    ${(build.price * 1.02).toFixed(2)}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BuildDetails;
