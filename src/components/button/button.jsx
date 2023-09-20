import { Link } from "react-router-dom";
import "./button.css";

function Buttons() {
  return (
    <div className="container button-container">
      <a href="#members" className="btn pri">
        Experiences
      </a>
      <a href="#contact" className="btn sec">
        Get in Touch
      </a>
      <Link to="/chat" className="btn pri">
        Chat with Me
      </Link>
    </div>
  );
}

export default Buttons;
