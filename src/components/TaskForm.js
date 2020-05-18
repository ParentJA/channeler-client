import React from 'react';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';

function TaskForm ({ clearTasks, createTask }) {
  const onSubmit = async (values, actions) => {
    await createTask(values.duration, values.sync);
  };

  return (
    <>
      <h2>New Task</h2>
      <p className='lead'>Create a new long-running task.</p>
      <Formik
        initialValues={{
          duration: 5,
          sync: true
        }}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          handleSubmit,
          values
        }) => (
          <Form inline noValidate onSubmit={handleSubmit}>
            <Form.Group controlId='duration'>
              <Form.Label className='mr-2'>Duration</Form.Label>
              <Form.Control
                className='mr-2'
                name='duration'
                onChange={handleChange}
                type='number'
                value={values.duration}
              />
            </Form.Group>
            <Form.Check
              checked={values.sync}
              className='mr-2'
              label='Sync'
              name='sync'
              onChange={handleChange}
              type='checkbox'
            />
            <Button type='submit' variant='primary'>Create</Button>
          </Form>
        )}
      </Formik>
      <h2 className='mt-3'>Actions</h2>
      <Button block onClick={() => clearTasks()} type='button'>Clear Tasks</Button>
    </>
  );
}

export default TaskForm;
