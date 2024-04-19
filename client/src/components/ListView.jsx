import React, { useState } from 'react'
import { BGS, formatDate } from '../utils';
import { BiMessageAltDetail } from 'react-icons/bi';
import { MdAttachFile } from 'react-icons/md';
import { FaList } from 'react-icons/fa';
import UserInfo from './UserInfo';
import clsx from 'clsx';
import Button from './Button';
import ConfermationDilog from './ConfermationDilogs';
import { useDeleteTaskMutation } from '../redux/slices/api/taskApiSlice';
import { toast } from 'sonner';
import AddTask from './Task/AddTask';


const ListView = ({ tasks }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selected, setSelected] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);

    const deleteClicks = (id) => {
        setSelected(id);
        setOpenDialog(true);
    };

    const editTask = (el) => {
        setOpenEdit(true);
        setSelected(el);
    }

    const [deleteTask] = useDeleteTaskMutation();

    const deleteHandler = async () => {
        try {
            const res = await deleteTask({
                id: selected,
            })

            toast.success(res?.message);

            setTimeout(() => {
                setOpenDialog(false)
                window.location.reload();
            }, 500);

        } catch (error) {
            console.log(error)
            toast.error(error?.data?.message || error.error)
        }
    };


    const TableHeader = () => (
        <thead className='w-full border-b border-gray-300'>
            <tr className='w-full text-black  text-left'>
                <th className='py-2'>Task Title</th>
                <th className='py-2'>Priority</th>
                <th className='py-2 line-clamp-1'>Created At</th>
                <th className='py-2'>Assets</th>
                <th className='py-2'>Team</th>
            </tr>
        </thead>
    );

    const TableRow = ({ task }) => (
        <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-300/10'>
            <td className='py-2'>
                <div>
                    <p>{task?.title}</p>
                </div>
            </td>

            <td className='py-2'>
                <div>
                    <span className='capitalize line-clamp-1'>
                        {task?.priority} Priority
                    </span>
                </div>
            </td>

            <td className='py-2'>
                <span className='text-sm text-gray-600'>
                    {formatDate(new Date(task?.date))}
                </span>
            </td>

            <td className='py-2'>
                <div className='flex gap-1 items-center text-sm '>
                    <div className='flex gap-1 items-center text-sm'>
                        <BiMessageAltDetail />
                        <span>{task?.activities?.length}</span>
                    </div>
                    <div className='flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400'>
                        <MdAttachFile />
                        <span>{task?.assets?.length}</span>
                    </div>
                    <div className='flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400'>
                        <FaList />
                        <span>0/{task?.subTasks?.length}</span>
                    </div>
                </div>
            </td>

            <td className='py-2'>
                <div className='flex'>
                    {task?.team?.map((m, index) => (
                        <div
                            key={m._id}
                            className={clsx(
                                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                                BGS[index % BGS?.length]
                            )}
                        >
                            <UserInfo user={m} />
                        </div>
                    ))}
                </div>
            </td>

            <td className='py-2 flex gap-2 md:gap-4 justify-end'>
                <Button
                    className='text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base'
                    label='Edit'
                    type='button'
                    onClick={() => editTask(task)}
                />

                <Button
                    className='text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base'
                    label='Delete'
                    type='button'
                    onClick={() => deleteClicks(task._id)}
                />
            </td>
        </tr>
    )





    return (
        <>
            <div className='bg-white px-2 md:px-4 shadow-sm rounded'>
                <div>
                    <table className='w-full'>
                        <TableHeader />
                        <tbody>
                            {tasks.map((task, index) => (
                                <TableRow
                                    key={index}
                                    task={task}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* todo */}
            <ConfermationDilog
                open={openDialog}
                setOpen={setOpenDialog}
                onClick={deleteHandler}
            />

            <AddTask
                open={openEdit}
                setOpen={setOpenEdit}
                task={selected}
                key={new Date().getTime()}
            />
        </>
    )
}

export default ListView
