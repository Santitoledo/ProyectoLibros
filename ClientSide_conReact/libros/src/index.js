import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route} from "react-router-dom";
import "./index.css";
import Libro from "./Componentes/Libro"
import Home from "./home"
import Libros from "./Componentes/libros"
import Autores from "./Componentes/Autores"
import Autor from "./Componentes/autor"
import Publisher from "./Componentes/publisher"

const App = () => {
  return (
    <Router>
      <h1 id="title1">
        <u>
          <em>Book Finder</em>
        </u>
      </h1>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/libro/:titulo">
          <Libro />
        </Route>
        <Route exact path="/libros">
          <Libros />
        </Route>
        <Route exact path="/autores">
          <Autores />
        </Route>
        <Route exact path="/autores/:autor">
          <Autor />
        </Route>
        <Route exact path="/editorial/:editorial">
          <Publisher />
        </Route>
      </Switch>
    </Router>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);