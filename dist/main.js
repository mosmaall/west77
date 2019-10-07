(function() {
    scrollTo();
	window.addEventListener('scroll', isScroll);
	fadeInBg();
})();

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
	const originalTop = distanceToTop(targetAnchor);
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