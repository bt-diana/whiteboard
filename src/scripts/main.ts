import '../styles/main.sass';

const droppable: HTMLElement | null = document.querySelector<HTMLElement>('.droppable') ? document.querySelector<HTMLElement>('.droppable') : document.body;
const draggables: Array<HTMLElement> | null = document.querySelectorAll<HTMLElement>('.draggable') ? [...document.querySelectorAll<HTMLElement>('.draggable')] : null;

if (droppable && draggables) {
    draggables.forEach((draggable) => {
        let x: number, y: number;

        draggable.addEventListener('mousedown', handleMouseDown);

        function handleMouseDown(e: MouseEvent): void {
            x = e.clientX;
            y = e.clientY;
        
            droppable.addEventListener('mousemove', handleMouseMove);
            draggable.addEventListener('mouseup', handleMouseUp);
        }
        
        function handleMouseMove(e: MouseEvent): void {\
            draggable.style.left = `${draggable.offsetLeft - x + e.clientX}px`
            draggable.style.top = `${draggable.offsetTop - y + e.clientY}px`
        
            x = e.clientX;
            y = e.clientY;
        }
        
        function handleMouseUp(e: MouseEvent): void {
            if (draggable.offsetLeft < droppable.offsetLeft) {
                draggable.style.left = `${droppable.offsetLeft}px`;
            } else if (draggable.offsetLeft + draggable.offsetWidth > droppable.offsetLeft + droppable.offsetWidth) {
                draggable.style.left = `${droppable.offsetLeft + droppable.offsetWidth - draggable.offsetWidth}px`;
            }

            if (draggable.offsetTop < droppable.offsetTop) {
                draggable.style.top = `${droppable.offsetTop}px`;
            } else if (draggable.offsetTop + draggable.offsetHeight > droppable.offsetTop + droppable.offsetHeight) {
                draggable.style.top = `${droppable.offsetTop + droppable.offsetHeight - draggable.offsetHeight}px`;
            }

            droppable.removeEventListener('mousemove', handleMouseMove);
            draggable.removeEventListener('mouseup', handleMouseUp);
        }
    });    
}