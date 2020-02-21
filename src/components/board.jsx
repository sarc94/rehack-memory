import React , { useState, useEffect} from 'react'
import Card from './card'
import '../assets/stylesSheets/board.scss'

function Board ({pokemons, shuffle}) {
  const [doublePoke, setDoublePoke] = useState([])

  useEffect(()=>{
    setDoublePoke(shuffle([...pokemons, ...pokemons]))
  },[pokemons])

  return (
    <div className='board'>
       {doublePoke && doublePoke.map((pokemon, i) => {
        return (
        <Card
          key= {i}
          pokemon= {pokemon}
          />
          )
      })}
    </div>
  )
}

export default Board