const Errors = ({ errors }) => {
  if (!errors) return null
  return (
    <div>
      {errors.split(',').map((error, index) => (
        <p className='text-red-800 leading-4 text-sm' key={index}>
          *{error}
        </p>
      ))}
    </div>
  )
}

export default Errors
