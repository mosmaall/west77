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

	const img = document.createElement('img');
	img.src = `dist/images/gallery/rsz_gallery_${name}.jpg`

	popup.appendChild(img);
	popup.appendChild(button);

	document.body.appendChild(popup);
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
    x.classList.toggle("change");
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