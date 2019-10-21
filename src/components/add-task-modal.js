import React, { Component } from 'react';
import { Modal, Button, TextField, styled, } from '@material-ui/core/'
import { DateTimePicker } from '@material-ui/pickers';

const ModalContainer = styled('div')({
    position: "absolute",
    width: 800,
    border: "2px solid #000",
    backgroundColor: "#53565c",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
})

const StyledDiv = styled('div')({
    display: "flex",
    justifyContent: "space-between",
    margin: 10,
    flexDirection: "column"

})

const ButtonContainer = styled("div")({
    display: "flex",
    justifyContent: "space-between",
})

class AddTaskModal extends Component {

    render() {
        const {
            showModal,
            onClose,
            onSubmit,
            handleChange,
            stopTime,
            onStopChange,
            onStartChange,
            startTime } = this.props

        return (
            <Modal
                open={showModal}
                onClose={onClose}>
                <ModalContainer>
                    <form onSubmit={onSubmit}>
                        <StyledDiv>
                            <TextField
                                required
                                onChange={handleChange}
                                name="title"
                                label="Task Title"
                                variant="filled" />
                            <TextField
                                required
                                multiline
                                onChange={handleChange}
                                name="description"
                                label="Task Description"
                                variant="filled" />
                            <DateTimePicker
                                required
                                margin="normal"
                                id="time-picker"
                                label="Start time"
                                name="startTime"
                                value={startTime}
                                onChange={onStartChange}
                            />
                            <DateTimePicker
                                margin="normal"
                                id="time-picker"
                                label="Stop time"
                                name="stopTime"
                                value={stopTime}
                                onChange={onStopChange}

                            />
                        </StyledDiv>
                        <ButtonContainer>
                            <Button onClick={onClose} variant="contained" color="primary">cancel</Button>
                            <Button type="submit" variant="contained" color="secondary">add task</Button>
                        </ButtonContainer>
                    </form>
                </ModalContainer>
            </Modal>
        )
    }
}

export default AddTaskModal;
