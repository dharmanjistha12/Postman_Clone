
const email = document.getElementById('email');
let menu=document.getElementById('menu');
menu.addEventListener('click',()=>{
	let options=document.getElementById('options');
	let stext=`<div class="opt">
					<ul>
						<li><a href="http://127.0.0.1:5500/Project6/html/PostMaster.html">Home</a></li>
						<li><a href="http://127.0.0.1:5500/Project6/html/PostMaster_about.html">About</a></li>
						<li><a href="http://127.0.0.1:5500/Project6/html/PostMaster_contact.html">Contact Us</a></li>
					</ul>
				</div>`
	options.innerHTML=stext;
})
let validEmail = false;
email.addEventListener('blur', () => {
	// console.log(email);
	let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
	let str = email.value;
	if (regex.test(str)) {
		email.classList.remove('is-invalid')
		validEmail = true;
	}
	else {
		email.classList.add('is-invalid')
		validEmail = false;
	}
})

let submit = document.getElementById('submit');
submit.addEventListener('click', (e) => {
	e.preventDefault();
	// console.log(validEmail);

	if (validEmail) {
		let alerting = document.getElementById('alerting');
		let html = `<div class="alertBox">
		<p><strong>Success!</strong> Form submitted successfully</p>
	</div>`
		alerting.innerHTML = html;
		setTimeout(function () {
			alerting.innerHTML = '';
		}, 1590);
		let name = document.getElementById('name').value;
		let email = document.getElementById('email').value;
		let message = document.getElementById('messageBox').value;
		console.log(name);
		console.log(email);
		console.log(message);
	}
	else {
		let alerting = document.getElementById('alerting');
		let html = `<div class="alertBox">
		<p><strong>Error!</strong> Form is not submitted. Please provide valid name and email id</p>
	</div>`
		alerting.innerHTML = html;
		setTimeout(function () {
			alerting.innerHTML = '';
		}, 1590);
	}
})
