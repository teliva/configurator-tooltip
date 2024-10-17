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

    connectedCallback (){
        this.positionAbsolutely();
    }

    positionAbsolutely() {
        this.style.display = 'block';
        this.style.position = 'absolute';
        const quadrant = this.determineQuadrant();
        switch (quadrant) {
            case 1:
                this.style.top = `${window.event.clientY - this.clientHeight - 70}px`;
                this.style.left = `${window.event.clientX - this.clientWidth - 70}px`;
                break;
            default:
                console.log('tears');
                break;
        }
    };
}

const createTooltip = () => {
    const retEle = document.createElement('configurator-tooltip');
    return retEle;
};

customElements.define('configurator-tooltip', ConfiguratorTooltip);

export { createTooltip };