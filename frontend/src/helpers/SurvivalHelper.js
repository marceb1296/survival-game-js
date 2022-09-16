export const existsMaterial = (items, item) => items.filter(el => Object.keys(el)[0] === item).length > 0 ? items.filter(el => Object.keys(el)[0] === item)[0] : {[item]: 0};//  ? Object.values(items.filter(el => Object.keys(el)[0] === item)[0])[0] : 0;

export const materialNeeded = (item, name, amount) => {
    const { [name]: material } = item;

    return `Necesitas ${amount - material} de ${name}`
}