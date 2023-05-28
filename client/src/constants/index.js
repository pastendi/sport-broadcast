import { IoBarChartSharp } from 'react-icons/io5'
import { BiCustomize } from 'react-icons/bi'
import { FaPhotoVideo } from 'react-icons/fa'
import { AiOutlineMessage } from 'react-icons/ai'
import { FiUsers } from 'react-icons/fi'

export const adminNavLinks = [
  { text: 'Dashboard', path: '/admin/', icon: IoBarChartSharp },
  {
    text: 'Customization',
    path: '/admin/customization',
    icon: BiCustomize,
  },
  { text: 'Users', path: '/admin/users', icon: FiUsers },
  { text: 'Videos', path: '/admin/videos', icon: FaPhotoVideo },
  {
    text: 'Message',
    path: '/admin/message',
    icon: AiOutlineMessage,
  },
]

export const userNavLinks = [
  { text: 'Home', path: '/' },
  { text: 'About', path: '/about' },
  { text: 'Videos', path: '/videos' },
  { text: 'Contact', path: '/contact' },
]
