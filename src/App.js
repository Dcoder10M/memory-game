import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages=[
  {"src": "/images/m2.jpg", matched: false},
  {"src": "/images/m1.jpg", matched: false},
  {"src": "/images/m3.jpg", matched: false},
  {"src": "/images/m4.jpg", matched: false},
  {"src": "/images/m5.jpg", matched: false},
  {"src": "/images/m6.jpg", matched: false}
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //shuffle
  const shuffleCards=()=>{
    const shuffledCards=[...cardImages, ...cardImages]
     .sort(()=> Math.random()-0.5)
     .map((card)=>({...card , id: Math.random()}))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  //handle a choice
  const handleChoice = (card)=>{
    choiceOne?setChoiceTwo(card):setChoiceOne(card)
  }


  //comparing the cards
  useEffect(()=>{
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards=>{
          return prevCards.map(card=>{
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      }else{
        setTimeout(()=>resetTurn(),1000)
      }
    }
  },[choiceOne,choiceTwo])

  console.log(cards)

  //reset choices & increse turn 
  const resetTurn =()=>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns=>prevTurns+1)
    setDisabled(false)
  }

  //staring automatically
  useEffect(()=>{
    shuffleCards()
  },[])

  return (
    <div className="App">
      <h1 className="divyanshu">FLIP IT UP</h1>
      <button onClick={shuffleCards} class="glow-on-hover" type="button">NEW GAME</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped={card===choiceOne || card===choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
