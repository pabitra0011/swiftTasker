
import clsx from "clsx";
import moment from "moment";
import React, { useState } from "react";
import { FaBug, FaTasks, FaThumbsUp, FaUser } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import {
    MdKeyboardArrowDown,
    MdKeyboardArrowUp,
    MdKeyboardDoubleArrowUp,
    MdOutlineDoneAll,
    MdOutlineMessage,
    MdTaskAlt,
} from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";

import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { tasks } from "../assets/data";
import Tabs from "../components/Tabs";
import { getInitials } from "../utils";
import { TbSubtask } from "react-icons/tb";
import Button from "../components/Button";
import Loder from "../components/Loder";
import { useGetSingleTaskQuery, usePostTaskActivityMutation } from "../redux/slices/api/taskApiSlice";


const assets = [
    "https://images.pexels.com/photos/2418664/pexels-photo-2418664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2534523/pexels-photo-2534523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/804049/pexels-photo-804049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
};

const bgColor = {
    high: "bg-red-200",
    medium: "bg-yellow-200",
    low: "bg-blue-200",
};
const TABS = [
    { title: "Task Detail", icon: <FaTasks /> },
    { title: "Activities/Timeline", icon: <RxActivityLog /> },
];


const TASKTYPEICON = {
    commented: (
        <div className='w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white'>
            <MdOutlineMessage />
        </div>
    ),
    started: (
        <div className='w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white'>
            <FaThumbsUp size={20} />
        </div>
    ),
    assigned: (
        <div className='w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white'>
            <FaUser size={14} />
        </div>
    ),
    bug: (
        <div className='text-red-600'>
            <FaBug size={24} />
        </div>
    ),
    completed: (
        <div className='w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white'>
            <MdOutlineDoneAll size={24} />
        </div>
    ),
    "in progress": (
        <div className='w-8 h-8 flex items-center justify-center rounded-full bg-violet-600 text-white'>
            <GrInProgress size={16} />
        </div>
    ),
};

const act_types = [
    "Started",
    "Completed",
    "In Progress",
    "Commented",
    "Bug",
    "Assigned",
];





const TaskDetails = () => {
    const { id } = useParams();
    // console.log(id)
    const [selected, setSelected] = useState(0)

    const { data, isLoading, refetch } = useGetSingleTaskQuery(id);
    console.log(data)

    // Check if data is still loading or if data is undefined ( because it take some time to fetch data)
    if (isLoading || !data) {
        return (
            <div className="py-10">
                <Loder />
            </div>
        );
    }

    // after completly lode data it asign task to data 
    const task = data?.task;


    return (
        <div className="w-full flex flex-col gap-3 mb-4 overflow-y-hidden">
            <h1 className="text-2xl text-gray-600 font-bold">{task?.title}</h1>

            <Tabs tabs={TABS} setSelected={setSelected}>
                {selected === 0 ?
                    <>
                        <div className="w-full flex flex-col md:flex-row gap-5 2xl:gap-8 bg-white shadow-md p-8 ">
                            {/* left or task details  */}
                            <div className="w-full md:w-1/2 space-y-8">
                                <div className="flex items-center gap-8">
                                    <div>
                                        <span>{task?.priority} Priority</span>
                                    </div>
                                    <div>
                                        <span>{task?.stage}</span>
                                    </div>
                                </div>

                                {/* date create */}
                                <p>
                                    Created At : {new Date(task?.createdAt).toDateString()}
                                </p>

                                {/* assetes and message detials  */}
                                <div className="flex items-center gap-8 p-4 border-y border-gray-200">
                                    <div className="space-x-2">
                                        <span >Assetes : </span>
                                        <span>{task?.assets?.length}</span>
                                    </div>

                                    <span> | </span>

                                    <div>
                                        <span className='font-semibold'>Sub-Task :</span>
                                        <span>{task?.subTasks?.length}</span>
                                    </div>
                                </div>

                                {/* task team details  */}
                                <div>
                                    <p className='text-gray-600 font-semibold test-sm'>
                                        TASK TEAM
                                    </p>
                                    <div>
                                        {task?.team?.map((m, index) => (
                                            <div key={index} className=" flex items-center gap-4 border-t py-2">
                                                <div
                                                    className={
                                                        "w-10 h-10 rounded-full text-white flex items-center justify-center text-sm -mr-1 bg-blue-600"
                                                    }
                                                >
                                                    <span className='text-center'>
                                                        {getInitials(m?.name)}
                                                    </span>
                                                </div>

                                                <div>
                                                    <p className='text-lg font-semibold'>{m?.name}</p>
                                                    <span className='text-gray-500'>{m?.title}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* subtasks section  */}
                                <div className="space-y-4 py-6">
                                    <p className='text-gray-500 font-semibold text-sm'>
                                        SUB-TASKS
                                    </p>
                                    <div className="space-y-6">
                                        {task?.subTasks?.map((st, index) => (
                                            <div key={index} className="flex items-center gap-4 ">
                                                <div className='w-10 h-10 flex items-center justify-center rounded-full bg-violet-50-200'>
                                                    <TbSubtask className="text-violet-600 " size={26} />
                                                </div>

                                                <div className="">
                                                    <p className='text-gray-700'>{st.title}</p>
                                                    <div className="flex gap-2 items-center">
                                                        <span className='text-sm text-gray-500'>
                                                            {new Date(st?.date).toDateString()}
                                                        </span>
                                                        <span className="px-2 py-0.5 text-center text-sm rounded-full font-semibold bg-violet-100 text-violet-600">{st?.tag}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* right or task assetes  */}
                            <div className="w-full md:w-1/2 space-y-8">
                                <p className="text-lg font-semibold">ASSETS</p>

                                <div className='w-full grid grid-cols-2 gap-4'>
                                    {task?.assets?.map((el, index) => (
                                        <img
                                            key={index}
                                            src={el}
                                            alt={task?.title}
                                            className='w-full rounded h-28 md:h-36 2xl:h-52 cursor-pointer transition-all duration-700 hover:scale-125 hover:z-50'
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </> :
                    <>
                        <Activities activity={task?.activities} id={id} refetch={refetch} />
                    </>
                }
            </Tabs>

        </div>
    )
};



const Activities = ({ activity, id, refetch }) => {
    const [selected, setSelected] = useState(act_types[0]);
    // console.log(selected)
    const [text, setText] = useState("");


    // api claall ....
    const [postActivity, { isLoading }] = usePostTaskActivityMutation();

    const handleSubmit = async () => {
        try {
            const activityData = {
                type: selected?.toLowerCase(),
                activity: text,
            }

            const res = await postActivity({
                data: activityData,
                id: id
            })

            setText("");

            toast.success(res?.message || "postActivity updated successfully..")
            refetch();

        } catch (error) {
            console.log(error)
            toast.error(error?.data?.message || error.error)
        }
    };



    const Card = ({ item }) => {
        return (
            <div className='flex space-x-4'>
                <div className='flex flex-col items-center flex-shrink-0'>
                    <div className='w-10 h-10 flex items-center justify-center'>
                        {TASKTYPEICON[item?.type]}
                    </div>
                    <div className='w-full flex items-center'>
                        <div className='w-0.5 bg-gray-900 h-full'></div>
                    </div>
                </div>

                <div className='flex flex-col gap-y-1 mb-8'>
                    <p className='font-semibold'>{item?.by?.name}</p>
                    <div className='text-gray-500 space-y-2'>
                        <span className='capitalize'>{item?.type}</span>
                        <span className='text-sm'>{moment(item?.date).fromNow()}</span>
                    </div>
                    <div className='text-gray-700'>{item?.activity}</div>
                </div>
            </div>
        );
    };



    return (
        <div className='w-full flex gap-10 2xl:gap-20 min-h-screen px-10 py-8 bg-white shadow rounded-md justify-between overflow-y-auto'>
            {/* activity list  */}
            <div className="w-full md:w-1/2">
                <h4 className='text-gray-600 font-semibold text-lg mb-5'>Activities</h4>

                <div className="w-full">
                    {activity?.map((el, index) => (
                        <Card
                            key={index}
                            item={el}
                            isConnected={index < activity.length - 1}
                        />
                    ))}
                </div>
            </div>

            {/* add activity section  */}
            <div className='w-full md:w-1/3'>
                <h4 className='text-gray-600 font-semibold text-lg mb-5'>
                    Add Activity
                </h4>
                <div className='w-full flex flex-wrap gap-5'>
                    {act_types.map((item, index) => (
                        <div key={item} className='flex gap-2 items-center'>
                            <input
                                type='checkbox'
                                className='w-4 h-4'
                                checked={selected === item ? true : false}
                                onChange={(e) => setSelected(item)}
                            />
                            <p>{item}</p>
                        </div>
                    ))}
                    <textarea
                        rows={10}
                        value={text}
                        placeholder="Tupe here..."
                        onChange={(e) => setText(e.target.value)}
                        className="w-full border border-gray-300 bg-white outline-none p-4 rounded-md focus:ring-2 ring-blue-500"
                    >
                    </textarea>
                    {isLoading ? (
                        <Loder />
                    ) : (
                        <Button
                            type='button'
                            label='Submit'
                            onClick={handleSubmit}
                            className='bg-blue-600 text-white rounded'
                        />
                    )}
                </div>
            </div>
        </div>
    );


};



export default TaskDetails
