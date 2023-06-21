import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-bb228-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList" )

const addCart = document.getElementById("add-button");
const inputFieldEl = document.getElementById("input-field")
const shoppingList = document.getElementById("shopping-list")


addCart.addEventListener("click",function(){
    let item = inputFieldEl.value
    push(shoppingListInDB, item);
    clearInputField();
    
})

onValue(shoppingListInDB, function(snapshot){

    if (snapshot.exists()){
        let listDB = Object.entries(snapshot.val());
        clearShoppingList();
        for(let i=0; i<listDB.length; i++){
            let shoppingItem = listDB[i]
            addToList(shoppingItem);
        }
    

    }else{
        shoppingList.innerHTML = "No items here... yet"
    }

    
})

function clearShoppingList(){
    shoppingList.innerHTML = "";
}


function clearInputField(){
    inputFieldEl.value = ""
}

function addToList(item){

    let itemID = item[0];
    let itemValue = item[1];
    let newEl = document.createElement("li")
    newEl.textContent = itemValue;

    newEl.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
        remove(exactLocationOfItemInDB);
    })

    shoppingList.append(newEl)
}