import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InventoryForm from "./components/InventoryForm";
import InventoryList from "./components/InventoryList";
import Navigation from "./components/Navigation";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [inventory, setInventory] = useState([]);

  // Fetch inventory items
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
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<InventoryList inventory={inventory} fetchInventory={fetchInventory} />} />
        <Route path="/add" element={<InventoryForm fetchInventory={fetchInventory} />} />
      </Routes>
    </Router>
  );
}

export default App;