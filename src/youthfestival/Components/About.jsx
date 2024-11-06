import "../ComponentsCSS/about.css";
import Sponsor from "../Components/Sponsor";
import React from 'react';
import Card from "./Cards";

const About = () => {
    return (
        <div className="youthfestival">
            <section className="about-section" style={{ backgroundImage: "url('./festivalimages/yfpbg3.png')" }}>
                <div className="about-container">
                    <div className="about-imagex">
                        <img src="./festivalimages/yfpba.png" className="hover-image" alt="About us" style={{ maxWidth: '80%', height: 'auto' }} />
                    </div>
                    <div className="about-textx">
                        <h2 className="fw-150" id="section1" style={{ fontFamily: 'Turret Road, sans-serif', fontSize: '35px', color: 'white' }}>//MAHARAJA OF JAIPUR </h2>
                        <p style={{ fontFamily: 'Turret Road, sans-serif', fontSize: '16px', color: 'white' }} className="d-flex align-items-center justify-content-center justified-text">
                            HH Sawai Padmanabh Singh, Maharaja of Jaipur, is the esteemed Brand
                            Ambassador for Youth Festival Plus. An icon of modern leadership, he inspires
                            youth with his visionary approach and philanthropic endeavours. His commitment to
                            promoting regional talent, coupled with his roles as an equestrian sportsperson and
                            fashion connoisseur, reflects his dedication to courage, determination, and
                            resilience. Known for his approachable demeanour, he actively engages with young
                            individuals, offering wisdom and guidance. Through his association, he empowers
                            the youth of Rajasthan to pursue innovation and education, paving the way for a
                            brighter, more prosperous future. In this pursuit of excellence, First India
                            Entertainment is dedicated to empowering youth to lead purposeful lives, building a
                            prosperous future under the esteemed mentorship of HH Sawai Padmanabh Singh.
                            Together, they illuminate the path for the youth of Rajasthan, guiding them toward
                            progress and success. </p>

                    </div>
                </div>


                <div className="about-container">
                    <div className="about-textx">
                        <h2 style={{ fontFamily: 'Turret Road, sans-serif', fontSize: '35px', color: 'white' }} className="fw-150">//2X PARALYMPIC CHAMPION
                            AVANI SINGH LEKHARA</h2>
                        <p style={{ fontFamily: 'Turret Road, sans-serif', fontSize: '16px', color: 'white' }} className="d-flex align-items-center justify-content-center justified-text">
                            Avani Lekhara, the Youth Plus Icon, exemplifies excellence and resilience in sports.
                            As a double gold medalist at the Paralympics, she triumphed in the 10m rifle event
                            at both the 2020 and 2024 Games, making history by securing two consecutive
                            golds. Additionally, her bronze medal in the 50m rifle 3 positions SH1 event at the
                            2020 Paralympics marked her as the first Indian woman to win multiple medals at a
                            single Paralympic Games. Avani's remarkable achievements inspire the youth of
                            Rajasthan and align perfectly with the ethos of Youth Festival Plus 2024,
                            encouraging young individuals to pursue their dreams with determination and
                            passion. </p>

                    </div>
                    <div className="about-imagex">
                        <img src="./festivalimages/yfpyi.png" className="hover-image" alt="About us" style={{ maxWidth: '80%', height: 'auto' }} />
                    </div>
                </div>



                <div id="section2" className="about-container">
                    <div className="about-textx">
                        <h2 style={{ fontFamily: 'Turret Road, sans-serif', fontSize: '45px', color: 'white' }} className="fw-150  d-flex justify-content-center m-5">HOW TO APPLY FOR YOUTH FEST+
                        </h2>
                        <p className="d-flex justify-content-center justified-text">
                            <ul className="about-list">
                                <li style={{ fontFamily: 'Turret Road, sans-serif', fontSize: '16px', color: 'black' }}>
                                    1) Click the “Apply Now” button at the top of the page.

                                </li>
                                <li style={{ fontFamily: 'Turret Road, sans-serif', fontSize: '16px', color: 'black' }}>
                                    2) Complete the form with all the necessary details!

                                </li>
                                <li style={{ fontFamily: 'Turret Road, sans-serif', fontSize: '16px', color: 'black' }}>
                                    3) Pay ₹1000 via our secure payment gateway.
                                </li>
                                <li style={{ fontFamily: 'Turret Road, sans-serif', fontSize: '16px', color: 'black' }}>
                                    4) After you submit, watch for a confirmation email in your inbox. Get ready to make your mark at Youth Fest+
                                </li>
                            </ul>
                        </p>
                    </div>

                </div>
            </section>
            <section className="about-section" style={{ backgroundImage: "url('./festivalimages/yfpbg7.png')" }}>

                <h2 id="section3" style={{ fontFamily: 'Turret Road, sans-serif', fontSize: '45px', color: 'white' }} className="text-white">Woke & Vogue - Fashion Show</h2>

                <div className="about-containerx mb-5">
                    <div className="about-textx">
                        <p style={{ fontFamily: 'Turret Road, sans-serif', fontSize: '25px', color: 'white' }}>//GET READY TO SLAY THE RUNWAY AT WOKE TO
                            VOGUE! THIS ISN’T JUST A FASHION SHOW—IT’S A HIGH-
                            ENERGY SHOWCASE WHERE THE FRESHEST STYLES
                            AND BOLDEST TRENDS COLLIDE. IT’S TIME FOR THE
                            FIERCEST YOUNG FASHIONISTAS TO BRING THEIR A-
                            GAME AND STRUT THEIR STUFF FOR A CHANCE TO WIN
                            SOME SERIOUS CASH.</p>
                        <ul style={{ listStyleType: 'none', padding: 0, fontFamily: 'Turret Road, sans-serif', color: 'white', fontSize: '20px' }}>
                            <li style={{ margin: '10px 0' }}>
                                <strong style={{ color: 'gold' }}>WIN!</strong>
                            </li>
                            <li style={{ margin: '5px 0' }}>1ST ₹21K</li>
                            <li style={{ margin: '5px 0' }}>2ND ₹15K</li>
                            <li style={{ margin: '5px 0' }}>3RD ₹11K</li>
                            <li style={{ margin: '10px 0' }}><em>30 NOV 24’</em></li>
                            <li style={{ margin: '10px 0' }}><em>Venue - Clarks Amer,Jaipur</em></li>
                        </ul>
                    </div>
                    <div className="about-image">
                        <img style={{ width: "400px" }} src="./festivalimages/yfpfashion.png" />
                    </div>
                </div>




                <h2 style={{ fontFamily: 'Turret Road, sans-serif', fontSize: '45px', color: 'white' }} className="text-white">Minutes to Midnight - Battle of Bands</h2>
                <div className="about-containerx mb-5">
                    <div className="about-textx">
                        <p style={{ fontFamily: 'Turret Road, sans-serif', fontSize: '25px', color: 'white' }}>//GEAR UP FOR AN EPIC NIGHT AT CLARKS AMER, JAIPUR!
                            MINUTES TO MIDNIGHT IS A HIGH- ENERGY BAND
                            SHOWDOWN WHERE YOUTH BANDS WILL SHRED THE
                            STAGE AND BRING THE HEAT. BRING YOUR A-GAME FOR
                            A CHANCE TO SCORE SOME SERIOUS CASH.</p>
                        <ul style={{ listStyleType: 'none', padding: 0, fontFamily: 'Turret Road, sans-serif', color: 'white', fontSize: '20px' }}>
                            <li style={{ margin: '10px 0' }}>
                                <strong style={{ color: 'gold' }}>WIN!</strong>
                            </li>
                            <li style={{ margin: '5px 0' }}>1ST ₹21K</li>
                            <li style={{ margin: '5px 0' }}>2ND ₹15K</li>
                            <li style={{ margin: '5px 0' }}>3RD ₹11K</li>
                            <li style={{ margin: '10px 0' }}><em>01 DEC 24’</em></li>
                            <li style={{ margin: '10px 0' }}><em>Venue - Clarks Amer,Jaipur</em></li>
                        </ul>
                    </div>
                    <div className="about-image">
                        <img style={{ width: "400px" }} src="./festivalimages/yfpbands.png" />
                    </div>
                </div>


                <h2 style={{ fontFamily: 'Turret Road, sans-serif', fontSize: '45px', color: 'white' }} className="text-white">Experience Centre</h2>



                <Card/>

            </section>

        </div>

    );
}

export default About;     