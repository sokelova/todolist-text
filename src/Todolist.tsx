import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./Input";
import { Input } from './Input';
import s from "./App.module.css";

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
    changeTaskStatus: (id:string, isDone: boolean) => void
    filter: string
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
                    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = event.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue);
                    }

                    return <li key={t.id} className={t.isDone ? s.isDone_executed : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === "all" ? s.active_filter : ""} onClick={ onAllClickHandler } >All</button>
            <button className={props.filter === "active" ? s.active_filter : ""} onClick={ onActiveClickHandler }>Active</button>
            <button className={props.filter === "completed" ? s.active_filter : ""} onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}
