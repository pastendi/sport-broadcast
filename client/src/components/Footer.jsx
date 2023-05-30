import React from 'react'
import logo from '../assets/logo.png'
import { footerLinks, socialMedia } from '../constants'
const Footer = () => {
  return (
    <main className='flex-col pt-20'>
      <div className='flex justify-between w-full flex-col lg:flex-row mb-8 '>
        {/* logo and motto */}
        <div className='flex flex-1 sm:items-center flex-col sm:flex-row sm:justify-between lg:justify-start lg:items-start lg:flex-col'>
          <div className='flex items-center z-30 '>
            <div
              id='logo'
              className='w-28 h-16 md:w-40 md:h-28 lg:w-52 lg:h-40'
            >
              <img src={logo} alt='logo' />
            </div>
            <div className='text-2xl lg:text-4xl'>
              Fun <br /> Olympic
            </div>
          </div>
          <p className='paragraph text-xl md:text-2xl lg:text-xl lg:text-center mt-4 max-w-xs'>
            We bring olympic entertainment to your home Enjoy it !!!
          </p>
        </div>

        {/* footer links */}
        <div className='flex flex-[1.5] justify-between flex-wrap mt-10 lg:mt-0'>
          {footerLinks.map((link, index) => {
            return (
              <div key={index} className='flex flex-col my-4 min-w-[150px]'>
                <h4 className='font-semibold text-xl'>{link.title}</h4>
                <ul className='list-none space-y-2 mt-4'>
                  {link.links.map((x) => (
                    <li
                      key={x.name}
                      className='text-dimWhite text-lg hover:text-secondary cursor-pointer'
                    >
                      {x.name}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
      {/* footer copyright and social links */}
      <div className='w-full flex flex-col md:flex-row justify-between items-center pt-6 border-t-2 border-gray-800'>
        <p className='text-lg sm:text-2xl font-semibold '>
          2023 FunOlympic. All &copy; Rights reserved.
        </p>
        <div className='flex md:mt-0 mt-6 space-x-6'>
          {socialMedia.map((social, index) => (
            <img
              key={index}
              src={social.icon}
              alt={social.id}
              className='w-8 h-8 object-contain cursor-pointer '
            />
          ))}
        </div>
      </div>
    </main>
  )
}

export default Footer
