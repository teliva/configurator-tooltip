import { createTooltip } from './tooltip-component.js';




let nodes = document.querySelectorAll('#conf-swatch');
nodes.forEach( node => {
    node.addEventListener('mouseover', (e) => onOver(e));
    node.addEventListener("mouseout", (e) => onLeave(e));
});

document.querySelectorAll('#conf-swatch')
document.querySelector('#conf-swatch')

const onOver = (e) => {
    console.log('firing');
    const tt = createTooltip();
    document.body.appendChild(tt);
}

const onLeave = (e) => {
    let tt = document.querySelector('configurator-tooltip');
    tt.remove();
}