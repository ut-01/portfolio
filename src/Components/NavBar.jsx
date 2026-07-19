import React, { useState } from 'react';
import '../Assets/styles/NavBar.css';
import { Link } from 'react-router-dom';

export default function NavBar(props) {
  const { toggleTerminal } = props;
  let [fix, setFix] = useState(true);


  setTimeout(()=>{
    setFix(false);
  }, 1000);

  return (
    <aside className={`nav-bar b-halfr glass02 ${fix ? "nav-initial" : ""}`}>
      <div className="nav-item" onClick={toggleTerminal}>
        &gt;_
      </div>
      <div className="nav-item">
        <Link to="/">Home</Link>
      </div>
      <div className="nav-item">
        <Link to="/projects">Projects</Link>
      </div>
      <div className="nav-item">
        <Link to="/blogs">Blogs</Link>
      </div>
      <div className="nav-item">
        <a href="#contact">Contact</a>
      </div>
    </aside>
  );
}