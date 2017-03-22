'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function module1() {
	console.log('this is module1');
}

module1();

var A = function () {
	function A() {
		_classCallCheck(this, A);
	}

	_createClass(A, [{
		key: 'construcctor',
		value: function construcctor(x, y) {
			this.x = x;
			this.y = y;
		}
	}, {
		key: 'a',
		value: function a() {
			console.log('this A->a');
			var s = 'a';
			var c = 'cdsassddds';
		}
	}]);

	return A;
}();

var _A = new A();