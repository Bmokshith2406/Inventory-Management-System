import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import AddInventoryForm from "./components/AddInventoryForm";
import ModifyInventory from "./components/ModifyInventory";
import OrderInventory from "./components/OrderInventory";
import ViewOrders from "./components/ViewOrders";
import "./App.css";
import Logo from "./Images/Logo.png";

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false); // State to manage navbar visibility

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <Router>
      <div>
        {/* Navigation Bar with Logo and Links */}
        <nav className="navbar">
          <NavLink to="/" className="navbar-logo">
            <img src={Logo} alt="Logo" className="app-logo" />
          </NavLink>
          {/* Hamburger Menu */}
          <div className="hamburger" onClick={toggleNav}>
            <span className={isNavOpen ? "bar open" : "bar"}></span>
            <span className={isNavOpen ? "bar open" : "bar"}></span>
            <span className={isNavOpen ? "bar open" : "bar"}></span>
          </div>
          <ul className={`navbar-links ${isNavOpen ? "open" : ""}`}>
            <li>
              <NavLink
                to="/"
                className="nav-link"
                onClick={() => setIsNavOpen(false)} // Close nav on link click
              >
                Add Inventory
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/modify"
                className="nav-link"
                onClick={() => setIsNavOpen(false)}
              >
                Modify Inventory
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/order"
                className="nav-link"
                onClick={() => setIsNavOpen(false)}
              >
                Inventory Order
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/view-orders"
                className="nav-link"
                onClick={() => setIsNavOpen(false)}
              >
                View Orders
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Routes for the pages */}
        <Routes>
          <Route path="/" element={<AddInventoryForm />} />
          <Route path="/modify" element={<ModifyInventory />} />
          <Route path="/order" element={<OrderInventory />} />
          <Route path="/view-orders" element={<ViewOrders />} />
        </Routes>
        <footer className="footer">
          <p>2024 | StockSync | All Rights Reserved</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
