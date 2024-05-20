export function mostrarSpinner() {
    action(true);
}

export function ocultarSpinner() {
    action();
}

function action(visible = false) {
    const display = visible ? 'flex' : 'none';
    document.getElementById('spinner-box').style.display = display;
    document.getElementById('spinner').style.display = display;
}