/*==================== SHOW MENU ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
    const header = document.getElementById('header')
    // When the scroll is greater than 100 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 100) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SWIPER DISCOVER ====================*/
let swiper = new Swiper(".discover__container", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    spaceBetween: 32,
    coverflowEffect: {
        rotate: 0,
    },
})

/*==================== VIDEO ====================*/
const videoFile = document.getElementById('video-file'),
    videoButton = document.getElementById('video-button'),
    videoIcon = document.getElementById('video-icon')

function playPause() {
    if (videoFile.paused) {
        // Play video
        videoFile.play()
        // We change the icon
        videoIcon.classList.add('ri-pause-line')
        videoIcon.classList.remove('ri-play-line')
    }
    else {
        // Pause video
        videoFile.pause();
        // We change the icon
        videoIcon.classList.remove('ri-pause-line')
        videoIcon.classList.add('ri-play-line')
    }
}
videoButton.addEventListener('click', playPause)

function finalVideo() {
    // Video ends, icon change
    videoIcon.classList.remove('ri-pause-line')
    videoIcon.classList.add('ri-play-line')
}
// ended, when the video ends
videoFile.addEventListener('ended', finalVideo)


/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 200) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    distance: '60px',
    duration: 2800,
    // reset: true,
})


sr.reveal(`.home__data, .home__social-link, .home__info,
           .discover__container,
           .experience__data, .experience__overlay,
           .place__card,
           .sponsor__content,
           .footer__data, .footer__rights`, {
    origin: 'top',
    interval: 100,
})

sr.reveal(`.about__data, 
           .video__description,
           .subscribe__description`, {
    origin: 'left',
})

sr.reveal(`.about__img-overlay, 
           .video__content,
           .subscribe__form`, {
    origin: 'right',
    interval: 100,
})

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== FAQ ACCORDION ====================*/
const faqItems = document.querySelectorAll('.faq__item')

faqItems.forEach((item) => {
    const faqHeader = item.querySelector('.faq__header')

    faqHeader.addEventListener('click', () => {
        const openItem = document.querySelector('.faq-open')

        toggleItem(item)

        if (openItem && openItem !== item) {
            toggleItem(openItem)
        }
    })
})

const toggleItem = (item) => {
    const faqContent = item.querySelector('.faq__content')

    if (item.classList.contains('faq-open')) {
        faqContent.removeAttribute('style')
        item.classList.remove('faq-open')
    } else {
        faqContent.style.height = faqContent.scrollHeight + 'px'
        item.classList.add('faq-open')
    }
}

    /*==================== LIGHTBOX (V5 ULTRA ROBUST) ====================*/
    ; (function initLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.getElementById('lightbox-close');

        if (!lightbox || !lightboxImg) {
            console.error("Lightbox elements not found in DOM!");
            return;
        }

        // Initialize CSS properties directly via JS to guarantee they exist and aren't overridden
        Object.assign(lightbox.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: '999999',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'opacity 0.3s ease'
        });

        const openLightbox = (imgSrc, imgAlt) => {
            lightboxImg.src = imgSrc;
            lightboxImg.alt = imgAlt || '';

            // Force Display & Opacity
            lightbox.style.display = 'flex';
            lightbox.style.visibility = 'visible';

            // Slight delay to allow display flex to apply before opacity transition
            setTimeout(() => {
                lightbox.classList.add('active');
                lightbox.style.opacity = '1';
            }, 10);

            document.body.style.overflow = 'hidden';
        };

        const closeLightbox = () => {
            lightbox.style.opacity = '0';
            lightbox.classList.remove('active');
            document.body.style.overflow = '';

            setTimeout(() => {
                lightbox.style.display = 'none';
                lightbox.style.visibility = 'hidden';
            }, 300);
        };

        // Helper function to attach clicks aggressively
        const attachAggressiveClick = (selector) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.style.cursor = 'pointer';

                const handler = (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    let imgSrc, imgAlt;
                    if (el.tagName.toLowerCase() === 'img') {
                        imgSrc = el.src;
                        imgAlt = el.alt;
                    } else {
                        const img = el.querySelector('img');
                        if (img) {
                            imgSrc = img.src;
                            imgAlt = img.alt;
                        }
                    }
                    if (imgSrc) {
                        openLightbox(imgSrc, imgAlt);
                    }
                };

                // Listen on bubbling phase
                el.addEventListener('click', handler);
                // Listen on capture phase just in case Swiper or another script stops propagation
                el.addEventListener('click', handler, true);
            });
        };

        // Attach to Wrappers/Cards (Crucial because overlay text blocks image clicks)
        attachAggressiveClick('.places__card');
        attachAggressiveClick('.place__card');
        attachAggressiveClick('.packages__card');
        attachAggressiveClick('.transport__card');

        // Also attach direct images if they are floating
        attachAggressiveClick('.places__img');
        attachAggressiveClick('.packages__img');
        attachAggressiveClick('.transport__img');

        // Close buttons
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        lightbox.addEventListener('click', (e) => {
            // If they click the black background or the content wrapper, close it
            if (e.target.id === 'lightbox' || e.target.classList.contains('lightbox__content')) {
                closeLightbox();
            }
        });

        // Pressing ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    })();