import { useState, useEffect } from "react";

// Crea y exporta el Hook useFetch que es una función
export default function useFetch(url) {
//usamos el estado data para guardar la info que viene del JSON
  const [data, setData] = useState([]);

  async function getData() {
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
  }

  useEffect(() => {
    getData();
     // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, []);

  // Devuelve la info del JSON que recibimos como parámetro url
  return data;
}