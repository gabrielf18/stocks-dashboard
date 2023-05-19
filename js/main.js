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
        const price = data["Global Quote"]["05. price"]
        const previousClose = data["Global Quote"]["05. previous close"]
        if(price && previousClose){
            const priceFormatted = parseFloat(price).toFixed(2)
            const previousCloseFormatted = parseFloat(previousClose).toFixed(2)
            let princeChange = ''
            let symbol = ''
            if(priceFormatted !== previousCloseFormatted) {
                if (priceFormatted > previousCloseFormatted) {
                    princeChange = 'increased'
                    symbol = '+'
                } else {
                    princeChange = 'decrease'
                    symbol = '-'
                }
            }
            
            const newTicker = ` 
            <div class="ticker">
                <button class="btn-close" onclick="removeTicker(event)">X</button>
                <h2>${ticker}</h2>
                <p class = "${princeChange}">${symbol} U$${priceFormatted}</p>
            </div>             
            `
            const tickerList = document.querySelector('#ticker-list')
            tickerList.innerHTML = newTicker + tickerList.innerHTML 
            closeModal('#add-stock')
            addTickerCloseEvents()
        }else{
            alert(`Ticker ${ticker} não encontrado!`)
        }
    } catch(error){
        alert(error)
    }
}

const handleTickerMouseEnter = (event) => {
    const ticker = event.target
    const btnClose = ticker.querySelector(".btn-close")
    btnClose.style.display = "block"
}

const handleTickerMouseLeave = (event) => {
    const ticker = event.target
    const btnClose = ticker.querySelector(".btn-close")
    btnClose.style.display = "none"
}

const addTickerCloseEvents = () => {
    const ticker = document.querySelectorAll(".ticker")
    ticker.forEach((ticker) => {
        ticker.addEventListener("mouseenter", handleTickerMouseEnter)
        ticker.addEventListener("mouseleave", handleTickerMouseLeave)
    })
}

const removeTicker = (event) => {
    const btnClose = event.target
    const ticker = btnClose.closest('.ticker')
    ticker.remove()
}

const modal = document.querySelector('.modal')
modal.addEventListener('click', handleModalClose)

