import axios from 'axios';
import React, { useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';
import SectorDropdown from '../SectorDropdown/SectorDropdown';

const SurveyForm = () => {
    // integration of react hooks here
    const [isLoading, setIsLoading] = useState(false);
    const [dropdownValue, setDropdownValue] = useState('');

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
                url: 'http://localhost:5000/addSurvey',
                data: data
            }).then(res => {
                if (res.status === 200) {
                    toast.success('Survey Saved Successfully!!');
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
                        <input type='text' name='userName' placeholder='Enter Your Name' className='input input-bordered w-full border-primary text-primary font-semibold' required />
                        <label className='label'>
                            <span className='label-text-alt'>Alt label</span>
                        </label>
                    </div>
                    <div className='form-control w-full mb-5'>
                        <label className='label'>
                            <span className='label-text'>Sectors</span>
                        </label>
                        <SectorDropdown
                            dropdownPlaceHolder={'Select Your Sector'}
                            dropdownValue={dropdownValue}
                            setDropdownValue={setDropdownValue} />
                        <label className='label'>
                            <span className='label-text-alt'>Alt label</span>
                        </label>
                    </div>
                    <div className='form-control'>
                        <label className='label cursor-pointer justify-start'>
                            <input name='termBox' type='checkbox' className='checkbox' required />
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