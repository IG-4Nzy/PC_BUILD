
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/context/AppContext";
import { PcPurpose } from "@/context/AppContext";

const CustomBuild = () => {
  const navigate = useNavigate();
  const { customBuild, updateCustomComponent, setFinalBuild, setIsCustomBuild } = useAppContext();

  const handleSaveBuild = () => {
    // Check if all components are selected
    const isComplete = Object.values(customBuild).every(component => component !== null);
    
    if (isComplete) {
      // Create a final build object from the custom components
      const finalCustomBuild = {
        id: "custom-" + Date.now(),
        name: "Custom PC Build",
        purpose: ["gaming", "programming"] as PcPurpose[], // Cast to the correct type
        price: Object.values(customBuild).reduce((total, component) => 
          total + (component ? component.price : 0), 0),
        rating: 4.5,
        image: "/placeholder.svg", // Default image
        components: customBuild,
        description: "Your custom PC build designed to meet your specific requirements.",
        performanceScore: 85 // Default score
      };
      
      setFinalBuild(finalCustomBuild);
      setIsCustomBuild(true);
      navigate("/final");
    } else {
      // Show a message that all components must be selected
      alert("Please select all components before proceeding");
    }
  };

  const componentCategories = [
    { id: "cpu", name: "CPU", description: "Central Processing Unit" },
    { id: "gpu", name: "GPU", description: "Graphics Processing Unit" },
    { id: "ram", name: "RAM", description: "Memory" },
    { id: "storage", name: "Storage", description: "SSD/HDD" },
    { id: "motherboard", name: "Motherboard", description: "System Board" },
    { id: "psu", name: "Power Supply", description: "PSU" },
    { id: "case", name: "Case", description: "Computer Case" },
    { id: "cooling", name: "Cooling", description: "CPU Cooler" },
  ];

  // Placeholder component options for each category
  const componentOptions = {
    cpu: [
      { id: "cpu1", name: "Intel Core i9-14900K", brand: "Intel", price: 599, rating: 4.9, image: "/placeholder.svg", description: "High-end CPU for gaming and content creation" },
      { id: "cpu2", name: "AMD Ryzen 9 7950X", brand: "AMD", price: 549, rating: 4.8, image: "/placeholder.svg", description: "Powerful multi-core CPU for intensive tasks" },
      { id: "cpu3", name: "Intel Core i7-14700K", brand: "Intel", price: 419, rating: 4.7, image: "/placeholder.svg", description: "Great performance for gaming and productivity" },
    ],
    gpu: [
      { id: "gpu1", name: "NVIDIA RTX 4090", brand: "NVIDIA", price: 1599, rating: 4.9, image: "/placeholder.svg", description: "Top-tier graphics card for 4K gaming and rendering" },
      { id: "gpu2", name: "AMD Radeon RX 7900 XTX", brand: "AMD", price: 999, rating: 4.7, image: "/placeholder.svg", description: "High-performance GPU with excellent value" },
      { id: "gpu3", name: "NVIDIA RTX 4070 Ti", brand: "NVIDIA", price: 799, rating: 4.6, image: "/placeholder.svg", description: "Great performance for 1440p gaming" },
    ],
    // Simplified to show the pattern - similar data would exist for other component types
    ram: [
      { id: "ram1", name: "Corsair Vengeance RGB Pro 32GB", brand: "Corsair", price: 129, rating: 4.8, image: "/placeholder.svg", description: "RGB DDR4 memory with great performance" },
    ],
    storage: [
      { id: "storage1", name: "Samsung 980 Pro 2TB", brand: "Samsung", price: 199, rating: 4.9, image: "/placeholder.svg", description: "Ultra-fast PCIe 4.0 NVMe SSD" },
    ],
    motherboard: [
      { id: "mb1", name: "ASUS ROG Maximus Z790", brand: "ASUS", price: 599, rating: 4.8, image: "/placeholder.svg", description: "High-end motherboard with advanced features" },
    ],
    psu: [
      { id: "psu1", name: "Corsair RM850x", brand: "Corsair", price: 149, rating: 4.7, image: "/placeholder.svg", description: "850W Gold-rated fully modular power supply" },
    ],
    case: [
      { id: "case1", name: "Lian Li O11 Dynamic", brand: "Lian Li", price: 159, rating: 4.9, image: "/placeholder.svg", description: "Spacious case with excellent airflow" },
    ],
    cooling: [
      { id: "cooling1", name: "NZXT Kraken X73", brand: "NZXT", price: 179, rating: 4.8, image: "/placeholder.svg", description: "360mm AIO liquid cooler with RGB" },
    ],
  };

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/builds')}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Custom PC Build</h1>
        </div>

        <Tabs defaultValue="cpu" className="w-full">
          <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-8">
            {componentCategories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="relative"
              >
                {category.name}
                {customBuild[category.id as keyof typeof customBuild] && (
                  <span className="absolute -top-1 -right-1 bg-green-500 rounded-full w-3 h-3"></span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {componentCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {componentOptions[category.id as keyof typeof componentOptions].map((component) => (
                  <Card 
                    key={component.id} 
                    className={`cursor-pointer transition-all ${
                      customBuild[category.id as keyof typeof customBuild]?.id === component.id 
                        ? 'border-primary ring-2 ring-primary' 
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => updateCustomComponent(category.id as keyof typeof customBuild, component)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{component.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">{component.brand}</span>
                        <span className="font-bold">${component.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{component.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-8 bg-secondary/20 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Your Build</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {componentCategories.map((category) => {
              const selectedComponent = customBuild[category.id as keyof typeof customBuild];
              return (
                <Card key={category.id} className="bg-background">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedComponent ? (
                      <>
                        <p className="font-medium">{selectedComponent.name}</p>
                        <p className="text-sm text-muted-foreground">${selectedComponent.price}</p>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">Not selected</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg">Total Price: <span className="font-bold">
                ${Object.values(customBuild).reduce((total, component) => 
                  total + (component ? component.price : 0), 0)}
              </span></p>
            </div>
            <Button 
              size="lg" 
              onClick={handleSaveBuild}
              disabled={!Object.values(customBuild).every(component => component !== null)}
            >
              Save and Continue
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomBuild;
