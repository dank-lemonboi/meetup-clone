import React from 'react'
import logo from '../Assets/Meetup_logo.svg'
import './LoggedOut/LoggedOut.css'
import EventCards from './LoggedOut/EventCards'
import laptop from '../Assets/laptop.jpg'
import lake from '../Assets/lake.jpg'
import tennis from '../Assets/tennis.jpg'
import thumb1 from '../Assets/thumb1.jpeg'
import thumb2 from '../Assets/thumb2.jpeg'
import thumb3 from '../Assets/thumb3.jpeg'
import CategoryGrid from './LoggedOut/CategoryGrid'
import rightArrow from '../Assets/right-arrow.svg'
import phone from '../Assets/holdingPhone.png'
import apple from '../Assets/downloadApple.png'
import google from '../Assets/downloadGoogle.png'
import Footer from '../Components/Footer'

export default function LoggedOut() {
    let eventCards = [{ title: 'Coffee and Coding', host: 'Anthony B.', from: 'Codeology', time: '7:00 PM', img: laptop, person: thumb1 },
    { title: 'Morning Tennis', host: 'Anthony B.', from: 'Casual Tennis Time', time: '6:30 AM', img: tennis, person: thumb2 },
    { title: 'Rock Skipping', host: 'Anthony B.', from: 'Skippers on the Rocks', time: '2:00 PM', img: lake, person: thumb3 }]

    let mappedCards = eventCards.map(x => {
        return <EventCards key={x.title} title={x.title} host={x.host} from={x.from} time={x.time} img={x.img} person={x.person} />
    })
    return (
        <div className='loggedOut'>
            <header>
                <img src={logo} alt="logo" className='logo' />
                <section>
                    <span>Create a Meetup</span>
                    <a href={process.env.REACT_APP_LOGIN} className='login'>Log in</a>
                    <a href={process.env.REACT_APP_LOGIN}>Sign up</a>
                </section>
            </header>
            <div className='bigGrid'>
                <div className='videoContainer'>
                    <video src='https://www.meetup.com/mu_static/en-US/dddafbfe4574fc19c6718950691dcb78.mp4' autoPlay loop />
                    <div className='videoOpacity'></div>
                    <div className='videoContent'>
                        <h2>What do you love?</h2>
                        <h4>Do more of it with Meetup</h4>
                        <a href={process.env.REACT_APP_LOGIN}><button className='pinkBtn'>Sign Up</button></a>
                    </div>
                </div>
                <div className='categoryRow'>
                    <button className='grayBtn'>Join a movement</button>
                    <button className='grayBtn'>Learn to cook</button>
                    <button className='grayBtn'>Train for a marathon</button>
                    <button className='grayBtn'>Build a mobile app</button>
                    <button className='grayBtn'>Hike a mountain</button>
                    <button className='grayBtn' id='practiceLanguageBtn'>Practice a language</button>
                </div>
                <div className='mainBlock'>
                    <div className='eventCards'>
                        <h2>Popular Meetups nearby</h2>
                        <div className='eventsHolder'>
                            {mappedCards}
                        </div>
                    </div>
                    <CategoryGrid />
                    <div className='howMeetupWorks'>
                        <h2>How Meetup Works</h2>
                        <div className='findCreate'>
                            <div className='findAMeetup'>
                                <h3>Find a Meetup</h3>
                                <h4>Discover local Meetups for all the things you love.</h4>
                                <div className='blueText'>
                                    <h4>Sign up</h4>
                                    <img src={rightArrow} alt="" />
                                </div>
                            </div>
                            <div className='createAMeetup'>
                                <h3>Create a Meetup</h3>
                                <h4>Create your own Meetup, and draw from a community of millions.</h4>
                                <div className='blueText'>
                                    <h4>Create a Meetup</h4>
                                    <img src={rightArrow} alt="img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='getTheApp'>
                    <div className='getTheAppContent'>
                        <h2>Get the app</h2>
                        <div className='blueText' id='learnMoreBlueText'>
                            <h4>Learn more</h4>
                            <img src={rightArrow} alt="img" id='learnMoreArrow' />
                        </div>
                        <div className='appButtonsHolder'>
                            <img src={apple} alt="img" />
                            <img src={google} alt="img" />
                        </div>
                    </div>
                    <img id='phone' src={phone} alt="img" />
                </div>
                <Footer />
            </div>
        </div>
    )
}