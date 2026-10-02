
"use strict";
let person = {
    name: "John",
    age: 30
  };
  
  // Adding new properties using dot notation
  person.isEmployed = true;
  person.address = "123 Main St";
  person.greet = function() {
    return `Hello, my name is ${this.name}`;
  };
console.log(person);