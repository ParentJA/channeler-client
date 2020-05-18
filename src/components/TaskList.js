import React from 'react';
import { Table } from 'react-bootstrap';

import TaskListRow from './TaskListRow';

function TaskList ({ tasks }) {
  let tableBody;

  if (tasks.length === 0) {
    tableBody = <tr><td className='text-center' colSpan='4'>No tasks.</td></tr>
  } else {
    tableBody = tasks.map(task => <TaskListRow key={task.id} task={task} />)
  }

  return (
    <>
      <h2>Tasks</h2>
      <Table>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Status</th>
            <th scope='col'>Created</th>
            <th scope='col'>Updated</th>
          </tr>
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </Table>
    </>
  );
}

export default TaskList;
