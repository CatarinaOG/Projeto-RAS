import {Route , Routes, BrowserRouter} from "react-router-dom"

import Home from './pages/Home'



export default function App(){

    return(

        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home search='Todos' />} />
                <Route path='/Futebol' element={<Home search='Futebol' />} />
                <Route path='/Basquetebol' element={<Home search='Basquetebol'  />} />
                <Route path='/Tenis' element={<Home search='Tenis' />} />
                <Route path='/MotoGP' element={<Home search='MotoGP' />} />
            </Routes>
        </BrowserRouter>

    )


}