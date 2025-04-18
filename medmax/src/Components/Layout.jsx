import { Outlet, Link } from "react-router-dom";
import './Layout.css';

const Layout = () => {
  return (
    <div>
      <nav>
        <div className="nav-left">
          <Link to="/home">Home</Link>
        </div>

        <div className="title">
          <Link to="/home">MedMaxDel</Link>
        </div>

        <div className="nav-right">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>
      
      <Outlet />
    </div>
  );
};

export default Layout;