import axios from 'axios';
import React, { useRef, useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';
import SectorDropdown from '../SectorDropdown/SectorDropdown';

const SurveyForm = () => {
    // integration of react hooks here
    const [isLoading, setIsLoading] = useState(false);
    const [dropdownValue, setDropdownValue] = useState('');
    const [userNameError, setUserNameError] = useState(false);
    const [sectorError, setSectorError] = useState(false);
    const [termBoxError, setTermBoxError] = useState(false);

    // integration of references here
    const userNameRef = useRef();
    const sectorRef = useRef();
    const termBoxRef = useRef();

    // this function is handling form submission
    const onFormSubmit = async (e) => {
        e.preventDefault();

        if (userNameRef.current.value && sectorRef.current.value && termBoxRef.current.checked) {

            const data = {
                userName: userNameRef.current.value,
                sector: sectorRef.current.value,
                agreedToTerm: termBoxRef.current.checked
            }

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
                            e.target.termBox.checked = res.data[0].agreedToTerm;
                        });

                } else {
                    toast.error('Failed To Save The Survey!!');
                }
            });

            setIsLoading(false);

        } else {

            setUserNameError(!userNameRef.current.value && true);
            setSectorError(!sectorRef.current.value && true);
            setTermBoxError(!termBoxRef.current.checked && true);
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
                        <input onClick={() => setUserNameError(userNameError && false)} ref={userNameRef} type='text' name='userName' placeholder='Enter Your Name' className={`input input-bordered w-full ${userNameError ? 'border-red-600 border-2' : 'border-primary border-1'} text-primary font-semibold`} autoComplete='off' />
                        <label className='label'>
                            <span className={`label-text-alt text-red-600 ${userNameError ? 'visible' : 'invisible'}`}>Name is required</span>
                        </label>
                    </div>
                    <div className='form-control w-full mb-5'>
                        <label className='label'>
                            <span className='label-text'>Sectors</span>
                        </label>
                        <SectorDropdown
                            setDropdownValue={setDropdownValue}
                            dropdownValue={dropdownValue}
                            sectorRef={sectorRef}
                            sectorError={sectorError}
                            onClick={() => setSectorError(userNameError && false)}
                        />
                        <label className='label'>
                            <span className={`label-text-alt text-red-600 ${sectorError ? 'visible' : 'invisible'}`}>Sector is required</span>
                        </label>
                    </div>
                    <div className='form-control'>
                        <div className='w-fit'>
                            <label className='label cursor-pointer justify-start'>
                                <input onClick={() => setTermBoxError(termBoxError && false)} ref={termBoxRef} name='termBox' type='checkbox' className={`checkbox ${termBoxError ? 'border-red-600 border-2' : 'border-primary border-1'}`} />
                                <span className='label-text ml-3'>Agree to terms</span>
                            </label>
                        </div>
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