import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2 } from "lucide-react";
import CustomModal from "@/components/CustomModal";
import { Input } from "@mui/material";

const ComponentParts = () => {
  const location = useLocation();
  const componentName = location.state?.name || "Component";
  const [showModal, setShowModal] = useState(false);
  const [newPart, setNewPart] = useState("");
  const [parts, setParts] = useState([
    { id: 1, name: "Part A" },
    { id: 2, name: "Part B" },
    { id: 3, name: "Part C" }
  ]);

  const handleDelete = (id: number) => {
    setParts(parts.filter((part) => part.id !== id));
  };

  const handleAdd = () => {
    if (newPart.trim()) {
      setParts([...parts, { id: Date.now(), name: newPart }]);
      setNewPart("");
      setShowModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-pc4u-primary mb-6 text-center">
          {componentName} Parts
        </h1>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Parts</h2>
          <Button
            onClick={() => setShowModal(true)}
            className="flex items-center"
          >
            <Plus className="mr-2" /> Add New
          </Button>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {parts.map((part) => (
            <motion.div
              key={part.id}
              className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md flex justify-between items-center"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-lg font-semibold">{part.name}</span>
              <div className="flex space-x-3">
                <Button variant="outline">
                  <Edit size={18} />
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(part.id)}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Add Part Modal */}
      {showModal && (
        <CustomModal open={showModal} handleClose={() => setShowModal(false)}>
          <div className="p-6 w-[400px] bg-white dark:bg-gray-900 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Add Part
            </h2>
            <Input
              placeholder="Enter part name"
              className="mb-4 w-full"
              value={newPart}
              onChange={(e) => setNewPart(e.target.value)}
            />
            <Button className="w-full" onClick={handleAdd}>
              Save
            </Button>
          </div>
        </CustomModal>
      )}
    </div>
  );
};

export default ComponentParts;
