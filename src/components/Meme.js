import React from "react"

export default function Meme() {
    const [meme,setMeme]=React.useState({
        topText:"",
        bottomText:"",
        randomImage:"https://st3.depositphotos.com/3047333/12924/i/600/depositphotos_129246006-stock-photo-kitten-sitting-in-flowers.jpgz"
    })
    
    
    const [allMemes,setallMemes]=React.useState([])
   
    /*React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, []) OR*/

     React.useEffect(async () => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setallMemes(data.data.memes)
        }
        getMemes()
    }, [])
    
    function getMemeImage(){
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme=>({
            ...prevMeme,
            randomImage:url
        })
        )
    }

    function handleChange(event){
        const{name,value}=event.target
        setMeme(prevMeme=>({
            ...prevMeme,
            [name]:value
        }))
    }

    return (
      <main>
        <form className="form">
          <input 
          className="form--input" 
          type="text" 
          placeholder="Top text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
          />
          <input
            className="form--input"
            type="text"
            placeholder="Bottom text"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
          />
        </form>
        <button className="button-71" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
        <div className="meme">
          <img src={meme.randomImage} className="meme--image" />
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
      </main>
    );
}

