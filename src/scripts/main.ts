import '../styles/main.sass';

type Draggable = {
    element: HTMLElement;
    x: number;
    y: number;
}

const draggableElement: HTMLElement | null = document.querySelector('.draggable');
if (!draggableElement) {
    throw Error('No draggable element found');
}

const draggable: Draggable = {
    element: draggableElement,
    x: 0,
    y: 0
}

draggable.element.addEventListener('mousedown', handleMouseDown);

function handleMouseDown(e: MouseEvent): void {
    draggable.x = e.clientX;
    draggable.y = e.clientY;

    draggable.element.addEventListener('mousemove', handleMouseMove);
    draggable.element.addEventListener('mouseup', handleMouseUp);
}

function handleMouseMove(e: MouseEvent): void {
    draggable.element.style.left = `${draggable.element.offsetLeft - draggable.x + e.clientX}px`
    draggable.element.style.top = `${draggable.element.offsetTop - draggable.y + e.clientY}px`

    draggable.x = e.clientX;
    draggable.y = e.clientY;
}

function handleMouseUp(e: MouseEvent): void {
    draggable.element.removeEventListener('mousemove', handleMouseMove);
    draggable.element.removeEventListener('mouseup', handleMouseUp);
}