import React, { useRef } from 'react';

import {
	woodAmount,
	stoneAmount,
    fist_damage,
    pickaxe_plus_amount
} from "../dataValues/survivalGameValues";
import "../css/survivalGameSides.scss";
import { existsCraft, restRandomLife } from '../helpers/SurvivalHelper';


const SurvivalGameSides = ({state, dispatch, side}) => {

    const handleImage = useRef();
    
    const handleClickDel = async (type, id) => {
    	
        if (type === "tree") {
            dispatch({
                type: "ADD ITEM",
                payload: {
                    item: "wood",
                    amount: woodAmount
                }
            })
            dispatch({
                type: "ADD NOTIFY",
                payload: {
                    message: `+ ${woodAmount} de madera!`
                }
            })
        } else if (type === "rock") {
            const {exist: existPickaxe, life: lifePickaxe} = existsCraft(state.crafts, "pickaxe");

            if (existPickaxe) {

                const restLifeCraft = restRandomLife(lifePickaxe);
                dispatch({
                    type: "REST CRAFT LIFE",
                    payload: {
                        craft: "pickaxe",
                        life: lifePickaxe - restLifeCraft
                    }
                })
                dispatch({
                    type: "ADD NOTIFY",
                    payload: {
                        message: `Pico: - ${restLifeCraft} de vida!`
                    }
                })
                dispatch({
                    type: "ADD NOTIFY",
                    payload: {
                        message: `Pico: + ${pickaxe_plus_amount} de piedra!`
                    }
                })
            }
            dispatch({
                type: "ADD NOTIFY",
                payload: {
                    message: `+ ${stoneAmount} de piedra!`
                }
            })
            dispatch({
                type: "ADD ITEM",
                payload: {
                    item: "stone",
                    amount:  existPickaxe > 0 ? stoneAmount + pickaxe_plus_amount : stoneAmount
                }
            })
        }

        document.getElementById(`${type}-${id}`).classList.toggle("fadeOut");
        await new Promise(r => setTimeout(r, 900));
        dispatch({
            type: `DEL ${type.toUpperCase()}`,
            payload: {
                id: id
            }
        })

    }

    const handleClickAnmKill = async (e) => {

		e.preventDefault();

        dispatch({
            type: "HANDLE BTNS"
        })

		if (Object.keys(state.anm).length > 0) {

			dispatch({
				type: "REST ANM LIFE",
				payload: {
					life: state.anm.life - fist_damage
				} 
			});

            const notifys = [
                `Has echo ${fist_damage} de daño!`,
                `Has recibido ${state.anm.damage} de daño!`
            ]

            dispatch({
                type: "SET LIFE",
                payload: {
                    life: state.anm.damage > state.life ? 0 : state.life - state.anm.damage
                }
            })

            notifys.forEach(el => dispatch({
				type: "ADD NOTIFY",
				payload: {
					message: el
				} 
			}));

            handleImage.current.classList.toggle("active")
            await new Promise(r => setTimeout(r, 3000));

            handleImage.current.classList.toggle("active")
			return;
		}

		dispatch({
			type: "ADD NOTIFY",
			payload: {
				message: ["No hay animales cerca!"]
			} 
		})

	}

        // max top 78%
        // max left 100%
    const makeTree = (id, x, y) => <img key={id} onClick={() => handleClickDel("tree", id)} id={"tree-" + id} style={{[side]: x + "%", top: y + "%", transform: `translate(${side === "left" ? `-${x}%` : `${x}%`}, -${y}%)`}} src={`/tree_${side}.png`} alt="tree"></img>;
    
        // max top 84%
        // max right 100%
    const makeRock = (id, x, y) => <img key={id} onClick={() => handleClickDel("rock", id)} id={"rock-" + id} style={{[side]: x + "%", top: y + "%", transform: `translate(${side === "left" ? `-${x}%` : `${x}%`}, -${y}%)`}} src={`/rock_${side}.png`} alt="tree"></img>;

    const makeAnm = ({id, pos_x, pos_y, name, life, totalLife}) => <div ref={handleImage} onClick={handleClickAnmKill} className="anm-container" id={"anm-container-" + id} style={{[side]: pos_x + "%", top: pos_y + "%", transform: `translate(${side === "left" ? `-${pos_x}%` : `${pos_x}%`}, -${pos_y}%)`}}>
        <progress value={life} max={totalLife}></progress>
        <img key={id} src={`/${name}.png`} alt={name}></img>
    </div>;

    return ( 
        <div className={`survival-${side}`}>
            <div className="side-container">
                { state.tree.length > 0 &&
                    state.tree.filter(el => el.place === (side === "left" ? "l" : "r")).map(el => makeTree(el.id, el.pos_x, el.pos_y))
                }
                {
                    state.rock.length > 0 &&
                    state.rock.filter(el => el.place === (side === "left" ? "l" : "r")).map(el => makeRock(el.id, el.pos_x, el.pos_y))
                }
                {Object.keys(state.anm).length > 0 && state.anm.place === (side === "left" ? "l" : "r") &&
                    makeAnm(state.anm)
                }
            </div>
        </div>
    );
}
 
export default SurvivalGameSides;