import {TimelineMax} from 'gsap';
const plugins = [TimelineMax];


var Nav = class {
    constructor() {
        this.header = document.querySelector('.header__noauth');

        if(this.header) {
        // Bouton burger (ouvre la nav)
        this.burger = document.querySelector('#burger');

        // Bouton croix (ferme la nav)
        this.cross = document.querySelector('#cross');

        // Elements du header
        this.nav = document.querySelector('.header-nav');
        this.ul = document.querySelector('ul');
        this.li = document.querySelector('li');
        this.link = document.querySelector('.nav-link');

        if(this.isMobile()) {
            this.init();
        } else {
            // Si la page n'est pas en version mobile :
            this.burger.display = 'none';
        }
    }

    }

    // Fonction qui calcule la taille du document
    isMobile() { 

        // w = width du document
        const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        if (w <= 768) {

            // Si version mobile (w) => retourne true
            return true;
        }
        return false;
    }

    init() {
        console.log('init');
        this.initEvent();
    }

    initEvent() {
        this.burger.addEventListener('click', () => {
            this.openNav();
        })
        this.cross.addEventListener('click', () => {
            this.closeNav();
        })

    }

    openNav() {
        const tm = new TimelineMax();

        // Header qui se déplace de gauche à droite : APPARAIT 
        tm.to(this.header, 0.5, { left: 0 });
    }

    closeNav() {
        const tm = new TimelineMax();

        // Header qui se déplace de droite à gauche : DISPARAIT
        tm.to(this.header, 0.5, { left: '-104%' });
    }

}

export default Nav;
