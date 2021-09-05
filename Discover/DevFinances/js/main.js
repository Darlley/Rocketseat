(function(){
    const $htmlModal = window.document.querySelector('[data-js="modal"]');
    const $btnNewTransaction = window.document.querySelector('[data-js="new-transaction"]');
    $btnNewTransaction.addEventListener('click', (event) => {
        event.preventDefault();
        $htmlModal.classList.add('active');
    })

    const $btnCancelTransaction = window.document.querySelector('[data-js="cancel-transaction"]');
    $btnCancelTransaction.addEventListener('click', (event) => {
        event.preventDefault();
        $htmlModal.classList.remove('active');
    })


})()