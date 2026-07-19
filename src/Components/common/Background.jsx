import React from 'react';
import "../../Assets/styles/Background.css";


export default function Background(props) {
  const {text} = props;
  if(!text) return null;
  return (
    <div className="bg-back fade-appear-01">
      <div className="bg-fore">
        <div className="cuboid">
          <div className="side super-center front">
            {text}
          </div>
          <div className="side super-center rear">
            {text}
          </div>
          {/* <div className="side left"></div>
          <div className="side right"></div>
          <div className="side top"></div>
          <div className="side bottom"></div> */}
        </div>
      </div>
    </div>
  );
}