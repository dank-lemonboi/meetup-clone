import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../../Assets/avatar-icon.svg'

export default function PastEventCard(props) {


    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var abbMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var newDate = new Date(props.startDate);

    var dayOfWeek = days[newDate.getDay()];
    var month = months[newDate.getMonth()];
    var abbMonth = abbMonths[newDate.getMonth()];
    var date = newDate.getDate();
    var fullYear = newDate.getFullYear()
    var time = newDate.toLocaleTimeString()
    var splicedTime = `${time.substring(0, time.length - 6)} ${time.substring(time.length - 3, time.length)}`
    const mappedList = props.attendees.map((obj, i) => {
        let avatarImage = { avatar }
        obj.image ? avatarImage = obj.image : avatarImage = { avatar };
        return <li key={i} style={{ backgroundImage: `url(${avatarImage})` }}></li>
    })
    return (
        <div className="miniEventMainDiv">
            <Link to={`/${props.groupUrl}/events/${props.eventId}`}>
                <div className="miniEventContainer">
                    <div className="groupEventCardLeft">
                        <p>{date}</p>
                        <p>{abbMonth}</p>
                    </div>
                    <div className="miniDateAndTitleDiv">
                        <p>{dayOfWeek}, {month} {date}, {fullYear}, {splicedTime}</p>
                        <h2>{props.eventName}</h2>
                    </div>
                </div>
                {props.attendees.length > 1 ?
                    <div style={{ alignItems: "center", paddingLeft: 20 }} className="organizerWrapper">
                        <img className="hostedAvatar" src={props.attendees[0].image} alt="avatar" />
                        <p className="blackp" >hosted by {props.attendees[0].username}</p>
                    </div>
                    : <div style={{ alignItems: "center", paddingLeft: 20 }} className="organizerWrapper">
                        <img className="hostedAvatar" src={avatar} alt="avatar" />
                        <p className="blackp" >hosted by </p>
                    </div>}
                    <div className="miniBottomDiv">
                        <div className="miniGroupAvatarHolder">
                            <ul>
                                {mappedList.slice(0, 3)}
                                <li id="peopleGoing">{props.attendees.length} going</li>
                            </ul>
                        </div>
                    </div>
            </Link>
        </div>

            )
}