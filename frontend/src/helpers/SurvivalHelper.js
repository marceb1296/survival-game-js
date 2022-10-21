export const existsItem = (items, item) => items.filter(el => el.name === item).length > 0 ? items.filter(el => el.name === item)[0] : {name: item, amount: 0};

export const existsCraft = (items, item) => items.filter(el => el.name === item).length > 0 ? {exist: true, ...items.filter(el => el.name === item)[0]} : {exist: false};

export const materialNeeded = (item, amountMaterial) => {
    const { name, amount } = item;

    return [(amountMaterial - amount), name]
}

export const restRandomLife = (life) => life < 10 ? Math.floor((Math.random() * (life * 3)) + 1) : Math.floor((Math.random() * life) + 1);
