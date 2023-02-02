import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const SectorDropdown = ({ dropdownName, dropdownDefaultValue, dropdownMenu }) => {
    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
    const [dropdownValue, setDropdownValue] = useState(dropdownDefaultValue);

    return (
        <>
            <div className='relative flex flex-wrap'>
                <div className='w-full border border-primary rounded-lg overflow-hidden'>
                    <div className=' inline-flex align-middle w-full'>
                        <div className='relative flex w-full flex-wrap items-stretch cursor-pointer'>
                            <input type='text' name={dropdownName} value={dropdownValue} className=' px-3 py-3 placeholder-slate-300 relative bg-white rounded border-0 outline-none focus:outline-none focus:ring w-full pr-10 text-primary font-semibold text-base cursor-pointer' onClick={() => setDropdownPopoverShow(!dropdownPopoverShow)} readOnly />
                            <span className='z-10 h-full leading-snug font-normal absolute text-center bg-transparent rounded text-base flex items-center justify-center w-8 right-0 '>
                                <FaChevronDown className={`${dropdownPopoverShow ? 'rotate-90' : 'rotate-0'} text-primary duration-300`} />
                            </span>
                        </div>

                    </div>
                </div>
                <div
                    className={
                        `${dropdownPopoverShow ? 'scale-y-100' : 'scale-y-0'} bg-base-100 z-50 float-left text-left rounded shadow-lg text-primary origin-top duration-300 absolute top-full w-full overflow-hidden`
                    }
                >
                    {
                        dropdownMenu.map(item => <button
                            type='button'
                            key={item}
                            className={
                                `${dropdownPopoverShow ? 'scale-y-100' : 'scale-y-0'} text-sm py-2 px-4 font-normal block w-full whitespace-nowrap hover:bg-primary hover:text-base-100 duration-300 origin-top`
                            }
                            onClick={e => {
                                setDropdownValue(item);
                                setDropdownPopoverShow(!dropdownPopoverShow);
                            }}
                        >
                            {item}
                        </button>)
                    }
                </div>
            </div>
        </>
    );
};

export default SectorDropdown;