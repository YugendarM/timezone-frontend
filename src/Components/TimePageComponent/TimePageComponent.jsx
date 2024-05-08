import axios from 'axios'
import moment from 'moment-timezone'
import React, { useEffect, useState } from 'react'

const TimePageComponent = () => {
    const [edit, setEdit] = useState()
    const [timezoneData, setTimezoneData] = useState({})
    const [utcConvertedDate, setUtcConvertedDate] = useState({startDate: "", endDate: ""})

    useEffect(() => {
        const fetchData = async() => {
            await getTimezoneData()
        }

        fetchData()
    },[])

    const getTimezoneData = async () => {
        try {
            const response = await axios.get("http://localhost:3500/api/v1/timezone/latest_entry");
            setTimezoneData(response.data);
            console.log(response);
            // convertUtcTimezone(response.data.startDate, response.data.endDate);
            // checkIsDateValid();
        } catch (error) {
            console.error("Error fetching timezone data:", error);
        }
    };
    

    const checkIsDateValid = () => {
        const current_Date = moment(Date.now() )
        console.log(current_Date);
        console.log(Date.now());
        if(current_Date.isBetween(timezoneData.startDate, timezoneData.endDate)){
            setEdit(true)
        }
    }

    const convertUtcTimezone = (startDate, endDate) => { 
        setUtcConvertedDate({startDate: moment.tz(startDate,"YYYY-MM-DDTHH:mm:ss", timezoneData.timezone ).utc().format("DD-MM-YYYY HH:mm"), endDate: moment.tz(endDate, "YYYY-MM-DDTHH:mm:ss", timezoneData.timezone).utc().format("DD-MM-YYYY HH:mm")})
        console.log(utcConvertedDate);
    }

    const convertTimeZone = (start, end, timezone) => {
        let convertedStart = moment.tz(start, timezone).format('DD-MM-YYYY HH:mm');
        let convertedEnd = moment.tz(end, timezone).format('DD-MM-YYYY HH:mm');
        return { convertedStart, convertedEnd };
    }


  return (
    <React.Fragment>
      <div className='h-screen w-screen flex justify-center items-center flex-col gap-10 px-80 container'>
        <div className='bg-blue-50 w-full flex flex-col items-center px-52 py-20 gap-10 rounded-2xl'>
        <h1 className='text-3xl font-semibold'>Preview Form</h1>
        
        {
            timezoneData && 
            <div className='w- container flex flex-col gap-5'>
                <div className='flex justify-between w-full'>
                    <p className='text-xl font-semibold'>IST:</p>
                    {timezoneData  && <p className='bg-gray-200 px-4 py-1 rounded-md flex gap-3'>{timezoneData.IST.convertedStart } <span>to</span> {timezoneData.IST.convertedEnd }</p>}
                </div>

                <div className='flex w-full justify-between'>
                    <p className='text-xl font-semibold'>JST:</p>
                    {/* <p className='bg-gray-200 px-4 py-1 rounded-md flex gap-3'>{convertTimeZone(utcConvertedDate.startDate, utcConvertedDate.endDate, "Asia/Tokyo").convertedStart} <span>to</span> {convertTimeZone(utcConvertedDate.startDate, utcConvertedDate.endDate, "Asia/Tokyo").convertedEnd }</p> */}
                    {timezoneData && <p className='bg-gray-200 px-4 py-1 rounded-md flex gap-3'>{timezoneData.JST.convertedStart } <span>to</span> {timezoneData.JST.convertedEnd }</p>} 
               </div>

                <div className='flex w-full justify-between'>
                    <p className='text-xl font-semibold'>GMT:</p>
                    {/* <p className='bg-gray-200 px-4 py-1 rounded-md flex gap-3'>{utcConvertedDate.startDate} <span>to</span> {utcConvertedDate.endDate }</p> */}
                    {timezoneData && <p className='bg-gray-200 px-4 py-1 rounded-md flex gap-3'>{timezoneData.IST.convertedStart } <span>to</span> {timezoneData.IST.convertedEnd }</p>}

                </div>

                <div className='flex w-full justify-between'>
                    <p className='text-xl font-semibold'>Pacific:</p>
                    {/* <p className='bg-gray-200 px-4 py-1 rounded-md flex gap-3'>{convertTimeZone(utcConvertedDate.startDate, utcConvertedDate.endDate, "America/Los_Angeles").convertedStart} <span>to</span>  {convertTimeZone(utcConvertedDate.startDate, utcConvertedDate.endDate, "America/Los_Angeles").convertedEnd }</p> */}
                    {timezoneData && <p className='bg-gray-200 px-4 py-1 rounded-md flex gap-3'>{timezoneData.Pacific.convertedStart } <span>to</span> {timezoneData.Pacific.convertedEnd }</p>}
                </div>

            </div>
        } 

        <div>
            <button disabled= {edit === false} className={` ring-0 text-white px-1 py-2 text-lg font-semibold rounded-lg w-28 ${edit? "bg-green-500 hover:bg-green-400 " : "bg-gray-400 cursor-not-allowed" }`}>Edit</button>
            
        </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default TimePageComponent
