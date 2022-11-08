/**
 * cards.js
 * 
 * Everything related to the card management will be done here. 
 * All the arrays, event listeners and functions shall be created here as long as 
 * they are realted to the the card management.
 * 
 * @author Practical IT
 * @author [Add your name here]
 */
 let cards = {
    wallia: {
      title: 'Wallia',
      price:  25,
      minutes: 130,
      refillable: true
    },
    chellada: {
      title: 'Chellada',
      price:  20,
      minutes: 120,
      refillable: true
    },
    kebero: {
      title: 'Key Kebero',
      price:  10,
      minutes: 100,
      refillable: false
    }
  };
  
  let checkout = []; //array for checkedout cards.
  let purchased = []; //array for the purchased cards
  let email_subscribers = []; //array for the subscribers
  let members = []; //array for the members
  
  const buy_chellada_card = document.querySelector('#chellada');
  const buy_wallia_card = document.querySelector('#wallia');
  const buy_kebero_card = document.querySelector('#kebero');
  
  const checkout_list = document.querySelector('#checkout_list');
  
  const updateCheckout = () => {
    let isUpdated = false;
    //create a list to be shown on the checkout list.
    let checkout_table = "";
    let gTotal=0
    if (checkout.length > 0) {
      checkout.forEach( card => {
        if(document.body.querySelector(#${card.type}_td_type) === null){
          let  total = parseInt(cards[card.type].price)*parseInt(card.quantity);
          checkout_table += `<tr>
          <td id="${card.type}_td_type">${card.type}</td>
          <td id="${card.type}_td_quantity">${card.quantity}</td>
          <td id="${card.type}_td_price">${cards[card.type].price}</td>
          <td id="${card.type}_td_total">${total}</td>
        </tr>`;
        
        checkout_list.innerHTML = checkout_table + <td>total</td>;
        }
        
          else { 
            if(!isUpdated) {
            let prevTotal=  +document.getElementById(card.type+"_td_total").innerHTML;
            // console.log("prevTotal",prevTotal)
             let total = prevTotal + parseInt(cards[card.type].price)*parseInt(card.quantity);
            // console.log("total",total)
  
            document.getElementById(card.type+"_td_total").innerHTML = total
            isUpdated = true
            }
            
          }
         
       
  
      });
    
    }
  }
  
  const chellada_quantity = document.querySelector('#chellada_quantity');
  
  //initially the buttons are disabled. They will be back to active when the user selects quantity.
  const quantitySelected = (event) => {
    //get the type of the card from the id itself
  
    let card_type = event.target.id.split('_')[0];//gives the "type_quantity" as an id
    document.querySelector(#${card_type}).disabled = true;
  
    const quantity = event.target.value;
    if (quantity) { //meaning the user has seleted the quantity of the card to be purchased.
  
      //now the user has selected the quantity, activate the button.
      console.log(document.querySelector(#${card_type}));
      document.querySelector(#${card_type}).disabled = false;
    }
  }
  chellada_quantity.addEventListener('change', (event) => quantitySelected(event));
  
  //purchased object example {type: 'chellada', quantity: 2 }
  
  const addToCheckout = (type) => {
    console.log(this);
    //get valid card types
    let valid_types = Object.keys(cards);
    if (valid_types.includes(type)) {
      //create the object for checkout here.
      let checkout_card = {type: type, quantity: 1};
      checkout.push(checkout_card);
      updateCheckout();
    }
  }
  buy_chellada_card.addEventListener('click', () => addToCheckout('chellada'));
  buy_wallia_card.addEventListener('click', () => addToCheckout('wallia'));