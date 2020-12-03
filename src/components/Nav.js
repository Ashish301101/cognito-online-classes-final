import React from "react";
import { FaAlignJustify } from "react-icons/fa";
const Nav = () => {
  const [state, setState] = React.useState(true);
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar__container">
          <ul className="navbar__left">
            <a href="/"><div className="navbar__left-logo">
              <img src="/images/logo.png" alt="logo" />
            </div></a>
            
          </ul>
          {state ? (
            <ul className="navbar__right mr-auto">
              <li>
                <a href="http://localhost:3000/">Home</a>
              </li>
              <li>
                <a href="http://localhost:3000/#services">Services</a>
              </li>
              <li>
                <a href="http://localhost:3000/login">Teacher</a>
              </li>
              <li>
                <a href="http://localhost:3000/joinClass">Student</a>
              </li>
              <li>
                <a href="http://localhost:3000/#contact">Contact</a>
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="toggle" onClick={() => setState(!state)}>
        <FaAlignJustify />
      </div>
    </nav>
  );
};

export default Nav;
