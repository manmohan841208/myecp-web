import React from 'react'

const Footer = () => {

  const CurrentYear = new Date().getFullYear()
  // console.log(CurrentYear)

  return (
    <div className='py-3 px-4 md:px-16'>
      <p>Privacy Policy │ Site Policy</p>
      <p>© {CurrentYear} Exchange Credit Program. All rights reserved.</p>
    </div>
  )
}

export default Footer
