(function() {
    scrollTo();
	window.addEventListener('scroll', isScroll);
	fadeInBg();
})();

function showFullImage(name) {
	const popup = document.createElement('div');
	popup.className = "popup";

	const button = document.createElement('div');
	button.className = "close";
	button.onclick = () => closePopup(this);


	const modalSlider = document.createElement('div');
	modalSlider.id = 'modal-slider';

	for(let i=1;i<6;i++){
		var modalImg = createImage(i);
		modalSlider.appendChild(modalImg);
	}

	const control = document.createElement('div');
	control.id = "control-modal"
	
	const buttonGroup = `
		<button class="btn-modal-left"><i class="arrow white left"></i></button>
		<button class="btn-modal-right"><i class="arrow white right"></i></button>
	`
	control.innerHTML = buttonGroup;
	
	popup.appendChild(control);
	popup.appendChild(modalSlider);
	popup.appendChild(button);
	document.body.appendChild(popup);

	var popupSlider = tns({
		"container": "#modal-slider",
		"items": 1,
		"swipeAngle": 100,
		"speed": 50,
		"index": name,
		"nav": false,
		"center": true,
		"mode": "gallery",
		"controlsContainer": "#control-modal"
	})

	popupSlider.goTo(name - 1);
}

function createImage(name) {
	const imgWrap = document.createElement('div');
	const img = document.createElement('img');
	img.src = `dist/images/gallery/rsz_gallery_${name}.jpg`;
	imgWrap.appendChild(img);
	return imgWrap;
}

function closePopup() {
	document.getElementsByClassName('popup')[0].remove();
}

function isScroll(e) {
    var nav = document.getElementsByTagName('header')[0];
    if (document.documentElement.scrollTop > 100 || document.body.scrollTop > window.innerHeight) {
        nav.classList.add('colored');
    } else {
        nav.classList.remove('colored');
    }
}

function toggleMenu(x) {
	if(!x.classList.value.includes('change')) {
		x.classList.toggle("change");
		const menuPopup = document.createElement('div');
		menuPopup.className = "menu-popup";
		document.getElementsByClassName('mobile-nav')[0].classList.add('nav-visible');
		document.body.appendChild(menuPopup);
	} else {
		x.classList.toggle("change");
		document.getElementsByClassName('mobile-nav')[0].classList.remove('nav-visible');
		document.getElementsByClassName('menu-popup')[0].remove()
	}
}

function closeNav(x) {
	document.getElementsByClassName('mobile-nav')[0].classList.remove('nav-visible');
}

function scrollTo() {
	const links = document.querySelectorAll('.scroll');
	links.forEach(each => (each.onclick = scrollAnchors));
}

function fadeInBg() {
	const bg = document.getElementById('home')
	bg.addEventListener('webkitAnimationEnd', () => {
		bg.classList.add('visible');
	})
}

function scrollAnchors(e, respond = null) {
	const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
	e.preventDefault();
	var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
	const targetAnchor = document.querySelector(targetID);
	if (!targetAnchor) return;
	const originalTop = distanceToTop(targetAnchor) - 100;
	window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
	const checkIfDone = setInterval(function() {
		const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
		if (distanceToTop(targetAnchor) === 0 || atBottom) {
			targetAnchor.tabIndex = '-1';
			targetAnchor.focus();
			window.history.pushState('', '', targetID);
			clearInterval(checkIfDone);
		}
	}, 100);
}