import { IoBarChartSharp } from 'react-icons/io5'
import { BsImages } from 'react-icons/bs'
import { FaPhotoVideo } from 'react-icons/fa'

import { FiUsers } from 'react-icons/fi'
import { instagram, facebook, twitter, linkedin } from '../assets'

export const baseUrl = 'http://localhost:5000'
export const adminNavLinks = [
  { text: 'Dashboard', path: '/admin/', icon: IoBarChartSharp },
  {
    text: 'Carousel',
    path: '/admin/carousel',
    icon: BsImages,
  },
  { text: 'Users', path: '/admin/users', icon: FiUsers },
  { text: 'Videos', path: '/admin/videos', icon: FaPhotoVideo },
]

export const userNavLinks = [
  { text: 'Home', path: '/' },
  { text: 'About', path: '/about' },
  { text: 'Videos', path: '/videos' },
  { text: 'Contact', path: '/contact' },
]

export const footerLinks = [
  {
    title: 'Useful Links',
    links: [
      {
        name: 'Content',
        link: 'https://www.hoobank.com/content/',
      },
      {
        name: 'How it Works',
        link: 'https://www.hoobank.com/how-it-works/',
      },
      {
        name: 'Create',
        link: 'https://www.hoobank.com/create/',
      },
      {
        name: 'Explore',
        link: 'https://www.hoobank.com/explore/',
      },
      {
        name: 'Terms & Services',
        link: 'https://www.hoobank.com/terms-and-services/',
      },
    ],
  },
  {
    title: 'Community',
    links: [
      {
        name: 'Help Center',
        link: 'https://www.hoobank.com/help-center/',
      },
      {
        name: 'Partners',
        link: 'https://www.hoobank.com/partners/',
      },
      {
        name: 'Suggestions',
        link: 'https://www.hoobank.com/suggestions/',
      },
      {
        name: 'Blog',
        link: 'https://www.hoobank.com/blog/',
      },
      {
        name: 'Newsletters',
        link: 'https://www.hoobank.com/newsletters/',
      },
    ],
  },
  {
    title: 'Partner',
    links: [
      {
        name: 'Our Partner',
        link: 'https://www.hoobank.com/our-partner/',
      },
      {
        name: 'Become a Partner',
        link: 'https://www.hoobank.com/become-a-partner/',
      },
    ],
  },
]

export const socialMedia = [
  {
    id: 'social-media-1',
    icon: instagram,
    link: 'https://www.instagram.com/',
  },
  {
    id: 'social-media-2',
    icon: facebook,
    link: 'https://www.facebook.com/',
  },
  {
    id: 'social-media-3',
    icon: twitter,
    link: 'https://www.twitter.com/',
  },
  {
    id: 'social-media-4',
    icon: linkedin,
    link: 'https://www.linkedin.com/',
  },
]

export const ourGroups = [
  {
    image:
      'https://daman.co.id/daman.co.id/wp-content/uploads/2019/10/Robert-Downey-Jr-Glasses-3.jpg',
    name: 'Robert Downye JR',
    post: 'Founder & CEO',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus quibusdam asperiores ducimus, error quasi dolorum ex quaerat. Quod obcaecati repellendus, ab perferendis, velit aut, possimus officia temporibus nihil adipisci voluptas.',
  },
  {
    image:
      'https://marriedwiki.com/uploads/bio/2019/01/02/thumb/monica-barbaro-1546403076-260-260.jpeg',
    name: 'Monicca Barbora',
    post: 'HR',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus quibusdam asperiores ducimus, error quasi dolorum ex quaerat. Quod obcaecati repellendus, ab perferendis, velit aut, possimus officia temporibus nihil adipisci voluptas.',
  },
  {
    image:
      'https://th.bing.com/th/id/R.89778e8f3c8fe9874b7e647b039735a4?rik=m7NBfoGstaZcPw&pid=ImgRaw&r=0',
    name: 'Tom Cruz',
    post: 'Security chief',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus quibusdam asperiores ducimus, error quasi dolorum ex quaerat. Quod obcaecati repellendus, ab perferendis, velit aut, possimus officia temporibus nihil adipisci voluptas.',
  },
]
