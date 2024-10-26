import '../styles/main.sass';

const droppable: HTMLElement | null = document.querySelector<HTMLElement>('.droppable') ? document.querySelector<HTMLElement>('.droppable') : document.body;
const draggables: Array<HTMLElement> | null = document.querySelectorAll<HTMLElement>('.draggable') ? [...document.querySelectorAll<HTMLElement>('.draggable')] : null;

if (droppable && draggables) {
    draggables.forEach((draggable) => {
        let x: number, y: number;

        draggable.addEventListener('mousedown', handleMouseDown);

        function handleMouseDown(e: MouseEvent): void {
            console.log(e.relatedTarget)
            x = e.clientX;
            y = e.clientY;
        
            droppable.addEventListener('mousemove', handleMouseMove);
            draggable.addEventListener('mouseup', handleMouseUp);
        }
        
        function handleMouseMove(e: MouseEvent): void {
            console.log('mousemove');
            draggable.style.left = `${draggable.offsetLeft - x + e.clientX}px`
            draggable.style.top = `${draggable.offsetTop - y + e.clientY}px`
        
            x = e.clientX;
            y = e.clientY;
        }
        
        function handleMouseUp(e: MouseEvent): void {
            droppable.removeEventListener('mousemove', handleMouseMove);
            draggable.removeEventListener('mouseup', handleMouseUp);
        }
    });    
}