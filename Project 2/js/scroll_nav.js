//Change color on scroll
window.onscroll = () => {
	scrollNavbar()
};
scrollNavbar = () => {
		const navBar = document.getElementById("navBar");
		const links = document.querySelectorAll("#navBar a");
		if(document.documentElement.scrollTop > 100) {
			navBar.classList.add("pa-fixed-header");
			for(let i = 0; i < links.length; i++) {
				const element = links[i];
				element.classList.add('text-black');
			}
		} else {
			navBar.classList.remove("pa-fixed-header");
			// Changes the color of links back to default
			for(let i = 0; i < links.length; i++) {
				const element = links[i];
				element.classList.remove('text-black');
			}
		}
	}
	//Hamburger Menu 
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");
hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
	hamburger.classList.toggle("active");
	navMenu.classList.toggle("active");
}
const navLink = document.querySelectorAll(".nav-links");
navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
	hamburger.classList.remove("active");
	navMenu.classList.remove("active");
	const navLink = document.querySelectorAll(".nav-links");
	navLink.forEach(n => n.addEventListener("click", closeMenu));

	function closeMenu() {
		hamburger.classList.remove("active");
		navMenu.classList.remove("active");
	}
}