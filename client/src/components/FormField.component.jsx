import React from 'react'

const FormField = (props) => {
  const {labelName, type, name, placeholder, 
    value, handleChange, isSurpriseMe, handleSurpriseMe, setPlaceHolderText} = props

  const classes = {
    formFields: `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3`
  }



  return (          
    <div>
      <div className='flex items-center gap02 mb-2'>
        <label htmlFor={name} 
        className='block text-sm font-medium text-gray-200'>
          {labelName}
        </label>
        {isSurpriseMe && (
          <button type='button'
          onClick={handleSurpriseMe}
          className='font-semibold text-xs bg-slate-400 py-` px-2 rounded-sm text-white ml-2'
          >
             Surprise me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className={classes.formFields}
        onFocus={setPlaceHolderText}
      />
    </div>
  )
}

export default FormField