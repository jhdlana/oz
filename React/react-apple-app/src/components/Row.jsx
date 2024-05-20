
import { useCallback, useState , useEffect } from 'react'
import './Row.css'
import axios from '../api/axios';
import MovieModal from './MovieModal';

const Row = ({title, id, fetchUrl}) => {


  // fetchUrl 경로를 가지고 the moviedb api에 요청을 보내서 영화 정보를 가져오기,
  // 가져온 영화 정보를 화면에 보여주기(return에)

  const [movies, setMovies] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

  const [movieSelected, setMovieSelected] = useState({})

  const handleClick = (movie) => {
    setModalOpen(true)
    setMovieSelected(movie)

  }

  const fetchMovieData = useCallback(async () => {
    const response = await axios.get(fetchUrl)
    setMovies(response.data.results)
  }, [fetchUrl])
  
  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData])

  console.log(document.getElementById(id))
  

  return (
    <div>
      <h2>{title}</h2>
      <div className='slider'>
        <div className='slider__arrow-left'>
          <span className='arrow'
            onClick={
              () => {
                document.getElementById(id).scrollLeft -= window.innerWidth - 80
              }
            }
          >
            {"<"}
          </span>
        </div>
        <div id={id} className='row__posters'>
          {movies.map((movie) => (
            <img
              key={movie.id}
              className='row__poster'
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.name}
              onClick={() => handleClick(movie)}
            />
          ))}
        </div>
        <div className='slider__arrow-right'>
          <span className='arrow'
             onClick={
              () => {
                document.getElementById(id).scrollLeft += window.innerWidth + 80
              }
            }
          >
            {">"}
          </span>
        </div>
      </div>


          {modalOpen ?
            <MovieModal {...movieSelected} setModalOpen={setModalOpen}/> //setModalOpen을 내려주는 이유 : 다시 누르면 안보이게 하기 위해서(false)
          : null }

    </div>
  )
}

export default Row