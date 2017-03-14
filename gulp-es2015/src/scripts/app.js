'use strict';
const module1 = require('./libs/module-1');
const a = 'a';

module1()

class A {
	construcctor(x,y){
		this.x = x;
		this.y = y;
	}

	a(){
		console.log('this A->a');
	}
}