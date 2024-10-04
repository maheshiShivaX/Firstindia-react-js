import "../ComponentsCSS/about.css";
import Sponsor from "../Components/Sponsor";
import React from 'react';

const About = () => {
    return (
        <div className='youthfestival'>
            <section className="about-section">
                <div id="section1" className="about-containerx">
                    <div className="about-imagex">
                        <img src="./festivalimages/Logo.png" alt="About us" style={{maxHeight:'280px'}}/>
                    </div>
                    <div className="about-textx">
                        <h2 className="fw-150">ABOUT US</h2>
                        <p className="d-flex justify-content-center justified-text">
                            Welcome to First India Plus Entertainment, the ultimate force in digital entertainment that’s revolutionizing the scene in Rajasthan and across India! As a pioneering media house, we’re not just setting industry standards—we’re breaking barriers with our exciting verticals like event management, innovative productions, and dynamic OTT platforms.

                        </p>
                        <p className="d-flex justify-content-center justified-text">
                            Our Youth Festival+? It’s more than just an event — it’s a celebration of creativity, collaboration, and community. We’re here to empower young talents, spark cultural exchanges, and unite people through the power of art and expression. Presented by First India Plus Entertainment, we’re on a mission to create a vibrant platform where creativity and collaboration come together to celebrate diversity and unity in our communities.

                        </p>
                    </div>
                </div>
                <Sponsor />

                <div className="about-container">
                    <div className="about-imagex">
                        <img src="./festivalimages/009.png" alt="About us" style={{ maxWidth: '80%', height: 'auto' }} />
                    </div>
                    <div className="about-textx">
                        <h2 className="fw-150">WHAT'S YOUTH FEST+ ALL ABOUT?</h2>
                        <p className="d-flex align-items-center justify-content-center justified-text">
                            Youth Fest+ invites participants to showcase their talents in art, music, dance, and innovation, fostering cultural exchange and creativity. The festival creates a supportive community that values virtues and positivity while offering competitions and experiences that challenge attendees to unleash their potential.                       </p>
                        <p className="d-flex align-items-center justify-content-center justified-text">
                            In addition to entertainment, Youth Fest+ emphasizes education and personal development through engaging learning labs focused on leadership skills and emotional intelligence. The event promotes a balanced lifestyle and encourages social awareness, inspiring creativity and innovation. Join us to celebrate youth and creativity together!
                        </p>


                    </div>

                </div>
                <div id="section2" className="about-container">
                    <div className="about-text">
                        <h2 className="fw-150  d-flex justify-content-center m-5">HOW TO APPLY FOR YOUTH FEST+
                        </h2>
                        <p className="d-flex justify-content-center justified-text">
                            <ul className="about-list">
                                <li>
                                    1) Click the “Apply Now” button at the top of the page.

                                </li>
                                <li>
                                    2) Complete the form with all the necessary details!

                                </li>
                                <li>
                                    3) Pay ₹1000 via our secure payment gateway.
                                </li>
                                <li>
                                    4) After you submit, watch for a confirmation email in your inbox. Get ready to make your mark at Youth Fest+ 
                                </li>

                            </ul>


                        </p>
                    </div>

                </div>
            </section>
            <div className="about-image p-5" style={{background:'#fff'}}>
                <img src="./festivalimages/trophy.png" alt="About us" />
            </div>
            <div className="about-container mx-0" style={{background:'#fff'}}>
                <div className="about-text">

                    <p className="d-flex align-items-center justify-content-center justified-text m-5">

                        <div class="awards-container">
                            <h2>AWARDS & RECOGNITION</h2>
                            <ul class="awards-list">
                                <li>First India Plus Running Trophy (to be returned within 45 days)</li>
                                <li>Talent-Based Awards: Prizes of INR 11,000, 7,500, and 5,000 for the top three performers</li>
                                <li>International Participation Opportunity: Exceptional performers may participate on an international platform</li>
                                <li>Consolation and Special Awards: Additional awards may be presented at the discretion of the Jury</li>
                                <li>Participation Certificates: All participants will receive certificates</li>
                                <li>Retainer Mementos: Winners will receive commemorative mementos</li>
                            </ul>
                        </div>

                    </p>
                </div>
            </div>
            <div id="section3" className="about-section">
            <h2 className="fw-150 d-flex justify-content-center">PHASE 1: EVENT HIGHLIGHTS</h2>
            <div className="about-containerx">
                <div className="about-imagex">
                    <img src="./005.png" alt="About us" className="img-fluid" style={{ maxWidth: '90%', height: 'auto' }} />
                </div>
                <div className="about-textx">
                    <h2 className="fw-150">INTERSCHOOL GROUP DANCE COMPETITION</h2>
                    <p className="justified-text">
                        <strong>Event:</strong> Interschool Group Dance Competition
                    </p>
                    <p className="justified-text">
                        <strong>Theme:</strong> Indian Fusion of Classical & Folk
                    </p>
                    <p className="justified-text">
                        <strong>Date:</strong> 19th October 2024
                    </p>
                    <p className="justified-text">
                        <strong>Participants:</strong> 8-10 dancers (plus up to 8 supporting dancers)
                    </p>
                </div>
            </div>
        
                <div id="section3" className="about-containerx">
                    <div className="about-imagex">
                        <img src="./festivalimages/004.png" alt="About us" style={{ maxWidth: '90%', height: 'auto' }} />
                    </div>
                    <div className="about-textx">
                        <h2 className="fw-150">INTER COLLEGE & UNIVERSITY DANCE COMPETITION</h2>
                        <p className="justified-text">
                            <strong>Theme:</strong> Retro (Duet)
                        </p>
                        <p className="justified-text" >
                            <strong>Date:</strong> 20th October 2024
                        </p>
                        <p className="justified-text">
                            <strong>Participants:</strong> 8-10 dancers
                        </p>
                    </div>

                </div>

            </div>


            <div className="container my-5">
                <h2 className="d-flex justify-content-center my-5">WHY CHOOSE US?</h2>

                <div className="row align-items-center my-4">
                    <div className="col-12 col-lg-4 text-center mb-4 mb-lg-0">
                        <img src="./festivalimages/008.png" alt="About us" className="img-fluid rounded" style={{ maxWidth: '90%', height: 'auto' }} />
                    </div>

                    <div className="col-12 col-lg-8">
                        <div className="about-text3">
                            <p className="mb-3">
                                <strong>1) Exceptional Visibility:</strong> Leverage the extensive reach of the FIRST INDIA GROUP, connecting with over 10 million engaged users. Your brand will gain prominent exposure across multiple platforms.
                            </p>
                            <p className="mb-3">
                                <strong>2) Comprehensive Media Coverage:</strong> With a staggering media reach of 500 million through First India Newspaper, First India News Channel, and Bharat 24, your brand will be highlighted in this culturally rich event.
                            </p>
                            <p className="mb-3">
                                <strong>3) Engage with Young Talent:</strong> Connect directly with Rajasthan’s creative youth. Show your commitment to nurturing innovation and talent!
                            </p>
                            <p className="mb-3">
                                <strong>4) Networking Opportunities:</strong> Interact with industry leaders and fellow creatives. Youth Fest + is the ideal platform to forge meaningful connections.
                            </p>
                            <p className="mb-3">
                                <strong>5) Cultural Impact:</strong> Align your brand with a movement that celebrates diversity and creativity, enhancing your reputation among socially conscious consumers.
                            </p>
                            <p className="mb-3">
                                <strong>6) Interactive Experiences:</strong> Participate in exclusive workshops and activities that allow you to engage directly with festival attendees.
                            </p>
                        </div>
                    </div>
                </div>
            </div>



        </div>

    );
}

export default About;     