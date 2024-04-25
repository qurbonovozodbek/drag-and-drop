import React, { FC } from 'react'

interface CarProps {
    image: string,
    title: string,
    start_production: number,
    class: string
}

const Car: FC <CarProps>  = (props) => {
  return (
    <div className='page-card'>
        <img src={props.image} />
        <h3>{props.title}</h3>
        <p>{props.start_production}</p>
        <p>{props.class}</p>
    </div>
  )
}

export default Car