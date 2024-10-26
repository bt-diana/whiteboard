import '../styles/main.sass';

type DragAndDropElement = {
    draggable: HTMLElement;
    droppable: HTMLElement;
    x: number;
    y: number;
}

const droppable: HTMLElement | null = document.querySelector<HTMLElement>('.droppable') ? document.querySelector<HTMLElement>('.droppable') : document.body;
const draggables: Array<HTMLElement> | null = document.querySelectorAll<HTMLElement>('.draggable') ? [...document.querySelectorAll<HTMLElement>('.draggable')] : null;

if (droppable && draggables) {
    draggables.forEach((draggable) => {
        const dragAndDropElement: DragAndDropElement = {
            draggable: draggable,
            droppable: droppable,
            x: 0,
            y: 0
        }

        dragAndDropElement.draggable.addEventListener('mousedown', handleMouseDown);

        function handleMouseDown(e: MouseEvent): void {
            dragAndDropElement.x = e.clientX;
            dragAndDropElement.y = e.clientY;
        
            dragAndDropElement.droppable.addEventListener('mousemove', handleMouseMove);
            dragAndDropElement.draggable.addEventListener('mouseup', handleMouseUp);
        }
        
        function handleMouseMove(e: MouseEvent): void {
            console.log('mousemove');
            dragAndDropElement.draggable.style.left = `${dragAndDropElement.draggable.offsetLeft - dragAndDropElement.x + e.clientX}px`
            dragAndDropElement.draggable.style.top = `${dragAndDropElement.draggable.offsetTop - dragAndDropElement.y + e.clientY}px`
        
            dragAndDropElement.x = e.clientX;
            dragAndDropElement.y = e.clientY;
        }
        
        function handleMouseUp(e: MouseEvent): void {
            dragAndDropElement.droppable.removeEventListener('mousemove', handleMouseMove);
            dragAndDropElement.draggable.removeEventListener('mouseup', handleMouseUp);
        }
    });    
}