const Input = ({ placeholder, name, value, type, disabled, onChange }) => {
  return (
    <input
      className='w-full text-black p-2 md:p-3  bg-white text-sm sm:text-base   rounded-md outline-none focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed'
      disabled={disabled}
      onChange={onChange}
      name={name}
      value={value}
      placeholder={placeholder}
      type={type}
    />
  )
}

export default Input
