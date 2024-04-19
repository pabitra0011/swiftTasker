import React, { useState } from 'react'
import { FaList } from 'react-icons/fa';
import { MdGridView } from 'react-icons/md';
import { useParams } from 'react-router-dom';

import Loder from '../components/Loder'
import Title from '../components/Title';
import Button from '../components/Button';
import { IoMdAdd } from 'react-icons/io';
import Tabs from '../components/Tabs';
import GridView from '../components/GridView';
import ListView from '../components/ListView';
import { MdCloudDone } from "react-icons/md";
import { AiFillHourglass } from "react-icons/ai";
import { AiFillFileExclamation } from "react-icons/ai";
import AddTask from '../components/Task/AddTask';
import { useGetAllTaskQuery } from '../redux/slices/api/taskApiSlice';
import { useSelector } from 'react-redux';


export const TASK_TYPE = {
    todo: "bg-blue-600",
    "in progress": "bg-yellow-600",
    completed: "bg-green-600",
};

const TABS = [
    { title: "Grid View", icon: <MdGridView /> },
    { title: "List View", icon: <FaList /> },

];

const Tasks = () => {

    const { user } = useSelector((state) => state.auth);
    const params = useParams();

    const [selected, setSelected] = useState(0);// for list and grid view
    const [open, setOpen] = useState(false)


    const status = params?.status || ""
    // console.log(status)

    const { data, isLoading } = useGetAllTaskQuery({
        strQuery: status,
        isTrashed: "",
        search: "",
    })


    return isLoading ? (
        <div className='py-10'>
            <Loder />
        </div>
    ) : (

        <div className='w-full border'>

            <div className='flex items-center justify-between   mb-4'>
                <Title title={status ? `${status} Tasks` : "Tasks"} />

                {!status && user?.data?.isAdmin && (
                    <Button
                        onClick={() => setOpen(true)}
                        icon={<IoMdAdd />}
                        label='Create Task'
                        className='flex flex-row-reverse items-center bg-blue-400 py-2 2xl:py-2.5'
                    />
                )}
            </div>

            {/* tabs for list and grid view  */}
            <Tabs tabs={TABS} setSelected={setSelected}>


                {/* {!status && (
                    <div className='w-full flex justify-evenly my-2 '>
                        <p className='flex items-center gap-1'>
                            <AiFillFileExclamation /> Todo</p>
                        <p className='text-yellow flex items-center gap-1'>
                            <AiFillHourglass /> In Progress</p>
                        <p className='text-green flex items-center gap-1'>
                            <MdCloudDone className='text-red' /> Completed</p>
                    </div>
                )} */}

                {selected !== 1 ? (
                    <GridView tasks={data?.tasks} />
                ) : (
                    <ListView tasks={data?.tasks} />
                )}
            </Tabs>

            <AddTask open={open} setOpen={setOpen} />
        </div>
    )

}

export default Tasks;
