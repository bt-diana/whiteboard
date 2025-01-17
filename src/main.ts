import './main.sass';
import emojis from './emoji';


const droppable: HTMLElement | null = document.querySelector<HTMLElement>('.droppable');
const menu: HTMLElement | null = document.querySelector<HTMLElement>('.menu');

if (droppable && menu && emojis) {
    emojis.forEach((emoji) => {
        let x: number, y: number;
        const menuItem: HTMLElement = document.createElement('div');
        menuItem.classList.add('menu__item', 'emoji');
        menuItem.innerHTML = emoji;

        menu.appendChild(menuItem);    
        
        menuItem.addEventListener('mousedown', handleDragMenuItem);

        function handleDragMenuItem(): void {
            const draggable: HTMLElement = document.createElement('div');
            draggable.classList.add('draggable', 'emoji');
            draggable.innerHTML = emoji;
            
            const emojiImg: HTMLElement | null = draggable.querySelector<HTMLElement>('.emoji img');
            emojiImg?.setAttribute('draggable', 'false')

            droppable?.appendChild(draggable);

            draggable.addEventListener('mousedown', handleMouseDown);

            function handleMouseDown(e: MouseEvent): void {
                x = e.clientX;
                y = e.clientY;
            
                droppable?.addEventListener('mousemove', handleMouseMove);
                draggable.addEventListener('mouseup', handleMouseUp);
            }
            
            function handleMouseMove(e: MouseEvent): void {
                draggable.style.left = `${draggable.offsetLeft - x + e.clientX}px`
                draggable.style.top = `${draggable.offsetTop - y + e.clientY}px`
            
                x = e.clientX;
                y = e.clientY;
            }
            
            function handleMouseUp(): void {
                if (droppable && draggable.offsetLeft < droppable?.offsetLeft) {
                    draggable.style.left = `${droppable?.offsetLeft}px`;
                } else if (droppable && draggable.offsetLeft + draggable.offsetWidth > droppable?.offsetLeft + droppable?.offsetWidth) {
                    draggable.style.left = `${droppable?.offsetLeft + droppable?.offsetWidth - draggable.offsetWidth}px`;
                }
    
                if (droppable && draggable.offsetTop < droppable?.offsetTop) {
                    draggable.style.top = `${droppable?.offsetTop}px`;
                } else if (droppable && draggable.offsetTop + draggable.offsetHeight > droppable?.offsetTop + droppable?.offsetHeight) {
                    draggable.style.top = `${droppable?.offsetTop + droppable?.offsetHeight - draggable.offsetHeight}px`;
                }
    
                droppable?.removeEventListener('mousemove', handleMouseMove);
                draggable.removeEventListener('mouseup', handleMouseUp);
            }
        }
    });    
}

const emojiImgs: Array<HTMLElement> | null = [...document.querySelectorAll<HTMLElement>('.emoji img')];
emojiImgs?.forEach((emojiImg) => (emojiImg.setAttribute('draggable', 'false')));