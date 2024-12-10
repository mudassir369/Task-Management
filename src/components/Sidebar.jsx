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
const Sidebar = () => {
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
        <div className="bg-indigo-500 min-h-[100vh] sm:min-h-screen w-[6rem] sm:w-[21rem] flex flex-col gap-4 roboto-regular">
            <div className="flex items-center gap-2 justify-center h-16 text-white text-2xl font-bold mt-6">
                <GrTask />
                <span className="sm:block hidden">Task Manager</span>
            </div>
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
                                ? "text-white bg-indigo-700 rounded-md"
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