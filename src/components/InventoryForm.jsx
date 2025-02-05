import { useState } from "react";
import axios from "axios";

const InventoryForm = ({ fetchInventory }) => {
  const [item, setItem] = useState({ name: "", quantity: "", price: "" });

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!item.name || !item.quantity || !item.price) {
      alert("All fields are required!");
      return;
    }

    try {
      await axios.post("http://localhost:8900/api/inventory", item);
      fetchInventory(); // ✅ This will now work correctly
      setItem({ name: "", quantity: "", price: "" }); // Reset form
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input type="text" name="name" value={item.name} onChange={handleChange} placeholder="Item Name" required />
      <input type="number" name="quantity" value={item.quantity} onChange={handleChange} placeholder="Quantity" required />
      <input type="number" name="price" value={item.price} onChange={handleChange} placeholder="Price" required />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default InventoryForm;