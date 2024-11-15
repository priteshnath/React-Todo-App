import { useState } from "react";

const TodoFrom = ({ onAddTodo }) => {
    const [inputValue, setInputValue] = useState({});

    // Handle changes in the input field and set the task details
    const handleInputValue = (value) => {
        setInputValue({ id: value, content: value, checked: false });
    };

    // Handle form submission
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (inputValue.content) { // Ensure the input is not empty
            onAddTodo(inputValue); // Pass the task to the parent component
            setInputValue({}); // Clear the input field after adding the task
        }
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <div className='mt-4'>
                    {/* Added conditional check for inputValue.content */}
                    <input 
                        type="text" 
                        placeholder='Enter Task' 
                        className='border-none outline-none rounded-tl-full rounded-bl-full py-2 px-4' 
                        autoComplete='off'
                        value={inputValue.content || ""}
                        onChange={(e) => handleInputValue(e.target.value)} 
                    />

                    <button 
                        type='submit' 
                        className='rounded-tr-full rounded-br-full py-2 px-4 bg-blue-500 text-white font-bold hover:bg-blue-800'>
                        Add Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TodoFrom;
