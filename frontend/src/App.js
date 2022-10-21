import React, { useReducer } from 'react';
import SurvivalGame from "./components/survivalGame";
import { animals, get_anm } from './dataValues/survivalGameValues';

const initialValue = {
  language: "en",
  start_game: false,
  game_over: false,
  load: false,
  layer_countdown: 3,
  life: 100,
  food: 100,
  hour: 20,
  minutes: 0,
  btns: false,
  tree: [],
  rock: [],
  items: [{name: "wood", amount: 100}, {name: "stone", amount:100}],
  crafts: [],
  notifys: [],
  anm: {}
}

const defaultLifeTool = 100;
const randomID = () => Math.floor((Math.random() * 1000) + 1);
const randomPlace = () => place[~~(Math.random() * place.length)];

const place = ["l", "r"];

function reducer(state, action) {

  const {type, payload} = action

  switch (type) {
    case "START GAME":
        return {
            ...state,
            start_game: payload.game
        }
    case "GAME OVER":
      return {
        ...state,
        game_over: payload.game_over
      }
    case "SAVE GAME":
      const autosave = !state.load ? 
        {
          ...state,
          load: true
        }
        :
        state;

      localStorage.setItem("survival_game", JSON.stringify(autosave))

      return state
    case "LOAD GAME":
      const loadGame = JSON.parse(localStorage.getItem("survival_game"))
      return {
        ...loadGame
      }
    case "SET LIFE":
      return {
        ...state, 
        life: payload.life < 0 ? 0 : payload.life
      }
    case "SET FOOD":
      return {
        ...state, 
        food: payload.food
      }
    case "HANDLE BTNS":
      return {
        ...state,
        btns: !state.btns
      }
    case "LAYER COUNTDOWN":
      return {
        ...state,
        layer_countdown: payload.count
      }
    case "SET HOUR":
      return {
        ...state,
        hour: payload.hour < 25 ? payload.hour : 0
      }
    case "SET MINUTES":
      return {
        ...state,
        minutes: payload.minutes
      }
    case "SET TREE":
      return {
        ...state,
          tree: [
            ...state.tree,
            {
              id: randomID(),
              place: randomPlace(),
              pos_y: Math.floor((Math.random() * 78) + 1),
              pos_x: Math.floor((Math.random() * 99) + 1)
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
               pos_y: Math.floor((Math.random() * 84) + 1),
               pos_x: Math.floor((Math.random() * 99) + 1)
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
              {...el, amount: el.amount + payload.amount}
              :
              el
            )
          )
        :
        [
          ...state.items,
          {
            name: payload.item,
            amount: payload.amount
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
          el => el.name === payload.name ? {...el, amount: el.amount - payload.amount} : el
        )
      }
    case "ADD CRAFT":
      const findCraft = state.crafts.filter(el => el.name === payload.craft);

      return {
        ...state,
        crafts: findCraft.length > 0 ?
          (
            state.crafts.map(el => el.name === payload.craft ? 
              {...el, amount: el.amount + payload.amount}
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
            life: payload.life !== undefined ? payload.life : defaultLifeTool,
            amount: 1
          }
        ]
      }
    case "REST CRAFT LIFE":
      return {
        ...state,
        crafts: state.crafts.map(
          el => el.name === payload.craft ? {...el, life: payload.life} : el
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
    case "SET ANM":
      const anm = get_anm();

      return {
        ...state,
        anm: {
          name: anm,
          id: randomID(),
          place: randomPlace(),
          pos_y: Math.floor((Math.random() * 65) + 1),
          pos_x: Math.floor((Math.random() * 90) + 1),
          totalLife: animals[anm].life,
          ...animals[anm]
        }
      }
    case "REST ANM LIFE":
      return {
        ...state,
        anm: {
          ...state.anm,
          life: payload.life
        }
      }
    case "DEL ANM":
      return {
        ...state,
        anm: {}
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
