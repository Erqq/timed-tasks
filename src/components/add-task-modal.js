import React, { Component } from 'react';
import { Modal, Button, TextField } from '@material-ui/core/'
import { styled } from '@material-ui/core/styles';

const Modaldiv = styled('div')({
    position: "absolute",
    width: 400,
    border: "2px solid #000",
    backgroundColor: "#53565c",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
})

class AddTaskModal extends Component {


    render() {
        const { showModal, onClose, onSubmit, handleChange } = this.props

        return (

            <Modal open={showModal}
                onClose={onClose}
            >
                <Modaldiv >
                    <form onSubmit={onSubmit}>
                        <TextField onChange={handleChange} name="title" label="Task Title" variant="filled"></TextField>
                        <TextField onChange={handleChange} name="description" label="Task Description" variant="filled" ></TextField>
                        <Button type="submit" variant="contained" color="secondary">add task</Button>

                    </form>
                    <Button onClick={onClose} variant="contained" color="secondary">cancel</Button>

                </Modaldiv>
            </Modal>


        )

    }
}

export default AddTaskModal;
