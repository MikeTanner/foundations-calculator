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

function buttonClick(e) {
    //console.log(this.id);
    //console.log(this.classList[1]);

    clickData = [this.id,this.classList[1]]
    if (clickData[1] =="orange") {
        orange(clickData[0])
    }
    if (clickData[1] =="blue") {
        blue(clickData[0])
    }
    if (clickData[1]=="green") {
        green(clickData[0])
    }
    e.stopPropagation();
    checkState();    
    console.table(state,operator,a,b,storedAns)
        //displayLogic(this) 
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
function orange(id) {
    if (id == "=" && state > 2) {
        solveFactory(id);
        state = 0;
        operator = id;
        a = storedAns;
        storedAns = null;
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
function blue(id) {
    if (id == "C") {
        restart();
    }
}
function green(id) {
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
    a = `${operate(parseInt(a),parseInt(b),operator)}`;
    storedAns =a;
    console.log(a);
    b = null;
    loopCount +=1
    if (id == "=") {
        operator = "";
    }
}

function display(str) {
    const disContainer = document.querySelector(".display")
    disContainer.textContent = str;
}
function add(a, b) {
    return a+b;
}
function subtract(a, b) {
    return a-b;
}
function multiply(a, b) {
    return a-b;
}
function divide(a,b) {
    return a-b;
}
function operate(a,b, operator) {
    const operations ={
        "+": add(a, b),
        "-": subtract(a, b),
        "*": multiply(a, b),
        "/": divide(a, b),
    }
    console.log(operations[operator])
    return operations[operator];
    //accepts operator and 2 numbers
}
