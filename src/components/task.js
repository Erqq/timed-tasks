import React from 'react';
import { Button, styled } from '@material-ui/core/'
import moment from 'moment'

const StyledDiv = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "2px solid #000",
})

const StyledContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  maxWidth: 600,
  overflowWrap: " break-word"
})

const Task = (task, onClick, onDelete, index) => {
  const { title, description, startTime, stopTime } = task

  const getDuration = () => {
    const duration = moment.duration(moment(stopTime).diff(startTime))

    return `${duration.get("days")} days, ${duration.get("hours")} hours, ${duration.get("minutes")} minutes`
  }

  return (
    <StyledDiv key={title + index} className="Task">
      <StyledContent>
        <h2>{title}</h2>
        <p>{description}</p>
      </StyledContent>
      <StyledContent>
        <p>start {moment(startTime).format("DD.MM.YYYY, HH:mm")}</p>
        <p>end {moment(stopTime).format("DD.MM.YYYY, HH:mm")}</p>
        <p>duration {getDuration()}</p>
      </StyledContent>
      <div>
        <Button
          id={index}
          name="editTask"
          onClick={onClick}
          variant="contained"
          color="secondary">
          edit
        </Button>
        <Button
          id={index}
          onClick={onDelete}
          variant="contained"
          color="secondary">
          delete
        </Button>
      </div>
    </StyledDiv>
  );
}

export default Task;
