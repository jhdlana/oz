import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from '../../api/axios'
import { imageBasePath } from "../../constant"
import './DetailPage.css'

const DetailPage = () => {
    console.log(useParams())

    const {movieId} = useParams()
    const [movie, setMovie] = useState(null)

    useEffect(()=> {
        async function fetchData() {
            const response = await axios.get(`/movie/${movieId}`)
            setMovie(response.data)
        }
        fetchData()
    }, [movieId])

    if(!movie) return null;


  return (
    <div className="wrapper-detail">
        <section className="detail-section">
            <img
                className="detail-img"
                src={`${imageBasePath}${movie.backdrop_path}`}
                alt="detail"
            />
            <div className='detail__content'>
                {/* <p className='modal__details'>
                
                </p> */}
                <h2 className='detail__title'>
                    {movie.title}
                    {console.log(movie)}
                </h2>
                <p className='detail__title-name'>평점: {movie.vote_average}</p>
                <h3 className="detail__genre">장르</h3>
                    <p className="detail__genre-tag">
                        {movie.genre_ids}
                        {movie.genres.map((genre)=> {
                            {console.log(genre)}
                            {console.log(genre.name)}
                            return (
                                <span className="genre-name" key={genre.id}> {genre.name} </span>
                            )
                        })}
                    </p>
                
                <h3 className='detail__title-name'>
                    콘텐츠 설명
                </h3>
                <p className="detail__overview">{movie.overview}</p>
                
            </div>
        </section>
    </div>
  )
}

export default DetailPage