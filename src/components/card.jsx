import React from 'react';
import '../assets/stylesSheets/card.scss'


function Card ({pokemon}) {

  return(
    <>
      <ul>
        <div className={`Card ${pokemon.types[0]}`}>
          <div className="Card__Image">
            <img src= {pokemon.img} alt='card'></img>
          </div>
          <div className="Card__Info">
            <p>{pokemon.name}</p>
            <p>{pokemon.id}</p>
          </div>
        </div>
      </ul>
    </>
  )
}

export default Card

