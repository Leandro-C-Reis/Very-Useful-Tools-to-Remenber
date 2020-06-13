import React, { useState, useEffect } from 'react';

import './addTools.css';
import './delTools.css';
import ToolItem from '../components/ToolItem';
import SearchIcon from '../assets/search.svg';
import PlusIcon from '../assets/plus.svg';
import CloseIcon from '../assets/close.svg';

import api from '../services/ToolsAPI';

interface Data {
  title: String;
  description: String;
  tags: String[];
}

const Main = () => {
  const [data, setData] = useState([]);

  function addScreen() {
    const screen = document.querySelector('.addScreen');
    const overlay = document.getElementById('overlay');
    
    screen?.classList.add('active');
    overlay?.classList.add('active');
    document.body.classList.add('stop-scrolling');
  }

  function removeAddScreen() {
    const screen = document.querySelector('.addScreen');
    const overlay = document.getElementById('overlay');
    
    screen?.classList.remove('active');
    overlay?.classList.remove('active');
    document.body.classList.remove('stop-scrolling');
  }

  function removeDelScreen() {
    const screen = document.querySelector('.delScreen');
    const overlay = document.getElementById('overlay');

    screen?.classList.remove('active');
    overlay?.classList.remove('active');
    document.body.classList.remove('stop-scrolling');
  }

  useEffect(() =>  {
    api.get('list')
      .then(response => setData(response.data));
  }, []);

  return (
    <>
      <h1>VUTTR</h1>
      <h3>Very Useful Tools to Remember</h3>
      
      <div className="search-content">
        <div id="search">
          <img src={SearchIcon} alt="SearchIcon"/>
          <input type="search" placeholder="Search"/>
        </div>
        <button onClick={addScreen}>
          <img src={PlusIcon} alt="plusIcon"/>
          <p>Add</p>
        </button>
      </div>
 
      <form className="addScreen">
        <header>
          <div>
            <img src={PlusIcon} alt="PlusIcon"/>
            <h3>Add new Tool</h3>
          </div>

          <span onClick={removeAddScreen}>
            <img src={CloseIcon} alt="CloseIcon"/>
          </span>
        </header>
        <main>
          <h5>Tool Name</h5>
          <input type="text"/>
          <h5>Tool Link</h5>
          <input type="url"/>
          <h5>Description</h5>
          <textarea id="des"/>
          <h5>Tags</h5>
          <input type="text"/>
        </main>
        <footer>
          <div className="addTool" >
            <img src={PlusIcon} alt="Add"/>
            <h5>Add Tool</h5>
          </div>
        </footer>    
      </form>
      
      <div className="delScreen">
        <h3>&times; Remove Tool</h3>
        <h5>Are you sure you want to remove hotel?</h5>

        <footer>
          <div className="cancel" onClick={removeDelScreen}>
            <h5>Cancel</h5>
          </div>
          <div className="accept">
            <h5>Yes, remove</h5>
          </div>
        </footer>
      </div>

      { data.map((data: Data) => (
        <ToolItem title={data.title} description={data.description} tags={data.tags} />
      )) }

      <div id="overlay" />
    </>
  );
}

export default Main;