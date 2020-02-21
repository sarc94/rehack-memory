import React ,{ useState, useEffect } from 'react'
import Board from './board'
import pokemons2 from './pokemons2'
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
      let i = 0
      const arr = []
      for (const obj of val) {
        const {name, types, id,} = obj
        const thePoke ={
          id: i++,
          name:capitalizeFirstLetter(name),
          types:types.map((type) => capitalizeFirstLetter(type.type.name)).join(', ').split(", ").reverse(),
          pokeId:id,
          img: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
          flipped: false
        }
        arr.push(thePoke)
      };
      setPokemons(arr)
      })
    }

  useEffect(() => {
    huntingPokemon()
  },[])


  return (
      <Board pokemons = {pokemons2}
      shuffle ={shuffle}
      />
  );
  

}

export default Game