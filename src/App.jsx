import './App.css'
import {Home ,Trending} from "./components/index"
import { Routes , Route } from 'react-router-dom'

function App() {

  return (
    <div className='bg-[#1F1E24] w-full h-full flex'>
      <Routes>
        <Route path="/" element = {<Home />} ></Route>
        <Route path="/trending" element = {<Trending />} ></Route>
      </Routes>
    </div>
  )
}

export default App
