import React from 'react';
import * as moment from 'moment';

function TaskListRow ({ task }) {
  const status = {
    SUCCESS: 'table-success',
    FAILURE: 'table-error',
    PENDING: 'table-info'
  }[task.status];

  return (
    <tr className={status}>
      <th scope='row'>{task.id}</th>
      <td>{task.status}</td>
      <td>{moment(task.created).format('MMMM Do YYYY, h:mm:ss a')}</td>
      <td>{moment(task.updated).format('MMMM Do YYYY, h:mm:ss a')}</td>
    </tr>
  );
}

export default TaskListRow;
