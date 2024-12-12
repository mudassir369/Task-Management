import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toggleTaskCompleted, removeTask, updateTask } from '../store/taskSlice';

const Task = ({
    id,
    title,
    completed,
    description,
    startDate,
    endDate,
    status,
    assignee,
    priority,
    isDarkMode, // New prop for dark mode
}) => {
    const dispatch = useDispatch();

    const handleToggleCompleted = () => {
        dispatch(toggleTaskCompleted(id));
    };

    const handleRemoveTask = () => {
        dispatch(removeTask(id));
    };

    const handleUpdateTask = (field, value) => {
        dispatch(updateTask({ id, [field]: value }));
    };

    const mapPriority = (priority) => {
        switch (priority) {
            case 'P0':
                return 'High';
            case 'P1':
                return 'Medium';
            case 'P2':
                return 'Low';
            default:
                return priority;
        }
    };

    return (
        <li
            className={`task p-4 rounded-md shadow-md transition-all ${isDarkMode
                    ? 'bg-gray-800 text-gray-200 border-gray-700'
                    : 'bg-white text-black border-gray-300'
                } ${completed ? (isDarkMode ? 'opacity-70' : 'opacity-80') : ''}`}
        >
            <div className="flex items-center justify-between mb-2">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={handleToggleCompleted}
                    className={`mr-2 cursor-pointer ${isDarkMode ? 'accent-gray-600' : 'accent-blue-500'}`}
                />
                <span className={`font-bold ${completed ? 'line-through' : ''}`}>{title}</span>
            </div>
            <p className="text-sm mb-2">{description}</p>
            <div className="text-sm space-y-1 mb-3">
                <span className={`block ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Start Date: {startDate.slice(0, 10)}
                </span>
                <span className={`block ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    End Date: {endDate ? endDate.slice(0, 10) : '---'}
                </span>
            </div>
            <select
                value={status}
                onChange={(event) => handleUpdateTask('status', event.target.value)}
                className={`w-full p-1 mb-2 rounded-md border ${isDarkMode
                        ? 'bg-gray-700 text-gray-200 border-gray-600'
                        : 'bg-gray-100 text-black border-gray-300'
                    }`}
            >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Deployed">Deployed</option>
                <option value="Deferred">Deferred</option>
            </select>
            <input
                type="text"
                value={assignee}
                onChange={(event) => handleUpdateTask('assignee', event.target.value)}
                placeholder="Assignee"
                className={`w-full p-1 mb-2 rounded-md border ${isDarkMode
                        ? 'bg-gray-700 text-gray-200 border-gray-600'
                        : 'bg-gray-100 text-black border-gray-300'
                    }`}
            />
            <select
                value={mapPriority(priority)}
                onChange={(event) => handleUpdateTask('priority', event.target.value)}
                className={`w-full p-1 mb-2 rounded-md border ${isDarkMode
                        ? 'bg-gray-700 text-gray-200 border-gray-600'
                        : 'bg-gray-100 text-black border-gray-300'
                    }`}
            >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <button
                onClick={handleRemoveTask}
                className={`w-full p-2 rounded-md font-bold transition-all ${isDarkMode
                        ? 'bg-red-700 text-gray-200 hover:bg-red-600'
                        : 'bg-red-200 text-red-800 hover:bg-red-300'
                    }`}
            >
                Remove
            </button>
        </li>
    );
};

Task.propTypes = {
    id: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string,
    status: PropTypes.string.isRequired,
    assignee: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    isDarkMode: PropTypes.bool.isRequired, // Validate the dark mode prop
};

export default Task;