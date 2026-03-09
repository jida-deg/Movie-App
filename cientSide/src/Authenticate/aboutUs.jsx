import React from 'react';
import './aboutUs.css';
import Navbar from '../components/Navbar';

export default function About() {
  return (
    <>
      <Navbar />
      <section className="about">
        <div className="about-container">
          <h1 className="about-title">About Our Movie Site</h1>
          <p className="about-text">
            Welcome to our movie platform! This website is designed for movie lovers
            who want to explore a wide collection of films including Action,
            Romance, Anime, Thriller and more. You can browse, discover and enjoy
            your favorite movies anytime.
          </p>
          <div className="about-cards">
            <div className="card">
              <h3>🎥 Huge Library</h3>
              <p>Thousands of movies across different genres and languages.</p>
            </div>
            <div className="card">
              <h3>⚡ Fast Streaming</h3>
              <p>Enjoy smooth and fast playback with modern streaming technology.</p>
            </div>
            <div className="card">
              <h3>🌎 Watch Anywhere</h3>
              <p>Access movies from any device, anytime you want.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
