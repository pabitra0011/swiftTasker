import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";

const ModalWrapper = ({ open, setOpen, children }) => {
    const cancelButtonRef = useRef(null);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-10 w-full'
                initialFocus={cancelButtonRef}
                onClose={() => setOpen(false)}
            >
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-60 transition-opacity' />
                </Transition.Child>

                <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                    <div className='flex h-full items-center justify-center p-4 text-center sm:p-0'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            enterTo='opacity-100 translate-y-0 sm:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        >
                            <Dialog.Panel className='w-full relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all pb-0 sm:my-8 sm:w-full sm:max-w-lg'>
                                <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                                    <div className='sm:flex sm:items-start'>
                                        <div className='w-full mt-3  sm:ml-4 sm:mt-0 sm:text-left'>
                                            {children}
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default ModalWrapper;






// code explanation =============================
// this code creates a reusable modal component(ModalWrapper) that can be used to display modal dialogs.It manages the open / close state of the modal and provides transition animations using the Transition components from @headlessui/react. It wraps the content passed as children inside the modal dialog.

// 1. ModalWrapper Component: This is a functional component named ModalWrapper.It takes three props: open, setOpen, and children.The open prop is a boolean indicating whether the modal should be open or closed.The setOpen prop is a function that toggles the state of the open prop.The children prop represents the content that will be displayed within the modal.

// 2. useRef Hook: This hook is used to create a ref that will be attached to the cancel button of the dialog.It's named cancelButtonRef and is initialized with null.

// 3. Transition.Root Component: This component is from the @headlessui/react package. It's used to wrap the modal content and manage transitions. It takes the show prop, which determines whether the modal is visible or not.

// 4. Dialog Component: This component represents the modal dialog.It's part of the Transition.Root component and manages the modal's open / close state.It takes several props:

// initialFocus: Specifies the element to focus on when the dialog opens.It's set to the cancelButtonRef.
// onClose: Specifies the function to call when the dialog is closed.It sets the open prop to false.

// 5. Transition.Child Components: These components represent different parts of the modal that need to be transitioned.They are also part of the Transition.Root component.They define various enter and leave transition animations for different parts of the modal, such as the backdrop and the dialog panel.

// 6. Dialog.Panel Component: This component represents the panel within the modal dialog.It's responsible for rendering the content of the modal. It takes a className prop for styling. Inside, it contains the content of the modal, which is passed through the children prop.

