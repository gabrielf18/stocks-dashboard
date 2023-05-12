const openModal = (idModal) => {
    const divModal = document.querySelector(idModal)
     divModal.style.display = "flex"
}

const closeModal = (idModal) => {
    const divModal = document.querySelector(idModal)
     divModal.style.display = "none"
}

const handleModalClose = (event) => {
    
    if (event && event.target.className === "modal") {
        event.target.style.display = 'none'
    }
}

const handleAddTicker = async (event) => {
    event.preventDefault() // impede que o form seja enviado
    const ticker = event.target.ticker.value // pega o valor do input
    try{
        const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=2DK6K8A5A8UIYIT2`) //faz a requisição no API
        const data = await response.json() // transforma a resposta JSON em objeto
        console.log(data)
        const price = data["Global Quote"]["05. price"]
        if(data["Global Quote"]["05. price"]){
            const newTicker = ` 
            <div class="ticker">
                <h2>${ticker}</h2>
                <p>${price}</p>
            </div>             
            `

            const tickerList = document.querySelector('#ticker-list')
            tickerList.innerHTML += newTicker
            closeModal('#add-stock')
        }else{
            alert(`Ticker ${ticker} não encontrado!`)
        }
    } catch(error){
        alert(error)
    }
}

const modal = document.querySelector('.modal')
modal.addEventListener('click', handleModalClose)