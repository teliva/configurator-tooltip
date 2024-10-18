import { createTooltip, onLeave, onLeaveTT } from './tooltip-component.js';

let nodes = document.querySelectorAll('#conf-swatch');
nodes.forEach(node => {
    node.addEventListener('mouseover', (e) => onOver(e));
    node.addEventListener("mouseout", (e) => onLeave(e));
});

const onOver = (e) => {
    let tt = document.querySelector('configurator-tooltip');
    if (!tt) {
        const tt = createTooltip(e.currentTarget, 'dude this is a tooltip');
        document.body.appendChild(tt);
        tt.addEventListener("mouseout", (e) => onLeaveTT(e));
    }
};