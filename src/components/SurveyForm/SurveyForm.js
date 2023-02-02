import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';
import SectorDropdownMenu from '../SectorDropdownMenu/SectorDropdownMenu';

const SurveyForm = () => {
    // integration of react hooks here
    const [isLoading, setIsLoading] = useState(false);
    const [dropdownValue, setDropdownValue] = useState('');

    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
    const [sectors, setSectors] = useState([]);

    // fetching the sectors data here
    useEffect(() => {
        axios('https://coding-challenge-server-jjqg.onrender.com/sectors')
            .then(res => setSectors(res.data));
    }, []);

    // this function is handling form submission
    const onFormSubmit = async (e) => {
        e.preventDefault();

        const data = {
            userName: e.target.userName.value,
            sector: e.target.selectedSector.value,
        }

        const termBox = e.target.termBox.value;

        if (termBox) {
            e.target.reset();
            setDropdownValue('');

            setIsLoading(true);

            await axios({
                method: 'POST',
                url: 'https://coding-challenge-server-jjqg.onrender.com/addSurvey',
                data: data
            }).then(async (res) => {
                if (res.status === 200) {
                    toast.success('Survey Saved Successfully!!');

                    await axios('https://coding-challenge-server-jjqg.onrender.com/getLatestSurveyData')
                        .then(res => {
                            e.target.userName.value = res.data[0].userName;
                            setDropdownValue(res.data[0].sector);
                        });

                } else {
                    toast.error('Failed To Save The Survey!!');
                }
            });

            setIsLoading(false);
        }
    }

    // rendering the survey form component here
    return (
        <div className='w-[95%] md:w-3/5 bg-base-100 p-5 rounded-lg shadow-xl'>
            <h3 className='text-2xl font-semibold text-center'>Please enter your name and pick the Sectors you are currently involved in.</h3>
            <div className='mt-14'>
                <form onSubmit={onFormSubmit}>
                    <div className='form-control w-full mb-5'>
                        <label className='label'>
                            <span className='label-text'>Name</span>
                        </label>
                        <input type='text' name='userName' placeholder='Enter Your Name' className='input input-bordered w-full border-primary text-primary font-semibold' required autoComplete='off' />
                    </div>
                    <div className='form-control w-full mb-5'>
                        <label className='label'>
                            <span className='label-text'>Sectors</span>
                        </label>
                        <div className='relative flex flex-wrap'>
                            <div className='w-full border border-primary rounded-lg overflow-hidden'>
                                <div className=' inline-flex align-middle w-full'>
                                    <div className='relative flex w-full flex-wrap items-stretch cursor-pointer'>
                                        <input type='text' name='selectedSector' placeholder='Select Your Sector' value={dropdownValue} className=' px-3 py-3 relative bg-white rounded border-0 outline-none focus:outline-none focus:ring w-full pr-10 text-primary font-semibold text-base cursor-pointer' onClick={() => setDropdownPopoverShow(!dropdownPopoverShow)} readOnly required />
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
                    </div>
                    <div className='form-control'>
                        <label className='label cursor-pointer justify-start'>
                            <input name='termBox' type='checkbox' className='checkbox border-primary' required />
                            <span className='label-text ml-3'>Agree to terms</span>
                        </label>
                    </div>
                    <div className='mt-5 flex justify-center'>
                        <button type='submit' className={`btn btn-primary ${isLoading && 'loading'} w-full md:w-fit px-20 text-white capitalize text-lg hover:bg-base-100 hover:text-primary`}>
                            <FaSave className={`mr-2 ${isLoading && 'hidden'}`} />
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SurveyForm;