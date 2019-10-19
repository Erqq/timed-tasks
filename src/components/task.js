import React from 'react';

function Task(name, description) {
  return (
    <div className="Task">
        <h1>{name}</h1>
        <p>{description}</p>
    </div>
  );
}

export default Task;
