
function handleDecimal()
{
    if (equalsChosen==false)
    {
        if (operatorChosen==true && decimalInNumber==false)
        {
            if (savedNumber!=0)
            {
                handleContinuationOfOperators;
            }
            handleBooleanSwitches(false, null, null, true, true);
            screenNumber=0;
        }
        else if (decimalInNumber==false)
        {
                decimalInNumber=true;
                if (screenNumber==0)
                {
                    decimalFirst=true;
                }
                screenNumber+=".";
                document.getElementById('output').value=screenNumber;
        }
    }  
}
function handleBooleanSwitches(operator, equals, allow, decimal1st, decimalInNum) //Recieves boolean or null, changes the switch accordingly
{
    if (operator!=null)
    {
        operatorChosen=operator; //True if the last input was an operator
    }
    if (equals!=null)
    {
        equalsChosen=equals; //True if the last input was an '=' operator
    }
    if (allow!=null)
    {
        allowBackspace=allow; //True if you can use backspace button (Can't use it after equals)
    }
    if (decimal1st!=null)
    {
        decimalFirst=decimal1st; //True if the first input for a given number is "." (Allows user to type .0314....)
    }
    if (decimalInNum!=null)
    {
        decimalInNumber=decimalInNum; //True if a decimal number exists, prevents a number from having multiple decimals
    }
}
function handleClear() //Resets all values to default
{
    screenNumber=0;
    operator="";
    savedNumber=0;
    handleBooleanSwitches(false, false, false, false, false)

    document.getElementById('output').value=screenNumber;
}
function handleEqual() //Changes switches accordingly, calculates the output and displays it on the calculator
{
    if (savedNumber!=0 && operator!="")
    {
        handleBooleanSwitches(true, true, false, null, false)
        savedNumber=handleOperation(savedNumber, screenNumber, operator);
        document.getElementById('output').value=savedNumber;
    }
}
function handleBackspace() //Erases the last number or decimal inputted to the calculator
{
    if (allowBackspace==true)
    {
        let numberString=screenNumber.toString();
        numberString=numberString.slice(0, -1);
        screenNumber=parseFloat(numberString);
        document.getElementById('output').value=screenNumber;
    }
}
function handleOperation(num1,num2,operator) //Calculates num1 and num2 with the operator recieved by the function, returns the value
{
    if (operator=='+')
        return +num1 + +num2;
    else if (operator=='-')
        return num1-num2;
    else if (operator=="*")
        return num1*num2;
    else if (operator=="/" && num2==0) //Prevents calculator from crashing if user divides by 0
    {
        window.alert("Yeah, nah, don't divide by 0.");
        handleClear();
        return 0;
    }
    else
        return num1/num2;
        
}
function handleContinuationOfOperators() //Changes switches accordingly and calculates the number based on the saved numbers & operator
{
    if (savedNumber!=0 && operator!="")
    {

        handleBooleanSwitches(true, null, false, null, false);
        savedNumber=handleOperation(savedNumber, screenNumber, operator);
        document.getElementById('output').value=savedNumber;
    }
}

function notAnOperator(input) //Return true if input is not a basic operator
{
    return (input!="+" && input!='-' && input!='*' && input!='/')
}
function notANumber(input)
{
    if (notAnOperator(input))
    {
        if (input=='.')
            handleDecimal();
        else if (input=='all-clear')
            handleClear();
        else if (input=='=')
            handleEqual();
        else if (input=='backspace')
            handleBackspace();
    }
    else
    {
        if (operatorChosen==true) //An operator is already stored in memory
        {
            if (equalsChosen=true) //The operator is an equals sign
            {
                operator=input;
                equalsChosen=false;
            }
        }
        else if (savedNumber==0) //Case for the first operator being inputted in the calculator
        {
        operator=input;
        savedNumber=screenNumber;
        operatorChosen=true;
        decimalInNumber=false;
        }
        else
        {
            handleContinuationOfOperators(); //Calculates savedNumber and screenNumber with the last operator, doesn't change 'equalsChosen' to True to prevent errors
            operator=input;
        }
    }
}
function calculate(input)
{
    if (isNaN(input))
    {
        notANumber(input);
    }
    else
    {
        if (equalsChosen==true) //If equals is the last operator chosen, we need to wait for another operator before continuing calculations
        {

        }
        else
        {
            allowBackspace=true;
            if (operatorChosen==true)
            {
                operatorChosen=false;
                decimalInNumber=false;
                screenNumber=0;
            }
            if (screenNumber==0)
            {
                if (decimalFirst==true)
                {
                    screenNumber=input/10;
                    decimalFirst=false;
                }
                else
                {
                    if (operator=="-" && savedNumber==0)
                    {
                        screenNumber=input/-1;
                    }
                    else
                    {
                        screenNumber=input;
                    }
                }
                document.getElementById('output').value=screenNumber;
            }
            else
            {
                screenNumber+=input;
                document.getElementById('output').value=screenNumber;  
            }   
        } 
    }
}





let calculator = document.querySelector('.calculator');
let buttons = calculator.querySelectorAll('button'),
screenNumber=0,
savedNumber=0,
operator, 
operatorChosen=false, decimalInNumber=false, equalsChosen=false, allowBackspace=true, decimalFirst=false;
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        calculate(button.value);
    });
  });