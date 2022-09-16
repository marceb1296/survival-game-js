import React, { useReducer } from 'react';
import SurvivalGame from "./components/survivalGame";

const initialValue = {
  tree: [],
  rock: [],
  items: [{wood:50}, {stone:50}],
  crafts: []
}

const defaultLifeTool = 100;

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
          tree: state.tree.filter(el => el.id !== payload.id)
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
          rock: state.rock.filter(el => el.id !== payload.id)
      }
    case "ADD ITEM":
      const findItem = state.items.filter(el => el.hasOwnProperty(payload.item));
    	return {
    		...state,
        items: findItem.length > 0 ?
          (
            state.items.map(el => el.hasOwnProperty(payload.item) ? 
              {[payload.item]: el[payload.item] + payload.amount}
              :
              el
            )
          )
          :
          [
            ...state.items,
            {[payload.item]: payload.amount}
          ]
    	} 
    case "DEL ITEM":
      return {
        ...state,
        items: state.items.filter(el => Object.keys(el)[0] !== payload.name)
      }
    case "REST MATERIALS":
      return {
        ...state,
        items: state.items.map(
          el => Object.keys(el)[0] === payload.name ? {[payload.name]: Object.values(el)[0] - payload.amount} : el
        )
      }
    case "ADD CRAFT":

      const findCraft = state.crafts.filter(el => el.name === payload.craft);

      return {
        ...state,
        crafts: findCraft.length > 0 ?
          (
            state.crafts.map(el => el.name === payload.craft ? 
              {...el, ["amount"]: el.amount + payload.amount}
              :
              el
            )
          )
        :
        [
          ...state.crafts,
          {
            name: payload.craft,
            id: randomID(),
            life: defaultLifeTool,
            amount: 1
          }
        ]
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
