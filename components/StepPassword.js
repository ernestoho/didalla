import React, { useState } from 'react'
import useForm from './useForm'
import AuthButton from '../components/AuthButton';
import AuthButtonDisabled from '../components/AuthButtonDisabled';
import axios from 'axios'

const StepPassword = ({
    handleNext, 
    errors,
    dirty,
    handleOnChange,
    firstname,
    lastname,
    email,
    password,
    response,
    values
}) => {

    const [userType, setUserType] = useState('')
    const [checkboxValue, setCheckboxValue] = useState(false)

    const checkbox = <input type="checkbox" id="termsAgree" name="terms" value={checkboxValue} onClick={() => setCheckboxValue(!checkboxValue)} className='checked:bg-didalla checked:border-transparent' required/>

    const handleFormSubmit = event => {
        event.preventDefault()

        axios.post('https://api.didalla.com/api/register', {
            first_name: firstname,
            last_name: lastname,
            email: email,
            password: password,
            role:userType
          })
          .then((response) => {
            console.log(response.data);
          }, (error) => {
            console.log(error);
          });

        handleNext();
    
    }

    const handleTypeVendor = e =>{
        e.preventDefault()
        setUserType("vendor")
    }

    const handleTypeCreator = e =>{
        e.preventDefault()
        setUserType("booster")
    }

    console.log(userType);

    return (
        <div className='w-3/4 md:w-1/2 lg:w-2/6 my-0 mx-auto block pb-6'>
                    <div className='mb-4 text-center'>
                        <h1 className='text-2xl font-bold text-didallatitle mb-3 tracking-wider'>Complete your account setup</h1>
                        <p className='text-didallabody text-sm'>{email}</p>
                    </div>

                    <form action="" className='mt-4 mb-3' onSubmit={handleFormSubmit} >
                        <div className='mb-2'>
                            <div className='mb-1'><label htmlFor="firstname" className='text-didallabody text-sm'>First&nbsp;name</label></div>
                            <div>
                                <input className='p-3 border border-grayborder rounded w-full focus:outline-none focus:border-didalla'
                                 type="text"
                                 id='firstname'
                                 name="firstname"
                                 value={firstname}
                                 onChange={handleOnChange}
                                 placeholder='First name'
                                 required
                                />
                                {errors.firstname && dirty.firstname && (
                                    <p className='text-red-500 text-xs'>{errors.firstname}</p>
                                )}
                            </div>
                        </div>

                        <div className='mb-2'>
                            <div className='mb-1'><label htmlFor="lastname" className='text-didallabody text-sm'>Last&nbsp;name</label></div>
                            <div>
                                <input className='p-3 border border-grayborder rounded w-full focus:outline-none focus:border-didalla'
                                 type="text"
                                 id='lastname'
                                 name="lastname"
                                 value={lastname}
                                 onChange={handleOnChange}
                                 placeholder='Last name'
                                 required
                                />
                                {errors.lastname && dirty.lastname && (
                                    <p className='text-red-500 text-xs'>{errors.lastname}</p>
                                )}
                            </div>
                        </div>

                        <div className='mb-2'>
                            <div className='mb-1'><label htmlFor="password" className='text-didallabody text-sm'>Password</label></div>
                            <div>
                                <input className='p-3 border border-grayborder rounded w-full focus:outline-none focus:border-didalla'
                                 type="password"
                                 id='password'
                                 name="password"
                                 value={password}
                                 onChange={handleOnChange}
                                 placeholder='Enter your password'
                                 required
                                />
                                {errors.password && dirty.password && (
                                    <p className='text-red-500 text-xs'>{errors.password}</p>
                                )}
                            </div>
                        </div>
                        <p className='text-center text-black text-sm my-1'>I want to :</p>

                        <div className='mt-2 mb-4 flex justify-center items-center flex-nowrap'>
                            {userType === "vendor" ?(<button className='w-full block p-2 rounded-l bg-green-600 border border-green-600 text-white hover:bg-didalla hover:border-didalla focus:outline-none focus:border-didalla' type='button' onClick={handleTypeVendor}>
                                Hire <span className='hidden md:inline'>a Creator</span>
                            </button>) : (<button className='w-full block p-2 rounded-l bg-transparent border border-grayborder hover:text-white hover:bg-didalla hover:border-didalla focus:outline-none focus:border-didalla' type='button' onClick={handleTypeVendor}>
                                Hire <span className='hidden md:inline'>a Creator</span>
                            </button>)}

                            {userType === "booster" ?(<button className='w-full block p-2 rounded-r bg-green-600 border border-green-600 text-white hover:bg-didalla hover:border-didalla focus:outline-none focus:border-didalla' type='button' onClick={handleTypeCreator}>
                                Work <span className='hidden md:inline'>as a Creator</span>
                            </button>) : (<button className='w-full block p-2 rounded-r bg-transparent border border-grayborder hover:text-white hover:bg-didalla hover:border-didalla focus:outline-none focus:border-didalla' type='button' onClick={handleTypeCreator}>
                                Work <span className='hidden md:inline'>as a Creator</span>
                            </button>)}
                        </div>

                        <div className='mb-2'>
                            {checkbox}&nbsp;
                            <label htmlFor="terms" className='text-xs'>Yes, I understand and agree to the <a className='text-didalla' href="">Didalla Terms of service</a>, Including the <a className='text-didalla' href="">User Agreement</a> and <a className='text-didalla' href="">Privacy Policy</a> </label>
                        </div>

                        {firstname.length === 0 || lastname.length === 0 || password.length===0 || errors.firstname ||errors.lastname || errors.password|| userType==='' || checkboxValue === false
                        ? (<AuthButtonDisabled buttonText='Create my Account'/>) : 
                        (<AuthButton buttonText='Create my Account' />)}

                    </form>
                    
                </div>
    )
}

export default StepPassword