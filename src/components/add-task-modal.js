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
    componentDidMount = () => {
        const { values } = this.props
        if (values) this.setState({ startTime: values.startTime, stopTime: values.stopTime })

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
        const { values } = this.props

        return {

            title: values ? values.title : "",
            description: values ? values.description : "",
            startTime: values ? values.startTime : new Date(),
            stopTime: values ? values.stopTime : new Date(),
        }
    }

    render() {
        const { showModal, onClose, onSubmit, type } = this.props

        return (
            <Modal
                open={showModal}
                onClose={onClose}>
                <ModalContainer>
                    <Formik
                        onSubmit={onSubmit}
                        initialValues={this.initialValues()}
                        render={props => (
                            <form onSubmit={props.handleSubmit}>
                                <StyledDiv>
                                    <TextField
                                        required
                                        value={props.values.title}
                                        onChange={props.handleChange}
                                        name="title"
                                        label="Task Title"
                                        variant="filled" />
                                    <TextField
                                        required
                                        value={props.values.description}
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
                                    <Button
                                        onClick={onClose}
                                        variant="contained"
                                        color="primary">
                                        cancel
                                         </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="secondary">
                                        {type === "addTask" ? "Add Task" : "edit"}
                                    </Button>
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
