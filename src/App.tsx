import { Route, Routes } from 'react-router-dom'
import './App.css'
import BoardWithTables from './components/BoardWithTables'
import Layout from './components/Layout'
import Paginationn from './components/Pagination'
import Scrol from './components/Scrol'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout></Layout>}>
          <Route index element={<BoardWithTables></BoardWithTables>}></Route>
          <Route path='/Pagination' element={ <Paginationn></Paginationn> }></Route>
          <Route path='/Scrol' element={ <Scrol></Scrol> } ></Route>
          <Route path='*' element={<h1>404</h1>}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
