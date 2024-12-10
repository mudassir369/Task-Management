import { GrTask } from "react-icons/gr";
import { MdDashboard, MdOutlineTaskAlt, MdAddTask, MdPendingActions, MdCloudDone, MdOutlineAccessTimeFilled, MdQueryStats } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
    const [activeTab,setActiveTab]=useState("Dashboard");
    const tabOptions = [
        { name: "Dashboard", link: "/", icon: <MdDashboard /> },
        { name: "Completed Tasks", link: "/completeTask", icon: <MdOutlineTaskAlt /> },
        { name: "Pending Tasks", link: "/pendingTask", icon: <MdPendingActions /> },
        { name: "In Progress Tasks", link: "/inProgressTask", icon: <GrInProgress /> },
        { name: "Deployed Tasks", link: "/deployedTask", icon: <MdCloudDone /> },
        { name: "Deferred Tasks", link: "/deferredTask", icon: <MdOutlineAccessTimeFilled /> },
        { name: "Add New Tasks", link: "/addTask", icon: <MdAddTask /> },
        { name: "Task Stats", link: "/statsTask", icon: <MdQueryStats /> }
    ];

    return (
        <div className="bg-indigo-500 min-h-[100vh] sm:min-h-screen w-[5rem] sm:w-[19rem] flex flex-col gap-4 roboto-regular">
            <div className="flex items-center gap-2 justify-center h-16 text-white text-2xl font-bold mt-6">
                <GrTask />
                <span className='sm:block hidden'>
                    Task Manager
                </span>
            </div>
            <nav className="flex gap-10 justify-start">
                <ul className="py-6 flex flex-col justify-start">
                    {tabOptions.map((tab, index) => (
                        <Link
                            key={index}
                            to={tab.link}
                            className="px-6 py-4 font-semibold text-lg text-gray-300 hover:text-gray-700 cursor-pointer flex justify-start items-center gap-2"
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