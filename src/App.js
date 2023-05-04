import './App.css';
import Employees from "./components/Employees";
import HomePage from './components/HomePage';
import SingleEmployee from './components/SingleEmployee';
import SingleTask from './components/SingleTask';
import Tasks from './components/Tasks';

import { BrowserRouter,Routes,Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/employees' element={<Employees/>}/>
      <Route path='/employees/:id' element={<SingleEmployee/>}/>
      <Route path='/tasks' element={<Tasks/>}/>
      <Route path='/tasks/:id' element={<SingleTask/>}/>
      </Routes>  
    </div>
    </BrowserRouter>
  );
}

export default App;
