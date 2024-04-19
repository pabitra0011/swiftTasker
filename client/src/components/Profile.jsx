import React from 'react'
import { useSelector } from 'react-redux';
import ModalWrapper from './ModWraper';
import { Dialog } from '@headlessui/react';
import moment from 'moment';



const Profile = ({ open, setOpen }) => {
    const { user } = useSelector((state) => state.auth);
    // console.log(user)

    return (

        <ModalWrapper open={open} setOpen={setOpen}>
            <Dialog.Title as='h1'
                className='text-xl text-center border-b font-bold  text-gray-900 mb-4'>
                <p> My Profile</p>
            </Dialog.Title>

            <div className='flex flex-col gap-5'>
                <div className='flex  items-center gap-5'>
                    <p>Name :  </p>
                    <span className='text-xl text-red-600'>{user?.data?.name}</span>
                </div>
                <div className='flex  items-center gap-5'>
                    <p>Email :  </p>
                    <span className='text-xl text-red-600'>{user?.data?.email}</span>
                </div>
                <div className='flex  items-center gap-5'>
                    <p>Title :  </p>
                    <span className='text-xl text-red-600'>{user?.data?.title}</span>
                </div>
                <div className='flex  items-center gap-5'>
                    <p>Role :  </p>
                    <span className='text-xl text-red-600'>{user?.data?.role}</span>
                </div>
                <div className='flex  items-center gap-5'>
                    <p>IsAdmin :  </p>
                    <span className='text-xl text-red-600'>{user?.data?.isAdmin ? "Yes" : "No"}</span>
                </div>
                <div className='flex  items-center gap-5'>
                    <p>Join :  </p>
                    <span className='text-xl text-red-600'>{moment(user?.data?.createdAt).fromNow()}</span>
                </div>
                <div className='flex  items-center gap-5'>
                    <p>No of Tasks :  </p>
                    <span className='text-xl text-red-600'>{user?.data?.tasks.length}</span>
                </div>

            </div>
        </ModalWrapper>
    )
}

export default Profile
