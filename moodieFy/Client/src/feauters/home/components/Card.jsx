import React from 'react'

const Card = ({icon,text,para}) => {
    console.log(icon)
  return (
  <div className="card">
          <div className='icon'>{icon}</div>
          <div>
            <h3>{text}</h3>
          <p>{para}</p>
          </div>
    </div>
  )
}

export default Card
