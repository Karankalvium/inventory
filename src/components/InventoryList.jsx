import { useEffect, useState } from "react";
import axios from "axios";
import InventoryItem from "./InventoryItem";

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);

  const fetchInventory = async () => {
    try {
      const response = await axios.get("http://localhost:8900/api/inventory");
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div>
      <h2>Inventory List</h2>
      {inventory.length > 0 ? (
        inventory.map((item) => <InventoryItem key={item._id} item={item} />)
      ) : (
        <p>No items in inventory.</p>
      )}
    </div>
  );
};

export default InventoryList;