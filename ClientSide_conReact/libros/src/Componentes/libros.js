import React from "react";
import useFetch from "../useFetch"
import {Link} from "react-router-dom";

const Libros = () => {
const lista = useFetch("https://api-book.eyacar.vercel.app/api")
return (
      <>
{lista?
    <>
    <h1><strong><u>Books</u></strong></h1>
    <ul>
      {lista.map((libro, i) => (
          <Link to={"/libro/" + libro.title.replace(" ","_")} key={i}>
            <li>{libro.title}</li>
          </Link>
        ))}
    </ul></>
      :<img
      src="https://images.vectorhq.com/images/previews/8da/preload-gif-animated-freebies-83609.gif"
      alt="Preload"/>}
     <Link to="/" id="ancor">
          <input type="button" value="Home" />
        </Link>
      </>
    );
  };

  export default Libros;