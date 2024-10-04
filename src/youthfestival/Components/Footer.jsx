import "../ComponentsCSS/footer.css";

const Footer = () => {
  return (
    <div className='youthfestival'>
      <div className="footer-body">
        <div className="pg-footer">
          <footer className="festival_footer">
            <svg className="footer-wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100" preserveAspectRatio="none">
              <path className="footer-wave-path" d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8 c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z"></path>
            </svg>
            <div className="footer-content">
              <div className="footer-content-column">
                <div className="footer-logo">
                  <a className="footer-logo-link" href="#">
                    <img src="./festivalimages/Footer2.png" alt="Footer Logo"/>
                  </a>
                </div>
              </div>
              <div className="footer-content-column">
                <div className="footer-menu">
                  <h2 className="footer-menu-name">First India+ Entertainment</h2>
                  <ul id="menu-company" className="footer-menu-list">
                    <li className="menu-item menu-item-type-post_type menu-item-object-page">
                      <a href="#">Contact - +91 7878843519</a>
                    </li>
                    <li className="menu-item menu-item-type-taxonomy menu-item-object-category">
                      <a href="#">Email - firstindiaplus@gmail.com</a>
                    </li>
                    <li className="menu-item menu-item-type-post_type menu-item-object-page">
                      <a href="#">Know More - https://firstindiaplus.com/</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="footer-content-column">
                <div className="footer-menu">
                  <h2 className="footer-menu-name">Office Address</h2>
                  <ul id="menu-quick-links" className="footer-menu-list">
                    <li className="menu-item menu-item-type-custom menu-item-object-custom">
                      <a target="_blank" rel="noopener noreferrer" href="#">301, Upasana Abode, Vijay Path, Tilak Nagar, Jaipur 04 (Rajasthan) INDIA</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="footer-content-column">
  <div className="footer-call-to-action">
    <h2 className="footer-call-to-action-title">Follow Us!</h2>
    <div className="social-icons">
      <a href="#" target="_blank" rel="noopener noreferrer">
        <img src="./festivalimages/social1.png" alt="Instagram" />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer">
        <img src="./festivalimages/social2.png" alt="Facebook" />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer">
        <img src="./festivalimages/social4.png" alt="Twitter" />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer">
        <img src="./festivalimages/social5.png" alt="Twitter" />
      </a>
      {/* Add more social media icons as needed */}
    </div>
  </div>
</div>
            </div>
            <div className="footer-copyright">
              <div className="footer-copyright-wrapper">
                <p className="footer-copyright-text">
                  <a className="footer-copyright-link" href="#" target="_self">©2024 | Made By First India+ Entertainment | All rights reserved</a>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Footer;