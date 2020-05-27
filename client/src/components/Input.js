import React from 'react'
import FormControl from 'react-bootstrap/FormControl';

const Input = props => {
  const {
    handleChange,
    name,
    placeholder,
    // text,
    type,
    value
    } = props
    return (
      <>
        {/* <label htmlFor={name}>{text}</label> */}
        <FormControl  // my INPUT
          id={name}
          name={name}
          type={type}
          value={value}  // ???
          onChange={handleChange}
          placeholder={placeholder}

          as="textarea"
          size="sm"
          rows="3"
        />
      </>
    )
}

export default Input