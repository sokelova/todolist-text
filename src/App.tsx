import React, {useState} from 'react';
import './App.module.css';
import {TaskType, Todolist} from './Todolist';
import { v1 } from 'uuid';
import { FilterValuesType } from './Input';
import {AddItemForm} from "./components/addItem/AddItemForm";

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const addTodolist = (title: string) => {
        let newTodolistId = v1();
        let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: "all"};
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasksObj,
            [newTodolistId]: []
        })
    }

    function addTask(title: string, todolistId: string) {
        let task = { id: v1(), title: title, isDone: false };
        let tasks = tasksObj[todolistId];
        tasksObj[todolistId] = [task, ...tasks];
        setTasks({...tasksObj});
    }

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        tasksObj[todolistId] = tasks.filter(t => t.id != id);
        setTasks({...tasksObj});
    }

    function removeTodolist(todolistId: string) {
        let delTodolist = todolists.filter(t => t.id != todolistId);
        setTodolists(delTodolist);
        delete tasksObj[todolistId];
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
    const changeTitle = (id: string, newTitle: string, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === id);
        if (task){
            task.title = newTitle;
            setTasks({...tasksObj});
        }
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] =  useState<Array<TodolistType>>( [
        {id: todolistId1, title:"What to learn", filter: 'all'},
        {id: todolistId2, title:"What to bye", filter: 'active'}
    ])

    let [tasksObj, setTasks] = useState<TaskStateType>({
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
            <AddItemForm addItem={addTodolist}/>
            {todolists.map((tl) => {

                let allTodolistTasks = tasksObj[tl.id];
                let tasksForTodolist = allTodolistTasks;

                if (tl.filter === "active") {
                    tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
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
                   changeTaskTitle={changeTitle}
                   filter={tl.filter}
                   removeTodolist={removeTodolist}
                />
                })
            }
        </div>
    );
}

export default App;
