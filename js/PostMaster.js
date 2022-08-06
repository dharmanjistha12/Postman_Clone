function getElementFromString(string) {
	let div = document.createElement('div');
	div.innerHTML = string;
	return div.firstElementChild;
}
function validURL(str) {
	var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
		'(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
	return !!pattern.test(str);
}
let addedParamCount = 0;
// FOR DISPLAYING BOXES ALTERNATIVELY
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

let requestJsonBox = document.getElementById('requestJsonBox');
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
	parametersBox.style.display = 'block';
	requestJsonBox.style.display = 'none';
})
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
	parametersBox.style.display = 'none';
	requestJsonBox.style.display = 'block';
})
// FOR '+'
let addParam = document.getElementById('addParam')
addParam.addEventListener('click', () => {
	let params = document.getElementById('params');

	let string = `<div class="parachute">
	<label for="url" class="p1">Parameter ${addedParamCount + 2}</label>	
		<div class="col-md-4">
			<input type="text" class="parak" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
		</div>
		<div class="col-md-4">
			<input type="text" class="parak" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
		</div>
		<button class="btn deleteParam addParambtn" > - </button>
	</div>`;

	let paramElement = getElementFromString(string);
	params.appendChild(paramElement);
	let deleteParam = document.getElementsByClassName('deleteParam');
	for (item of deleteParam) {
		item.addEventListener('click', (e) => {
			e.target.parentElement.remove();
		})
	}

	addedParamCount++;
})
// FOR 'SUBMIT'
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {

	let url = document.getElementById('url').value;
	let requestType = document.querySelector("input[name='requestType']:checked").value;
	let contentType = document.querySelector("input[name='contentType']:checked").value;
	if (validURL(url)) {
		document.getElementById('responsePrism').innerHTML = 'Please wait.. Fetching response...';
		if (contentType == 'params') {
			data = {};
			for (let i = 0; i < addedParamCount + 1; i++) {
				if (document.getElementById('parameterKey' + (i + 1) != undefined)) {
					let key = document.getElementById('parameterKey' + (i + 1)).value;
					let value = document.getElementById('parameterValue' + (i + 1)).value;
					data[key] = value;
				}
			}
			data = JSON.stringify(data);
		}
		else {
			data = document.getElementById('requestJsonText').value;
		}
		console.log('URL is ', url);
		console.log('requestType is ', requestType);
		console.log('contentType is ', contentType);
		console.log('data is ', data);

		if (requestType == 'GET') {
			fetch(url, {
				method: 'GET'
			})
				.then(Response => Response.text())
				.then((text) => {
					document.getElementById('responsePrism').innerHTML = text;
					Prism.highlightAll();
				})
		}
		else {
			fetch(url, {
				method: 'POST',
				body: data,
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			})
				.then(Response => Response.text())
				.then((text) => {
					document.getElementById('responsePrism').innerHTML = text;
					Prism.highlightAll();
				})
		}
	}
	else {
		let alerting = document.getElementById('alerting');
		let html = `<div class="alertBox">
		<p><strong>Error!</strong> No URL found</p>
	</div>`
		alerting.innerHTML = html;
		setTimeout(function () {
			alerting.innerHTML = '';
		}, 1590);
	}

})
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