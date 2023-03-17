import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Landing from './components/Landing';
import User1 from './components/User1';
import ScrollToTop from './components/atoms/ScrollToTop'
function AnimatedRoutes() {
    const location = useLocation();
    return <>
        <AnimatePresence>
        <ScrollToTop/>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<Landing />} />
                <Route path='/user/:id' element={<User1 />} />
            </Routes>
        </AnimatePresence>
    </>
}
export default AnimatedRoutes