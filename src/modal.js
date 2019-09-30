import { createElement } from './helper';

export default class Modal {
	constructor() {
		this.create();
		this.bindEvents();
	}

	bindEvents() {
		this.closeButton.addEventListener('click', () => {
			this.close();
		});
	}

	create() {
		this.background = createElement('div', 'modal-background');
		this.modal = createElement('div', 'modal, container');
		this.header = createElement('div', 'modal-header');
		this.title = createElement('div', 'modal-header__title');
		this.description = createElement('div', 'modal-header__description');
		this.body = createElement('div', 'modal-body');
		this.prebody = createElement('div','modal-prebody');
		this.footer = createElement('div', 'modal-footer, row');
		this.closeButton = createElement('div', 'modalClose');
		this.closeButton.innerText = 'Schließen';

		this.header.appendChild(this.title);
		this.header.appendChild(this.description);
		this.footer.appendChild(this.closeButton);
		this.modal.appendChild(this.header);
		this.modal.appendChild(this.prebody);
		this.modal.appendChild(this.body);
		this.modal.appendChild(this.footer);
		this.background.appendChild(this.modal);
	}

	destroy() {
		this.background = null;
		this.modal = null;
		this.header = null;
		this.title = null;
		this.description = null;
		this.body = null;
		this.footer = null;
	}

	show() {
		document.body.appendChild(this.background);
	}

	close() {
		document.body.removeChild(this.background);
		this.destroy();
	}

	setContent(content) {
		this.body.appendChild(content);
	}

	setPreBodyContent(content) {
		this.prebody.appendChild(content);
	}

	setFooterContent(content) {
		this.footer.appendChild(content);
	}

	setTitle(title) {
		this.title.innerHTML = title;
	}

	setDescription(description) {
		this.description.innerHTML = description;
	}
}
