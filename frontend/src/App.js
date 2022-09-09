import React, { useState, useReducer } from 'react';
import SurvivalGame from "./components/survivalGame";

const initialValue = {
  tree: [],
  rock: []
}

function reducer(state, action) {

  const {type, payload} = action
  const randomID = () => Math.floor((Math.random() * 1000) + 1);
  //var rand = myArray[~~(Math.random() * myArray.length)];

  switch (type) {
    case "SET TREE":
      return {
        ...state,
          tree: payload.tree
      }

    case "DEL TREE":
      break;
    case "SET ROCK":
      return {
        ...state,
        tree: []
      }
    case "DEL ROCK":
      break;
  
    default:
      throw new Error();
  }
}

function App() {
  return (
    <SurvivalGame />
  );
}

export default App;
