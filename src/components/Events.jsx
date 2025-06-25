// this file will be used to display the events that are scheduled for the livestreaming schedule for certain games and events
import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Events.css';
import {updateTitle} from '../utils/updateTitle';

// This is the main function that will be exported to the App.js file to be displayed on the site
const Events = () => {

    updateTitle("Events"); //update the title of the page to show the current page
    // this section will be used to display the events
    // that are scheduled for the livestreaming schedule for certain games and events
    // State to store the selected date
    const [selectedDate, setSelectedDate] = useState(new Date());
    // State to store the array of events of the scheduled dates
    const [event] = useState([
        {title: 'COD MW3 Stream', date: new Date(2025, 1, 11, 20, 30)}, //dates are in the format (year, month, day) month is 0 based index starting from january[0]-december[11] [0-11]
        {title: 'COD Bo6 Stream', date: new Date(2025, 1, 12, 20, 30)},//dates are in the format (year, month, day)
        {title: 'COD WatchParty', date: new Date(2025, 1, 13, 17, 30)},//dates are in the format (year, month, day) time is in 24 hour format in code but on the site it will be displayed in 12 hour format
        {title: 'Wedding Day', date: new Date(2025, 6, 5, 20)}, //dates are in the format (year, month, day)
        // Add more events as they come up following the same format 
    ]); // Array of events 


    //these 2 functions will be used to display the events on the calendar
    // Function to select dates
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    //Filter events based on the selected date
    const filteredEvents = event.filter(
        (event) =>
        event.date.getDate() === selectedDate.getDate() &&
        event.date.getMonth() === selectedDate.getMonth() &&
        event.date.getFullYear() === selectedDate.getFullYear()
    )

    // this is the main return function that will display the events on the site
    return (
        <div className="events-calendar">
            <h1>Events</h1>
            <Calendar onChange={handleDateChange} value={selectedDate}/>
            <div className="events-list">
                <h2>Events on {selectedDate.toDateString()}</h2>
                {filteredEvents.length ===0 ? (
                    <p>No events for this date.</p>
                    ) : (
                        <ul>
                           {filteredEvents.map((event, index) =>{
                            // Extracting Time from the date
                            const hours = event.date.getHours()
                            const minutes = event.date.getMinutes()
                            const ampm = hours >= 12 ? 'pm' : 'am';
                            const formattedHours = hours % 12 || 12;
                            
                            //return the title with name and time
                            return(
                                <li key={index}> 
                                    {event.title} - {formattedHours}:{minutes} {ampm}
                                </li>
                            )
                           })}
                        </ul>
                    )
                }

            </div>
        </div>
    );
}
export default Events;



/*

    I have used ReactJS as the tool for the project to build the website.
    I have learned ReactJS to be an easier way to build the website and to make it more interactive and user-friendly. 
    The intermediate topic that I have used in this project is the use of the
     react-calendar to display the date, time, and events on the website. 
    The react-calendar is a library that is used to display the calendar on the website.
*/
