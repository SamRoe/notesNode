var square = (x) => x * x;

console.log(square(9));

var user = {
  name: 'Sam',
  sayHiAlt () {
    console.log(`Hi. I'm ${this.name}`);
  }
};
user.sayHiAlt();