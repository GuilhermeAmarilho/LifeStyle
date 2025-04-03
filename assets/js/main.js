/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')
const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('bg-header') 
                       : header.classList.remove('bg-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
const scrollActive = () =>{
  	const scrollY = window.pageYOffset
	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp);

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
});
sr.reveal(`.home__data`);
sr.reveal(`.home__img`, {delay: 700, origin: 'bottom'})
sr.reveal(`.logos__img .program__card`, {interval: 100})
sr.reveal(`.choose__img`, {origin: 'left'});
sr.reveal(`.choose__content`, {origin: 'right '});
sr.reveal(`.pricing`, {origin: 'bottom'});
sr.reveal(`.calculate`, {origin: 'bottom'});
sr.reveal(`.footer`, {origin: 'bottom'});

/*=============== CALCULATE JS ===============*/
const calculateForm = document.getElementById('calculate-form'), 
 calculateCm = document.getElementById('calculate-cm'),
 calculateKg = document.getElementById('calculate-kg'),
 calculateMessage = document.getElementById('calculate-message');
const calculateIMC = (e) => {
    e.preventDefault();
    // Testa se foram preenchidos os input
    if(calculateCm.value === '' || calculateKg.value === ''){
        // altera a cor
        calculateMessage.classList.remove('color-green');
        calculateMessage.classList.add('color-red');

        // avisa o erro
        calculateMessage.textContent = 'Informe a altura e o peso';

        // remove a mensagem após 3 seg
        setTimeout(() => {
            calculateMessage.textContent = '';
        }, 3000);
    }else{
        const cm = calculateCm.value / 100, kg = calculateKg.value, imc = Math.round(kg/(cm*cm));
        // Define a saude
        calculateMessage.classList.add('color-green');
        if(imc < 18.5){
            calculateMessage.textContent = `Seu IMC é ${imc} e você está magro 😓`;
        }else if(imc < 25){
            calculateMessage.textContent = `Seu IMC é ${imc} e você saudável 😍`;
        }else{
            calculateMessage.textContent = `Seu IMC é ${imc} e você está acima do peso 😬`;
        }
        calculateCm.value = '';
        calculateKg.value = '';
        // remove a mensagem após 5 seg
        setTimeout(() => {
            calculateMessage.textContent = '';
        }, 5000);
    }
}
calculateForm.addEventListener('submit', calculateIMC);

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
 contactMessage = document.getElementById('contact-message'),
 contactUser = document.getElementById('contact-user');
const sendEmail = (e) =>{
    e.preventDefault();
    // Checa de o input foi preenchido
    if(contactUser.value === ''){
        contactMessage.classList.remove('color-gren');
        contactMessage.classList.add('color-red');
        contactMessage.textContent = "Informe seu email corretamente 👆🏽";
        setTimeout(() => {
            contactMessage.textContent = '';
        }, 3000);
    }else{
        emailjs.sendForm('service_wg0ug9v', 'template_rtdhu7u', '#contact-form', 'GmVOMcV64jehynna-').then(() => {
            contactMessage.classList.add('color-green');
            contactMessage.textContent = 'Você se registrou com sucesso 👏🏽';
            setTimeout(() => {
                contactMessage.textContent = '';
            }, 5000);
        },(error) => {
            alert("Opa, A sua solicitação falhou", error);     
        });
        contactUser.value='';
    }
} 
contactForm.addEventListener('submit', sendEmail);