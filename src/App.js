import './App.css';
import { useState } from 'react';

function App() {

  const [search_value, set_search_value]=useState('');
  const [img_arr, set_img_arr]=useState([]);
  const [page, set_page]=useState({page:1});

  function update_search_value(e){
    set_search_value(e.target.value);
  }

  const fetch_images = async()=>{
    let response = await fetch(`https://api.unsplash.com/search/photos?client_id=bDsEus4TgyFqBuefEcDdo1_nW0im06x4jWCMK4qSjz0&query=${search_value}&orientation=squarish&page=${page.page}`);
    let data= await response.json();
    set_img_arr(data.results)
  }

  const handle_prev = async ()=>{
    const setting_prev = async() =>{
    set_page({page:page.page-1})}
    await setting_prev();
    let response = await fetch(`https://api.unsplash.com/search/photos?client_id=bDsEus4TgyFqBuefEcDdo1_nW0im06x4jWCMK4qSjz0&query=${search_value}&orientation=squarish&page=${page.page}`);
    let data= await response.json();
    set_img_arr(data.results)
     
  }

   const handle_next = async ()=>{
    const setting_next=async ()=>{
    set_page({page:page.page+1})}
    await setting_next();
    console.log(page.page)
    let response = await fetch(`https://api.unsplash.com/search/photos?client_id=bDsEus4TgyFqBuefEcDdo1_nW0im06x4jWCMK4qSjz0&query=${search_value}&orientation=squarish&page=${page.page}`);
    let data= await response.json();
    set_img_arr(data.results)
  }

  return (
    <>
    <h1 className='app_name'>Image Search App</h1>
    <div className="search">
      <input value={search_value} onChange={update_search_value} id="searchbar" type="search" placeholder='search images here..eg - cars, trees etc.' />
      <button id="search_btn" onClick={fetch_images}>Search</button>
    </div>
    <div className="results">
      {img_arr.map(function(element){
          return (<div key={element.id}><img className="result_item" src={element.urls.small_s3} alt={element.alt_description}/></div>);
      })}
    </div>
    <div className="navigation">
      <button onClick={handle_prev}>Previous</button>
      <button onClick={handle_next}>Next</button>
    </div>
    </>
  );
}

export default App;
