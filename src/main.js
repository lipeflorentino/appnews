// Importando o React
import React from "react";
// Importando o component Home
import News from "./components/news/news";
// Importando os components necessários da lib react-materialize
import { Container } from 'react-materialize';

const Main = () => (
  <main>
    <News />
  </main>  
);

export default Main;