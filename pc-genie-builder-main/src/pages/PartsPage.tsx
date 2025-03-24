import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2 } from "lucide-react";
import CustomModal from "@/components/CustomModal";
import { Input } from "@mui/material";
import {
  createComponent,
  deleteComponent,
  getComponents
} from "@/service/requests";
import { useAppDispatch, useAppSelector } from "@/helpers/hooks";

const ComponentParts = () => {
  const { components = [] } = useAppSelector((state) => state.layoutReducer);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const componentName = location.state?.name || "Component";
  const [showModal, setShowModal] = useState(false);
  const [newPart, setNewPart] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [loader, setLoader] = useState(false);

  const handleDelete = (Dataid: number) => {
    dispatch(deleteComponent(Dataid, id));
  };

  const handleAdd = () => {
    if (name.trim()) {
      setNewPart("");
      setShowModal(false);
      dispatch(
        createComponent({
          name: name,
          type: { id: id },
          brand: brand,
          description: description,
          price: price
        })
      );
    }
  };

  useEffect(() => {
    setLoader(true);
    dispatch(getComponents(id, () => setLoader(false)));
  }, []);

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
        {loader ? (
          <></>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {components?.length > 0 &&
              components?.map((part) => (
                <motion.div
                  key={part.id}
                  className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md flex justify-between items-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-lg font-semibold">{part.name}</span>
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Edit size={18} />
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(part.id);
                      }}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        )}
      </div>

      {/* Add Part Modal */}
      {showModal && (
        <CustomModal open={showModal} handleClose={() => setShowModal(false)}>
          <div className="p-6 w-[400px] bg-white dark:bg-gray-900 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Add Part
            </h2>
            <Input
              placeholder="Enter Component Name"
              className="mb-4 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ color: "#fff" }}
            />
            <Input
              placeholder="Brand"
              className="mb-4 w-full"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              sx={{ color: "#fff" }}
            />
            <Input
              placeholder="Description"
              className="mb-4 w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ color: "#fff" }}
            />
            <Input
              placeholder="Price"
              className="mb-4 w-full"
              value={price}
              type="number"
              onChange={(e) => setPrice(+e.target.value)}
              sx={{ color: "#fff" }}
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
