// 对象 
// 创建 {} Object()
// 对象 属性的类型
// 数据属性
// [[Configurable]]：表示属性是否可以通过delete删除并重新定义，是否可以修改它的特性，以及是否可以把它改为访问器属性。默认情况下，所有直接定义在对象上的属性的这个特性都是true，如前面的例子所示。
// [[Enumerable]]：表示属性是否可以通过for-in循环返回。默认情况下，所有直接定义在对象上的属性的这个特性都是true，如前面的例子所示。
// [[Writable]]：表示属性的值是否可以被修改。默认情况下，所有直接定义在对象上的属性的这个特性都是true，如前面的例子所示。
// [[Value]]：包含属性实际的值。这就是前面提到的那个读取和写入属性值的位置。这个特性的默认值为undefined。

// 通过Object.defineProperty()修改这个方法接收3个参数：要给其添加属性的对象、属性的名称和一个描述符对象。最后一个参数，即描述符对象上的属性可以包含：configurable、enumerable、writable和value，跟相关特性的名称一一对应。
// let person = {};  
// Object.defineProperty(person, "name", {
//      writable: false,  
//      value: "Nicholas" 
// }); 
// console.log(person.name); // "Nicholas" 
// person.name = "Greg"; 
// console.log(person.name); // "Nicholas"
// 访问器属性
// [[Configurable]]：表示属性是否可以通过delete删除并重新定义，、是否可以修改它的特性，以及是否可以把它改为数据属性。默认情况下，所有直接定义在对象上的属性的这个特性都是true。
// [[Enumerable]]：表示属性是否可以通过for-in循环返回。默认情况下，所有直接定义在对象上的属性的这个特性都是true。
// [[Get]]：获取函数，在读取属性时调用。默认值为undefined。
// [[Set]]：设置函数，在写入属性时调用。默认值为undefined。
// 也是 通过Object.defineProperty()修改



// Object.getOwnPropertyDescriptor() Object.getOwnPropertyDescriptors()读取对象的属性

// Object.assign()合并对象
// 这个方法接收一个目标对象和一个或多个源对象作为参数，然后将每个源对象中可枚举（Object.propertyIsEnumerable()返回true）
// 和自有（Object.hasOwnProperty()返回true）属性复制到目标对象。以字符串和符号为键的属性会被复制。
// 对每个符合条件的属性，这个方法会使用源对象上的[[Get]]取得属性的值，然后使用目标对象上的[[Set]]设置属性的值。
// 修改目标对象（第一个参数对象），会覆盖重复属性，保留最后一个（因为是浅复制）


// 增强对象写法
// 1、同名简写
// let name = 'Matt';  
// let person = {   
//      name: name 
// }; 
// console.log(person); // { name: 'Matt' }

// ============等价===========

// let name = 'Matt';  
// let person = { 
//      name 
// }; 
// console.log(person); // { name: 'Matt' } 

// 2、动态属性名
// 中括号包着作为js表达式
// const nameKey = 'name'; 
// const ageKey = 'age'; 
// const jobKey = 'job'; 
// let person = {    
//      [nameKey]: 'Matt',   
//      [ageKey]: 27,   
//      [jobKey]: 'Software engineer' 
// }; 
// console.log(person); // { name: 'Matt', age: 27, job: 'Software engineer' }

// 3、简写方法名
// 对象内的方法
// let person = {    
//      sayName: function(name) {
//           console.log(`My name is ${name}`);   
//      } }; 
// person.sayName('Matt'); // My name is Matt 

// ================等价================

// let person = {  
//      sayName(name) {     
//           console.log(`My name is ${name}`);   
//      } }; 
// person.sayName('Matt'); // My name is Matt
