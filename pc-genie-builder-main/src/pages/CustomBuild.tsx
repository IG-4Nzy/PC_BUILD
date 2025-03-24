import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/context/AppContext";
import { PcPurpose } from "@/context/AppContext";
import { getComponents, GetComponentTypes } from "@/service/requests";
import { useAppDispatch, useAppSelector } from "@/helpers/hooks";

const CustomBuild = () => {
  const navigate = useNavigate();
  const {
    customBuild,
    updateCustomComponent,
    setFinalBuild,
    setIsCustomBuild
  } = useAppContext();
  const dispatch = useAppDispatch();

  const { componentTypes = [], components = [] } = useAppSelector(
    (state) => state.layoutReducer
  );

  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [componentOptions, setComponentOptions] = useState<
    Record<string, any[]>
  >({});

  useEffect(() => {
    dispatch(GetComponentTypes());
  }, [dispatch]);

  useEffect(() => {
    if (activeTab) {
      dispatch(getComponents(activeTab))
    }
  }, [activeTab, dispatch]);


  const handleSaveBuild = () => {
    const isComplete = Object.values(customBuild).every(
      (component) => component !== null
    );

    if (isComplete) {
      const finalCustomBuild = {
        id: "custom-" + Date.now(),
        name: "Custom PC Build",
        purpose: ["gaming", "programming"] as PcPurpose[],
        price: Object.values(customBuild).reduce(
          (total, component) => total + (component ? component.price : 0),
          0
        ),
        rating: 4.5,
        image: "/placeholder.svg",
        components: customBuild,
        description:
          "Your custom PC build designed to meet your specific requirements.",
        performanceScore: 85
      };

      setFinalBuild(finalCustomBuild);
      setIsCustomBuild(true);
      navigate("/final");
    } else {
      alert("Please select all components before proceeding");
    }
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
            onClick={() => navigate("/builds")}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Custom PC Build</h1>
        </div>

        <Tabs
          defaultValue={componentTypes[0]?.id || ""}
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-8">
            {componentTypes.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="relative"
              >
                {category.name}
                {customBuild[category.id] && (
                  <span className="absolute -top-1 -right-1 bg-green-500 rounded-full w-3 h-3"></span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {componentTypes.map((category) => (
            <TabsContent
              key={category.id}
              value={category.id}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {components
                  .filter((component) => component.typeId === category.id)
                  .map((component) => (
                    <Card
                      key={component.id}
                      className={`cursor-pointer transition-all ${
                        customBuild[category.id]?.id === component.id
                          ? "border-primary ring-2 ring-primary"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() =>
                        updateCustomComponent(category.id, component)
                      }
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">
                          {component.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">
                            {component.brand}
                          </span>
                          <span className="font-bold">${component.price}</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {component.description}
                        </p>
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
            {componentTypes.map((category) => {
              const selectedComponent = customBuild[category.id];
              return (
                <Card key={category.id} className="bg-background">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedComponent ? (
                      <>
                        <p className="font-medium">{selectedComponent.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${selectedComponent.price}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Not selected
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg">
                Total Price:{" "}
                <span className="font-bold">
                  $
                  {Object.values(customBuild).reduce(
                    (total, component) =>
                      total + (component ? component.price : 0),
                    0
                  )}
                </span>
              </p>
            </div>
            <Button size="lg" onClick={handleSaveBuild}>
              Save and Continue
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomBuild;
