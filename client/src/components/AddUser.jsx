import React, { useEffect, useState } from 'react'
import ModalWrapper from './ModWraper'
import { Dialog } from '@headlessui/react'
import Textbox from './Textbox'
import { useForm } from 'react-hook-form'
import Button from './Button'
import Loder from './Loder'
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation } from '../redux/slices/api/authApiSlice'
import { toast } from "sonner"
import { useUpdateUserMutation } from '../redux/slices/api/userApiSlice'
import { setCredentials } from '../redux/slices/authSlice'




const AddUser = ({ open, setOpen, userData }) => {
    const { user } = useSelector((state) => state.auth);
    // console.log(userData)
    const [isAdmin, setIsAdmin] = useState(false);

    let defaultValues = userData ?? {};
    // console.log(defaultValues)

    const { register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues });


    const dispatch = useDispatch();

    // add and update user api handle .................
    const [addNewUser, { isLoading }, refetch] = useRegisterMutation();
    const [updateUser] = useUpdateUserMutation();



    const handleOnSubmit = async (data) => { // (data) because we using react hook from we get this from data

        try {
            data = { ...data, isAdmin };

            if (userData) {
                const result = await updateUser(data);

                toast.success("Profile Update successfully");

                if (userData?._id === user._id) {// meaning me updating my own profile then we can dispatch the updated info to update my name and other info
                    dispatch(setCredentials({ ...result.user }));
                } // if this is not me then i don't need to update because it's somebody else (any admin) , 

            } else {
                await addNewUser({ ...data, password: data.email })// here passing password as email (defult password is user email)
                // refetch()
                toast.success("New User Added Succesfully!!")
            }
            // refetch()
            // userData = null;
            // console.log(data);
            setTimeout(() => {
                setOpen(false)
                window.location.reload();
            }, 500);
        } catch (error) {
            toast.error("Something went wrong when adding new user??")
        }
    }


    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>
                <form onSubmit={handleSubmit(handleOnSubmit)}
                    className=''>
                    <Dialog.Title
                        as='h2'
                        className='text-base font-bold leading-6 text-gray-900 mb-4'
                    >
                        {userData ? "UPDATE PROFILE" : "ADD NEW USER"}
                    </Dialog.Title>

                    <div className='flex flex-col gap-6 mt-2'>
                        <Textbox
                            placeholder="User Name"
                            type='text'
                            name='name'
                            label='User Name'
                            className='w-full rounded'
                            register={register("name", { required: "Name is required" })}
                            error={errors.title ? errors.title.message : ""}
                        />

                        <Textbox
                            placeholder="Title"
                            type='text'
                            name='title'
                            label='Title'
                            className='w-full rounded'
                            register={register("title", { required: "Title is required" })}
                            error={errors.title ? errors.title.message : ""}
                        />

                        <Textbox
                            placeholder="User Email"
                            type='email'
                            name='email'
                            label='Email'
                            className='w-full rounded'
                            register={register("email", { required: "Email is required" })}
                            error={errors.title ? errors.title.message : ""}
                        />

                        <Textbox
                            placeholder="User Role"
                            type='role'
                            name='text'
                            label='Role'
                            className='w-full rounded'
                            register={register("role", { required: "Role is required" })}
                            error={errors.title ? errors.title.message : ""}
                        />

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                                className="mr-2"
                            />
                            <label htmlFor="isAdmin">IsAdmin</label>
                        </div>

                    </div>

                    {isLoading ? (
                        <div className='py-5'>
                            <Loder />
                        </div>
                    ) : (
                        <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
                            <Button
                                type='submit'
                                className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                                label='Submit'
                            />

                            <Button
                                type='button'
                                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                                onClick={() => setOpen(false)}
                                label='Cancel'
                            />
                        </div>
                    )}


                </form>
            </ModalWrapper>
        </>
    )
}

export default AddUser
