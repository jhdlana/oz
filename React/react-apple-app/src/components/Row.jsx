
import { useCallback, useState , useEffect } from 'react'
import './Row.css'
import axios from '../api/axios';
import MovieModal from './MovieModal';
// Import Swiper React components
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styled from 'styled-components';
// import 'swiper/css/a11y'

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
    <Container>
      <h2>{title}</h2>
      
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        breakpoints={{
          // 웹페이지 width에 따라서
          1378: {
            slidesPerView: 6,  // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 6, // 몇개씩 슬라이드를 할지 
          },
          998: {
            slidesPerView: 5,  // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 5, // 몇개씩 슬라이드를 할지 
          },
          625: {
            slidesPerView: 4,  // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 4, // 몇개씩 슬라이드를 할지 
          },
          0: {
            slidesPerView: 3,  // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 3, // 몇개씩 슬라이드를 할지 
          },
        }}
        navigation
        pagination={{clickable: true}}
        scrollbar={{draggable: true}}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
         <div id={id} className='row__posters'>
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}> 
              <Wrap>
                <img
                  className='row__poster'
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt={movie.name}
                  onClick={() => handleClick(movie)}
                />
              </Wrap>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>  
       
          {modalOpen ?
            <MovieModal {...movieSelected} setModalOpen={setModalOpen}/> //setModalOpen을 내려주는 이유 : 다시 누르면 안보이게 하기 위해서(false)
          : null }

    </Container>
  )
}

const Container = styled.div`
  padding: 0 0 26px;
`

const Wrap = styled.div`
  width: 95%;
  height: 95%;
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);
  img{
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }
  &:hover{
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(0.98);
    border-color: rgba(249, 249, 249, 0.8);
  }
`

export default Row
