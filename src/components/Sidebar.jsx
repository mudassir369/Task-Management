import { GrTask } from "react-icons/gr";
import {
    MdDashboard,
    MdOutlineTaskAlt,
    MdAddTask,
    MdPendingActions,
    MdCloudDone,
    MdOutlineAccessTimeFilled,
    MdQueryStats,
} from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice";

const Sidebar = ({ isDarkMode, toggleTheme }) => {
    const [activeTab, setActiveTab] = useState("Dashboard");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const tabOptions = [
        { name: "Dashboard", link: "/", icon: <MdDashboard /> },
        { name: "Completed Tasks", link: "/completeTask", icon: <MdOutlineTaskAlt /> },
        { name: "Pending Tasks", link: "/pendingTask", icon: <MdPendingActions /> },
        { name: "In Progress Tasks", link: "/inProgressTask", icon: <GrInProgress /> },
        { name: "Deployed Tasks", link: "/deployedTask", icon: <MdCloudDone /> },
        { name: "Deferred Tasks", link: "/deferredTask", icon: <MdOutlineAccessTimeFilled /> },
        { name: "Add New Tasks", link: "/addTask", icon: <MdAddTask /> },
        { name: "Logout", link: "/login", icon: <MdQueryStats /> },
    ];

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className={`min-h-[100vh] sm:min-h-screen w-[6rem] sm:w-[21rem] flex flex-col gap-4 roboto-regular ${isDarkMode ? 'bg-gray-800' : 'bg-indigo-500'}`}>
            <div className="flex items-center gap-2 justify-center h-16 text-2xl font-bold mt-6">
                <GrTask />
                <span className="sm:block hidden">Task Manager</span>
            </div>
            <button
                onClick={toggleTheme}
                className="flex items-center justify-center p-2 rounded-full mx-auto bg-gray-700 text-white hover:bg-gray-600 transition-all duration-500"
            >
                {isDarkMode ? (
                    <span className="text-3xl animate-slide-to-right">🌙</span> // Moon emoji
                ) : (
                    <span className="text-3xl animate-slide-to-left">🌞</span> // Sun emoji
                )}
            </button>
            <nav className="flex gap-10 justify-center">
                <ul className="py-6 flex flex-col justify-start">
                    {tabOptions.map((tab, index) => (
                        <Link
                            key={index}
                            to={tab.link}
                            onClick={() => {
                                setActiveTab(tab.name);
                                if (tab.name === "Logout") {
                                    handleLogout();
                                }
                            }}
                            className={`px-12 py-4 font-semibold text-lg cursor-pointer flex justify-start items-center gap-2 ${activeTab === tab.name
                                    ? isDarkMode
                                        ? "bg-gray-700 rounded-md text-white"
                                        : "bg-indigo-700 rounded-md text-white"
                                    : isDarkMode
                                        ? "text-gray-400 hover:text-gray-300"
                                        : "text-gray-300 hover:text-gray-700"
                                }`}
                        >
                            <span className="text-2xl">{tab.icon}</span>
                            <span className="sm:block hidden">{tab.name}</span>
                        </Link>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
