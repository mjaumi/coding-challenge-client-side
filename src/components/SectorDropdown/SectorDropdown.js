import React, { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import SectorDropdownMenu from '../SectorDropdownMenu/SectorDropdownMenu';

const SectorDropdown = ({ dropdownPlaceHolder, dropdownValue, setDropdownValue }) => {
    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
    const [sectors, setSectors] = useState([]);

    // fetching the sectors data here
    useEffect(() => {
        fetch('http://localhost:5000/sectors')
            .then(res => res.json())
            .then(data => setSectors(data));
    }, []);

    return (
        <>

            <div className='relative flex flex-wrap'>
                <div className='w-full border border-primary rounded-lg overflow-hidden'>
                    <div className=' inline-flex align-middle w-full'>
                        <div className='relative flex w-full flex-wrap items-stretch cursor-pointer'>
                            <input type='text' name='selectedSector' placeholder={dropdownPlaceHolder} value={dropdownValue} className=' px-3 py-3 relative bg-white rounded border-0 outline-none focus:outline-none focus:ring w-full pr-10 text-primary font-semibold text-base cursor-pointer' onClick={() => setDropdownPopoverShow(!dropdownPopoverShow)} readOnly required />
                            <span className='z-10 h-full leading-snug font-normal absolute text-center bg-transparent rounded text-base flex items-center justify-center w-8 right-0 '>
                                <FaChevronDown className={`${dropdownPopoverShow ? 'rotate-90' : 'rotate-0'} text-primary duration-300`} />
                            </span>
                        </div>

                    </div>
                </div>
                <SectorDropdownMenu
                    dropdownMenu={sectors}
                    dropdownPopoverShow={dropdownPopoverShow}
                    dropdownValue={dropdownValue}
                    setDropdownPopoverShow={setDropdownPopoverShow}
                    setDropdownValue={setDropdownValue} />
            </div>
        </>
    );
};

export default SectorDropdown;