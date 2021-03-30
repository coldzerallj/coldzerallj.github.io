// 工厂模式
// function createPerson(name,age,job){
//   let o = new Object;
//   o.name = name;
//   o.age = age;
//   o.job = job;
//   o.sayName = function(){
//     console.log(this.name)
//   }
//   return o
// }
// let person1 = createPerson("Nicholas", 29, "Software Engineer"); 
// let person2 = createPerson("Greg", 27, "Doctor"); 
// 问题：
// 生成的对象没有标识 constructor 都是Object

// 构造函数模式
// 首字母大写 调用方式不同 new
// this指向实例对象
// constructor构造器是构造函数 Person
// function Person(name, age, job){    
//   this.name = name;   
//   this.age = age;   
//   this.job = job;   
//   this.sayName = function() {     
//     console.log(this.name);   
//   }; 
// } 
// let person1 = new Person("Nicholas", 29, "Software Engineer"); 
// let person2 = new Person("Greg", 27, "Doctor"); 
// person1.sayName();  // Nicholas 
// person2.sayName();  // Greg
// 没有公用方法，反复创建方法

// 原型模式
// 通过prototype对象保存公共方法
// function Person(name, age, job){    
//   this.name = name;   
//   this.age = age;   
//   this.job = job;   
// } 
// Person.prototype.sayName = function() {     
//   console.log(this.name);   
// }; 
// let person1 = new Person("Nicholas", 29, "Software Engineer"); 
// let person2 = new Person("Greg", 27, "Doctor"); 
// person1.sayName();  // Nicholas 
// person2.sayName();  // Greg