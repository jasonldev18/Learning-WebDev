// Get the input box element by its ID 'inputBox'
let input = document.getElementById('inputBox');
// Get all <button> elements on the page
let buttons = document.querySelectorAll('button');

// Create an empty string to build up the input (e.g., 1+2)
let string = "";
let lastOperator = "";
let lastOperand = "";
let result = "";
// Whether "=" was just pressed
let justEvaluated = false;

// Convert the NodeList of buttons into a real array so we can use array methods like forEach
let arr = Array.from(buttons);

// For each button in the array...
arr.forEach(button => {
    // Add a click event listener to that button
    button.addEventListener('click', (e) =>{
    // If the button clicked has the "=" sign...
    let value = e.target.innerHTML;

    if (value === 'AC') {
      string = "";
      input.value = "";
      result = "";
      lastOperator = "";
      lastOperand = "";
      justEvaluated = false;
    }

    else if (value === 'DEL') {
      string = string.slice(0, -1);
      input.value = string;
    }

    else if (value === '=') {
      // If we just evaluated, repeat the last operation
      if (justEvaluated && lastOperator && lastOperand) {
        string = result + lastOperator + lastOperand;
      }

      result = eval(string);       // Calculate the answer
      input.value = result;        // Show it
      justEvaluated = true;        // Mark that = was pressed
    }

    else if (['+', '-', '*', '/'].includes(value)) {
      // If there's already a math operation in string, calculate it now
      if (/[+\-*/]/.test(string)) {
        result = eval(string);
        input.value = result;
        string = result.toString();  // Update string to result
      }

      string += value;             // Add new operator
      lastOperator = value;        // Save operator
      justEvaluated = false;
    }

    else {
      if (justEvaluated) {
        string = "";               // Start fresh if user types after "="
        justEvaluated = false;
      }

      string += value;
      input.value = string;

      // Try to save the last number typed (for repeat =)
      if (lastOperator) {
        let parts = string.split(lastOperator);
        lastOperand = parts[1];   // Save number after the operator
      }
    }
  });
});