import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toggleTaskCompleted, removeTask } from '../store/taskSlice';
import { useState } from 'react';

const TaskCard = ({
    id,
    title,
    description,
    startDate,
    endDate,
    status,
    assignee,
    priority,
    isDarkMode, // Receive isDarkMode as a prop
}) => {
    const [complete, setComplete] = useState(false);
    const dispatch = useDispatch();

    const getDate = (dateString) => {
        const dateObject = new Date(dateString);
        const currentDate = dateObject.toLocaleDateString();
        return currentDate;
    };

    const startDatee = getDate(startDate);
    const endDatee = getDate(endDate);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return isDarkMode
                    ? 'bg-green-800 text-green-200'
                    : 'bg-green-200 text-green-800';
            case 'in progress':
                return isDarkMode
                    ? 'bg-blue-800 text-blue-200'
                    : 'bg-blue-200 text-blue-800';
            case 'pending':
                return isDarkMode
                    ? 'bg-yellow-800 text-yellow-200'
                    : 'bg-yellow-200 text-yellow-800';
            case 'deferred':
                return isDarkMode
                    ? 'bg-gray-600 text-gray-300'
                    : 'bg-gray-200 text-gray-800';
            case 'deployed':
                return isDarkMode
                    ? 'bg-purple-800 text-purple-200'
                    : 'bg-purple-200 text-purple-800';
            default:
                return isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black';
        }
    };

    const handleToggleCompleted = () => {
        dispatch(toggleTaskCompleted(id));
        setComplete(true);
    };

    const handleRemove = () => {
        dispatch(removeTask(id));
    };

    return (
        <div
            className={`flex flex-col rounded-xl justify-center gap-4 ${
                isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-black'
            } w-72 max-h-[370px] shadow-xl border transition-all`}
        >
            <div
                className={`relative bg-clip-border mt-6 ml-4 mr-4 rounded-lg ${getStatusColor(
                    status
                )} shadow-md h-45`}
            >
                <h1 className="anton-regular text-end pt-2 pr-3 text-sm">{priority}</h1>
                <h1 className="font-bold text-center text-xl py-4 mb-5 ubuntu-bold">
                    {title}
                </h1>
            </div>
            <div className="border-0 p-2 text-center">
                <p className="poppins-light">{description}</p>
                <div className="flex justify-between mt-[5px] text-sm font-semibold py-2 px-4">
                    <div className="flex justify-center flex-col">
                        <p>Start Date</p>
                        <p className="font-light">{startDatee}</p>
                    </div>
                    <div className="flex justify-center flex-col">
                        <p>End Date</p>
                        <p className="font-light">{endDatee}</p>
                    </div>
                </div>
            </div>
            <p className="font-light text-xs block text-center">{assignee || 'Md Mudassir'}</p>
            <div className="footer p-3 flex items-center justify-between">
                <button
                    onClick={handleToggleCompleted}
                    type="button"
                    className={`flex items-center justify-center gap-2 select-none focus:outline-none shadow-md uppercase font-bold text-xs py-2 px-6 rounded-lg ${
                        complete
                            ? 'bg-green-600 text-white'
                            : `${getStatusColor(status)}`
                    }`}
                >
                    {complete ? 'Completed' : status}
                </button>
                <button
                    onClick={handleRemove}
                    type="button"
                    className={`flex items-center justify-center gap-2 select-none focus:outline-none shadow-md uppercase font-bold text-xs py-2 px-6 rounded-lg ${
                        isDarkMode
                            ? 'bg-red-700 text-white'
                            : 'bg-red-200 text-red-800'
                    }`}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

TaskCard.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    assignee: PropTypes.string,
    priority: PropTypes.string,
    isDarkMode: PropTypes.bool.isRequired, // Validate the new prop
};

export default TaskCard;
