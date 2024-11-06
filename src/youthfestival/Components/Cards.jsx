import React from 'react';
import '../ComponentsCSS/cards.css'; // Link to CSS file for styling

const Card = ({ title, text, image }) => (
  <div className="card" style={{ width: "18rem" }}>
    <img className="card-img-top" src={image} alt="Card image cap" />
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{text}</p>
    </div>
  </div>
);

const Abouts = () => {
  return (
    <div className="about-containerx">
      <Card title="Activity Zone" image="./festivalimages/yfpcard2.jpg" text="Enter our vibrant Activity Zone to explore block printing, clay modeling, VR, PlayStation, and Beyblade battles. Unleash creativity with nail art, tattoos, and crafts like 3D printing and tufting. Capture memories at the Polaroid booth and enjoy fun!" />
      <Card title="Stage Zone" image="./festivalimages/yfpcard1.jpg" text="Experience the thrill of our Stage Zone with stand-up comedy, captivating fashion shows, live band competitions, and dynamic performances in singing, bachata, and dance. Join jamming sessions, soak in the vibes, and dance the night away to our DJ’s beats! Gear up for a crazy evening!" />
      <Card title="Food Zone" image="./festivalimages/yfpcard3.jpg" text="Delight in our Food Zone, where gourmet international cuisine meets a refined fine dining experience, complemented by skilled baristas crafting perfect brews and masterful confectioners creating delectable sweets to satisfy every craving." />
      
    </div>
  );
};

export default Abouts;