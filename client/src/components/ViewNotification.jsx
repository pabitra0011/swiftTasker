import React from 'react'
import ModalWrapper from './ModWraper'
import { Dialog } from '@headlessui/react'
import Button from './Button'


const ViewNotification = ({ open, setOpen, el }) => {
    // console.log(el)
    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>
                <div className='py-4 w-full flex flex-col gap-4 items-center justify-center'>
                    <Dialog.Title as='h3' className='font-semibold text-lg'>
                        {el?.task?.title}
                    </Dialog.Title>

                    <p>{el?.text}</p>

                    <Button
                        type="button"
                        className='bg-white px-7 mt-3 text-sm font-semibold'
                        onClick={() => setOpen(false)}
                        label='Ok'
                    />


                </div>
            </ModalWrapper>
        </>
    )
}

export default ViewNotification
