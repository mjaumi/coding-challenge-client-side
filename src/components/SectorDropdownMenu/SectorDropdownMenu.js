import React from 'react';

const SectorDropdownMenu = ({ dropdownMenu, dropdownPopoverShow, dropdownValue, setDropdownPopoverShow, setDropdownValue }) => {

    // rendering dropdown menu component here
    return (
        <div
            className={
                `${dropdownPopoverShow ? 'scale-y-100' : 'scale-y-0'} bg-base-100 z-50 float-left text-left rounded shadow-lg text-primary origin-top duration-300 absolute top-full w-full h-[250px] overflow-y-scroll`
            }
        >
            {
                dropdownMenu.map(item => <div
                    key={item._id}
                    className='mx-4 mb-4'>
                    <p className='font-semibold my-4'>{item.title}</p>
                    {
                        item.categories.map(sector => <button
                            type='button'
                            key={sector}
                            className={
                                `${dropdownPopoverShow ? 'scale-y-100' : 'scale-y-0'} ${dropdownValue === sector ? 'bg-primary text-base-100' : 'bg-base-100 text-primary'} text-sm py-2 px-4 font-normal w-full whitespace-nowrap hover:bg-primary hover:text-base-100 duration-300 origin-top flex justify-start rounded-lg my-1`
                            }
                            onClick={e => {
                                setDropdownValue(sector);
                                setDropdownPopoverShow(!dropdownPopoverShow);
                            }}
                        >
                            {sector}
                        </button>)
                    }
                </div>)
            }
        </div>
    );
};

export default SectorDropdownMenu;