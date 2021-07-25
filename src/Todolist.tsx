import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./Input";
import { Input } from './Input';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => { props.changeFilter("all");};
    const onActiveClickHandler = () => { props.changeFilter("active");};
    const onCompletedClickHandler = () => { props.changeFilter("completed");};

    return <div>
        <h3>{props.title}</h3>
        <div>
            <Input addTask={props.addTask}/>
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => {props.removeTask(t.id)}

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={ onAllClickHandler }>All</button>
            <button onClick={ onActiveClickHandler }>Active</button>
            <button onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}
