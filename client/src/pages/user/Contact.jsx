import { useState } from 'react'
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
  return (
    <main>
      <h1 className='flex text-center justify-center text-5xl border-b-4 pb-4 font-semibold border-orange-300'>
        Contact Us
      </h1>
      <div className='flex gap-10'>
        <div className='flex-1 w-full max-w-4xl mx-auto'>
          <div>
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
                        stroke-width='5'
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
        <div className='flex-1'>
          <div>
            <input
              type='email'
              name='email'
              value={values.email}
              placeholder='Email'
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type='text'
              name='subject'
              value={values.subject}
              placeholder='subject'
              onChange={handleChange}
            />
          </div>
          <div>
            <textarea
              type='text'
              name='message'
              value={values.message}
              placeholder='Your message'
              onChange={handleChange}
            />
          </div>
          <button>send message</button>
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
