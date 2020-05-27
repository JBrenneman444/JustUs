import React from 'react';
import Form from 'react-bootstrap/Form';
import Input from './Input.js'
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

class UpdateColor extends React.Component {
    constructor (props) {
    super(props)
    this.state = {
        faveColor:''
        // this.props.couple.user1.faveColor,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
}
    // copied from Add.js -- NOT FUNCTIONAL
    handleChange = (event) => {
        this.setState({[event.target.id] : event.target.value})
    }

    // copied from Add.js -- NOT FUNCTIONAL
    handleSubmit = (event) => {
        event.preventDefault()
        const message = {
          text: this.state.text,
          tag: this.state.tag,
          createdBy: this.state.createdBy
        }
        if (this.props.message) message.id = this.props.message.id
        this.props.handleAddMessage(event,message)
        this.setState({
            text: '',
            tag: '',
            createdBy: this.props.currentUser
          });
    }

    componentWillMount() {
        if (this.props.message) {
          const { text, tag, createdBy, id } = this.props.message;
          this.setState({
            text: text || '',
            tag: tag || '',
            createdBy: createdBy || '',
            id: id || ''
          })
        }
      }

render () {
    return (
        <>
            <Form onSubmit={this.handleSubmit}>
                <InputGroup size="sm"> 
                    <Input
                        handleChange={this.handleChange}
                        name={'faveColor'}
                        placeholder={'Favorite Color?'}
                        type={'text'}
                        value={this.state.faveColor}
                        id={'faveColor'}
                    />
                </InputGroup>
                {/* SUBMIT BUTTON */}
                <InputGroup.Append>
                    <Button
                        variant="outline-dark"
                        size="sm"
                        type="submit"
                    >
                        SEND
                    </Button>
                </InputGroup.Append>

            </Form>
        </>
    );

}}

export default UpdateColor;