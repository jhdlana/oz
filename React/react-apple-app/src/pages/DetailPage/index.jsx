import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from '../../api/axios'
import { imageBasePath } from "../../constant"

const DetailPage = () => {
    console.log(useParams())

    const {moiveId} = useParams()
    const [movie, setMovie] = useState(null)

    useEffect(()=> {
        async function fetchData() {
            const response = await axios.get(`/movie/${moiveId}`)
            setMovie(reponse.data)
        }
        fetchData()
    }, [movieId])

    if(!movie) return null;


  return (
    <section>
        <img
            src={`${imageBasePath}${movie.backdrop_path}`}
            alt="detail"
        />
    </section>
  )
}

export default DetailPage