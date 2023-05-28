const Button = ({ label, primary, fullWidth, onClick, disabled, outline }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={` disabled:opacity-70 disabled:cursor-not-allowed px-6 py-2 rounded-lg capitalize font-semibold hover:opacity-80 transition text-white ${
        fullWidth ? 'w-full' : 'w-fit'
      } ${
        primary
          ? 'bg-emerald-500  border-emerald-500'
          : 'bg-sky-500  border-sky-500'
      }  ${outline && 'bg-transparent border-white text-white'}`}
    >
      {label}
    </button>
  )
}

export default Button
