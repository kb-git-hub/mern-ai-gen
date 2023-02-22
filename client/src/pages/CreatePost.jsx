import { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"

import {preview} from '../assets'
import {getRandomPrompt} from '../utils'
import {FormField, Loader} from '../components'

const CreatePost = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: ''
  })

  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)
  const [initialPromptPlaceHolder, setInitialPromptPlaceHolder] = useState('')

  
  useEffect(()=>{
   const promptPlaceHolder = getRandomPrompt()
    setInitialPromptPlaceHolder(promptPlaceHolder)
  }, [])

  const styles = {
    section: 'max-w-7xl mx-auto',
    h1: 'font-extrabold text-white text-[32px]',
    subP: 'mt-2 text-white text-[16px] max-w-[500px]',
    imgGrid: 'grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3',
    cardTitle: 'mt-5 font-bold text-slate-600 text-xl uppercase',
    form: 'mt-16 max-w-full',
    imgDiv: `relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center mt-2`,
    loaderDiv: `absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg`,
    generateBtn: `text-white bg-green-700 font-medium rounded-md text-sm min-w-full sm:w-auto px-5 py-2.5 text-center`,
    shareBtn: `mt-3 text-white bg-slate-400 font-medium rounded-md text-sm min-w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600`
  }

  const handleSubmit = () => {}

  const handleChange = e =>{
    const inputKey = (e.target.name)
    const inputValue = (e.target.value)
    setForm({...form, [inputKey]: inputValue})
  }

  const handleSurpriseMe =  () => {
   const prompt = getRandomPrompt(form.prompt) 
    setForm({...form, prompt})
  }

  const generateImage = async () => {
    if (form.prompt){
      try{
        setGeneratingImg(true)
        const response = await fetch('http://localhost:8080/api/v1/dalle',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({prompt: form.prompt}),
        })

        const data = await response.json()

        setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`})
      } catch (err){alert(err)} 
      finally{setGeneratingImg(false)}
    } else {alert('Please enter a prompt')}
  }

  const setPlaceHolderText = () =>{
    if (form.prompt) return 
    setForm({...form, prompt: initialPromptPlaceHolder})
}

  return (
    <section className={styles.section}>
      <div>
        <h1 className={styles.h1}>Create</h1>
        <p className={styles.subP}>Type and share your ability to allow the engineers at DALL-E AI to create what you can not.</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName='Your name'
            type='text'
            name='name'
            placeholder='John Doe'
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName='Prompt'
            type='text'
            name='prompt'
            placeholder={initialPromptPlaceHolder}
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
            setPlaceHolderText={setPlaceHolderText}
          />
   
          <div className={styles.imgDiv}>
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className='w-full h-full object-contain'
              />
            ): (
              <img
                src={preview}
                alt='preview'
                className="w-9/12 h-9/12 object-contain
                opacity-40"
              />
            )}

            {generatingImg && (
              <div className={styles.loaderDiv}>
                <Loader/>
              </div>
            )}

          </div>
        </div>

        <div className="mt-5 flex gap-5">
              <button
              className={styles.generateBtn}
              onClick={generateImage}
              > {generatingImg ? 'Generating...' : 'Generate Image'}</button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-gray-200 text-sm">Once 'your' unique image has been created, share 'your' work with others...</p>
          <button type="submit"
          className={styles.shareBtn}>
              {loading ? 'Sharing' : 'Share with the others'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost