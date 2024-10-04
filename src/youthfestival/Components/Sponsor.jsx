import "../ComponentsCSS/sponsor.css";

const Sponsor = () => {
    return (
        <div className="youthfestival">  
            <div className="bg-neutral-800 py-20">
                <div className="max-w-5xl mx-auto px-4 xl:px-0">
                    <h2 className="text-3xl md:text-4xl text-center">OUR SPONSORS</h2>
                    <p className="mt-4 text-neutral-500 text-lg text-center">
                        We are proud to partner with leading organizations that support our mission.
                    </p>
                    
                    <div className="d-flex justify-content-center flex-wrap mt-10">
                        <div className="sponsor-logo1">
                            <img src="./festivalimages/sponsor5.png" alt="Sponsor 1" className="img-fluid" />
                        </div>
                        <div className="sponsor-logo">
                            <img src="./festivalimages/sponsor3.png" alt="Sponsor 3" className="img-fluid" />
                        </div>
                        <div className="sponsor-logo">
                            <img src="./festivalimages/sponsor2.png" alt="Sponsor 2" className="img-fluid" />
                        </div>
                        <div className="sponsor-logo">
                            <img src="./festivalimages/sponsor1.png" alt="Sponsor 4" className="img-fluid" />
                        </div>
                        <div className="sponsor-logo">
                            <img src="./festivalimages/sponsor4.png" alt="Sponsor 5" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sponsor;