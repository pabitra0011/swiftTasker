import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react'
import { AiTwotoneFolderOpen } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { HiDuplicate } from 'react-icons/hi';
import { MdAdd, MdOutlineEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useNavigate } from "react-router-dom";
import AddTask from './AddTask';
import AddSubTask from './AddSubTask';
import ConfermationDilog from '../ConfermationDilogs';
import { useDeleteTaskMutation } from '../../redux/slices/api/taskApiSlice';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';


// user?.data.isAdmin
const TaskDialog = ({ task }) => {
    const { user } = useSelector((state) => state.auth)
    // console.log(user?.data.isAdmin)
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const navigate = useNavigate();

    // api calls .......
    const [deleteTask] = useDeleteTaskMutation();


    const deleteClicks = () => {
        setOpenDialog(true);
    };

    const deleteHandler = async () => {
        try {
            const res = await deleteTask({
                id: task._id,
            })

            toast.success(res?.message || "Task Deleted SuccessFully!!");

            setTimeout(() => {
                setOpenDialog(false)
                window.location.reload();
            }, 500);

        } catch (error) {
            console.log(error)
            toast.error(error?.data?.message || error.error)
        }
    };



    const items = [
        {
            label: "Open Task",
            icon: <AiTwotoneFolderOpen className='mr-2 h-5 w-5' aria-hidden='true' />,
            onClick: () => navigate(`/task/${task._id}`),
        },
        {
            label: "Add Sub-Task",
            icon: <MdAdd className='mr-2 h-5 w-5' aria-hidden='true' />,
            onClick: () => setOpen(true),
        },

    ];
    // if user is admin the edit button is add on items 
    if (user?.data?.isAdmin) {
        items.splice(1, 0, {
            label: "Edit",
            icon: <MdOutlineEdit className='mr-2 h-5 w-5' aria-hidden='true' />,
            onClick: () => setOpenEdit(true),
        });
    }



    return (
        <>
            <div>
                <Menu as="div" className="relative" >
                    <Menu.Button>
                        <BsThreeDots />
                    </Menu.Button>

                    <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                    >
                        <Menu.Items className="absolute p-4 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-20">
                            <div>
                                {items.map((item) => (
                                    <Menu.Item key={item.label}>
                                        {({ active }) => (
                                            <button
                                                onClick={item?.onClick}
                                                className={`${active ? "bg-blue-400 text-white" : "text-grey-900"} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                {item.icon}
                                                {item.label}
                                            </button>
                                        )}
                                    </Menu.Item>
                                ))}
                            </div>

                            <div className='px-1 py-1'>
                                {user?.data.isAdmin
                                    ? <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => deleteClicks()}
                                                className={`${active ? "bg-blue-500 text-white" : "text-red-900"
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                <RiDeleteBin6Line
                                                    className='mr-2 h-5 w-5 text-red-400'
                                                    aria-hidden='true'
                                                />
                                                Delete
                                            </button>
                                        )}
                                    </Menu.Item>
                                    :
                                    <>
                                    </>}
                            </div>
                        </Menu.Items>
                    </Transition>

                </Menu>
            </div>

            <AddTask
                open={openEdit}
                setOpen={setOpenEdit}
                task={task}
                key={new Date().getTime()}
            />

            <AddSubTask open={open} setOpen={setOpen} id={task?._id} />

            <ConfermationDilog
                open={openDialog}
                setOpen={setOpenDialog}
                onClick={deleteHandler}
            />
        </>
    )
}

export default TaskDialog
