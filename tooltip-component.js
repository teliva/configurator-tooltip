import { tSt } from "./tooltip-style.js";
import { tT } from "./tooltip-template.js";

class ConfiguratorTooltip extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        //markup
        const componentTemplate = document.createElement('template');
        componentTemplate.innerHTML = tT;

        //styles
        const style = document.createElement('style');
        style.innerHTML = tSt;

        shadow.append(style);
        shadow.append(componentTemplate.content);
    }

    determineQuadrant() {
        var posX = window.event.clientX;
        var posY = window.event.clientY;

        const vW = window.innerWidth;
        const vH = window.innerHeight;

        let quadrant;
        if (posX > vW / 2 && posY < vH / 2) {
            quadrant = 1;
        }
        else if (posX < vW / 2 && posY < vH / 2) {
            quadrant = 2;
        }
        else if (posX < vW / 2 && posY > vH / 2) {
            quadrant = 3;
        }
        else {
            quadrant = 4;
        }

        return quadrant;    
    };

    connectedCallback() {
        this.positionAbsolutely();
    };

    positionAbsolutely() {
        const quadrant = this.determineQuadrant();

        this.style.opacity = 1;
        switch (quadrant) {
            case 1:
                this.style.top = `${window.event.clientY + 4}px`;
                this.style.left = `${window.event.clientX - this.clientWidth + 4}px`;
                break;
            case 2:
                this.style.top = `${window.event.clientY + 4}px`;
                this.style.left = `${window.event.clientX}px`;
                break;
            case 3:
                this.style.top = `${window.event.clientY - this.clientHeight - 4}px`;
                this.style.left = `${window.event.clientX}px`;
                break;
            case 4:
                this.style.top = `${window.event.clientY - this.clientHeight - 4}px`;
                this.style.left = `${window.event.clientX - this.clientWidth - 4}px`;
        }
    };
};

const onLeaveTT = (e) => {
    let located = document.elementFromPoint(e.pageX, e.pageY);
    if (located !== e.currentTarget.target) {
        e.currentTarget.remove();
    }
};

const onLeave = (e) => {
    let tt = document.querySelector('configurator-tooltip');
    let located = document.elementFromPoint(e.pageX, e.pageY);
    if (located.nodeName !== 'CONFIGURATOR-TOOLTIP' && tt) {
        tt.remove();
    }
};

const createTooltip = (target, innerHtml) => {
    const retEle = document.createElement('configurator-tooltip');
    retEle.target = target;


    //markup
    const componentTemplate = document.createElement('template');
    componentTemplate.innerHTML = innerHtml;
    retEle.shadowRoot.querySelector('span').append(componentTemplate.content);
    return retEle;
};

customElements.define('configurator-tooltip', ConfiguratorTooltip);

export { createTooltip, onLeave, onLeaveTT };