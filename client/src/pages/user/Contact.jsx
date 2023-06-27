import { useEffect, useState } from 'react'
import Input from '../../components/Form/Input'
const data = {
  email: '',
  subject: '',
  message: '',
}
const Contact = () => {
  const [values, setValues] = useState(data)
  const handleChange = ({ currentTarget: input }) => {
    setValues({ ...values, [input.name]: input.value })
  }
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
  return (
    <main>
      <h1 className='flex text-center justify-center text-5xl border-b-4 pb-4 font-semibold border-orange-300'>
        Contact Us
      </h1>
      <div className='flex flex-col-reverse lg:flex-row gap-10'>
        <div className='flex-1 w-full max-w-4xl mx-auto'>
          <div className='mt-4'>
            <h2 className='mb-6 text-3xl font-semibold text-center md:text-4xl'>
              FAQs
            </h2>
            <p className='max-w-lg mx-auto text-center text-grayishBlue'>
              Here are some of the FAQS. If you have any other questions you'd
              like answered please feel free to email us.
            </p>
          </div>
          {faqs.map((x, index) => {
            return (
              <div
                className='py-1 border-b-2 outline-none group'
                tabIndex={index}
                key={index}
              >
                {/* question */}
                <div className='flex items-center justify-between py-3 text-gray-800 transition duration-500 cursor-pointer group ease'>
                  <div className='group-hover:text-red-400'>{x.question}</div>
                  <div className='group-focus:-rotate-180 group-focus:text-red-500'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='18'
                      height='12'
                    >
                      <path
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='5'
                        d='M1 1l8 8 8-8'
                      />
                    </svg>
                  </div>
                </div>
                {/* answer */}
                <div className='overflow-hidden transition duration-500 ease max-h-0 group-focus:max-h-screen'>
                  {x.answer}
                </div>
              </div>
            )
          })}
        </div>
        <div className='flex-1 space-y-4 my-6'>
          <div className='w-full flex justify-center'>
            <h1 className='text-4xl font-semibold'>Contact Form</h1>
          </div>
          <div>
            <Input
              type='email'
              name='email'
              value={values.email}
              placeholder='Email'
              onChange={handleChange}
            />
          </div>
          <div>
            <Input
              type='text'
              name='subject'
              value={values.subject}
              placeholder='subject'
              onChange={handleChange}
            />
          </div>
          <div>
            <textarea
              className='w-full h-40 p-4 outline-none focus:border-sky-500 focus:border-2 rounded-md'
              type='text'
              name='message'
              value={values.message}
              placeholder='Your message'
              onChange={handleChange}
            />
          </div>
          <div className='w-full flex justify-center'>
            <button className='btn bg-emerald-400 text-xl'>Send message</button>
          </div>
        </div>
      </div>
    </main>
  )
}
const faqs = [
  {
    question: 'What is FunOlympic?',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis temporibus quidem ut minima sapiente, sint accusantium! Corporis expedita aut eos! Officia modi dolorum est vitae a nesciunt eveniet natus, quae quis, eligendi magni placeat! Unde nulla sint nostrum iusto similique dolore eaque. Maxime officiis dolorem vel, quam ad optio recusandae.',
  },
  {
    question: 'How can I request a new browser?',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis temporibus quidem ut minima sapiente, sint accusantium! Corporis expedita aut eos! Officia modi dolorum est vitae a nesciunt eveniet natus, quae quis, eligendi magni placeat! Unde nulla sint nostrum iusto similique dolore eaque. Maxime officiis dolorem vel, quam ad optio recusandae.',
  },
  {
    question: 'Is there a mobile app?',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis temporibus quidem ut minima sapiente, sint accusantium! Corporis expedita aut eos! Officia modi dolorum est vitae a nesciunt eveniet natus, quae quis, eligendi magni placeat! Unde nulla sint nostrum iusto similique dolore eaque. Maxime officiis dolorem vel, quam ad optio recusandae.',
  },
  {
    question: 'What about other Chromium browsers?',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis temporibus quidem ut minima sapiente, sint accusantium! Corporis expedita aut eos! Officia modi dolorum est vitae a nesciunt eveniet natus, quae quis, eligendi magni placeat! Unde nulla sint nostrum iusto similique dolore eaque. Maxime officiis dolorem vel, quam ad optio recusandae.',
  },
]

export default Contact
