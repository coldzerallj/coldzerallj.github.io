// // 1、原型链继承
// // 父类Super
// function Super() {
//   this.name = 'super';
// }
// // 父类原型 方法
// Super.prototype.getName = function(){
//   console.log(this.name);
// }
// // 子类
// function Sub(){
//   this.subName = 'sub';
// }
// // 子类继承父类
// Sub.prototype = new Super();
// // 子类原型 新增方法
// Sub.prototype.getSubName = function(){
//   console.log(this.subName)
// }
// // 创建实例
// let shili = new Sub();
// console.log(shili.name,shili.subName);
// shili.getName();
// shili.getSubName();
// // 构造器被父类Super的原型覆盖成Super
// console.log(shili.__proto__.constructor)

// 问题
// 原型链中的引用值被所有实例共享指针
// 子类的实例无法传值给父类
// 所以原型链继承无法单独使用

// call(),aplly()函数的两个改变this指向的方法，主要是传参不同，第一个参数都是this的对象，后面的传参call要一个一个传，aplly传的是arguments对象
// instanceof操作符和isPrototypeOf()经过的构造函数都会为true

// 2、盗用构造函数/对象伪装/经典继承
// 使用call()/apply()修改this指向，解决引用值继承共享指针和无法传参给父类的问题
// // 父类Super
// function Super(name) {
//   this.name = name;
//   this.arr = []
// }
// // 子类
// function Sub(name,age){ 
//   Super.call(this,name);
//   this.age = age;
// }
// // 创建实例
// let shili1 = new Sub('牛逼哥',123);
// let shili2 = new Sub('傻狗女',12);
// shili2.arr.push(1,2,3)
// console.log(shili1.name,shili1.age,shili1.arr);
// console.log(shili2.name,shili2.age,shili2.arr);
// 问题
// 公共方法要定义在构造函数中，每个实例都创建一个独立的方法
// 子类和子类的实例访问不到父类原型中定义的属性
// 所以也不能单独使用

// 3、组合继承
// 将1和2方法结合，公共方法定义在原型，属性定义在构造函数里
// 父类Super
// function Super(name) {
//   this.name = name;
//   this.arr = []
// }
// // 父类原型方法
// Super.prototype.getName = function(){
//   console.log(this.name);
// }
// // 子类
// function Sub(name,age){ 
//   Super.call(this,name);
//   this.age = age;
// }
// // 子类继承
// Sub.prototype = new Super();
// // 子类原型方法
// Sub.prototype.getAge = function(){
//   console.log(this.age);
// }
// // 创建实例
// let shili1 = new Sub('牛逼哥',123);
// let shili2 = new Sub('傻狗女',12);
// shili2.arr.push(1,2,3)
// shili1.getName();
// shili2.getName();
// shili1.getAge();
// shili2.getAge();
// console.log(shili1.name,shili1.age,shili1.arr);
// console.log(shili2.name,shili2.age,shili2.arr);

// 4、原型式继承
// 通过Object.create()来实现
// Object.create()大概实现下面的功能，相当于把一个对象进行浅拷贝到其他实例上，所以引用类型的属性是所有实例共享的。
// function object(o){
//   function F(){}
//   F.prototype = o;
//   return new F();
// }
// // 已有一个对象
// let Person = {
//   name:'牛逼男',
//   friends: ['傻狗','蠢猪']
// }
// // 继承Person对象的属性
// let Person01 = Object.create(Person);
// // 在实例创建同名属性
// Person01.name = '铁柱';
// // 修改的是原型里面的引用类型的friends
// Person01.friends.push('大高个');
// let Person02 = Object.create(Person);
// Person01.name = '绣花';
// console.log(Person,Person01.friends,Person02.friends)

// 适用于需要在对象间共享信息的情况，跟原型模式创建对象是一样的，不需要单独创建构造函数。
// 生成的对象是空对象，继承的属性再原型里面

// 5、寄生式继承
// function object(o){
//   function F(){}
//   F.prototype = o;
//   return new F();
// }
// 创建一个继承的函数，再增强函数，最后返回
// function createAnother(o){
//   // 接收要继承的对象然后进行拷贝（不一定是拷贝，任何方法都可以，只要能返回对象）,引用类型一样是共享的,object()是浅拷贝
//   let clone = object(o);
//   // 可以增强对象（给对象增加属性）
//   clone.sayHai = function(){
//     console.log('hi');
//   }
//   // 返回一个对象
//   return clone;
// }
// let person = {    
//   name: "Nicholas",   
//   friends: ["Shelby", "Court", "Van"] 
// }; 
// let anotherPerson = createAnother(person); 
// anotherPerson.name = '12131'
// anotherPerson.friends.push('大高个')
// let anotherPerson02 = createAnother(person);
// console.log(anotherPerson,anotherPerson02)
// anotherPerson.sayHai()

// 继承的属性再实例里面，相当于浅拷贝后新增sayHi方法。

// 6、寄生式组合继承
// 组合继承有个效率问题就是父类的构造器会被调用两次，第一次是创建子类原型时调用，第二次是再子类构造器中调用，
// 也就是原型和实例中会有同名属性，实例中的同名属性覆盖掉原型中的同名属性。

// function object(o){
//   function F(){}
//   F.prototype = o;
//   return new F();
// }
// // 实现寄生继承核心逻辑 给子类原型赋值为父类实例，且修改构造器为子类构造函数
// function inheritPrototype(subType, superType) {   
//   let prototype = object(superType.prototype);  // 创建对象  
//   prototype.constructor = subType;              // 增强对象  
//   subType.prototype = prototype;                // 赋值对象
// }
// // 父类Super
// function Super(name) {
//   this.name = name;
//   this.arr = []
// }
// // 父类原型方法
// Super.prototype.getName = function(){
//   console.log(this.name);
// }
// // 子类
// function Sub(name,age){ 
//   Super.call(this,name);
//   this.age = age;
// }
// // 子类继承
// inheritPrototype(Sub,Super);
// // 子类原型方法
// Sub.prototype.getAge = function(){
//   console.log(this.age);
// }
// // 创建实例
// let shili = new Sub('大高个',8);
// console.log(shili.name);
// shili.getName();
// // 构造器被父类Super的原型覆盖成Super
// console.log(shili.__proto__.constructor)
// // 寄生式组合继承可以算是引用类型继承的最佳模式。



// 下面一样的
// function object(o){
//   function F(){}
//   F.prototype = o;
//   return new F();
// }
// let a = {
//   name:'123',
//   f:[1,2,3]
// }
// let b = object(a);
// let c = Object.create(a);
// console.log(b,c)
// console.log(b.f === c.f)

// let book = {};
// Object.defineProperties(book, {   
//   year_: {     
//     value: 2017,
//     writable:true,
//   },   
//   edition: {     
//     value: 1   
//   },   
//   year: {     
//     get() {
//        return this.year_;     
//       }, 
//     set(newValue) {       
//       if (newValue > 2017) {         
//         this.year_ = newValue;         
//         this.edition += newValue - 2017;       
//       }     
//     }   
//   } 
// }); 
// book.year = 2022
// console.log(book)
// console.log(book.year)
// console.log(book.edition)
// console.log(book.year_)

// Class继承
// 父类
// class A{
//   // constructor实例的属性，this指向实例对象
//   constructor(){
//     this.a = 'a'
//     this.b = [1,2,3]
//     // 这样可以设置公共属性（原型上的属性）
//     // this.__proto__.d = [12,12,12]
//   }
//   // 可以再原型加属性用 set/get访问器属性
//   set d(n){
//     this.d_=n
//   }
//   get d(){
//     return this.d_
//   }
//   // 公共方法直接定义
//   c(){
//     console.log('c')
//   }
// }
// // 可以再class的prototype追加属性
// A.prototype.abc = 'a',
// A.prototype.fff = [1,2,3];
// // 子类
// // extends继承 扩展的意思
// class B extends A{
//   constructor(){
//     // super()调用父类的constructor，相当于把父类的属性写在子类
//     super();
//     // this.abc = 'abc'
//   }
// }
// let aa = new B();
// let bb = new B();
// // console.log(aa,bb);
// // aa.b.push(4)

// console.log(aa.d_,bb.d_);
// aa.fff.push('22332')
// console.log(aa.fff,bb.fff);

// aa.c();
// bb.c();

// 基类：最上级的类
// 派生类：由继承来的类，constructor构造函数里面必须先super()再用this

// 基类
// class A{
//   constructor(){
//     if(new.target === A){
//       // new A时进入，可以拦截，禁止new基类
//       console.log('这是基类')
//     }
//     if(!this.foo){
//       // 可以校验有没有这个方法，没有就拦截，new就会停下,只能判断B里面的方法，因为属性再super()之后才声明
//       console.log('没有foo方法')
//     }
//   }
// }
// // 派生类
// class B extends A{
//   constructor(){
//     super()
//     // this.foo1 = '1'
//     // 这个判断有没有属性
//     if(!this.foo1){
//       console.log('没有foo1属性')
//     }
//   }
//   foo(){}
// }
// // let a1 = new A()
// let a = new B()
// // class 类混入
// // 把几个类继承到一个目标类上面，一个套一个