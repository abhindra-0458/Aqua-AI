let navlinks = document.querySelector('.menu');

document.getElementById("ham").onclick = () => {
	navlinks.classList.toggle('active');
}

document.getElementById("navli1").onclick = () => {
	navlinks.classList.remove('active');
}
document.getElementById("navli2").onclick = () => {
	navlinks.classList.remove('active');
}
document.getElementById("navli3").onclick = () => {
	navlinks.classList.remove('active');
}
