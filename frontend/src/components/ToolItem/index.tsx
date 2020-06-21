import React from 'react';

import './style.css';
import CloseIcon from '../../assets/close.svg';

interface Props{
  id: number;
  title: String;
  link: string;
  description: String;
  tags: String[];
  parentCallback: Function;
}

const ToolItem = (props: Props) => {

  function DelScreen() {
    props.parentCallback(props.id);

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
          <a href={props.link} target="__blank" className="title">{props.title}</a>
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
