import Signup from './signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import GetSession from './utils/session';




function App() {
   
   return(
   <>
   <GetSession/>
      <Signup/>
    </>
    )
   
  
}

export default App