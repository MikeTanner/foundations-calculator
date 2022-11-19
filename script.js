//initilize the html/css space
//create button array for class and button text
const buttonArray = ["C","+/-","%","/", "7","8","9","*","4", "5","6","-","1","2","3","+","NO", "0",".","="];
const container = document.querySelector(".container");
for (let i = 0; i < 20; i++) {
   const calcButton = document.createElement("div")
   calcButton.classList.add("button")
   calcButton.id = (buttonArray[i]);
   if ((i+1)%4 ==0) {
    calcButton.classList.add("orange")
   }
   else if (i<3) {
    calcButton.classList.add("blue")
   }
   else {
    calcButton.classList.add("green")
   }
   calcButton.textContent = buttonArray[i]
   container.appendChild(calcButton);
}

//when button clicked, make border silver and bigger
const buttonAll = document.querySelectorAll(".button")
buttonAll.forEach(button => button.addEventListener("click", buttonClick));
buttonAll.forEach(button =>button.addEventListener("transitionend", removeTransition))
function buttonClick(e) {
    //console.log(this.id);
    //console.log(this.classList[1]);

    clickData = [this.id,this.classList[1]]
    if (clickData[1] =="orange") {
        orange(clickData[0], this)
    }
    if (clickData[1] =="blue") {
        blue(clickData[0],this)
    }
    if (clickData[1]=="green") {
        green(clickData[0],this)
    }
    e.stopPropagation();
    checkState();
    display();    
    console.table(state,operator,a,b,storedAns)
        //displayLogic(this) 
}
function removeTransition(e) {
    this.classList.remove("click")
}
//logic time
function checkState() {
    if (a==0&b==null&operator =="") {
        state = 0;
        return;
    }
    else if (b==null& operator =="" & (storedAns== null || state <1)) {
        state =1;
        return;
    }
    else if (b==null & operator != "" && (state <2)) {
        state = 2;
        return
    }
    else if (b!= null & operator != "" &&(state <3)) { // determining value of b
        state = 3;
        return;
    }
/*     else if (b==null & operator == "" &loopCount>0 & state != 2) { //solved using equals button
        state = 1;
    }
    else if (b== null & operator != "" & loopCount>0 & state !=3) { //solved and chaining solves
        state =3;
        return
    }
    else if (state ==4 ||state ==5 && b!= null) { // back to state 3 after using yellow buttons
        state = 3;
    } */
}
function orange(id, button) {
    button.classList.add("click")
    if (id == "=" && state > 2) {
        solveFactory(id);
        state = 0;
        //operator = id;
        a = storedAns;
        //storedAns = null;
        return;
    }
    switch (state) {
        case 0:
        case 1:
        case 2:
            operator = id;
            break;
        
       /*  case 2:
            //solve, must reset a,b after each solve
            operator = id; //sets operator to new id that caused the solve
            break
 */     case 3:
            solveFactory(id);
            state = 0;
            operator = id;
            a = storedAns;
            storedAns = null;
            break;
        default:
            break;
    }
}
function blue(id,button) {
    button.classList.add("click")

    if (id == "C") {
        restart();
    }
    if (id == "+/-") {
        if (state <3) {
            a *= (-1)
        }
        else {
            b *= (-1)
        }
    }
}
function green(id,button) {
    if (button.id == ".") {
        if (state == 0) {
            a = "0."
        }
        if (isDecimal) {
            return;
        }
        else {
            isDecimal = true;
        }
    }
    button.classList.add("click")
    switch(state) {
        case 0:
            a = id;
            break;
        case 1:
            if (storedAns != null ) {
                a = id;
                storedAns = null;
            }
            else {
                a = `${a}`+`${id}`
            }
            //console.log(a);
            break;
        case 2:
/*             if (loopCount > 0) {
                a = id;
                storedAns = null;
                break;
            } */
            b = id
            break;
        case 3: {
            if (storedAns != null) {
                restart()
                a = id;
            }
            else {
                b = `${b}`+`${id}`
            }

/*                 if (b!= null) {
                    b = `${b}`+`${id}`
                }
                else {
                    b = id
                } */
                
            }
            break;
        case 4: {
            a = id;
            break;
        }
            
    }       
}
var isDecimal = false;
var loopCount = 0;
var displayValue = 0;
var state = 0;

var storedAns = null;
var a = 0;
var b = null;
var operator = "";
function restart() {
     displayValue = 0;
     state = 0;
     a = 0;
     b = null;
     operator = "";
     storedAns = null;
}

function solveFactory(id) {
    //solve and set variables    
    a = `${operate(parseFloat(a),parseFloat(b),operator)}`;
    storedAns =a;
    console.log(a);
    b = null;
    if (a.includes(".")) {
        isDecimal = true;
    }
    else {
        isDecimal = false;
    }
    loopCount +=1
    if (id == "=") {
        operator = "";
    }
}

function roundNumber(a){
    return Math.round(a *10)/10;
}
function display() {
    const disContainer = document.querySelector(".display")
    if (a== ".") {
        displayA = "0."
    }
    else {
        displayA = roundNumber(a)
    }
    if (b == ".") {
        displayB = "0."
    }
    else {
        displayB = roundNumber(b)
    }

    if (state < 3) {
        disContainer.textContent=displayA;
    }
    else {
        disContainer.textContent=displayB;
    }

    
}
function add(a, b) {
    return a+b;
}
function subtract(a, b) {
    return a-b;
}
function multiply(a, b) {
    return a*b;
}
function divide(a,b) {
    if (b==0) {
        console.log("Test");
        
        restart();
        return 0;
    }
    return a/b;
}
function operate(a,b, operator) {
    const operations ={
        "+": add(a, b),
        "-": subtract(a, b),
        "*": multiply(a, b),
        "/": divide(a, b),
    }
    return operations[operator];
    //accepts operator and 2 numbers
}
