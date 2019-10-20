import React from 'react';

const Task = (title, description) => {
  return (
    <div className="Task">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

export default Task;
