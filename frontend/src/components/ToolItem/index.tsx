import React from 'react';

import api from '../../services/ToolsAPI';
import './style.css';
import CloseIcon from '../../assets/close.svg';

interface Props{
  title: String;
  description: String;
  tags: String[];
}

const ToolItem = (props: Props) => {

  function DelScreen() {
    const screen = document.querySelector('.delScreen');
    const overlay = document.getElementById('overlay');

    screen?.classList.add('active');
    overlay?.classList.add('active');
    document.body.classList.add('stop-scrolling');
  }

  return (
    <>
      <div className="content">
        <div>
          <div className="title">{props.title}</div>
          <div className="remove" onClick={DelScreen}>
            <img src={CloseIcon} alt="Delete"/>
            <p>remove</p>
          </div>
        </div>
        <div className="description">
          {props.description}
        </div>
        <div className="tags">
          {props.tags.map(tag => `#${tag}`).join(" ")}
        </div>
      </div>
    </>
  );
}

export default ToolItem;
