import React from "react";
import useFetch from "../useFetch"
import {Link,useParams} from "react-router-dom";

const Publisher = () => {
const params = useParams();
const lista = useFetch("https://api-book-gnu4jcl16.vercel.app/api/editorial/"+params.editorial)
return (
    <>
    <h1><strong><u>Libros</u></strong></h1>
    <ul>
      {lista.map((libro, i) => (
          <Link to={"/libro/" + libro.title} key={i}>
            <li>{libro.title}</li>
          </Link>
        ))}
    </ul>
     <Link to="/" id="ancor">
          <input type="button" value="Home" />
        </Link>
      </>
    );
  };

  export default Publisher;