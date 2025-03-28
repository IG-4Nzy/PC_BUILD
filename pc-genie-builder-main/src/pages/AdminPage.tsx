import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2 } from "lucide-react";
import CustomModal from "@/components/CustomModal";
import { Input } from "@mui/material";
import {
  createComponentType,
  deleteComponentType,
  GetComponentTypes
} from "@/service/requests";
import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { useSelector } from "react-redux";

const AdminPage = () => {
  const navigate = useNavigate();
  const { componentTypes = [] } = useAppSelector(
    (state) => state.layoutReducer
  );
  const [showModal, setShowModal] = useState(false);
  const [newComponent, setNewComponent] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useAppDispatch();

  const [items, setItems] = useState([
    { id: 1, name: "Graphics Card" },
    { id: 2, name: "Processor" },
    { id: 3, name: "RAM" }
  ]);

  const handleDelete = (id: number) => {
    dispatch(deleteComponentType(id));
  };

  const handleAdd = () => {
    if (newComponent.trim()) {
      setShowModal(false);
      dispatch(
        createComponentType({ name: newComponent, description: description })
      );
    }
  };

  useEffect(() => {
    dispatch(GetComponentTypes());
  }, []);

  return (
    <div className="min-h-screen bg-background pt-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-pc4u-primary mb-6 text-center">
          Admin Panel
        </h1>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Components</h2>
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
          {componentTypes?.length > 0 &&
            componentTypes?.map((item) => (
              <motion.div
                key={item.id}
                className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md flex justify-between items-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() =>
                  navigate(`/admin/component/${item.id}`, {
                    state: { name: item.name }
                  })
                }
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                  >
                    <Edit size={18} />
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </motion.div>
            ))}
        </motion.div>
      </div>

      {showModal && (
        <CustomModal open={showModal} handleClose={() => setShowModal(false)}>
          <div className="p-6 w-[400px] bg-white dark:bg-gray-900 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Add Component
            </h2>
            <Input
              placeholder="Enter component name"
              className="mb-4 w-full text-white"
              sx={{ color: "#fff" }}
              value={newComponent}
              onChange={(e) => setNewComponent(e.target.value)}
            />
            <Input
              placeholder="Enter description"
              className="mb-4 w-full"
              sx={{ color: "#fff" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

export default AdminPage;
