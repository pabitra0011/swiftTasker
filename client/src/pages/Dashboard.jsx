import clsx from "clsx";
import moment from "moment";
import React from "react";

import { FaTasks } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";

import { GrInProgress } from "react-icons/gr";
import { IoIosCloudDone } from "react-icons/io";
import Chart from "../components/Chart";
import Loder from '../components/Loder';
import UserInfo from "../components/UserInfo";
import { useGetDasboardStatsQuery } from "../redux/slices/api/taskApiSlice";
import { BGS, TASK_TYPE, getInitials } from '../utils/index';

// recent tasks of dashboard ...................
const LatestTaskTable = ({ tasks }) => {

    const TableHeader = () => (
        <thead className='border-b border-gray-300 '>
            <tr className="text-black text-left">
                <th className="py-2">Task Title</th>
                <th className="py-2">Priority</th>
                <th className="py-2">Team/Users</th>
                <th className="py-2">Created</th>
            </tr>
        </thead>
    );


    const TableRow = ({ task }) => (

        < tr className='border-b border-gray-300 text-gray-600 hover:bg-gray-300/10' >
            <td className="py-2">
                <div className="flex items-center gap-2">
                    {/* task progress symbol */}
                    <div
                        className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
                    />
                    {/* task title  */}
                    <p className="text-base text-black">{task.title}</p>
                </div>
            </td>

            {/* Priority column  */}
            <td>
                <div className="flex gap-1 items-center">
                    {/* <span>Priority level</span> */}
                    <span>{task.priority}</span>
                </div>
            </td>

            {/* task team/users  */}
            <td>
                <div className="flex">
                    {
                        task.team.map((tu, index) => (
                            <div key={index}
                                className={clsx(
                                    "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                                    BGS[index % BGS.length]
                                )}
                            >
                                <UserInfo user={tu} />
                            </div>
                        ))}
                </div>
            </td>

            {/* task date or created at  */}
            <td>
                <span>
                    {moment(task?.createdAt).fromNow()}
                </span>
            </td>
        </tr >
    );


    return (
        <>
            <div className="w-full md:w-2/3 bg-white px-2 md:px-4 pt-4 pb4
        shadow-md rounded">
                <table className="w-full">
                    <TableHeader />
                    <tbody>
                        {
                            tasks.map((task, id) => (
                                <TableRow key={id} task={task} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
};
// End of recent task of dashboard ...........

// latest user show iin Dashboard .............
const UserTable = ({ users }) => {

    const TableHeader = () => (
        <thead className='border-b border-gray-300 '>
            <tr className='text-black  text-left'>
                <th className='py-2'>Full Name</th>
                <th className='py-2'>Role</th>
                <th className='py-2'>Date</th>
            </tr>
        </thead>
    );


    const TableRow = ({ user }) => (
        <tr >
            <td className="py-2">
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-sky-700 rounded-full flex items-center justify-center text-sm text-white">
                        <span>{getInitials(user?.name)}</span>
                    </div>

                    <div>
                        <p>{user.name}</p>
                    </div>
                </div>
            </td>

            <td>
                <div>
                    {user.role}
                </div>
            </td>

            {/* <td>
                {user?.isActive ? "Active" : "Disabled"}
            </td> */}

            <td>
                {moment(user?.createdAt).fromNow()}
            </td>

        </tr>
    );


    return (
        <div className='w-full md:w-1/3 bg-white h-fit px-2 md:px-6 py-4 shadow-md rounded' >
            <table className='w-full mb-5'>
                <TableHeader />
                <tbody>
                    {
                        users?.map((user, index) => (
                            <TableRow key={index + user?._id} user={user} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}


const Dashboard = () => {

    const { data, isLoading } = useGetDasboardStatsQuery();
    // console.log(data);

    // when we load the page data will be featching so avoid it we place a conditiond .........
    if (isLoading)
        return (
            <div className="py-10">
                <Loder />
            </div>
        )

    const totals = data?.tasks;

    const stats = [
        {
            _id: "1",
            label: "TOTAL TASK",
            total: data?.totalTasks || 0,
            icon: <FaTasks />,
            bg: "bg-[#1d4ed8]",
        },
        {
            _id: "2",
            label: "COMPLTED TASK",
            total: totals["completed"] || 0,
            icon: <IoIosCloudDone />,
            bg: "bg-[#0f766e]",
        },
        {
            _id: "3",
            label: "TASK IN PROGRESS ",
            total: totals["in progress"] || 0,
            icon: <GrInProgress />,
            bg: "bg-[#f59e0b]",
        },
        {
            _id: "4",
            label: "TODOS",
            total: totals["todo"],
            icon: <FaListCheck />,
            bg: "bg-[red]" || 0,
        },
    ];
    // single card component
    // eslint-disable-next-line react/prop-types
    const Card = ({ label, count, bg, icon }) => {
        return (
            <div className='w-full h-32 bg-sky-200 p-5 shadow-md rounded-md flex items-center justify-between'>
                <div className='h-full flex flex-1 flex-col justify-between'>
                    <p className='text-base text-natural-100'>{label}</p>
                    <span className='text-2xl font-semibold'>{count}</span>
                    <span className='text-sm text-gray-400'>{"11 last month"}</span>
                </div>

                <div
                    className={clsx(
                        "w-10 h-10 rounded-full flex items-center justify-center text-white",
                        bg
                    )}
                >
                    {icon}
                </div>
            </div>
        );
    };


    // main dashboard component 
    return <div className="h-full py-4">
        {/* dashboard task overview cards  */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {stats.map(({ icon, bg, label, total }, index) => (
                <Card
                    key={index}
                    icon={icon}
                    bg={bg}
                    label={label}
                    count={total}
                />
            ))}
        </div>

        {/* graph simple bar chart using recharts */}
        <div className='w-full bg-white my-16 p-4 rounded shadow-sm'>
            <h4 className='text-xl text-gray-600 font-semibold mb-5'>
                Task Chart by Priority
            </h4>
            <Chart graphData={data?.graphData} />
        </div>


        {/* recent tasks and users summery */}
        <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8'>

            {/* /left  recent tasks */}
            <LatestTaskTable tasks={data?.last10Task} />

            {/* /right  recent users*/}
            <UserTable users={data?.users} />
        </div>

    </div>
}

export default Dashboard