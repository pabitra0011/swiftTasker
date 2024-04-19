import React from 'react'
import Button from './Button'
import Loder from './Loder'
import ModalWrapper from './ModWraper'
import Textbox from './Textbox'
import { useForm } from 'react-hook-form'
import { Dialog } from '@headlessui/react'
import { toast } from 'sonner'
import { useChangePasswordMutation } from '../redux/slices/api/userApiSlice'


const ChangePassword = ({ open, setOpen }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [ChangePassword, { isLoading }] = useChangePasswordMutation();

    const handleOnSubmit = async (data) => {
        if (data.password !== data.cpass) {
            toast.warning("Password doesn't match??")
        }
        try {
            const res = await ChangePassword(data);
            toast.success("Password Change Successfully!!")

            setTimeout(() => {
                setOpen(false)
            }, 500)
        } catch (error) {
            toast.error(error?.data?.message || "error in changing password//")
        }
    }

    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <Dialog.Title>
                        Change Password
                    </Dialog.Title>

                    <div className='mt-2 flex flex-col gap-6'>
                        <Textbox
                            placeholder="New password"
                            type="password"
                            name="password"
                            label="New Password"
                            className="w-full rounded"
                            register={register("password", {
                                required: "New password is required!!!!",
                            })}
                            error={errors.password ? errors.password.message : ""}
                        />
                        <Textbox
                            placeholder=" Confirm New password"
                            type="password"
                            name="cpass"
                            label="Confirm New Password"
                            className="w-full rounded"
                            register={register("cpass", {
                                required: "Confirm New password is required!!!!",
                            })}
                            error={errors.cpass ? errors.cpass.message : ""}
                        />
                    </div>

                    {isLoading ? (
                        <div className='py-5'>
                            <Loder />
                        </div>
                    ) : (
                        <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
                            <Button
                                type="submit"
                                className="bg-blue-800 px-8 text-sm text-white "
                                label="Save"
                            />

                            <button
                                type="button"
                                className="bg-white px-8 text-sm text-grey-900 "
                                onClick={() => setOpen(false)}
                            >cancel </button>
                        </div>
                    )}
                </form>
            </ModalWrapper>
        </>
    )
}

export default ChangePassword
