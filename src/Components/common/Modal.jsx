import React from 'react';
import "../../Assets/styles/Modal.css";


export default function Modal(props) {
  const {toggleModal} = props;

  const toggleShow = (e)=>{
    if(e.target === e.currentTarget) toggleModal(null);
  }

  return (
    <article className="modal-container fade-appear-01" onClick={e=>toggleShow(e)}>
        {props.children}
    </article>
  );
}