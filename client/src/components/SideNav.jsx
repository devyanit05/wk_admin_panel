import React from 'react'

const SideNav = () => {
  return (
    <div className="bg-white">
      <div>
        <i className='bi bi-bootstrap-fill my-2'></i>
        <span className='brand-naem fs-4'>Devyani</span>
      </div>
      <hr className='text-dark'/>
      <div className="list-group list-group-flush">
        <a className="list-group-item list-group-item-action my-2">
          <i className='bi bi-speedometer2'></i>
          <span>Dashboard</span>
        </a>
        <a className="list-group-item list-group-item-action my-2">
          <i className='bi bi-house'></i>
          <span>Home</span>
        </a>
      </div>
    </div>
  )
}

export default SideNav