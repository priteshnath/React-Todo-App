import React, { useEffect, useState } from 'react'
import { FaCheck } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import TodoFrom from '../Components/TodoFrom';



const TodoPage = () => {
    const [task, setTask] = useState(() => {
        const ToData = localStorage.getItem('TodoData');
        return ToData ? JSON.parse(ToData) : [];
    });
    const [dateTime, setDateTime] = useState("");

    const handleFormSubmit = (inputValue) => {
        const {id, content, checked} = inputValue;
        if (!content) return;
        
        const isTaskContain = task.find( (curTask) => curTask.content == content );
        if(isTaskContain)return;

        setTask((prevTask) => [...prevTask, {id:id, content:content, checked:checked}]);
    };

    localStorage.setItem('TodoData' ,JSON.stringify(task));

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const currDate = now.toLocaleDateString();
            const currTime = now.toLocaleTimeString();
            setDateTime(`${currDate} - ${currTime}`);
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    

    const handleDelteTask = (id) => {
        const updatedTask = task.filter((currTask) => {
            return currTask.id !== id;
        })
        setTask(updatedTask);
    };

    const handleCheckedTask = (value) =>{
        const updatedTask = task.map((curTask) =>{
            if(curTask.content === value){
                return {...curTask, checked : !curTask.checked};
            }else{
                return curTask;
            }
        });
        setTask(updatedTask);
    }

    const handleClearAll = () => {
        setTask([]);
    }

    return (
        <>
            <div className='h-screen w-screen bg-slate-800 flex justify-center'>
                <div>
                    <div className='mt-10'>
                        <h1 className='text-white text-center text-4xl font-bold'>Todo List</h1>
                    </div>
                    <div className='flex items-center justify-center text-white text-xl font-bold mt-2'>{dateTime}</div>
                    <TodoFrom onAddTodo = {handleFormSubmit}/>
                    <div className='flex justify-center mt-5'>
                        <ul>
                            {
                                task.map((curTask) => {
                                    const {id, content, checked} = curTask;
                                    return <li key={curTask.id} className='rounded-full px-4 bg-white min-w-80 mb-3 flex items-center'>
                                        <span className={`w-[70%] inline-block ${checked ? 'line-through' : ''}`}>{content}</span>
                                        <button className='text-black text-xl p-1 m-2 border-black border' id='checkBtn' onClick={() => handleCheckedTask(content)}><FaCheck /></button>
                                        <button className='text-black text-xl p-1 m-2 border-black border' id='deleteBtn' onClick={() => handleDelteTask(id)}><MdDelete /></button>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                    <div className='flex item-center justify-center mt-3'>
                        <button className='bg-green-500 rounded-md px-4 py-2 text-white font-bold' onClick={handleClearAll}>Clear All</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoPage