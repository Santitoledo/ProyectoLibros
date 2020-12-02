import React, { useState} from "react";
import useFetch from "./useFetch"
import {Link} from "react-router-dom";
import "./index.css";
const Home = () => {
const lista = useFetch("https://api-book.eyacar.vercel.app/api")
const Publisher = useFetch("https://api-book.eyacar.vercel.app/api/editorial")
const [search, SetSearch] = useState("");

    const Buscando = (event) => {
      SetSearch(event.target.value);
    };
  
    const p = search.length;
    return (
      <>
        <input
          type="search"
          name=""
          id=""
          placeholder="Search..."
          onChange={Buscando}
        />
        {/*First of all ask if there is a search statement, then if this is true, useing "slice" we search the same length of the input value on the list of titles in the json*/}
        {search ? (
          <ul>
            {lista
              .filter(
                (libro) =>
                  libro.title.slice(0, p).toLowerCase() === search.toLowerCase()
              )
              .map((libro, i) => (
                <Link to={"/libro/" + libro.title.replace(" ","_")} key={i}>
                  <li>{libro.title}</li>
                </Link>
              ))}{" "}
          </ul>
        ) : null}
    <h3 id="title3"><strong><u>Publishers</u>:</strong></h3>
    {Publisher.map((editorial,i)=>
    <li key={i}><a href={"/editorial/"+editorial.publisher}>{editorial.publisher}</a></li>
    )}
        <Link to="/libros" id="ancor">
          <input type="button" value="Access all books" />
        </Link>
        <Link to="/autores" id="ancor">
          <input type="button" value="Access all authors" />
        </Link>
      </>
    );
  };

  export default Home;