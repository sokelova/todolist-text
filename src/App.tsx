import React, {useState} from 'react';
import './App.module.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';
import { FilterValuesType } from './Input';

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    function addTask(title: string, todolistId: string) {
        let task = { id: v1(), title: title, isDone: false };
        let tasks = tasksObj[todolistId];
        let newTasks = [task, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj});
    }

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter(t => t.id != id);
        tasksObj[todolistId] = filteredTasks;
        setTasks({...tasksObj});
    }

    function changeFilter(value: FilterValuesType, todolistId: string ) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist){
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === id);
        if (task){
            task.isDone = isDone;
            setTasks({...tasksObj});
        }
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] =  useState<Array<TodolistType>>( [
        {id: todolistId1, title:"What to learn", filter: 'all'},
        {id: todolistId2, title:"What to bye", filter: 'active'}
    ])

    let [tasksObj, setTasks] = useState({
        [todolistId1]:[
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false }
        ],
        [todolistId2]:[
            { id: v1(), title: "Book", isDone: true },
            { id: v1(), title: "Fox", isDone: true }
        ]
    })

    return (

        <div className="App">
            {todolists.map((tl) => {

                let allTodolistTasks = tasksObj[tl.id];
                let tasksForTodolist = allTodolistTasks;

                if (tl.filter === "active") {
                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                }

               return <Todolist
                   key={tl.id}
                   id={tl.id}
                   title={tl.title}
                   tasks={tasksForTodolist}
                   removeTask={removeTask}
                   changeFilter={changeFilter}
                   addTask={addTask}
                   changeTaskStatus={changeStatus}
                   filter={tl.filter}
                />
                })
            }
        </div>
    );
}

export default App;
