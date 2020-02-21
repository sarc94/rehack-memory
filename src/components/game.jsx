import React ,{ useState, useEffect } from 'react'
import Board from './board'

function Game () {
  const [pokemons, setPokemons] = useState([])
  const numberArray = [...Array(150).keys()].map(x => ++x)
  const indexArray = shuffle(numberArray).splice(0,10)

  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const huntingPokemon = async function () {
    const promises = []

    for (const id of indexArray) {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      promises.push(res.json())
    }

    Promise.all(promises).then(val => {
      const arr = []
      for (const obj of val) {
        const {name, types, id,} = obj
        const thePoke ={
          name:capitalizeFirstLetter(name),
          types:types.map((type) => capitalizeFirstLetter(type.type.name)).join(', ').split(", ").reverse(),
          id,
          img: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`
        }
        arr.push(thePoke)
      };
      setPokemons(arr)
      })
    }

  useEffect(() => {
    huntingPokemon()
  },[])

  useEffect(()=> {
    if (pokemons.length === 10) {
      console.log('ya estan los 10', pokemons)
    }
  })
 
  return (
      <Board pokemons = {pokemons}
      shuffle ={shuffle}
      />
  );

}

export default Game