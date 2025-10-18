import React from 'react'

const Footer = () => {

  const CurrentYear = new Date().getFullYear()
  // console.log(CurrentYear)

  return (
    <div className='mx-auto max-w-[1152px] bg-green-400 py-4 !text-base '>
      <p>Privacy Policy │ Site Policy</p>
      <p>© {CurrentYear} Exchange Credit Program. All rights reserved.</p>
    </div>
  )
}

export default Footer
