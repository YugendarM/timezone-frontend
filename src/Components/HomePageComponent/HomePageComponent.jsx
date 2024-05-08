import axios from 'axios'
import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';



const HomePageComponent = () => {

  const [timezones, setTimezones] = useState([])
  const [userData, setUserData] = useState({timezone: "", startDate: "", endDate: ""})

  useEffect(() => {
    getAllTimezone()
  },[])

  const getAllTimezone = async () => {
    // const zones = moment.tz.names().map((zone) => ({
    //     name: zone,
    //     offset: moment.tz(zone).utcOffset()
    // }));

    // setTimezones(zones.map((zone) => {
    //   return "(UTC+"+zone.offset + ") "+zone.name 
    // }));
    setTimezones(moment.tz.names())
};



  const handleSave = async() => {
    const addedResponse = await axios.post("http://localhost:3500/api/v1/timezone/add", userData)
    if(addedResponse.status === 200){
      alert("Entry added successfully")
    }
    window.location.href = "/display"
  }

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value

    setUserData((values) => ({
      ...values, [name]: value
    }))
  }


  return (
    <React.Fragment>
      <div className='h-screen w-screen flex flex-col justify-center items-center px-80 container gap-20 '>
        <div className='bg-blue-50 flex flex-col justify-center items-center gap-20 px-40 py-20 rounded-2xl'>
          <div className='flex items-center gap-5 w-full justify-center'>
            <label className=''>Timezone:</label>
            <Dropdown className='w-1/2 rounded-lg' value={userData.timezone} options={timezones} placeholder="Select an option" 
            onChange={(selectedOption) => {
              const selectedValue = selectedOption.value.split(" ")
              console.log(selectedValue);
              setUserData({timezone: selectedOption.value})
            }} 
            name="timezone"/>
          </div>

          <div className='flex gap-20 justify-between w-full'>
            <div className='flex w-full items-center'>
              <label className='w-1/2'>Start Time:</label>
              <input className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1' placeholder="Enter the start date" type='datetime-local' name='startDate' value={userData.startDate} onChange={handleChange}/>
            </div>

            <div className='flex w-full items-center'>
              <label className='w-1/2'>End Time:</label>
              <input  className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1' placeholder="$24-$12-$12T$11:$58" type='datetime-local' name='endDate' value={userData.endDate} onChange={handleChange} min={userData.startDate}/>
            </div>
          </div>

          <button type='submit' className=' ring-0 bg-green-500 text-white px-1 py-2 text-lg font-semibold rounded-lg w-28 hover:bg-green-400' onClick={handleSave}>Save</button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default HomePageComponent
