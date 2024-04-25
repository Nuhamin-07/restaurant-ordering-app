import {menuArray} from './data.js'

const header = document.getElementById("header")
const main = document.getElementById("main")
const section = document.getElementById("section")
const sectionTwo = document.getElementById("section-two")
const totalPrice = document.getElementById("total-price")
const totalSum = document.getElementById("total-sum")
const detailOrder = document.getElementById("detail-order")
const orderdFood = document.getElementById("orderd-food")
const completeOrderButton = document.getElementById("complete-order-button")
const form = document.getElementById("form")
const formName = document.getElementById("form-name")
const payButton = document.getElementById("pay-button")
const orderConfirmation = document.getElementById("order-confirmation")
const confirm = document.getElementById("confirm")


let totalArr = []
let price = 0
let food = ""

document.addEventListener("click", orderFoods)
document.addEventListener("click", removeOrder)

completeOrderButton.addEventListener("click", () => {
    form.style.display = "block"
})

payButton.addEventListener("click", (e) => {
    form.style.display = "none"
    detailOrder.style.display = "none"
    orderConfirmation.style.display = "block"
    confirm.innerHTML = `Thanks, ${formName.value}! Your order is on its way!`
    e.preventDefault()
    totalArr = []
    food = ""
    orderdFood.innerHTML = ""
})

document.addEventListener("mouseup", (e) => {
    if (!form.contains(e.target)) {
        form.style.display = 'none';
    }
})

function orderFoods(e) {
    food = ""
    const foodItems = menuArray.filter(menu => {
        return menu.id == e.target.dataset.order
    })[0]
    if(e.target.dataset.order) {
        completeOrderButton.disabled = false
        if(!totalArr.includes(foodItems)) {
            totalArr.push(foodItems)
            handleOrder(foodItems)
        }
        e.preventDefault()
        orderConfirmation.style.display = "none"
    }
    totalPrice.style.display = "flex"
    totalPrice.style.justifyContent = "space-between"
    totalPrice.style.margin = "10px 20px"
}

function handleOrder(foodItems) {
    food = ""
     totalArr.map(arr => {
                food = `<div id="food-container">
                <div id="individual-order">
                    <p id="food-name">${arr.name}</p>
                    <button id="remove-btn" data-remove=${arr.id}>remove X</button>
                </div>
                <p id="food-price">$${arr.price}</p>
                </div>`
        })
    orderdFood.innerHTML += food
    detailOrder.style.display = "block"
    price = totalArr.reduce((total, current) => {
        return total + current.price
    }, 0)
    totalSum.textContent = `$${price}`
}

function removeOrder(e) {
    totalArr = totalArr.filter(arr => {
        return arr.id != e.target.dataset.remove
    })
    if(e.target.dataset.remove) {
        renderElement()
        e.preventDefault()
        if(totalArr.length === 0) {
            completeOrderButton.disabled = true
        }
    }
     price = totalArr.reduce((total, current) => {
        return total + current.price
    }, 0)
    totalSum.textContent = `$${price}`
}

function renderElement() {
    food = ""
    totalArr.map(arr => {
                food += `<div id="food-container">
                <div id="individual-order">
                    <p id="food-name">${arr.name}</p>
                    <button id="remove-btn" data-remove=${arr.id}>remove X</button>
                </div>
                <p id="food-price">$${arr.price}</p>
                </div>`
        })
        orderdFood.innerHTML = food
}

function getOrder() {
    let orders = ""
    menuArray.map(arr => {
         orders += `
        <div id="order-container">
            <div id="sub-container">
                <p id="emoji">${arr.emoji}</p>
                <div id="content">
                    <h3>${arr.name}</h3>
                    <p>${arr.ingredients.join(', ')}</p>
                    <p id="price">$${arr.price}</p>
                </div>
            </div>
                <button id="button" data-order=${arr.id}>+</button>
        </div>`
    })
    section.innerHTML = orders
}

getOrder()