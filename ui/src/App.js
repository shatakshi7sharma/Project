import './App.css';
import Login from './Login/index';
import Home from './Home/index';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { UserData } from './UserList/UserList.const';
// import { useState } from 'react';
import Signup from './Signup';


function App() {

  return (

    // <UserData.Provider value={value}>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
    // </UserData.Provider>
  );
}

export default App;


















// 


// function App() {
//   return (
//     <div className="App">
//       "Hello"
//     </div>
//   );
// }

// export default App;
