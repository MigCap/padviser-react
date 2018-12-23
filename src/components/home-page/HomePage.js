import React from 'react';

const HomePage = ({ history }) => {
  return (
    <div className="masthead">
      <div className="ui-container">
        <img
          src={process.env.PUBLIC_URL + 'img/worldmapblue.png'}
          alt="worldmap"
        />
        <h2>
          Book or Rent WorldWide any AV equipement just with a few clicks.
        </h2>
      </div>
    </div>
  );
};

export default HomePage;
