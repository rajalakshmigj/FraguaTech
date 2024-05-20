import React from 'react'
import Header from './header'
import Product from '../Product/product'
import './main.scss'
import { Link } from 'react-router-dom'

const Main = () => {

    return (
        <>
          <Product/>  {/* <Header /> */}
            {/* <div className={`p-2 ml-14 bg-[#d9d9d9] custom-class font-roboto`}>
                <div className=" bg-white rounded lg:mt-3 dark:border-gray-700 mt-5 shadow-xl">
                    <div className="mb-4">
                     <Product/>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default Main