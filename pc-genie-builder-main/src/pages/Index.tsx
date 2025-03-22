import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/purpose");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pc4u-primary/20 to-pc4u-secondary/20 dark:from-pc4u-primary/10 dark:to-pc4u-secondary/10">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="loading-logo w-32 h-32 mx-auto mb-8 rounded-full bg-pc4u-primary flex items-center justify-center text-white text-4xl font-bold">
          PC4U
        </div>
        <h1 className="text-4xl font-bold mb-6 text-pc4u-primary">PC4U</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Your Personal PC Building Assistant
        </p>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5 }}
          className="w-full max-w-xs h-2 bg-primary/20 rounded-full overflow-hidden"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="h-full bg-primary rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
