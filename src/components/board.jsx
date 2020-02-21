import React , { useState, useEffect} from 'react'
import Card from './card'
import '../assets/stylesSheets/board.scss'

function Board ({pokemons, shuffle}) {
  const [doublePoke, setDoublePoke] = useState([])
  const [matched, setMatched] = useState([])
  const [founded, setFounded] = useState([])

  const onCardClick = poke => () => {
    if (matchedFull(matched) || pokeAlreadyInmatched(matched, poke)) return
    const newmatched = [...matched, poke]
    setMatched(newmatched)
    const pokesInmatchedMatched = validatematched(newmatched)
    if (pokesInmatchedMatched) {
      setFounded([...founded, newmatched[0].pokeId])
    }
    if (matchedFull(newmatched)) {
      resetMatchedAfter(1000)
    }
    function validatematched(matched){
      return matched.length === 2 &&
      matched[0].pokeId === matched[1].pokeId
    }
    function pokeAlreadyInmatched(matched, poke){
      return matched.length === 1 && matched[0].id === poke.id
    }
    function matchedFull(matched){
      return matched.length === 2
    }
    function resetMatchedAfter(time) {
      setTimeout(() => {
        setMatched([])
      }, time)
    }
  }

  function endGame () {
    alert('You catch them all!!!!!!!')
    window.location.reload(true)
  }

  useEffect(() => {
    if (founded.length === 10) {
      setTimeout(() => {
        endGame()
      }, 1000); 
    }
  },[founded])

  useEffect(() => {
    const newDoublePoke = doublePoke.map(poke => ({
      ...poke,
      flipped:
        matched.find(c => c.id === poke.id) ||
        founded.includes(poke.pokeId),
    }))
    setDoublePoke(newDoublePoke)
  }, [matched, founded])


  useEffect(()=>{
    setDoublePoke(shuffle([...pokemons]));
  },[])

  return (
    <div className='board'>
       {doublePoke && doublePoke.map((pokemon, i) => {
        return (
        <Card
          key= {i}
          pokemon= {pokemon}
          onCardClick={onCardClick(pokemon)}/>
        )
      })}
    </div>
  )
}

export default Board