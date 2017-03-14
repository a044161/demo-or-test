;(function(){
	var input = document.getElementById('textValue');
	var btn = document.getElementById('handleSubmit');
	var content = document.getElementById('showValue');

	btn.addEventListener('click', function(){
		var value = input.value;
		content.innerText = value;
	})
})();