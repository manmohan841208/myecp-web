import React from 'react'

const Footer = () => {

  const CurrentYear = new Date().getFullYear()
  // console.log(CurrentYear)

  return (
    <div className='footer-edit  mx-auto max-w-[1280px] md:px-[64px] pb-4 text-[13px] '>
      <div className='footer-body '>
        <p className=''>Privacy Policy │ Site Policy</p>
        <p className=''>© {CurrentYear} Exchange Credit Program. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
