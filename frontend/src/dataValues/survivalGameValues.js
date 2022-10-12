// Random function
const randomItem = (list) => list[~~(Math.random() * list.length)]; 
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

// Obtained materials 
export const woodAmount = 3;
export const stoneAmount = 2;

// Tools n | [n, n] => wood / stone 
// axe
export const axe_plus_wood = 2;
export const axe_wood_life = 100;
export const build_axe_wood = 30;
// axe stone
export const axe_plus_stone = 4;
export const axe_stone_life = 100;
export const build_axe_stone = [25, 15];
// pickaxe only stone
export const pickaxe_plus_amount = 3;
export const pickaxe_stone_life = 100;
export const build_pickaxe_stone = [25, 25];
// knife
export const knife_damage = 30;
export const build_knife = [10, 30];
// knife wood
export const knife_wood_damage = 10;
export const build_knife_wood = 35;
// armors n | [n, n] | [n, n, n] => wood / leather / rope
// upper armor
export const shield_upper_body_armor = 75;
export const build_upper_body_armor_cost = [15, 50, 20];
// lower armor
export const shield_greaves_leg_armor = 25;
export const build_greaves_leg_armor_cost = [10, 25, 10];

// animals
export const get_anm = () => randomItem(["ox", "wild_pig", "wolf"]);
export const animals = {
    ox: {
        "life": 120, 
        "damage": 3, 
        "leather": 10,
        "meat": 5,
        "rope": 5 
    },
    wild_pig: {
        "life": 80, 
        "damage": 5, 
        "leather": 8,
        "meat": 3,
        "rope": 3 
    },
    wolf: {
        "life": 90, 
        "damage": 10, 
        "leather": 5,
        "meat": 1,
        "rope": 2 
    }
};

// Not implemented
export const archer = 0;
export const build_archer = [50, 10, 30];
        
export const special_arrows = 0;
export const special_arrows_damage = 80;
// fist damage
export const fist_damage = 5;
// bonfire
export const bonfire_build = [10, 10];

// Probabilitys
export const probability_get_from_anm = () => randomItem([0, 1]);
export const probability_eat_damage = () => randomItem([0, 1, 0]);
export const probability_anm = () => randomItem([1, 1, 1, 1, 1]);
export const probability_cottage = () => randomItem([0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
export const probability_tree = () => randomItem([2, 2, 1, 2, 2, 2, 2, 2, 1, 2]);
export const probability_rock = () => randomItem([2, 2, 2, 2, 2, 1, 2, 2, 2, 1]);
// food eated
export const food_cooked_meat = 20;
export const food_meat = 5;
export const probability_rotten_food = () => randomItem([0, 1])
export const rest_life_by_rotten_food = () =>  Math.floor((Math.random() * 25) + 1);
