import React, { Component } from 'react'
import './CalendarView.css'
import EventCard from './EventCard.js'
import dateTimeFuncs from './dateTimeFuncs.js'
import Calendar from 'react-calendar'

export default class CalendarView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cat1: true,
            cat2: false,
            cat3: false,
            cat4: false,
            date: Date.now(),
            moreToggle: true,
            originalNum: 9,
            numToShow: 9
        }
        this.filterEvents = this.filterEvents.bind(this)
        this.listEvents = this.listEvents.bind(this)
        this.showMore = this.showMore.bind(this)
    }

    componentDidMount() {
        if (window.scrollY > 283) window.scrollTo(0, 283)
    }

    filterEvents() {
        const { cat1, cat2, cat3, cat4, numToShow, date } = this.state
        const { user, myEvents, myGroupEvents, allEvents, category } = this.props
        let offsetDate = date - 7200000
        if (cat1 && allEvents.length > 0) {
            let filteredEvents = allEvents.filter(e => {
                return e.start_date >= offsetDate && e.categories.includes(category)
            })
            return filteredEvents.slice(0, numToShow)
        }
        else if (cat2 && myGroupEvents.length > 0 && allEvents.length > 0) {
            let idArray = myGroupEvents.map(e => e.event_id)
            let filteredEvents = allEvents.filter(e => {
                return (idArray.includes(e.event_id) && e.start_date >= offsetDate)
                        || (e.categories.includes(user.category) && e.start_date >= offsetDate)
            })
            return filteredEvents.slice(0, numToShow)
        }
        else if (cat3 && myGroupEvents.length > 0) {
            let groupEvents = myGroupEvents.filter(e => {
                return e.start_date >= offsetDate
            })
            return groupEvents.slice(0, numToShow)
        }
        else if (cat4 && myEvents.length > 0) {
            let filteredEvents = myEvents.filter(e => {
                return e.start_date >= offsetDate
            })
            return filteredEvents.slice(0, numToShow)
        }
        return []
    }

    listEvents() {
        const { compareDate } = dateTimeFuncs
        let events = this.filterEvents()
        if (events.length === 0) return null
        let list = []
        for (let i = 0; i < events.length; i++) {
            // BOTH ROUNDED
            if ((i === 0 || compareDate(events[i].start_date, events[i - 1].start_date))
                && (i === events.length - 1 || compareDate(events[i + 1].start_date, events[i].start_date))) {
                list.push(
                    <EventCard
                        key={events[i].event_id + events[i].start_date + events[i].event_name + i}
                        event={events[i]}
                        date={true}
                        classStyle={'event start end'}
                    />
                )
            }
            // STARTS ROUNDED
            else if (i === 0 || compareDate(events[i].start_date, events[i - 1].start_date)) {
                list.push(
                    <EventCard
                        key={events[i].event_id + events[i].start_date + events[i].event_name + i}
                        event={events[i]}
                        date={true}
                        classStyle={'event start'}
                    />
                )
            }
            // ENDS ROUNDED
            else if (i === events.length - 1 || compareDate(events[i + 1].start_date, events[i].start_date)) {
                list.push(
                    <EventCard
                        key={events[i].event_id + events[i].start_date + events[i].event_name + i}
                        event={events[i]}
                        date={false}
                        classStyle={'event end'}
                    />
                )
            }
            // MIDDLE (NEITHER ROUNDED)
            else {
                list.push(
                    <EventCard
                        key={events[i].event_id + events[i].start_date + events[i].event_name + i}
                        event={events[i]}
                        date={false}
                        classStyle={'event'}
                    />
                )
            }
        }
        return list
    }

    showMore() {
        let events = this.filterEvents()
        let num = this.state.numToShow + this.state.originalNum
        if (events.length === 0) {
            this.setState({ moreToggle: false, numToShow: this.state.originalNum })
        }
        if (num > events.length) {
            this.setState({ moreToggle: false, numToShow: num })
        }
        else {
            this.setState({ numToShow: num })
        }
    }

    render() {
        const { moreToggle, cat1, cat2, cat3, cat4, date, originalNum } = this.state
        return (
            <div className='calendarView'>
                <div className='leftCol'>
                    {this.listEvents()}
                    {moreToggle ?
                        <div className='showMore' onClick={() => this.showMore()}>
                            Show more
                        </div>
                        : null
                    }
                </div>
                <div className='rightCol'>
                    <div className='meetupCategories'>
                        <span
                            className={cat1 ? 'activeCategory' : null}
                            onClick={() => this.setState({ cat1: true, cat2: false, cat3: false, cat4: false, moreToggle: true, numToShow: originalNum })}
                        >
                            All Meetups
                        </span>
                        <span
                            className={cat2 ? 'activeCategory' : null}
                            onClick={() => this.setState({ cat1: false, cat2: true, cat3: false, cat4: false, moreToggle: true, numToShow: originalNum })}
                        >
                            My Meetups & suggestions
                        </span>
                        <span
                            className={cat3 ? 'activeCategory' : null}
                            onClick={() => this.setState({ cat1: false, cat2: false, cat3: true, cat4: false, moreToggle: true, numToShow: originalNum })}
                        >
                            My Meetups
                        </span>
                        <span
                            className={cat4 ? 'activeCategory' : null}
                            onClick={() => this.setState({ cat1: false, cat2: false, cat3: false, cat4: true, moreToggle: true, numToShow: originalNum })}
                        >
                            I'm Going
                        </span>
                    </div>
                    <div className='today' onClick={() => this.setState({ date: new Date(Date.now()) })}>
                        Today
                    </div>
                    <Calendar
                        value={new Date(date)}
                        onChange={(date) => this.setState({ date: date.getTime(), moreToggle: true, numToShow: originalNum })}
                        className='calendarComponent'
                    />
                </div>
            </div>
        )
    }

}
