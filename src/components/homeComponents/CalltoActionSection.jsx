import React, { useState } from 'react';
import axios from 'axios';

const CalltoActionSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your backend API endpoint
      await axios.post('/api/subscribe', { email });

      // Clear the email input field
      setEmail('');

      // Show a success message to the user
      alert('Thank you for subscribing!');
    } catch (error) {
      // Handle any errors that occurred during the submission
      console.error('Subscription error:', error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
      <div className="subscribe-section bg-with-black">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="subscribe-head">
                <h2>Do you need more tips?</h2>
                <p>Sign up for free and get the latest tips.</p>
                <form className="form-section" onSubmit={handleSubmit}>
                  <input
                      placeholder="Your Email..."
                      name="email"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                  />
                  <input
                      value="Yes. I want!"
                      name="subscribe"
                      type="submit"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CalltoActionSection;
