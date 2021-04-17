import React, { useState } from 'react';
import AuthButton from '../components/AuthButton';
import AuthButtonDisabled from '../components/AuthButtonDisabled';
import Link from 'next/link';

const StepLoginDetails = ({
                values,
                errors,
                dirty,
                handleOnChange,
                email,
                password,
                handleFormSubmit,
                showSpinner,
                responsegotten
}) =>{

    return (
        <div>
            {/* collect email */}
            <div className='w-3/4 md:w-1/2 lg:w-2/6 my-0 mx-auto block'>
                    <div className='mb-5 text-center'>
                        <h1 className='text-2xl font-bold text-didallatitle mb-3 tracking-wider'>Welcome Back</h1>
                        <p className='text-xs text-didallabody mb-3'>Login to your account to continue using our services</p>
                    </div>

                    <Link href="">
                        <a className='block mb-5'>
                            <button type='button' className="p-4 flex flex-row items-center justify-center w-full bg-transparent rounded text-sm border border-grayborder
                            font-bold text-didallatitle hover:shadow-lg transform hover:scale-105 focus:outline-none">
                                <div className='mr-2'><img className='' src="images/GoogleLogo.svg" alt="Google logo"/></div> 
                                <div>Continue with Google</div>
                            </button>

                        </a>
                    </Link>

                    <p className='text-center text-black text-sm'>OR</p>

                    <form action="" className='mt-6 mb-3' onSubmit={handleFormSubmit}>
                        <div className=''>
                            {/* Email */}
                            <div className='mb-3'>
                                <div className='mb-1'><label htmlFor="email" className='text-didallabody text-sm'>Email Address</label></div>
                                <div className='mb-3'>
                                    <input className='p-4 border border-grayborder rounded w-full focus:outline-none focus:border-didalla'
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleOnChange}
                                    id='email'
                                    placeholder='Enter your email address here'
                                    required
                                    />
                                    {errors.email && dirty.email && (
                                        <p className='text-red-500 text-xs'>{errors.email}</p>
                                )}
                                </div>
                            
                            </div>
                            {/* password */}
                            <div className='mb-3'>
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

                            {responsegotten && <p className='text-red-400 mb-2 text-center text-sm'>{responsegotten}</p>}

                            {email.length === 0 ||password.length===0 || errors.email ||errors.password 
                                ? (<AuthButtonDisabled buttonText='Login'/>) : 
                                (<AuthButton buttonText='Login' showSpinner={showSpinner}/>)}

                        </div>
                    </form>

                    <div className='text-center'>
                        <Link href="/forgotpassword"><a className='mb-1 block text-didalla text-sm'>Forgot Password</a></Link>
                        <Link href="/register"><a className='block text-didallabody text-sm'>Not yet a member? <span className='text-didalla'>Create your account now!</span></a></Link>
                    </div>
                    
                </div>
        </div>
    )
}

export default StepLoginDetails;

