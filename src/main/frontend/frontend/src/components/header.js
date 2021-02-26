import { Link } from "react-router-dom";
//import "./header.css";

export default function Header() {
  return (
    <div className="headerContainer">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/users">Users</Link>
    </div>
  );
}

