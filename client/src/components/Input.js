import React from 'react'
// import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';

const Input = props => {
  const {
    handleChange,
    name,
    placeholder,
    // text,
    type,
    value,
    as,
    size,
    rows
    } = props
    return (
      <>
        {/* <label htmlFor={name}>{text}</label> */}
        <Form.Control  // my INPUT
          id={name}
          name={name}
          type={type}
          value={value}  // ???
          onChange={handleChange}
          placeholder={placeholder}

          as={as}
          size={size}
          rows={rows}
        />
      </>
    )
}

export default Input