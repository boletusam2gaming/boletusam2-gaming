import React from 'react';
import './GoogleForm.css';


// Google form is going to be removed soon


const GoogleForm = () => {
  // Google Form from creating a new post
  return (
    <div className="google-form-container">
     <iframe 
        src="https://docs.google.com/forms/d/e/1FAIpQLSdEs_Pkp6fGJGEYnGLeL294CQPlG3hbF7i4_734wdlp25HZxg/viewform?embedded=true" 
        width="640" 
        height="689" 
        frameborder="0" 
        marginheight="0" 
        marginwidth="0">
            Loading…
        </iframe>
    </div>
  );
}

export default GoogleForm;

