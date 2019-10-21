import React, { Component } from 'react';
import { Modal, Button, TextField, styled, } from '@material-ui/core/'
import { DateTimePicker } from '@material-ui/pickers';
import { Formik } from "formik"


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
    state = {
        startTime: new Date(),
        stopTime: new Date(),
    }

    onStartChange = (time, setFieldValue) => {
        const { stopTime, startTime } = this.state
        this.setState({ startTime: time })
        setFieldValue("startTime", time)

        stopTime < time ?
            this.setState({ stopTime: time } && setFieldValue("stopTime", time)) :
            this.setState({ stopTime } && setFieldValue("stopTime", startTime))

    }

    onStopChange = (time, setFieldValue) => {
        const { startTime, } = this.state
        console.log(startTime);

        time < startTime ?
            this.setState({ stopTime: startTime } && setFieldValue("stopTime", startTime)) :
            this.setState({ stopTime: time } && setFieldValue("stopTime", time))
    }

    initialValues = () => {
        return {
            startTime: new Date(),
            stopTime: new Date(),
            title: "",
            description: ""
        }
    }

    render() {
        const { showModal, onClose, onSubmit, } = this.props
        return (
            <Modal
                open={showModal}
                onClose={onClose}>
                <ModalContainer>
                    <Formik
                        onSubmit={(values) => {
                            onSubmit(values); this.setState({
                                startTime: new Date(),
                                stopTime: new Date(),
                            })
                        }}
                        initialValues={this.initialValues}
                        render={props => (
                            <form onSubmit={props.handleSubmit}>
                                <StyledDiv>
                                    <TextField
                                        required
                                        onChange={props.handleChange}
                                        name="title"
                                        label="Task Title"
                                        variant="filled" />
                                    <TextField
                                        required
                                        multiline
                                        onChange={props.handleChange}
                                        name="description"
                                        label="Task Description"
                                        variant="filled" />
                                    <DateTimePicker
                                        required
                                        margin="normal"
                                        id="time-picker"
                                        label="Start time"
                                        name="startTime"
                                        value={props.values.startTime}
                                        onChange={(time) => this.onStartChange(time, props.setFieldValue)}
                                    />
                                    <DateTimePicker
                                        margin="normal"
                                        id="time-picker"
                                        label="Stop time"
                                        name="stopTime"
                                        value={props.values.stopTime}
                                        onChange={(time) => this.onStopChange(time, props.setFieldValue)}

                                    />
                                </StyledDiv>
                                <ButtonContainer>
                                    <Button onClick={onClose} variant="contained" color="primary">cancel</Button>
                                    <Button type="submit" variant="contained" color="secondary">add task</Button>
                                </ButtonContainer>
                            </form>
                        )}
                    />

                </ModalContainer>
            </Modal>
        )
    }
}

export default AddTaskModal;
