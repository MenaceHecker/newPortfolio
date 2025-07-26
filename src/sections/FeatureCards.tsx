import React from 'react'
import { abilities } from '../constants'


const FeatureCards = () => {
  return (
    <div className='w-full paddinx-g-lg'>
        <div className='mx-auto grid-3-col'>
            {abilities.map (({imgPath, title, desc}) => (
                <div>
                    <h3>{title}</h3>
                </div>
            ))}
        </div>

    </div>
  )
}

export default FeatureCards