import React, { useState } from 'react'
import { FaCheck } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";



const TodoPage = () => {
    const [inputValue, setInputValue] = useState("");
    const [task, setTask] = useState([]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(!inputValue)return;
        if(task.includes(inputValue)){
            setInputValue("");
            return;
        };

        setTask((prevTask) => [...prevTask, inputValue]);

        setInputValue("");
    };
    console.log(task);
    
    
    return (
        <>
            <div className='h-screen w-screen bg-slate-800 flex justify-center'>
                <div>
                    <div className='mt-10'>
                        <h1 className='text-white text-center text-4xl font-bold'>Todo List</h1>
                    </div>
                    <div>
                        <form onSubmit={handleFormSubmit}>
                            <div className='mt-8'>
                                <input type="text" placeholder='Enter Task' className='border-none outline-none rounded-tl-full rounded-bl-full py-2 px-4' autoComplete='off'
                                value={inputValue} onChange={(e) => setInputValue(e.target.value)} />

                                <button type='submit' className='rounded-tr-full rounded-br-full py-2 px-4 bg-blue-500 text-white font-bold hover:bg-blue-800'>Add Task</button>
                            </div>
                        </form>
                    </div>
                    <div className='flex justify-center mt-5'>
                        <ul>
                            {
                                task.map((curTask, index)=>{
                                    return <li key={index} className='rounded-full px-4 bg-white min-w-80 mb-3 flex items-center'>
                                        <span className='w-[70%] inline-block'>{curTask}</span>
                                        <button className='text-black text-xl p-1 m-2 border-black border'><FaCheck /></button>
                                        <button className='text-black text-xl p-1 m-2 border-black border'><MdDelete /></button>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoPage