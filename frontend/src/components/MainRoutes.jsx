import React from 'react'
import {Routes, Route} from "react-router-dom"
import Admin from './Admin'
import Register from '../pages/Register'
import EditAstro from './EditAstro'

const MainRoutes = () => {
  return (
    <Routes>
    <Route path="/" element={<Admin />}>
    </Route>
    <Route path="/register" element={<Register />} />
    {/* <Route exact path="/admin" component={Admin} />0 */}
        <Route path="/edit/:id" component={<EditAstro />} />
  </Routes>
  )
}

export default MainRoutes
