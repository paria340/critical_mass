import "./styles.css";
import menu from "./menu";

const menuItems = menu.items;

menuItems.sort((a, b) => {
    return a.menuOrder - b.menuOrder
})

const result = [...menuItems.reduce((r, { name, description, type, price, spicy, menuOrder }) => {
    r.has(type) || r.set(type, {
        type,
      items: []
    });
    
    r.get(type).items.push({ name, description, type, price, spicy, menuOrder });
    
    return r;
}, new Map).values()];
    
function render(item){
  item.forEach(element => {
  const divID = document.getElementById(element.type);
  const ul = document.createElement('ul')
  if(divID){
    element.items.forEach(food => {

        const li = document.createElement('li')
        const nestedP = document.createElement('p')

        nestedP.append(food.description)
        // li.append(nestedLi)

        let price = food.price
        let rounded = parseFloat(price).toFixed(2)

        li.append(food.name, " ", "$", rounded)
        li.appendChild(nestedP)
        ul.append(li)
        divID.appendChild(ul)

      if(food.spicy == true){
        li.append(food.name, li.classList.add('spicy'), " ", "$", rounded)
        ul.append(li)
        divID.appendChild(ul)
      }

      
    });
  }else{
    console.log("Cannot find it"); 
  }
});

}
render(result)
console.log(menuItems);
console.log(result);
export default result;

