import React from 'react';
import { FaSave } from 'react-icons/fa';
import SectorDropdown from '../SectorDropdown/SectorDropdown';

const SurveyForm = () => {

    // rendering the survey form component here
    return (
        <div className='w-[95%] md:w-3/5 bg-base-100 p-5 rounded-lg shadow-xl'>
            <h3 className='text-2xl font-semibold text-center'>Please enter your name and pick the Sectors you are currently involved in.</h3>
            <div className='mt-14'>
                <form>
                    <div className='form-control w-full mb-5'>
                        <label className='label'>
                            <span className='label-text'>Name</span>
                        </label>
                        <input type='text' placeholder='Enter Your Name' className='input input-bordered w-full border-primary text-primary font-semibold' />
                        <label className='label'>
                            <span className='label-text-alt'>Alt label</span>
                        </label>
                    </div>
                    <div className='form-control w-full mb-5'>
                        <label className='label'>
                            <span className='label-text'>Sectors</span>
                        </label>
                        <SectorDropdown dropdownName='sector' dropdownDefaultValue={'Select Your Sector'} dropdownMenu={['All Rounder', 'Batsman', 'Bowler']} />
                        <label className='label'>
                            <span className='label-text-alt'>Alt label</span>
                        </label>
                    </div>
                    <div className='form-control'>
                        <label className='label cursor-pointer justify-start'>
                            <input type='checkbox' className='checkbox' />
                            <span className='label-text ml-3'>Agree to terms</span>
                        </label>
                    </div>
                    <div className='mt-5 flex justify-center'>
                        <button type='submit' className='btn btn-primary w-full md:w-fit px-20 text-white capitalize text-lg hover:bg-base-100 hover:text-primary'>
                            <FaSave className='mr-2' />
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SurveyForm;