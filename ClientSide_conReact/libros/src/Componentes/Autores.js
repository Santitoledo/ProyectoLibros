import React from "react";
import useFetch from "../useFetch"
import {Link} from "react-router-dom";

const Autores = () => {
const lista = useFetch("https://api-book.eyacar.vercel.app/api")
const Autores = []; 

return (
    <>
    <h1><strong><u>Authors</u></strong></h1>
  {lista.map((libro)=> 
  // eslint-disable-next-line
libro.authors.sort().map((libro) => 
{Autores.push(libro)}
  ))}
       
      <ul>
      {Autores.sort().filter((autor,i) => Autores[i] !== Autores[i+1]).map((autor,i)=><li key={i}><Link to={"/autores/" + autor}> {autor} </Link></li>
      )}

      </ul>
      <Link to="/" id="ancor">
          <input type="button" value="Home" />
        </Link>

      </>
      );
  };

  export default Autores;