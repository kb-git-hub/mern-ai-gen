import { useState } from "react"
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

  const styles = {
    section: 'max-w-7xl mx-auto',
    h1: 'font-extrabold text-white text-[32px]',
    subP: 'mt-2 text-white text-[16px] max-w-[500px]',
    imgGrid: 'grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3',
    cardTitle: 'mt-5 font-bold text-slate-600 text-xl uppercase',
    form: 'mt-16 max-w-full'
  }

  const handleSubmit = () => {}

  const handleChange = e =>{}

  const handleSurpriseMe =  () => getRandomPrompt() 

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
            name='Prompt'
            placeholder={getRandomPrompt[Math.floor(Math.random() * 50)]}
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
        </div>


      </form>
    </section>
  )
}

export default CreatePost