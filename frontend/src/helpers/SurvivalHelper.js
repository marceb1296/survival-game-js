export const existsItem = (items, item) => items.filter(el => el.name === item).length > 0 ? items.filter(el => el.name === item)[0] : {name: item, amount: 0};

export const existsCraft = (items, item) => items.filter(el => el.name === item).length > 0 ? 1 : 0;

export const materialNeeded = (item, amountMaterial) => {
    const { name, amount } = item;

    return `Necesitas ${amountMaterial - amount} de ${name}!`
}

