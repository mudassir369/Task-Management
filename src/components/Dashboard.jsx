import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllTasks } from "../store/taskSlice";

const Card = ({ label, count, bg, isDarkMode }) => {
    return (
        <Link to="/">
            <div
                className={`w-full h-32 p-5 shadow-md rounded-md flex items-center justify-between cursor-pointer border-2 ${isDarkMode ? "border-gray-700 bg-gray-800 text-gray-200" : "border-gray-300 bg-white text-black"
                    }`}
            >
                <div className="h-full flex flex-1 flex-col justify-between">
                    <p className={`text-base ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{label}</p>
                    <span className="text-2xl font-semibold">{count}</span>
                    <span className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                        {"110 last month"}
                    </span>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${bg}`}>
                    {label.charAt(0)}
                </div>
            </div>
        </Link>
    );
};

Card.propTypes = {
    label: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    bg: PropTypes.string.isRequired,
    isDarkMode: PropTypes.bool.isRequired,
};

const Dashboard = ({ isDarkMode }) => {
    const tasks = useSelector(selectAllTasks);

    // Calculate statistics
    const stats = [
        {
            label: "TOTAL TASK",
            total: tasks.length,
            bg: "bg-[#1d4ed8]",
        },
        {
            label: "COMPLETED TASK",
            total: tasks.filter((task) => task.status === "Completed").length,
            bg: "bg-[#0f766e]",
        },
        {
            label: "TASK IN PROGRESS",
            total: tasks.filter((task) => task.status === "In Progress").length,
            bg: "bg-[#f59e0b]",
        },
        {
            label: "PENDING",
            total: tasks.filter((task) => task.status === "Pending").length,
            bg: "bg-[#be185d]",
        },
        {
            label: "DEPLOYED",
            total: tasks.filter((task) => task.status === "Deployed").length,
            bg: "bg-[#f59e0b]",
        },
        {
            label: "DEFERRED",
            total: tasks.filter((task) => task.status === "Deferred").length,
            bg: "bg-[#0f766e]",
        },
    ];

    return (
        <div className="mx-auto w-[80%]">
            <div className="flex flex-col w-full justify-between">
                <h1 className={`sm:text-2xl text-3xl font-bold my-8 text-center ${isDarkMode ? "text-gray-200" : "text-black"}`}>
                    Tasks
                </h1>
                <div className="h-full w-80% mx-auto py-4 px-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 place-item-center">
                        {stats.map(({ label, total, bg }, index) => (
                            <Card key={index} bg={bg} label={label} count={total} isDarkMode={isDarkMode} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

Dashboard.propTypes = {
    isDarkMode: PropTypes.bool.isRequired,
};

export default Dashboard;
