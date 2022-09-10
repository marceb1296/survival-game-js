import React, { useReducer } from 'react';
import SurvivalGame from "./components/survivalGame";

const initialValue = {
  tree: [],
  rock: []
}

const place = ["l", "r"];

function reducer(state, action) {

  const {type, payload} = action
  const randomID = () => Math.floor((Math.random() * 1000) + 1);
  
  const randomPlace = () => place[~~(Math.random() * place.length)];

  switch (type) {
    case "SET TREE":
      return {
        ...state,
          tree: [
            ...state.tree,
            {
              id: randomID(),
              place: randomPlace(),
              pos_y: Math.floor((Math.random() * 60) + 1),
              pos_x: Math.floor((Math.random() * 80) + 1)
            }
          ]
      }

    case "DEL TREE":
      return {
          ...state,
          tree: state.tree.filter(el => el !== payload.id)
      }
    case "SET ROCK":
      return {
          ...state,
          rock: [
            ...state.rock,
            {
               id: randomID(),
               place: randomPlace(),
               pos_y: Math.floor((Math.random() * 80) + 1),
               pos_x: Math.floor((Math.random() * 68) + 1)
            }
          ]
      }
    case "DEL ROCK":
        return {
            ...state,
            rock: state.rock.filter(el => el !== payload.id)
        }
    case "CLEAR ENV":
    	return {
    		tree: [],
    		rock: []
    	}
    default:
      throw new Error();
  }
}

function App() {
    
    const [state, dispatch] = useReducer(reducer, initialValue);
    
  return (
    <SurvivalGame state={state} dispatch={dispatch}/>
  );
}

export default App;
