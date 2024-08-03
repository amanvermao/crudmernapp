import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Ragister from './components/Ragister.jsx';
import Home from './components/Home.jsx';
import Edit from './components/Edit.jsx';
import View from './components/View.jsx';


function App() {
  
  return (
    <>

    
      <Router>
        <Routes>
  
          <Route path='/' element={<Home/>} />
          <Route path='/Ragister' element={<Ragister/>} />
          <Route path='/Edit/:id' element={<Edit/>} />
          <Route path='/View/:id' element={<View/>} />
        </Routes>
        
      </Router>

    

  

    
   
    </>
  )
}

export default App
