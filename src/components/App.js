import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  changeFilter = (e) => {
    this.setState({filters: {type: e.target.value}})
  }

  onFindPetsClick=(e)=>{
    let fetchPath = "/api/pets"

    if(this.state.filters.type !== "all"){
      fetchPath = fetchPath + `?type=${this.state.filters.type}`
    }

    fetch(fetchPath)
    .then(resp => resp.json())
    .then(date => {
      this.setSate({pets: data})
    })
  }

  onAdoptPet = (petId)=>{
    let newPets = this.state.pets.map(pet => {
      return pet.id === petId ? {...pet, isAdopted: true} : pet
    })

    this.setState({pets: newPets})
  }
  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
              onChangeType={this.state.filters.type}
              onFindPetsClick={this.onFindPetsClick} 
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
