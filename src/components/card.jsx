import React from 'react';
import '../assets/stylesSheets/card.scss'
import pokeLogo from '../assets/images/Logo.png'

function Card ({pokemon, onCardClick, }) {
  return(
    <>
      {
        !pokemon.flipped && (
          <ul>
            <div 
            className='Card back'
            onClick={ onCardClick}
            >
              <div >
                <p>.</p>
              <div 
                className="Card__Image"
                style={{width: '100%', display:'flex', justifyContent: 'center'}}>
                <img src= {pokeLogo} alt='card'></img>
              </div>
                <p>.</p>
              </div>
            </div>
          </ul>
        )
      }
      {
        pokemon.flipped && (
          <ul>
            <div 
            className={`Card ${pokemon.types[0]}`}
            onClick={ onCardClick}
            >
              <div className="Card__Image">
                <img src= {pokemon.img} alt='card'></img>
              </div>
              <div className="Card__Info">
                <p>{pokemon.name}</p>
                <p>{pokemon.pokeId}</p>
              </div>
            </div>
          </ul>
        )
      } 
  

    </>

  )
}

export default Card

