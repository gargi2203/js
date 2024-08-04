let color = document.getElementById('color');
let createBtn = document.getElementById('createBtn');
let list = document.getElementById('list');

createBtn.onclick = () => {
    let newNote = document.createElement('div');
    newNote.classList.add('note');
    newNote.innerHTML = `
    <span class="close">x</span>
    <textarea
    placeholder="Write Content..."
    rows="10"
    cols="30"></textarea>`;
    newNote.style.borderColor = color.value;
    newNote.style.position = 'absolute';
    list.appendChild(newNote)
}

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('close')){
        e.target.parentNode.remove();
    }
})

let cursor = {
    x:null,
    y:null
}

let note = {
    dom: null, 
    x: null,
    y: null
}



function onMouseDown(e) {
    if (e.target.classList.contains('note')) {
        cursor = {
            x: e.clientX,
            y: e.clientY
        };
        note = {
            dom: e.target,
            x: e.target.getBoundingClientRect().left,
            y: e.target.getBoundingClientRect().top
        };
    }
}

function onTouchStart(e) {
    if (e.target.classList.contains('note')) {
        cursor = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
        note = {
            dom: e.target,
            x: e.target.getBoundingClientRect().left,
            y: e.target.getBoundingClientRect().top
        };
    }
}

function onMouseMove(e) {
    if (note.dom == null) return;
    let currentCursor = {
        x: e.clientX,
        y: e.clientY
    };
    let distance = {
        x: currentCursor.x - cursor.x,
        y: currentCursor.y - cursor.y
    };
    note.dom.style.left = (note.x + distance.x) + 'px';
    note.dom.style.top = (note.y + distance.y) + 'px';
    note.dom.style.cursor = 'grab';
}

function onTouchMove(e) {
    if (note.dom == null) return;
    let currentCursor = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
    };
    let distance = {
        x: currentCursor.x - cursor.x,
        y: currentCursor.y - cursor.y
    };
    note.dom.style.left = (note.x + distance.x) + 'px';
    note.dom.style.top = (note.y + distance.y) + 'px';
    note.dom.style.cursor = 'grab';
}

function onMouseUp() {
    if (note.dom == null) return;
    note.dom.style.cursor = 'auto';
    note.dom = null;
}

function onTouchEnd() {
    if (note.dom == null) return;
    note.dom.style.cursor = 'auto';
    note.dom = null;
}

document.addEventListener('mousedown', onMouseDown);
document.addEventListener('touchstart', onTouchStart);

document.addEventListener('mousemove', onMouseMove);
document.addEventListener('touchmove', onTouchMove);

document.addEventListener('mouseup', onMouseUp);
document.addEventListener('touchend', onTouchEnd);