import React from 'react'
import Input from './Input.js'

class Form extends React.Component {
  state = {
      civ_name:'',
      army_styles: '',
      unique_units: ''
    }

  }
  handleChange (event) {
    this.setState({[event.target.id] : event.target.value})
  }
  handleSubmit (event){
    event.preventDefault()
    const civilization = {
      civ_name: this.state.civ_name,
    }
    if (this.props.civilization) civilization.id = this.props.civilization.id
    this.props.handleSubmit(
      event,
      civilization
    )
  }

  componentWillMount (){
    if (this.props.civilization) {
      const { civ_name, army_styles, unique_units, id } = this.props.civilization;
      this.setState({
        civ_name: civ_name || '',
        army_styles: army_styles || '',
        unique_units: unique_units || '',
        id: id || ''
      })
    }
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
            handleChange={this.handleChange}
            name={'civ_name'}
            placeholder={'Civilization Name'}
            type={'text'}
            value={this.state.civ_name}
            id={'civ_name'}
        />
        <Input
            handleChange={this.handleChange}
            name={'army_styles'}
            placeholder={'Strategic Focus'}
            type={'text'}
            value={this.state.army_styles}
            id={'army_styles'}
        />
        <Input
            handleChange={this.handleChange}
            name={'unique_units'}
            placeholder={'Unique Units'}
            type={'text'}
            value={this.state.unique_units}
            id={'unique_units'}
        />

        {/* POSSIBLY insert my TEXT AREA INPUT HERE: */}
         {/* <input type='submit' className="update-button" value={this.props.civilization ? "update this civilization" : "add a civilization"}/> */}
      </form>
    )
  }
}

export default Form