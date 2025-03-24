import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Printer,
  Share2,
  Download,
  Check,
  ShoppingCart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/context/AppContext";
import { GetComponentTypes } from "@/service/requests";

const FinalSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const finalBuild = {};
  const isCustomBuild = true;

  // Redirect if no final build is selected
  React.useEffect(() => {
    if (!finalBuild) {
      navigate("/builds");
    }
  }, [finalBuild, navigate]);

  if (!finalBuild) {
    return <div>Loading...</div>;
  }

  const handleShare = () => {
    // In a real app, this would open a share dialog or copy a link
    toast({
      title: "Share link copied!",
      description: "You can now share your PC build with others."
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast({
      title: "Build configuration saved",
      description: "Your PC build details have been downloaded."
    });
  };

  // Mock data for online retailers
  const retailers = [
    {
      id: "1",
      name: "TechGalaxy",
      price: finalBuild?.price,
      inStock: true,
      deliveryDays: 3
    },
    {
      id: "2",
      name: "ComputerWorld",
      price: finalBuild?.price + 25,
      inStock: true,
      deliveryDays: 2
    },
    {
      id: "3",
      name: "PCPartZone",
      price: finalBuild?.price - 15,
      inStock: false,
      deliveryDays: 5
    },
    {
      id: "4",
      name: "Hardware Hub",
      price: finalBuild?.price + 10,
      inStock: true,
      deliveryDays: 4
    }
  ];

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
            onClick={() =>
              navigate(isCustomBuild ? "/custom" : `/builds/${finalBuild.id}`)
            }
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Final PC Configuration</h1>
        </div>

        <Alert className="mb-8 bg-green-500/10 border-green-500">
          <Check className="h-5 w-5 text-green-500" />
          <AlertTitle>Build Complete!</AlertTitle>
          <AlertDescription>
            Your PC configuration is complete and ready for purchase. All
            components are compatible.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Build Summary: {finalBuild?.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Price</p>
                    <p className="text-2xl font-bold">${finalBuild?.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Performance Score
                    </p>
                    <p className="text-2xl font-bold">
                      {finalBuild?.performanceScore}/100
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.entries(finalBuild?.components)?.map(
                    ([key, component]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center py-2 border-b last:border-0"
                      >
                        <div>
                          <p className="font-medium capitalize">{key}</p>
                          <p className="text-sm text-muted-foreground">
                            {component?.name}
                          </p>
                        </div>
                        <p className="font-medium">${component?.price}</p>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Button
                onClick={handleShare}
                className="flex items-center"
                variant="outline"
              >
                <Share2 className="mr-2 h-4 w-4" /> Share Build
              </Button>
              <Button
                onClick={handlePrint}
                className="flex items-center"
                variant="outline"
              >
                <Printer className="mr-2 h-4 w-4" /> Print Details
              </Button>
              <Button
                onClick={handleDownload}
                className="flex items-center"
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" /> Save Configuration
              </Button>
              <Button onClick={() => navigate("/purpose")} variant="outline">
                Start New Build
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FinalSelection;
