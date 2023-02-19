import React, {useState, useEffect} from "react"
import {Loader, Card, FormField} from '../components'

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [allPosts, setAllPosts] = useState(null)
  const [searchText, setSearchText] = useState('search Text')

  const styles = {
    section: 'max-w-7xl mx-auto',
    h1: 'font-extrabold text-white text-[32px]',
    subP: 'mt-2 text-white text-[16px] max-w-[500px]',
    imgGrid: 'grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3',
    cardTitle: 'mt-5 font-bold text-slate-600 text-xl uppercase'

  }

  const RenderCards = ({data, title}) =>{
    if (data?.length > 0){
      return data.map(post => <Card key={post._id} {...post}/>)
    }

    return (
      <h2 className={styles.cardTitle}>{title}</h2>
    )
  }

  return (
    <section className={styles.section}>
      <div>
        <h1 className={styles.h1}>Showcase</h1>
        <p className={styles.subP}>Browse cool stuff from DALL-E AI</p>
      </div>

      <div className="mt-16">
        <FormField/>
      </div>

      <div className="mt-10">
        {loading ?(
          <div className="flex justify-center items-center"><Loader/></div>
        ) : ( 
          <>
            {searchText && (
              <h2 className="font-medium text-slate-400 text-xl mb-3">
                Showing results for 
                <span className="text-slate-200"> {searchText}</span>
              </h2>
            )}
            <div className={styles.imgGrid}>
              {searchText ? (
                <RenderCards
                  data={[]}
                  title='No search results'
                />
              ) : (
                <RenderCards
                  data='allPosts'
                  title='No posts found'
                />
              )}
            </div>
          </>)
        }
      </div>
    </section>
  )
}

export default Home