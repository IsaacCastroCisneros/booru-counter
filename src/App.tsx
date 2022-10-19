import { useState,useEffect } from 'react'
import {forSite} from '@himeka/booru'
import randomizer from '../util/randomizer'
import {ClipLoader} from 'react-spinners'

function App() 
{
  const[pic,setPic]=useState<string|object|undefined>(undefined)
  const[load,setLoad]=useState(true)

  useEffect(()=>
  {
    const item:object|null= JSON.parse(localStorage.getItem('picOfTheDays')||null)  

    doingStuff(item)
  },[])

  async function doingStuff(item) 
  {
    const currentDay:number = new Date().getDay()

    if(item===null||currentDay>item.day)
    {
      const url = await getUrl();

      const currentPic = {
        day: currentDay,
        dayCounter: item === null ? 0 : item.dayCounter + 1,
        url,
        daysLeft: 0,
      };

      currentPic.daysLeft = 30 - currentPic.dayCounter;
      localStorage.setItem("picOfTheDays", JSON.stringify(currentPic));
      setPic(currentPic);
      return;
    }
    
    setLoad(false)
    setPic(item)
  }
  
  async function getUrl():Promise<string|null> 
  {
    setLoad(true)
    const gb = forSite('sb');
    const random = randomizer();
    const res = await gb.search([random], { limit: 1,random:true}); 
    const url = res[0].fileUrl
    setLoad(false)
    return url
  }
  

  return (
    <>
      <main className='my-0 mx-auto max-w-[100%] w-[100rem]'>
        <section className='text-center block px-[5rem] pt-[2rem]'>
          <h1 className='text-[7rem] block mb-[1rem]'>
            <span>{pic?.daysLeft}</span>
            <span className="capitalize"> days left</span>
          </h1>
          {
            load&&
            <div className='block mt-[10rem]'>
              <ClipLoader
               size={200}
               color="#e96cb4"
               />
            </div>
          }
          {pic&&!load&&<img className="block mx-auto my-0 h-[35rem] rounded-[.5rem]" src={pic?.url}></img>}
        </section>
        <button className='py-[.5rem] px-[.8rem] fixed right-[4rem] bottom-[4rem] bg-pink-600'
         onClick={()=>doingStuff(null)}
        >
            RESTART
        </button>
      </main>
    </>
  );
    
}

export default App
