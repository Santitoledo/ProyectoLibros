import React from "react";
import useFetch from "../useFetch"
import {Link,useParams} from "react-router-dom";

const Autor = () => {
const params = useParams();
const autor = useFetch("https://api-book.eyacar.vercel.app/api/autor/"+params.autor)

return (
    <div id="elegido">
    <h2>Chosen Author: <u>{params.autor.replace("_"," ")}</u></h2>
  {autor.map((Datos,i)=> (
    <div key={i}>
  <h2>Book: <u>{Datos.title}</u></h2>
  <h3>ISBN: {Datos.isbn}</h3>
  {Datos.description?
  <p> <strong><u><em>Description</em></u>: </strong> {Datos.description}</p>
    :null}
  <h3>Data:</h3>
  <ul>
  <li>Number of Pages: {Datos.pageCount}</li>
  <li>Country: {Datos.country}</li>
  </ul>
  {Datos.categories?
  <>
  <h3>Categories:</h3>
  <ul>
  {Datos.categories.map((cat,i)=><li key={i}>{cat}</li>)}
  </ul>
  </>
  :null}
  
  {Datos.authors?
  <>
  {Datos.authors.length>1?<h3>Authors:</h3>:<h3>Author:</h3>}
  <ul>
  {Datos.authors.map((au,i)=><li key={i}>{au}</li>)}
  </ul>
  </>
  :<h4>There is no data</h4>}
  <div style={{width:'100%'}} >
  <img style={{margin:'1% auto'}} src={Datos.thumbnailUrl} alt={Datos.title}/>   
  </div>
  </div>
  ))}
    <Link to="/" id="ancor">
      <input type="button" value="Home" />
    </Link>
  
</div>
      
)};

  export default Autor;