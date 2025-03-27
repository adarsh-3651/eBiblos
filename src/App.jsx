
import DetailsPage from './details'
import Login from './Login'
import {BrowserRouter, Routes,Route  } from 'react-router-dom'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact={true} path="/details.jsx" element = {<DetailsPage/>}/>
      </Routes>
    </BrowserRouter>
    );
}

export default App
