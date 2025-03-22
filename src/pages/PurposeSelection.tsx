import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import {
  Gamepad2,
  Video,
  Code,
  SquareDashedBottom,
  Laptop,
  MoreHorizontal,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { adminLogin } from "@/service/requests";

const PurposeSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setSelectedPurpose } = useAppContext();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const purposes = [
    {
      id: "gaming",
      name: "Gaming",
      icon: <Gamepad2 className="w-12 h-12 mb-4" />,
      description:
        "High-performance gaming PCs for smooth gameplay experiences."
    },
    {
      id: "video-editing",
      name: "Video Editing",
      icon: <Video className="w-12 h-12 mb-4" />,
      description:
        "Powerful machines optimized for video editing and rendering."
    },
    {
      id: "programming",
      name: "Programming",
      icon: <Code className="w-12 h-12 mb-4" />,
      description:
        "Development-focused builds for coders and software engineers."
    },
    {
      id: "3d-modeling",
      name: "3D Modeling",
      icon: <SquareDashedBottom className="w-12 h-12 mb-4" />,
      description: "Workstations for 3D modeling, rendering, and animation."
    },
    {
      id: "everyday-use",
      name: "Everyday Use",
      icon: <Laptop className="w-12 h-12 mb-4" />,
      description:
        "Reliable computers for general tasks, browsing, and office work."
    },
    {
      id: "other",
      name: "Other",
      icon: <MoreHorizontal className="w-12 h-12 mb-4" />,
      description: "Custom purpose or specialized computing needs."
    }
  ];

  const handleSelect = (id: string) => {
    setSelectedOption(id);
  };

  const handleContinue = () => {
    if (selectedOption) {
      setSelectedPurpose(selectedOption as any);
      toast({
        title: "Purpose selected!",
        description: `Finding the best PC builds for ${
          purposes.find((p) => p.id === selectedOption)?.name
        }.`
      });
      navigate("/builds");
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  useEffect(() => {
    adminLogin();
  }, []);

  return (
    <div className="min-h-screen bg-background pt-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-pc4u-primary"
          >
            PC4U
          </motion.h1>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full max-w-md mx-auto my-8 rounded-xl overflow-hidden"
          ></motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-2xl font-semibold mb-2"
          >
            What is the purpose of your PC?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-muted-foreground mb-8"
          >
            Select the primary use case to get personalized recommendations.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {purposes.map((purpose) => (
            <motion.div
              key={purpose.id}
              variants={item}
              className={`purpose-card ${
                selectedOption === purpose.id ? "selected" : ""
              }`}
              onClick={() => handleSelect(purpose.id)}
            >
              <div className="text-pc4u-primary dark:text-pc4u-accent">
                {purpose.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{purpose.name}</h3>
              <p className="text-sm text-muted-foreground">
                {purpose.description}
              </p>
              {selectedOption === purpose.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedOption}
            className="px-8 py-6 text-lg"
          >
            Continue <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PurposeSelection;
