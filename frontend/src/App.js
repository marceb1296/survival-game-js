import React, { useReducer } from 'react';
import SurvivalGame from "./components/survivalGame";

const initialValue = {
  life: 70,
  food: 80,
  tree: [],
  rock: [],
  items: [{name: "meat", amount: 10}, {name: "wood", amount:20}, {name: "stone", amount: 20}],
  crafts: [],
  notifys: []
}

const defaultLifeTool = 100;
const randomID = () => Math.floor((Math.random() * 1000) + 1);
const randomPlace = () => place[~~(Math.random() * place.length)];
const restRandomLife = (life) => life < 10 ? Math.floor((Math.random() * (life * 3)) + 1) : Math.floor((Math.random() * life) + 1);
const place = ["l", "r"];

function reducer(state, action) {

  const {type, payload} = action

  switch (type) {
    case "SET LIFE":
      return {
        ...state, 
        life: payload.life
      }
    case "SET FOOD":
      return {
        ...state, 
        food: payload.food
      }
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
      const findItem = state.items.filter(el => el.name === payload.item);

      return {
        ...state,
        items: findItem.length > 0 ?
          (
            state.items.map(el => el.name === payload.item ? 
              {...el, ["amount"]: el.amount + payload.amount}
              :
              el
            )
          )
        :
        [
          ...state.items,
          {
            name: payload.item,
            amount: 1
          }
        ]
      }
    case "DEL ITEM":
      return {
        ...state,
        items: state.items.filter(el => el.name !== payload.name)
      }
    case "REST ITEM":
      return {
        ...state,
        items: state.items.map(
          el => el.name === payload.name ? {...el, ["amount"]: el.amount - payload.amount} : el
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
    case "REST CRAFT LIFE":
      return {
        ...state,
        crafts: state.crafts.map(
          el => el.name === payload.craft ? {...el, life: el.life - restRandomLife(el.life)} : el
        )
      }
    case "DEL CRAFT":
      return {
        ...state,
        crafts: state.crafts.filter(el => el.name !== payload.craft)
      }
    case "ADD NOTIFY":
        return {
            ...state,
            notifys: [
                ...state.notifys,
                {
                    message: payload.message,
                    id: randomID()
                }
            ]
        }
    case "DEL NOTIFY":
      return {
        ...state,
        notifys: state.notifys.filter(el => el.id !== payload.id)
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
