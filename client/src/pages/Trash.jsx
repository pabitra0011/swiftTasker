import React, { useState } from 'react'
import Button from '../components/Button';
import { MdDelete, MdOutlineRestore } from 'react-icons/md';
import Title from '../components/Title';
import { tasks } from '../assets/data';
import { TASK_TYPE } from '../utils';
import clsx from 'clsx';
import ConfermationDilog from '../components/ConfermationDilogs';
import { useDeleteRestoreTaskMutation, useGetAllTaskQuery } from '../redux/slices/api/taskApiSlice';
import Loder from '../components/Loder'
import { toast } from "sonner"




const Trash = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState(null);
    const [type, setType] = useState("delete");
    const [selected, setSelected] = useState("");


    const { data, isLoading, refetch } = useGetAllTaskQuery({
        strQuery: "",
        isTrashed: "true",
        search: "",
    })
    // console.log(data.tasks);
    const [deleteRestoreTask] = useDeleteRestoreTaskMutation();
    // console.log(deleteRestoreTask)


    const deleteRestoreHandler = async () => {
        try {
            let res;
            let action;

            switch (type) {
                case "delete":
                    res = await deleteRestoreTask({
                        id: selected,
                        actionType: "delete",
                    });
                    action = "Delete";
                    break;

                case "restore":
                    res = await deleteRestoreTask({
                        id: selected,
                        actionType: "restore",
                    });
                    action = "Restore";
                    break;

                case "deleteAll":
                    res = await deleteRestoreTask({
                        id: selected,
                        actionType: "deleteAll",
                    });
                    action = "DeleteAll";
                    break;

                case "restoreAll":
                    res = await deleteRestoreTask({
                        id: selected,
                        actionType: "restoreAll",
                    });
                    action = "RestoreAll";
                    break;
            }

            toast.success(res?.message || `${action} successfully!!,,,,,`)

            setTimeout(() => {
                setOpenDialog(false);
                refetch();
            }, 500);

        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message || error.error)
        }
    }

    const deleteAllClick = () => {
        setType("deleteAll");
        setMsg("Do you want to permenantly delete all items?");
        setOpenDialog(true);
    };

    const restoreAllClick = () => {
        setType("restoreAll");
        setMsg("Do you want to restore all items in the trash?");
        setOpenDialog(true);
    };

    const deleteClick = (id) => {
        setType("delete");
        setSelected(id);
        setOpenDialog(true);
    };

    const restoreClick = (id) => {
        setSelected(id);
        setType("restore");
        setMsg("Do you want to restore the selected item?");
        setOpenDialog(true);
    };


    if (isLoading)
        return (
            <div className="py-10">
                <Loder />
            </div>
        )



    const TableHeader = () => (
        <thead className='border-b border-gray-300'>
            <tr className='text-black  text-left'>
                <th className='py-2'>Task Title</th>
                <th className='py-2'>Priority</th>
                <th className='py-2'>Stage</th>
                <th className='py-2 line-clamp-1'>Modified On</th>
            </tr>
        </thead>
    );


    const TableRow = ({ item }) => (
        <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
            <td className='py-2'>
                <div className='flex items-center gap-2'>
                    {/* <div
                        className={clsx("w-4 h-4 rounded-full", TASK_TYPE[item.stage])}
                    /> */}
                    <p className='w-full line-clamp-2 text-base text-black'>
                        {item?.title}
                    </p>
                </div>
            </td>

            <td className='py-2 capitalize'>
                <div className={"flex gap-1 items-center"}>
                    {/* <span className={clsx("text-lg", PRIOTITYSTYELS[item?.priority])}>
                        {ICONS[item?.priority]}
                    </span> */}
                    <span className=''>{item?.priority}</span>
                </div>
            </td>

            <td className='py-2 capitalize text-center md:text-start'>
                {item?.stage}
            </td>
            <td className='py-2 text-sm'>{new Date(item?.date).toDateString()}</td>

            <td className='py-2 flex gap-1 justify-end'>
                <Button
                    icon={<MdOutlineRestore className='text-xl text-gray-500' />}
                    onClick={() => restoreClick(item._id)}
                />
                <Button
                    icon={<MdDelete className='text-xl text-red-600' />}
                    onClick={() => deleteClick(item._id)}
                />
            </td>
        </tr>
    );


    return (
        <>
            <div className='w-full md:px-1 px-0 mb-6'>

                {/* heading  */}
                <div className='flex items-center justify-between mb-8'>
                    <Title title='Trashed Tasks' />

                    <div className='flex gap-2 md:gap-4 items-center'>
                        <Button
                            label='Restore All'
                            icon={<MdOutlineRestore className='text-lg hidden md:flex' />}
                            className='flex flex-row-reverse gap-1 items-center  text-black text-sm md:text-base rounded-md 2xl:py-2.5'
                            onClick={() => restoreAllClick()}
                        />
                        <Button
                            label='Delete All'
                            icon={<MdDelete className='text-lg hidden md:flex' />}
                            className='flex flex-row-reverse gap-1 items-center  text-red-600 text-sm md:text-base rounded-md 2xl:py-2.5'
                            onClick={() => deleteAllClick()}
                        />
                    </div>
                </div>

                <div className='bg-white px-2 md:px-6 py-4 shadow-md rounded'>
                    <div className='overflow-x-auto'>
                        <table className='w-full mb-5'>
                            <TableHeader />
                            <tbody>
                                {

                                    data?.tasks.map((tt, id) => (
                                        <TableRow key={id} item={tt} />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* confermation */}
            <ConfermationDilog
                open={openDialog}
                setOpen={setOpenDialog}
                msg={msg}
                setMsg={setMsg}
                type={type}
                setType={setType}
                onClick={() => deleteRestoreHandler()}
            />

        </>
    )
}

export default Trash
