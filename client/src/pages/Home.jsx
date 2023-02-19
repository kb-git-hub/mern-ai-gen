import React, {useState, useEffect} from "react"
import {Loader, Card, FormField} from '../components'

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [allPosts, setAllPosts] = useState(null)

  const classes = {
    section: 'max-w-7xl mx-auto',
    h1: 'font-extrabold text-white text-[32px]',
    subP: 'mt-2 text-white text-[16px] max-w-[500px]'
  }

  window.addEventListener('keypress', (e)=>{
    if (e.key === 'e'){
      const loaderToggle = !loading
      setLoading(loaderToggle)
    }
  })
  return (
    <section className={classes.section}>
      <div>
        <h1 className={classes.h1}>Showcase</h1>
        <p className={classes.subP}>Browse cool stuff from DALL-E AI</p>
      </div>

      <div className="mt-16">
        <FormField/>
      </div>

      <div className="mt-10">

        {loading && <div className="flex justify-center items-center"><Loader/></div>}
        {/* {loading ?(
          <div className="flex justify-center items-center"><Loader/></div>
        ) : ( <></>)} */}
      </div>
    </section>
  )
}

export default Home