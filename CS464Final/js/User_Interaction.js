function handleCkick(event) {
    unlocked = true;
}
function handleUnClick(event) {
    unlocked = false;
}
function handleDrag(event) {
    if (unlocked) {
        yRot += event.movementY * .1;
        xRot += event.movementX * .1;
    }
}
function handleScroll(event) {
    distance -= event.deltaY * .05;
}

function install_Handler(obj,action,func)
{
    obj.addEventListener(action, func);
}