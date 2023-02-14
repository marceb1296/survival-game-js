import React, { useEffect, useState } from 'react';
import {
	woodAmount,
	stoneAmount,
    fist_damage,
    pickaxe_plus_amount,
    axe_plus_stone,
    axe_plus_wood,
    knife_damage,
    knife_wood_damage
} from "../dataValues/survivalGameValues";
import "../css/survivalGameSides.scss";
import { existsCraft, restRandomLife } from '../helpers/SurvivalHelper';
import { language } from "../lan/language";


const SurvivalGameSides = ({state, dispatch, side}) => {


    const { survival_game } = language;
    const [language_gotted, setLanguageGotted] = useState(survival_game[state.language])
    
    // set language
    useEffect(() => {
        setLanguageGotted(survival_game[state.language])
    }, [survival_game, state.language, setLanguageGotted])

    const hitAnm = async ({life, damage}, playerDamage, lifeTool, name) => {

        if (lifeTool > 0) {
            const restLifeCraft = restRandomLife(lifeTool);

            dispatch({
                type: "REST CRAFT LIFE",
                payload: {
                    craft: name,
                    life: lifeTool - restLifeCraft
                }
            })
            dispatch({
                type: "ADD NOTIFY",
                payload: {
                    message: `${language_gotted.survivalGameNames[name]}: - ${restLifeCraft} ${language_gotted.survivalGameMaterials.of} ${language_gotted.survivalGame["life"]}!`
                }
            })
        }

        dispatch({
            type: "REST ANM LIFE",
            payload: {
                life: life - playerDamage
            } 
        });
        dispatch({
            type: "ADD NOTIFY",
            payload: {
                message: `${language_gotted.survivalGame["made"]} + ${playerDamage} ${language_gotted.survivalGameMaterials.of} ${language_gotted.survivalGame["damage"]}!`
            } 
        })

        //shield

        const {exist: existUperArmor, life: lifeUperArmor} = existsCraft(state.crafts, "upper_body_armor");
        const {exist: existLowerArmor, life: lifeLowerArmor} = existsCraft(state.crafts, "greaves_leg_armor");
        
        let isNight = false;
        let nightDamage = 0;
        let showDamage = 0;
        let parseTime = new Date(state.time).getHours();
    
        if (parseTime < 7 || parseTime > 18) {
            isNight = true;
            nightDamage = Math.round((50 * damage) / 100);
            showDamage = damage;
            damage += nightDamage;
        }
        
        if (existLowerArmor) {

            dispatch({
                type: "REST CRAFT LIFE",
                payload: {
                    craft: "greaves_leg_armor",
                    life: (lifeLowerArmor - damage)
                }
            });
            dispatch({
                type: "ADD NOTIFY",
                payload: {
                    message: `${language_gotted.survivalGame.taked} + ${isNight ? showDamage : damage} ${language_gotted.survivalGameMaterials.of} ${language_gotted.survivalGame["damage"]}! => ${language_gotted.survivalGameSides.arm_lower}`
                } 
            });
            
            if (isNight) {
                dispatch({
                    type: "ADD NOTIFY",
                    payload: {
                        message: `${language_gotted.survivalGame.night}: + ${nightDamage} ${language_gotted.survivalGameMaterials.of} ${language_gotted.survivalGame["damage"]}! => ${language_gotted.survivalGameSides.arm_lower}`
                    } 
                });
            }
        } else if (existUperArmor) {

            dispatch({
                type: "REST CRAFT LIFE",
                payload: {
                    craft: "upper_body_armor",
                    life: lifeUperArmor - damage
                }
            });
            dispatch({
                type: "ADD NOTIFY",
                payload: {
                    message: `${language_gotted.survivalGame.taked} + ${isNight ? showDamage : damage} ${language_gotted.survivalGameMaterials.of} ${language_gotted.survivalGame["damage"]}! => ${language_gotted.survivalGameSides.arm_up}`
                } 
            });
            
            if (isNight) {
                dispatch({
                    type: "ADD NOTIFY",
                    payload: {
                        message: `${language_gotted.survivalGame.night}: + ${nightDamage} ${language_gotted.survivalGameMaterials.of} ${language_gotted.survivalGame["damage"]}! => ${language_gotted.survivalGameSides.arm_up}`
                    } 
                });
            }
        } else {

            dispatch({
                type: "SET LIFE",
                payload: {
                    life: damage > state.life ? 0 : state.life - damage
                }
            })
            dispatch({
                type: "ADD NOTIFY",
                payload: {
                    message: `${language_gotted.survivalGame.taked} + ${isNight ? showDamage : damage} ${language_gotted.survivalGameMaterials.of} ${language_gotted.survivalGame["damage"]}!`
                } 
            });
            
            if (isNight) {
                dispatch({
                    type: "ADD NOTIFY",
                    payload: {
                        message: `${language_gotted.survivalGame.night} + ${nightDamage} ${language_gotted.survivalGameMaterials.of} ${language_gotted.survivalGame["damage"]}!`
                    } 
                });
            }
        }

    }
    
    const handleClickDel = async (e, type, id) => {
    
        e.currentTarget.style.pointerEvents = "none";

        if (type === "tree") {

            let totalWood = woodAmount;

            const {exist: existsAxeWood, life: lifeAxeWood} = existsCraft(state.crafts, "axe_wood");
            const {exist: existsAxeStone, life: lifeAxeStone} = existsCraft(state.crafts, "axe_stone");

            if (existsAxeStone) {

                const restLifeCraft = restRandomLife(lifeAxeStone);

                dispatch({
                    type: "REST CRAFT LIFE",
                    payload: {
                        craft: "axe_stone",
                        life: lifeAxeStone - restLifeCraft
                    }
                })
                dispatch({
                    type: "ADD NOTIFY",
                    payload: {
                        message: `${language_gotted.survivalGameNames.axe_stone}: - ${restLifeCraft} ${language_gotted.survivalGameSides.life}!`
                    }
                })
                dispatch({
                    type: "ADD NOTIFY",
                    payload: {
                        message: `${language_gotted.survivalGameNames.axe_stone}: + ${axe_plus_stone} ${language_gotted.survivalGameSides.plus_stone}!`
                    }
                })

                totalWood += axe_plus_stone;
            } else if (existsAxeWood) {

                if (existsAxeWood) {

                    const restLifeCraft = restRandomLife(lifeAxeWood);
    
                    dispatch({
                        type: "REST CRAFT LIFE",
                        payload: {
                            craft: "axe_wood",
                            life: lifeAxeWood - restLifeCraft
                        }
                    })
                    dispatch({
                        type: "ADD NOTIFY",
                        payload: {
                            message: `${language_gotted.survivalGameNames.axe_wood}: - ${restLifeCraft} ${language_gotted.survivalGameSides.life}!`
                        }
                    })
                    dispatch({
                        type: "ADD NOTIFY",
                        payload: {
                            message: `${language_gotted.survivalGameNames.axe_wood}: + ${axe_plus_stone} ${language_gotted.survivalGameSides.plus_stone}!`
                        }
                    })
    
                    totalWood += axe_plus_wood;
                }
            }

            dispatch({
                type: "ADD ITEM",
                payload: {
                    item: "wood",
                    amount: totalWood
                }
            })
            dispatch({
                type: "ADD NOTIFY",
                payload: {
                    message: `+ ${woodAmount} ${language_gotted.survivalGameSides.plus_wood}!`
                }
            })
        } else if (type === "rock") {

            let totalStone = stoneAmount;

            const {exist: existsPickaxe, life: lifePickaxe} = existsCraft(state.crafts, "pickaxe");

            if (existsPickaxe) {

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
                        message: `Pico: - ${restLifeCraft} ${language_gotted.survivalGameSides.life}!`
                    }
                })
                dispatch({
                    type: "ADD NOTIFY",
                    payload: {
                        message: `Pico: + ${pickaxe_plus_amount} ${language_gotted.survivalGameSides.plus_stone}!`
                    }
                })

                totalStone += pickaxe_plus_amount;
            }

            dispatch({
                type: "ADD NOTIFY",
                payload: {
                    message: `+ ${stoneAmount} ${language_gotted.survivalGameSides.plus_stone}!`
                }
            })
            dispatch({
                type: "ADD ITEM",
                payload: {
                    item: "stone",
                    amount:  totalStone
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

    const handleClickAnmKill = async (id) => {

        dispatch({
            type: "HANDLE BTNS"
        })
 
		if (Object.keys(state.anm).length > 0) {

            const {exist: existKnife, life: lifeKnife, name: nameKnife} = existsCraft(state.crafts, "knife");
            const {exist: existKnifeWood, life: lifeKnifeWood, name: nameKnifeWood} = existsCraft(state.crafts, "knife_wood");

            if (existKnife) {
                hitAnm(state.anm, knife_damage, lifeKnife, nameKnife);
            } else if (existKnifeWood) {
                hitAnm(state.anm, knife_wood_damage, lifeKnifeWood, nameKnifeWood);
            } else {
                hitAnm(state.anm, fist_damage, 0);
            }

            document.getElementById(`anm-container-${id}`).classList.toggle("active")
            await new Promise(r => setTimeout(r, 3000));
            try {
                document.getElementById(`anm-container-${id}`).classList.toggle("active")
            } catch (e) {};

			return;
		}

		dispatch({
			type: "ADD NOTIFY",
			payload: {
				message: [language_gotted.survivalGameSides.no_anm]
			} 
		})

	}

        // max top 78%
        // max left 100%
    const makeTree = (id, x, y) => <img key={id} onClick={(e) => handleClickDel(e, "tree", id)} id={"tree-" + id} style={{[side]: x + "%", top: y + "%", transform: `translate(${side === "left" ? `-${x}%` : `${x}%`}, -${y}%)`}} src={`/survival/tree_${side}.png`} alt="tree"></img>;
    
        // max top 84%
        // max right 100%
    const makeRock = (id, x, y) => <img key={id} onClick={(e) => handleClickDel(e, "rock", id)} id={"rock-" + id} style={{[side]: x + "%", top: y + "%", transform: `translate(${side === "left" ? `-${x}%` : `${x}%`}, -${y}%)`}} src={`/survival/rock_${side}.png`} alt="tree"></img>;

    const makeAnm = ({id, pos_x, pos_y, name, life, totalLife}) => <div onClick={() => handleClickAnmKill(id)} className="anm-container" id={"anm-container-" + id} style={{[side]: pos_x + "%", top: pos_y + "%", transform: `translate(${side === "left" ? `-${pos_x}%` : `${pos_x}%`}, -${pos_y}%)`}}>
        <progress value={life} max={totalLife}></progress>
        <img key={id} src={`/survival/${name}.png`} alt={name}></img>
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