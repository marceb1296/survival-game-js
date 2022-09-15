// Game init
export const healt = 100;
export const hungry = 100;
export const shield = 0;
/*
// lang
export const lang_game = lang.get("game")
export const lang_materials = lang.get("materials")
export const lang_animals = lang.get("animals")
export const lang_cottage = lang.get("cottage")
export const lang_tools = lang.get("tools")
export const lang_not_enough = lang.get("not_enough")
export const lang_tools_state = lang.get("tools_state")
*/
// materials
export const wood = 0;
export const stone = 0;
export const meat = 0
export const meat_cooked = 0
export const picklock = 0
// Obtained materials 
export const woodAmount = 3;
export const stoneAmount = 2;
export const woodAmount_axe = 2;
export const woodAmount_axe_stone = 2;
export const stoneAmount_pickaxe = 4;

// Tools n | [n, n] => wood / stone 
// axe
export const axe_wood = 0;
export const axe_wood_life = 100;
export const build_axe_wood = 30;
// axe stone
export const axe_stone = 0;
export const axe_stone_life = 100;
export const build_axe_stone = [25, 15];
// pickaxe only stone
export const pickaxe_stone = 0;
export const pickaxe_stone_life = 100;
export const build_pickaxe_stone = [25, 25];
// knife
export const knife = 0;
export const knife_life = 100;
export const knife_damage = 30;
export const build_knife = [10, 30];
// knife wood
export const knife_wood = 0;
export const knife_wood_life = 100;
export const knife_wood_damage = 10;
export const build_knife_wood = 35;
// build materials 
export const leather = 0;
export const rope = 0;
// armors n | [n, n] | [n, n, n] => wood / leather / rope
// upper armor
export const shirtfront = 0;
export const shield_shirtfront = 75;
export const build_shirtfront_cost = [15, 50, 20];
// lower armor
export const kneepads = 0;
export const shield_kneepads = 25;
export const build_kneepads_cost = [10, 25, 10];

// animals
export const anm_show = 0;
export const animals = {
    "life": [120, 80, 90], 
    "damage": [3, 5, 10], 
    "leather": [10, 8, 5], 
    "meat": [5, 3, 1], 
    "rope": [5, 3, 2]
};
export const kill_anm_life = 0;
export const kill_anm_damage = 0;
export const animal_choice = [0, 1, 2];
// animal rewards
export const kill_anm_leather = 0;
export const kill_anm_meat = 0;
export const kill_anm_rope = 0;

// Not implemented
export const archer = 0;
export const build_archer = [50, 10, 30];
        
export const special_arrows = 0;
export const special_arrows_damage = 80;
// fist damage
export const fist_damage = 5;
// game state
export const state = false;
// bonfire
export const campfire_state = false;
// cottage
export const cottage_show = 0;
export const state_cottage = false;
// Probabilitys
export const probability_get_from_anm = [0, 1];
export const probability_eat_damage = [0, 1, 0];
export const probability_anm = [0, 1, 0, 0, 0];
export const probability_cabaña = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
export const probability_tree = [0, 0, 1, 0, 0, 2, 0, 0, 1, 0];
export const probability_stone = [0, 0, 0, 0, 0, 1, 0, 0, 0, 1];

