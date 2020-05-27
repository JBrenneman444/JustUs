import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

// import styled from 'styled-components';

const EditForm = props => {
    const {
        cancel,
        submit,
        submitButtonText,
        elements
    } = props;

    function handleSubmit(event) {
        event.preventDefault();
        submit();
    }

    function handleCancel(event) {
        event.preventDefault();
        cancel();
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                {elements()}

                <Button className="mr-1" variant="primary" type="submit">
                    {submitButtonText}
                </Button>
                <Button className="mr-1" variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
            </Form>
        </>
    );

}

export default ReactStrapForm;