import { Tab } from '@headlessui/react'
import React from 'react'

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}


const Tabs = ({ tabs, setSelected, children }) => {
    return (
        <div className='w--full px-1 sm:px-0'>
            <Tab.Group>
                <Tab.List className='flex'>
                    {tabs.map((tab, index) => (
                        <Tab
                            key={tab.title}
                            onClick={() => setSelected(index)}
                            className={({ selected }) =>
                                classNames(
                                    "w-fit flex items-center outline-none gap-2 px-3 py-2.5 text-base font-medium leading-5 bg-white",

                                    selected
                                        ? "text-blue-400  border-b-2 border-blue-400"
                                        : "text-gray-800  hover:text-blue-800"
                                )
                            }
                        >
                            {tab.icon}
                            <span>{tab.title}</span>
                        </Tab>
                    ))}
                </Tab.List>
                {/* accroding to tab type tab panle rendered (grid or list ) */}
                <Tab.Panels className="w-full">
                    {children}
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

export default Tabs
