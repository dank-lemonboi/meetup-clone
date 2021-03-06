import React from 'react'
import { Link } from 'react-router-dom'
import dateTimeFuncs from './dateTimeFuncs.js'

export default function EventCard(props) {
    const { event, date, classStyle } = props
    const { convertTime } = dateTimeFuncs
    return (
        <div>
            {date ?
                <div className='eventDate'>{new Date(event.start_date).toDateString().toUpperCase()}</div>
                : null
            }
            <div className={classStyle}>
                <div className='eventListCard'>
                    <div className='eventTime'>
                        {convertTime(event.start_date)}
                    </div>
                    <div className='eventDetails'>
                        <Link to={`/${event.url_name}`}>
                            <span className='groupName'>{(event.group_name).toUpperCase()}</span>
                        </Link>
                        <Link to={`/${event.url_name}/events/${event.event_id}`}>
                            <span className='eventName'>{event.event_name}</span>
                        </Link>
                        <span className='attendees'>{`${event.attendees} Members going`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
