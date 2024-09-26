import React from "react";
import Layout from "../layout/layout";

const AboutUs = () => {
    return (
        <Layout>
            <div className="">
                <div className="" style={{background:"#000"}}>
                    <div className="main-banner1">
                        <img src="./images/bannerabout.JPG" alt="banner" style={{width:"100%"}}/>
                        
                    </div>

                    <div className="container-screen">
                        <div className="row more-about align-items-center">
                            <div className="more-about-des col-lg-6">
                                <h4>ABOUT US</h4>
                                <p>Influenced by the majestic palaces, vibrant traditions, and captivating folklore of Rajasthan, we are
                                    committed to offering a diverse selection of premium content. Whether you're drawn to the glamour of
                                    Bollywood, the depth of regional Rajasthani cinema, dramatic tales, or narratives reflecting the
                                    essence
                                    of India, First India Plus Entertainment is your ultimate destination.
                                    What sets us apart is our commitment to authenticity and inclusivity, particularly in our
                                    celebration of
                                    Rajasthani culture.
                                    <br/><br/>
                                        Welcome to First India Plus Entertainment, a
                                        unique platform that seamlessly blends the rich tapestry of Indian entertainment with
                                        cutting-edge innovation. Our journey began with a deep appreciation vibrant culture of
                                        Rajasthan, us to pay homage to its opulence while integrating modern narratives.
                                    </p>
                                    </div>
                                    <div className="col-lg-6">
                                        <img src="./images/pavansir2.png" style={{width:"100%"}}/>
                                    </div>
                            </div>
                            <div className="about-des-mid">
                                <p>We collaborate closely with esteemed filmmakers, seasoned artists, and emerging talents from Rajasthan,
                                    creating a rich mosaic of perspectives, languages, and genres. Our content reflects the unique cultural
                                    tapestry of Rajasthan, from the expansive landscapes of the Thar Desert to the vibrant markets of
                                    Jaipur.
                                    More than just an entertainment platform, First India Plus Entertainment offers an immersive cultural
                                    journey. We celebrate Rajasthan's cinematic brilliance while honouring the extraordinary talent within
                                    the state. Our focus is on fostering a vibrant community where viewers can deeply immerse themselves in
                                    gripping narratives, uncover hidden treasures of Rajasthani folklore, and establish profound connections
                                    with stories that resonate personally.
                                    Step into the kaleidoscope of Rajasthani culture with us as we strive to elevate Indian entertainment to
                                    new heights, championing emerging voices from Rajasthan. We aim to provide a platform where stories not
                                    only entertain but also evoke emotions and facilitate connections. First India Plus Entertainment is
                                    dedicated to enriching your entertainment journey, bridging the gap between you and the heart of
                                    Rajasthan's storytelling legacy. Join us on this grand expedition through royal history, vibrant
                                    traditions, and compelling stories that define the essence of Rajasthan and its cultural magnificence,
                                    ensuring an immersive experience beyond conventional entertainment.</p>
                            </div>
                            <div className="homeimg">
                                <img src="./images/homeimg.png" style={{width:"100%"}}/>
                            </div>
                            <div className="visionary row justify-content-center align-items-center pb-3">
                                <div className="col-sm-12 col-lg-12">
                                    <div className="row align-items-center animate fadeInDown one">
                                        <div className="col-sm-12 col-lg-12">
                                            <div className="secTitle mb-0 text-center" >
                                                <h2>Our Visionary Leaders</h2>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-md-5 mt-4">
                                        <div className="col-sm-12 col-md-4">
                                            <div className="card person border-1 p-0" style={{background:"#000"}}>
                                                <figure className="mb-md-auto mb-0">
                                                    <img src="./images/jcsir.png" alt="image not found"
                                                        className="card-img rounded-0" />
                                                </figure>
                                                <div className="card-body px-0 text-center">
                                                    <div className="name">Dr. Jagdeesh Chandra </div>
                                                    <p>CMD & Editor-in-Chief</p>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-12 col-md-4 pt-md-0 pt-2 ">
                                            <div className="card person border-1 p-0" style={{background:"#000"}}>
                                                <figure className="mb-md-auto mb-0">
                                                    <img src="./images/pawansir.png" alt="image not found"
                                                        className="card-img rounded-0" />
                                                </figure>
                                                <div className="card-body px-0 text-center">
                                                    <div className="name">Mr. Pawan Arora
                                                    </div>
                                                    <p>CEO & Managing Editor</p>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-12 col-md-4 pt-md-0 pt-2">
                                            <div className="card person border-1 p-0" style={{background:"#000"}}>
                                                <figure className="mb-md-auto mb-0">
                                                    <img src="./images/virendrasir.png" alt="image not found"
                                                        className="card-img rounded-0" />
                                                </figure>
                                                <div className="card-body px-0 text-center">
                                                    <div className="name">Mr. Virendra Choudhary
                                                    </div>
                                                    <p>Director of First India News</p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </Layout>
    )
}

export default AboutUs;