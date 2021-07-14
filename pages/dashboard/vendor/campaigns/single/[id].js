import React, { useState, useEffect }from 'react'
import VendorDashNav from '../../../../../components/VendorDashNav'
import ShowCampaignBids from '../../../../../components/ShowCampaignBids';
import ShowCampaignOffers from '../../../../../components/ShowCampaignOffers';
import MakePayment from '../../../../../components/MakePayment';
import Link from 'next/link';
import { useRouter } from 'next/router'
import axios from 'axios';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";


const SingleCampaignPage = ({
}) => {

    // Can be a string as well. Need to ensure each key-value pair ends with ;
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: white;
    `;

    let [color, setColor] = useState("#39B54A");
    const [isLoading, setisLoading] = useState(true);
    const [hasSubmitted, setHasSubmitted] = useState(true);
    const [hasPaid, setHasPaid] = useState(false);
    const [engagedCreator, setEngagedCreator] = useState();
    const [campaign, setCampaign] = useState({});
    const router = useRouter();
    const campaign_id = router.query.id;
    // console.log(campaign_id)

    useEffect(() => {

        const userToken = localStorage.getItem('userToken'); 
        if(!userToken){
            router.push('/login')
        }     
                
    }, []);

    useEffect(() => {
        const userToken = localStorage.getItem('userToken');

        if(campaign_id !== undefined){
            axios.get(`https://api.didalla.com/api/campaign/get_campaign/${campaign_id}`, 
            {
                headers: {
                'Authorization': `Bearer ${userToken}`
                }}
            )
            .then((response) => {
                // console.log(response.data);
                setCampaign(response.data);
                
                setisLoading(!isLoading)
            }, (error) => {
                console.log(error)
            
            });
        } 
                
    }, [campaign_id])
    

    const [showBids, setshowBids] = useState(false);
    const openShowBids = () =>{
        setshowBids(!showBids);
        document.body.style.overflowY= 'hidden';
    }
    const closeShowBids = () =>{
        setshowBids(!showBids);
        document.body.style.overflowY= 'visible';
    }

    const [showOffers, setshowOffers] = useState(false);
    const openShowOffers = () =>{
        setshowOffers(!showOffers);
        document.body.style.overflowY= 'hidden';
    }
    const closeShowOffers = () =>{
        setshowOffers(!showOffers);
        document.body.style.overflowY= 'visible';
    }

    const [showMakePayment, setshowMakePayment] = useState(false);
    const openShowMakepayment = () =>{
        setshowMakePayment(!showMakePayment);
        document.body.style.overflowY= 'hidden';
    }
    const closeShowMakePayment = () =>{
        setshowMakePayment(!showMakePayment);
        document.body.style.overflowY= 'visible';
    }
    
    const [showBrief, setShowBrief] = useState(false);
    const [showcreators, setShowcreators] = useState(true);

    useEffect(() => {
        if(showcreators === false){
            setShowBrief(true)
        }else{
            setShowBrief(false)
        }
        
    }, [showcreators])
    useEffect(() => {
        if(showBrief === false){
            setShowcreators(true)
        }else{
            setShowcreators(false)
        }
        
    }, [showBrief])
    
    const toggleDisplay = (choice) =>{
        switch (choice) {
            case 'brief':
                setShowBrief(true)
                setShowcreators(false)
                break;
            case 'creators':
                setShowBrief(false)
                setShowcreators(true)
                break;
        
            default:
                break;
        }
    }

    console.log(campaign)

    return (
        <div>
            {
                isLoading ? 

                <div className='flex justify-center items-center px-20 py-32'>
                <BeatLoader color={color}  loading={isLoading} css={override} size={40} />
                </div> 
                
                : 

                <div>
                    <VendorDashNav 
                    homeColour='' 
                    campaignColour ="text-didalla"
                    creatorsColour = ""
                    messagesColour = ""
                    // user={user}
                    />

                    {
                        showBids && <ShowCampaignBids openShowBids={openShowBids} closeShowBids={closeShowBids} bids={campaign.data.bids_accepted} singleCampaign={campaign.data}/>
                    }
                    {
                        showOffers && <ShowCampaignOffers openShowOffers={openShowOffers} closeShowOffers={closeShowOffers} offers={campaign.data.offers_accepted} singleCampaign={campaign.data}/>
                    }
                    {
                        showMakePayment && <MakePayment closeShowMakePayment={closeShowMakePayment} singleCampaign={campaign.data} creator={engagedCreator}/>
                    }

                    <div className='bg-onboardinggray px-6 md:px-10 lg:px-16 pt-32 pb-64'>
                        <div className='flex flex-col md:flex-row md:items-center justify-start md:justify-between '>
                            <div className='mb-3 md:mb-0'>
                                <div>
                                    <h1 className='font-bold text-didallablack text-lg md:text-xl lg:text-xl'>{campaign.data.name}</h1>
                                </div>
                                <p className='text-sm'>
                                    <Link href='/dashboard/vendor/campaigns'>
                                        <a href="">Back to : <span className='text-didalla'>campaigns</span></a>
                                    </Link>
                                </p>
                            </div>

                            <div className='flex flex-col md:flex-row items-center justify-start'>
                                <button className='text-white mb-2 md:mb-0 mr-0 md:mr-2 p-2 md:p-1 lg:p-3 rounded font-bold text-sm text-center flex flex-row items-center justify-between 
                                w-full bg-didalla hover:bg-green-600 whitespace-nowrap focus:outline-none border border-didalla'
                                onClick={openShowOffers}
                                >
                                    <div>
                                        Offers Sent
                                    </div> 
                                    <div>
                                        <svg className="w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </div>
                                </button>
                                <button className='text-didalla p-2 md:p-1 lg:p-3 rounded font-bold text-sm text-center 
                                flex flex-row items-center justify-between w-full bg-transparent hover:bg-didalla hover:text-white whitespace-nowrap focus:outline-none
                                border border-didalla'
                                onClick={openShowBids}
                                >
                                    <div>
                                        Bids Recieved
                                    </div> 
                                    <div>
                                        <svg className="w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </div>
                                </button>
                            </div>

                        </div>

                        <div className=' mt-8'>
                            <div className=''>
                                <div className='mb-2 flex items-center justify-start'>
                                    
                                    <div>
                                        <button
                                        className={showcreators ? 'whitespace-nowrap focus:outline-none text-sm pl-0 pr-4 py-2 border-b border-didalla' : 'whitespace-nowrap focus:outline-none text-sm pl-0 pr-4 py-2'}
                                        onClick={()=>{setShowcreators(!showcreators)}}
                                        >
                                            Creators engaged
                                        </button>
                                    </div>

                                    <div>
                                        <button
                                        className={showBrief ? 'whitespace-nowrap focus:outline-none text-sm py-2 px-3 border-b border-didalla' : 'whitespace-nowrap focus:outline-none text-sm py-2 px-3'}
                                        onClick={()=>{setShowBrief(!showBrief)}}
                                        >
                                            Campaign details
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    {
                                        showBrief && 
                                        <div className='text-sm text-didallabody bg-white rounded p-4'>
                                            <p className="text-base font-bold text-didallatitle mb-1">Campaign Goal</p>
                                            <h4 className='text-sm font-bold mb-8'>{campaign.data.name}</h4>
                                            
                                            <p className="text-base font-bold text-didallatitle mb-1">Campaign Tasks</p>
                                            <div>
                                                {
                                                    campaign.data.tasks.map(item=>(
                                                        <p className='text-sm text-didallabody' key={item.id}>Task </p>
                                                    ))
                                                }
                                            </div>
                                            
                                        </div>
                                    }
                                    {
                                        showcreators && 
                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4'>
                                            {
                                                campaign.engaged.map(item=>(
                                                    <div className='border border-grayborder rounded bg-white
                                                    ' key={item.id}>
                                                        <div className='px-5 py-4 border-b border-grayborder'>
                                                            <div className='flex items-center mb-3'>
                                                                <div className='mr-10'>
                                                                    <img className='h-12 w-12 rounded-full' src={item.photo_url} alt="Creator avatar" />
                                                                </div>
                                                                <div className='mr-10'>
                                                                    <p className='text-didallabody text-sm font-bold'>Obinnaya Chukwu</p>
                                                                    <p className='text-didallabody text-sm '>{item.city} - {item.country}</p>
                                                                </div>
                                                                <div className='text-sm text-didallabody mr-2'>
                                                                    <p className='text-didallabody text-sm font-bold'>Budget</p>
                                                                    <p>${campaign.data.budget}</p>
                                                                </div>
                                                            </div>
                                                            <div className='flex items-center'>
                                                                <div className='mr-5'>
                                                                    <img className='' src='/images/CampaignGoal.svg' alt="campaign goal icon" />
                                                                </div>
                                                                <div className='text-sm text-didallabody mr-2'>
                                                                    <p className='text-base'>Campaign Goal:</p>
                                                                    <p className='font-bold'>{campaign.data.brief}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='p-6 '>
                                                            <div className=''>
                                                                <p className="text-base font-bold text-didallatitle mb-1">Tasks Submissions</p>
                                                                {
                                                                    hasSubmitted && hasPaid ?
                                                                    <div>
                                                                        {
                                                                            campaign.data.tasks.map((item , x=1)=>(
                                                                                <div key={item.id}>
                                                                                    <div className='mb-6'>
                                                                                        <p className='text-sm text-didallabody font-bold' >Task {x++}</p>
                                                                                        <p className='text-sm text-didallabody' >https://www.instagram.com/p/</p>
                                                                                    </div>
                                                                                    
                                                                                </div>
                                                                            ))
                                                                        }
                                                                        <div className='text-center'>
                                                                            <button className='rounded bg-didalla text-white text-center px-5 py-2 hover:bg-green-600'>
                                                                                Leave a Comment
                                                                            </button>
                                                                        </div>
                                                                    </div> 
                                                                    :
                                                                    <div>
                                                                        {
                                                                            hasSubmitted ?
                                                                            <div>
                                                                                <p className='text-sm text-didallabody mb-6' >This content creator has carried out the required task. Please pay the required 
                                                                                charge by clicking the button below. <br/>
                                                                                <span className='font-bold'>Note: Your payment is not delivered to the content creator until 2 days after your payment when you should have examined the submission made.</span>
                                                                                </p>
                                                                                <div className='text-center'>
                                                                                    <button className='focus:outline-none rounded bg-didalla text-white text-center px-5 py-2 hover:bg-green-600'
                                                                                    onClick={()=>{
                                                                                        setEngagedCreator(item);
                                                                                        openShowMakepayment();
                                                                                    }}
                                                                                    >
                                                                                        Make Payment
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                            :
                                                                            <p className='text-sm text-didallabody' >This content creator has not made any submission. Check back later </p>
                                                                        }
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>

                                                    </div>
                                                ))
                                            }
                                        </div>
                                    }
                                </div>

                            </div>
                            <div>

                            </div>

                        </div>
                    </div>
                </div>
            }
            
        </div>
    )
}


export default SingleCampaignPage