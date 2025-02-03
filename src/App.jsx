import './App.css'
import {Home ,Trending , Popular , Movies} from "./components/index"
import { Routes , Route } from 'react-router-dom'

function App() {

  return (
    <div className='bg-[#1F1E24] w-full h-full flex'>
      <Routes>
        <Route path="/" element = {<Home />} ></Route>
        <Route path="/trending" element = {<Trending />} ></Route>
        <Route path="/popular" element = {<Popular />} ></Route>
        <Route path="/movies" element = {<Movies />} ></Route>
      </Routes>
    </div>
  )
}

export default App
