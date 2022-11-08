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
  let minutes_table = 0;
  let gTotal=0
  if (checkout.length > 0) {
    checkout.forEach( card => {
      if(document.body.querySelector(`#${card.type}_td_type`) === null){
        let  total = parseInt(cards[card.type].price)*parseInt(card.quantity);
        let minutes = parseInt(cards[card.type].minutes) * parseInt(card.quantity);
        checkout_table += `<tr>
        <td id="${card.type}_td_type">${card.type}</td>
        <td id="${card.type}_td_quantity">${card.quantity}</td>
        <td id="${card.type}_td_price">${cards[card.type].price}</td>
        <td id="${card.type}_td_total">${total}</td>
      </tr>`;
      checkout_list.innerHTML = checkout_table + `<tr> <th id="${card.type}_td_gTotal">Grand Total${gTotal}</th> </tr>`;
      
      minutes_table += parseInt(minutes);
      `<tr>
    <td>${minutes}</td>
 </tr>`
 minutes_list.innerHTML = minutes_table;

    }
      
        else { 
          if(!isUpdated) {
          let prevTotal=  +document.getElementById(card.type+"_td_total").innerHTML;
          // console.log("prevTotal",prevTotal)
           let total = prevTotal + parseInt(cards[card.type].price)*parseInt(card.quantity);
          // console.log("total",total)
          document.getElementById(card.type+"_td_total").innerHTML = total

          // let prevQuantity = parseInt(document.getElementById(card.type+"_td_quantity").innerHTML)
          // card.quantity = prevQuantity + parseInt(card.quantity);
          document.getElementById(card.type+"_td_quantity").innerHTML = +document.getElementById(card.type+"_td_quantity").innerHTML + parseInt(card.quantity);

          gTotal = total + total
          document.getElementById(card.type+"_td_gTotal").innerHTML = total  
          isUpdated = true
          }
          
        }
       
     

    });
  
  }
}

const chellada_quantity = document.querySelector('#chellada_quantity');
const walia_quantity = document.querySelector('#walia_quantity');
const kebero_quantity = document.querySelector('#kebero_quantity');


//initially the buttons are disabled. They will be back to active when the user selects quantity.
const quantitySelected = (event) => {
  //get the type of the card from the id itself

  let card_type = event.target.id.split('_')[0];//gives the "type_quantity" as an id
  document.querySelector(`#${card_type}`).disabled = true;

  const quantity = event.target.value;
  if (quantity) { //meaning the user has seleted the quantity of the card to be purchased.

    //now the user has selected the quantity, activate the button.
    console.log(document.querySelector(`#${card_type}`));
    document.querySelector(`#${card_type}`).disabled = false;
  }
}
chellada_quantity.addEventListener('change', (event) => quantitySelected(event));
walia_quantity.addEventListener('change', (event) => quantitySelected(event));
kebero_quantity.addEventListener('change', (event) => quantitySelected(event));

//purchased object example {type: 'chellada', quantity: 2 }
const addToCheckout = (type) => {
  console.log(this);
  //get valid card types
  let valid_types = Object.keys(cards);
  if (valid_types.includes(type)) {
    //create the object for checkout here.
    let checkout_card = {type: type, quantity: quantitySelected.quantity};
    checkout.push(checkout_card);
    updateCheckout();
  }
}


buy_chellada_card.addEventListener('click', () => addToCheckout('chellada'));
buy_wallia_card.addEventListener('click', () => addToCheckout('wallia'));
buy_kebero_card.addEventListener('click', () => addToCheckout('kebero'));



//member Registration 
const registerMember = () => {
  let first_name = document.getElementById('first_name').value;
  let last_name = document.getElementById('last_name').value;
  let email = document.getElementById('email').value;
  let phone = document.getElementById('phone').value;
  let email_regex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //email validation
  let phone_regex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/; //phone validation 
  let message = document.getElementById('reg_mesg'); //check and congrat message

  if(!(first_name && last_name && email && phone))
  {
    message.style.color = "red";
    message.innerHTML = "Please fill out all sections";
  } 
    else if (!email.match(email_regex)) 
    {
      message.style.color = "red";
      message.innerHTML = "Please Correct the email"; 
      // document.getElementById('email').style.borderColor = "red"
    }
    
      else if (!phone.match(phone_regex))
     {
  message.style.color = "red";
  message.innerHTML = "Please Correct the phone";
  // document.getElementById('phone').style.borderColor = "red"
  }
  else
  {
    let newMember = {first_name, last_name, email, phone};
    members.push(newMember);
    document.getElementById('email').style.borderColor = ""
    document.getElementById('phone').style.borderColor = ""

    message.style.color = "green";
    message.innerHTML = "<h3>Congratulations</h3></br>Thank you for being a part of our PRACARD family.";
    document.getElementById('member_reg').reset();

  }
  }
//Subscribe
const emailSubscribe = () => {
  let subscribe_email = document.getElementById('email_sub').value;
  let email_regex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //email validation
  let message = document.getElementById('subscribe')
  if (!subscribe_email.match(email_regex)) {
    message.style.color = "red";
    message.innerHTML = "Please Correct the email"; 
    document.getElementById('email_sub').style.borderColor = "red"
  }
  else {
    let newSub = {subscribe_email};
    email_subscribers.push(newSub);
    document.getElementById('email_sub').style.borderColor = ""
    message.style.color = "green";
    message.innerHTML = "You have successfully subscribed to PRACARD Tips and Tricks"; 
    document.getElementById('email_form').reset();
    
  }
}
let cartnumber = +document.querySelector('#cart-num').textContent
console.log(cartnumber)


