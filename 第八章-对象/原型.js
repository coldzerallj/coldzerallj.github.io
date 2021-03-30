// 原型
// 创建函数时，为函数创建一个prototype属性（原型对象），所有原型对象自动获得一个constructor（构造器）的属性（构造函数）
// 调用构造函数时创建一个实例对象，实例内部的[[prototype]]的指针被赋值为构造函数的原型对象(浅拷贝)，浏览器通过__proto__暴露这个属性
// 实例与构造函数的原型有关、与构造函数无关
// function A (){};
// A.prototype.b = function(){
//   console.log('b')
// }
// let aa = new A();
// A.prototype.b()
// aa.b();
// console.log('--------修改-------')
// aa.__proto__.b = function(){
//   console.log('aaa')
// }
// aa.b();
// A.prototype.b()
// 所有对象最上层原型是Object()的原型，找属性先从实例找，然后到最底层原型开始找到最顶层原型
// hasOwnProperty() 判断属性是否来自实例
// in操作符 判断是否有属性包括来自实例和原型
// hasPrototypeProperty() 判断属性是否来自原型

// for-in循环、Object.keys()、Object.getOwnPropertyNames()、Object.getOwnProperty- Symbols()以及Object.assign()在属性枚举顺序方面有很大区别。
// for-in循环和Object.keys()的枚举顺序是不确定的，取决于JavaScript引擎，可能因浏览器而异。
// Object.getOwnPropertyNames()、Object.getOwnPropertySymbols()和Object.assign()的枚举顺序是确定性的。（按枚举数值键）