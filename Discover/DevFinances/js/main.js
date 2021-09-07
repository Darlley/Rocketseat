(function(){
    
    const btn = window.document.querySelector('[data-js="input"]')
    btn.addEventListener('click', () => {
        window.document.body.classList.toggle('dark-theme');
    })    

    const $htmlModal = window.document.querySelector('[data-js="modal"]');
    const $btnNewTransaction = window.document.querySelector('[data-js="new-transaction"]');
    $btnNewTransaction.addEventListener('click', (event) => {
        event.preventDefault();
        $htmlModal.classList.add('active');

        if($htmlModal.classList.value == "modal-overlay active"){
            document.addEventListener('click', (event) => {
                if(event.target.classList.value === "modal-overlay active"){
                    $htmlModal.classList.remove('active');
                }
            })
        } // Fechar quando clicar fora da caixa
    })
    
    const $btnCancelTransaction = window.document.querySelector('[data-js="cancel-transaction"]');
    $btnCancelTransaction.addEventListener('click', (event) => {
        event.preventDefault();
        $htmlModal.classList.remove('active');
    })

    // Cadastrar dados
    const transactions = [
        {
            id: 1,
            description: 'Luz',
            amount: -50000,
            date: '23/01/2021'
        },
        {
            id: 2,
            description: 'Website',
            amount: 500000,
           date: '23/01/2021'
        },
        {
            id: 3,
            description: 'Internet',
            amount: -20000,
            date: '23/01/2021'
        },
    ]

    const Transaction = {
        incomes(){

        },
        expenses(){

        },
        total(){

        }
    }

    const DOM = {
        innerHTMLTransaction(){
            const $html = `
            <tr>
                <td class="description">Luz</td>
                <td class="expanse">- R$ 50,00</td>
                <td class="date">23/01/2021</td>
                <td>
                    <img src="assets/minus.svg" alt="Remover transação">
                </td>
            </tr>
            `
        }
    }
    
})()