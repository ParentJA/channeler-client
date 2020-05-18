import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import './App.css';

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const socket = new WebSocket('ws://54.92.187.158/tasks/');

function App () {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const onMessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.hasOwnProperty('task')) {
        setTasks(oldTasks => {
          const newTasks = [...oldTasks];
          newTasks[newTasks.length - 1] = message.task;
          return newTasks;
        });
        toast.success('I\'m done.'); 
      } else if (message.hasOwnProperty('detail')) {
        toast.info('Pending...');
      } else {
        console.log(message);
      }
    };
    socket.addEventListener('message', onMessage);
    return () => {
      socket.close();
    }
  }, []);

  useEffect(() => {
    const listTasks = async () => {
      const response = await axios.get('/tasks/');
      setTasks(response.data);
    };
    listTasks();
  }, []);

  let intervalId = 0;

  const clearTasks = async () => {
    const response = await axios.post('/tasks/clear/');
    toast.warn(response.data.detail);
    setTasks([]);
  };

  const createTask = async (duration, sync) => {
    const response = await axios.post('/tasks/', { duration, sync });
    const task = response.data;
    setTasks(prevTasks => [...prevTasks, task]);
    if (sync) {
      clearInterval(intervalId);
      intervalId = setInterval(async () => {
        toast.info('Are you done yet?');
        const response = await axios.get(`/tasks/${task.id}/`);
        setTasks(oldTasks => {
          const newTasks = [...oldTasks];
          newTasks[newTasks.length - 1] = response.data;
          return newTasks;
        });
        if (response.data.status !== 'PENDING') {
          clearInterval(intervalId);
          toast.success('I\'m done.');
        }
      }, 1000);
    } else {
      const group = `task-${task.id}`;
      socket.send(JSON.stringify({ group }));
    }
  };

  return (
    <>
      <Container className='pt-3'>
        <Row>
          <Col>
            <TaskForm clearTasks={clearTasks} createTask={createTask} />
          </Col>
          <Col>
            <TaskList tasks={tasks} />
          </Col>
        </Row>
      </Container>
      <ToastContainer autoClose={1500} />
    </>
  );
}

export default App;
