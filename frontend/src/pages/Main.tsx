import React, { useState, useEffect, FormEvent, useCallback } from 'react';

import './addTools.css';
import './delTools.css';
import ToolItem from '../components/ToolItem';
import PlusIcon from '../assets/plus.svg';
import CloseIcon from '../assets/close.svg';

import api from '../services/ToolsAPI';

interface Data {
  id: number;
  title: String;
  link: string;
  description: String;
  tags: String[];
}

const Main = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [id, setId] = useState<number>(0);
  const [searchType, setSearchType] = useState(false);
  
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

  const handleAddTool = useCallback((e: FormEvent) => {
    e.preventDefault();

    if (title === "" || link === "" || description === "" || tags === "") 
    {
      alert("Preencha todos os campos!");
      return;
    }

    const Tags = tags.split(" ");

    const data = {
      title,
      link,
      description,
      tags: Tags,
    }

    api.post('tools', data);

    setTitle("");
    setDescription("");
    setLink("");
    setTags("");
    removeAddScreen();
  }, [title, description, link, tags]);

  const handleDeleteTool = useCallback(() => {
    api.delete(`tools/${id}`);
    removeDelScreen();
  }, [id]);

  //listagem de ferramentas
  useEffect(() =>  {
    if (search === "") api.get('list').then(response => setData(response.data));

  }, [search, handleAddTool, handleDeleteTool]);

  useEffect(() => {
     if(search !== "") 
     {
        if (searchType == true) api.get(`tools?tag=${search}`).then(response => setData(response.data)).catch();
        else api.get(`tools?q=${search}`).then(response => setData(response.data)).catch();
     }

  }, [search]);

  return (
    <>
      <h1>VUTTR</h1>
      <h3>Very Useful Tools to Remember</h3>
      
      <div className="search-content">
        <div>
          <input type="search" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
          <input type="checkbox" onChange={(e) => setSearchType(e.target.checked)}/>
          <h5>search in tags only</h5>
        </div>
        <button onClick={addScreen}>
          <img src={PlusIcon} alt="plusIcon"/>
          <p>Add</p>
        </button>
      </div>
 
      <form className="addScreen" onSubmit={() => handleAddTool} >
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
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
          <h5>Tool Link</h5>
          <input type="url" value={link} onChange={e => setLink(e.target.value)}/>
          <h5>Description</h5>
          <textarea id="des" value={description} onChange={e => setDescription(e.target.value)} />
          <h5>Tags</h5>
          <input type="text" value={tags} onChange={e => setTags(e.target.value)} />
        </main>
        <footer>
          <button className="addTool" type="submit" >
            <img src={PlusIcon} alt="Add"/>
            <h5>Add Tool</h5>
          </button>
        </footer>    
      </form>
      
      <div className="delScreen">
        <h3>&times; Remove Tool</h3>
        <h5>Are you sure you want to remove hotel?</h5>

        <footer>
          <div className="cancel" onClick={removeDelScreen}>
            <h5>Cancel</h5>
          </div>
          <div className="accept" onClick={() => handleDeleteTool} >
            <h5>Yes, remove</h5>
          </div>
        </footer>
      </div>

      { data.map((data: Data) => (
        <ToolItem key={data.id} link={data.link} id={data.id} title={data.title} description={data.description} tags={data.tags} parentCallback={setId} />
      )) }

      <div id="overlay" />
    </>
  );
}

export default Main;