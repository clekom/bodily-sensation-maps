import Modal from './Modal';
import { createElement } from './helper';
import activityInput from './activityInput';

class BSM {
	constructor() {
		this.data = {
			bodyPartData: [],
			allBodyPartInputs: [],
			uuid: this.create_UUID(),
			action: true,
			textData: {},
			sliderColors: {
				color1: [214,213,213],
				color2: [217,31,67]
			}
		};
		this.init();
	}

	 create_UUID(){
		let dt = new Date().getTime();
		let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			let r = (dt + Math.random()*16)%16 | 0;
			dt = Math.floor(dt/16);
			return (c=='x' ? r :(r&0x3|0x8)).toString(16);
		});
		return uuid;
	}

	// can be used if variables like uuid are sent from another source.
	getUrlParamerter(sParam) {
		let sPageURL = decodeURIComponent(window.location.search.substring(1)),
			sURLVariables = sPageURL.split('&'),
			sParameterName,
			i;

		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');

			if (sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? true : sParameterName[1];
			}
		}
	}

	async init() {
		await this.loadTextInputs();
		this.initElements();
		this.bindEvents();
		this.createTaskModal();
	}
	loadTextInputs () {
		const path = 'text/texts.json';
		return fetch(path).then(response => response.json()).then(textData => {
			this.data.textData = textData;
		})
			.catch((error) => {
				console.error(error);
			});
	}

	initElements() {
		const bodyParts = document.querySelectorAll('.st0');
		const inputArea = document.querySelector('#activity-inputs');

		for (let part of bodyParts) {
			const bodyPartData = {
				name: part.id,
				counter: 0
			};
			this.data.bodyPartData.push(bodyPartData);

			//Create Input Elements
			const bodyPartActivityInput = new activityInput(part.id);

			bodyPartActivityInput.setDescription(this.data.textData['activiy-description']);
			bodyPartActivityInput.setTopEndOfSlider(this.data.textData['slider-bottom']);
			bodyPartActivityInput.setBottomEndOfSlider(this.data.textData['slider-top']);

			this.data.allBodyPartInputs.push(bodyPartActivityInput);
			inputArea.appendChild(bodyPartActivityInput.container);
		}
	}


	bindEvents() {
		this.bodyPartEvents();
		this.inputEvents();
		this.submit();
	}

	showInputHandler(event){
		let selectedBodypartInput = this.data.allBodyPartInputs.find(bPart => bPart.name === event.target.id);
		selectedBodypartInput.show();
	}


	bodyPartEvents() {
		const allBodyParts = this.data.bodyPartData;
		for (let part of allBodyParts) {
			let selector = part.name;
			document.querySelector('#' + selector).addEventListener('click', (event) => {
				this.showInputHandler(event);
			});
		}
	}

	setBodyPartColor(rgb, input){
		const selector = input.split('_').pop();
		let bodyPartToFill = document.getElementById(selector);
		bodyPartToFill.style.fill = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
	}

	inputEvents(){
		for (let inputElement of this.data.allBodyPartInputs){
			inputElement.slider.addEventListener('input', (event) => {
				let rgb = this.calculateColor(this.data.sliderColors.color1, this.data.sliderColors.color2, event.target.value);
				this.setBodyPartColor(rgb, event.target.id);
				this.updateActivation(inputElement.name, event.target.value);
			})

		}
	}

	calculateColor(color1, color2, value) {
		let rgb = [Math.round(color1[0] - ((color1[0] - color2[0]) * value/100)),
			Math.round(color1[1] - ((color1[1] - color2[1]) * value/100)),
			Math.round(color1[2] - ((color1[2] - color2[2]) * value/100))];
		return rgb;
	}

	submit() {
		const submitbutton = document.querySelector('#submitbutton');
		submitbutton.addEventListener('click', () => {
			this.createSafetyModal ();
		});
	}

	updateActivation(selector, value) {
	const bPartSelector = this.data.bodyPartData.find(b => b.name === selector);
	bPartSelector.counter = parseInt(value);
	}

	createTaskModal (){
		document.getElementById('info').addEventListener('click', () => {
			const taskModal = new Modal();
			taskModal.setTitle(this.data.textData.instruction_title);
			taskModal.setDescription(this.data.textData.instruction_text);
			taskModal.show();
		});
	}

	createSafetyModal (){
		const question = new Modal ();
		question.setTitle(this.data.textData.send_notice_title);
		question.setDescription(this.data.textData.send_notice_text);
		const finalSubmitButton = createElement('button', 'modalButtonStyle');
		finalSubmitButton.innerText = "Weiter";
		finalSubmitButton.addEventListener('click',() => {
			this.sendAllData();
		});
		question.setFooterContent(finalSubmitButton);
		question.show();
	}

	sendAllData(){
		const data = {
			id: this.data.id,
			bodyPartData: this.data.bodyPartData
		};
		console.log(data);
		const path = 'php/data.php';

		fetch(path, {
			method: "POST",
			mode: "same-origin",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				data
			})
		}).then(res => {
			console.log("Sucess:", JSON.stringify(res.json()));
		}).then(() => {
			   document.location.href = 'success.html';
			}).catch(error => {
				console.error('Error:', error);
			});
	}
}

const runBSM = new BSM();
