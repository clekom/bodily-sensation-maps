import { createElement } from './helper';

export default class activityInput {

	constructor(selectror) {
		this.name = selectror;
		this.isShowed = false;
		this.create(selectror);
		this.initUI();
		this.bindEvents();
	}

	getActivityValue() {
		return parseInt(this.slider.value, 10);
	}

	getSlider() {
		return this.slider;
	}

	initUI() {
		this.resultRow.innerText = 'Aktivität: 0 %';
	}

	bindEvents() {
		this.slider.addEventListener('input',() => {
			this.resultRow.innerText = 'Aktivität: '+ this.slider.value +' %';
		});

	}

	setTitle (selector) {
		this.titleRow.innerText = selector;
	}

	setDescription (description){
		this.descriptionRow.innerText = description;
	}

	setTopEndOfSlider (text){
		this.fullActivity.innerText = text;
	}

	setBottomEndOfSlider (text) {
		this.noActivity.innerText = text;
	}

	show(){
		this.container.style.display = 'block';
		this.isShowed = true;
		this.showCloseHandler();
	}

	//todo bessere Lösung finden!
	showCloseHandler() {
		if (this.isShowed === true){
			this.container.addEventListener('mouseleave', () => {
				this.container.style.display = 'none';
				this.container.removeEventListener('mouseleave', ()=>{
					this.isShowed = false;
				});
			});

			this.container.addEventListener('touchend',() => {
				this.container.style.display = 'none';
				this.container.removeEventListener('touchend', ()=>{
					this.isShowed = false;
				});
			})
		}
	};

	createSlider(cx, id) {
		const slider = createElement('input', cx);
		slider.type = 'range';
		slider.min = '0';
		slider.max = '100';
		slider.value = '0';
		slider.orient = 'vertical';
		slider.id = 'input_'+id;
		return slider;
	}

	create(id) {
		this.container = createElement('div', 'input-container');
		this.titleRow = createElement('div', 'activity-row, input-title-row');
		this.descriptionRow = createElement('div', 'activity-row');
		this.inputContainer = createElement('div', 'center');
		this.inputRow = createElement('div', 'center, input-row');
		this.resultRow = createElement('div', 'activity-row, center');
		this.columnTop = createElement('div', 'center');
		this.columnBottom = createElement('div', 'center');
		this.slider = this.createSlider('slider', id);
		this.noActivity = createElement('div','fullActivity');
		this.fullActivity = createElement('div','noActivity');


		this.container.appendChild(this.titleRow);
		this.container.appendChild(this.resultRow);
		this.container.appendChild(this.descriptionRow);
		this.container.appendChild(this.columnTop);
		this.container.appendChild(this.inputContainer);
		this.inputContainer.appendChild(this.inputRow);
		this.inputRow.appendChild(this.slider);
		this.container.appendChild(this.columnBottom);
		this.columnTop.appendChild(this.noActivity);
		this.columnBottom.appendChild(this.fullActivity);

		this.setTitle(id);
	}

	destroy() {
		this.columnTop = null;
		this.columnBottom = null;
		this.slider = null;
	}
}