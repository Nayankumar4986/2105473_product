import React, { useEffect } from 'react';
import { register, getAuthorizationToken } from './api';

function Mycom() {
  useEffect(() => {
   
    register("goMart", "Nayan", "2105473", "2105473@kiit.ac.in", "FKDLjg")
      .then(data => {
        console.log('Registration successful:', data);
        getAuthorizationToken("gotMart", data.clientID, data.clientSecret, "Nayan", "NayanK092@gmail.com", "2105473")
          .then(tokenData => {
            console.log('Authorization token:', tokenData);
        
          })
          .catch(error => {
            console.error('Error getting authorization token:', error);
          });
      })
      .catch(error => {
        console.error('Error registering:', error);
      });
  }, []);

  return (
    <div>
       <p>nayan kumar</p>
    </div>
  );
};

export default Mycom;
