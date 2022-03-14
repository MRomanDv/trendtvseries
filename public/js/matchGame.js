const seriesArray = [
    {
        name : 'serie1',
        img : '/public/imgs/matchgameposter1.jpeg'
    },
    {
        name : 'serie2',
        img : '/public/imgs/matchgameposter2.jpeg'
    },
    {
        name : 'serie3',
        img : '/public/imgs/matchgameposter3.jpeg'
    },
    {
        name : 'serie4',
        img : '/public/imgs/matchgameposter4.jpg'
    },
    {
        name : 'serie5',
        img : '/public/imgs/matchgameposter5.jpeg'
    },
    {
        name : 'serie6',
        img : '/public/imgs/matchgameposter6.jpeg'
    },
    {
        name : 'serie1',
        img : '/public/imgs/matchgameposter1.jpeg'
    },
    {
        name : 'serie2',
        img : '/public/imgs/matchgameposter2.jpeg'
    },
    {
        name : 'serie3',
        img : '/public/imgs/matchgameposter3.jpeg'
    },
    {
        name : 'serie4',
        img : '/public/imgs/matchgameposter4.jpg'
    },
    {
        name : 'serie5',
        img : '/public/imgs/matchgameposter5.jpeg'
    },
    {
        name : 'serie6',
        img : '/public/imgs/matchgameposter6.jpeg'
    }
    
]

seriesArray.sort(()=> Math.random() - 0.5)
console.log(seriesArray)

//GAME BOARD
const gameBoard = document.querySelector('.gridcontainer')
const match = document.querySelector('.match')
let cardsId = []
let cardsName = []
let score = 0
let cardsWon = []



function game(){
    for(i = 0; i < seriesArray.length; i++) {
        //SELECTORS
        const imgContainer = document.createElement('div')
        const img = document.createElement('img')

        img.setAttribute('data-id',i)
        imgContainer.classList.add('img')
        img.setAttribute('src','/public/imgs/TopOfCard.png' )
        img.classList.add('poster')
        
        //APPEND CHILDS
        gameBoard.appendChild(imgContainer)
        imgContainer.appendChild(img)

        img.addEventListener('click', turnCards)
    }

    function turnCards(){
        let data = this.getAttribute('data-id')
        cardsId.push(data)
        cardsName.push(seriesArray[data].name) 
        this.setAttribute('src', seriesArray[data].img)
        if(cardsId.length == 2) {
            setTimeout(checkForMatch, 500) 
        }

        function checkForMatch() {
            const cards = document.querySelectorAll('img')
            const cardsContainer = document.querySelector('.img')
            let optionOneId = cardsId[0]
            let optionTwoId = cardsId[1] 

            console.log(cardsId + cardsName)
            
            
            //MATCH
            if(optionOneId != optionTwoId  && cardsName[0] == cardsName[1]) {
                
                cards[optionOneId].setAttribute('src','/public/imgs/Matched.png')
                cards[optionTwoId].setAttribute('src','/public/imgs/Matched.png')

                score ++
                
                match.innerHTML =`<h3>Score ${score} </h3>`
                             
                cards[optionTwoId].classList.add('hidden')
                cards[optionOneId].removeEventListener('click',turnCards)
                cards[optionTwoId].removeEventListener('click',turnCards)
                
                cardsWon.push(score)
                if (cardsWon.length == 6) {
                    match.innerHTML = `<h3>You have won!! </h3>`
                }
                console.log(score)

                
            //NOT A MATCH
            }else if (optionTwoId == optionOneId || cardsName[0] != cardsName[1]) {
                cards[optionOneId].setAttribute('src','/public/imgs/TopOfCard.png' )
                cards[optionTwoId].setAttribute('src','/public/imgs/TopOfCard.png' )
            }
            cardsId = []
            cardsName = []
        }

    }

    
}

   

game()