import React from 'react';
import Form from 'react-bootstrap/Form';
import Input from './Input.js'
import Button from 'react-bootstrap/Button';
// import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

class Add extends React.Component {
    constructor (props) {
    super(props)
    this.state = {
        text:'',
        tag:'',
        createdBy:''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
}
    handleChange = (event) => {
        this.setState({[event.target.id] : event.target.value})
    }

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
            createdBy: ''
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
                <InputGroup> 
                    <Input
                        handleChange={this.handleChange}
                        name={'text'}
                        placeholder={'Send something to ' + this.props.couple.user2.name}
                        type={'text'}
                        value={this.state.text}
                        id={'text'}
                    />
                    <Input
                        handleChange={this.handleChange}
                        name={'tag'}
                        placeholder={'any tags?'}
                        type={'text'}
                        value={this.state.tag}
                        id={'tag'}
                    />
                    <Input
                        handleChange={this.handleChange}
                        name={'createdBy'}
                        placeholder={this.props.currentUser}
                        type={'text'}
                        value={this.state.createdBy}
                        id={'createdBy'}
                    />
                </InputGroup>

                    {/* SUBMIT BUTTON */}
                <InputGroup.Append>
                    <Button
                        variant="outline-light"
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

export default Add;