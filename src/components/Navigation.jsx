import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/add">Add Item</Link>
    </nav>
  );
};

export default Navigation;