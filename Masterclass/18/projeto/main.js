const keys = document.querySelectorAll('.key')

function playNote(event){
    console.log(event)
}
window.addEventListener('keydown', playNote)