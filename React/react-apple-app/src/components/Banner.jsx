import React, {useEffect, useState} from 'react'
import axios from '../api/axios'
import requests from '../api/request'
import './Banner.css'
import styled from 'styled-components'

const Banner = () => {

  const [movie, setMovie] = useState({}) // 초기값을 객체==={} 말고 null 로 하기 -> 객체로 지정해주면 나중에 조건문같은걸로 처리가헤 될때 뚜렷히 명시해줘야하므로 (Object.keys.(movie).length 이런식으로) 하지만 null 로 값을 주면 그냥 movie를 가져와 사용 O
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async() => {
    // 현재 상영중인 영화 정보를 가져오기 (여러 영화)
    const response = await axios.get(requests.fetchNowPlaying)
    console.log(response)

    //여러영화중 영화 하나의 ID를 가져오기
    const movieId = response.data.results[
      Math.floor(Math.random() * response.data.results.length)
    ].id

    // 특정 영화의 더 상세한 정보를 가져오기 (비디오 정보도 포함)
    const { data: MovieDetail } = await axios.get(`movie/${movieId}`, {
      params: {append_to_response: "videos"}
    })
    setMovie(MovieDetail)
  }

  const truncate = (str, n) => {
     return str?.length > n ? str.substring(0,n) + "..." : str // 들어오는 인자(파라미터 str)의 길이가 n보다 0부터 n까지 서브문자열로 남기고 "..." 문자열 추가하기 but n이 안넘으면 그냥 str 반환하기
  }

  if (!movie) {   // movie 데이터를 가져오지 않았을때  (데이터를 가져오는 동안에 'loading...' 보여줌)
    return (
      <div>
        loading...
      </div>
    ) 
  }  // else {        // movie 데이터를 가져 왔을때
    
  // }
  
  if(!isClicked) {
    return (
      <div
        className='banner'
        style = {{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className='banner__contents'>
          <h1 className='banner__title'>
            {movie.title || movie.name || movie.original_name}
          </h1>
          <div className='banner__buttons'>
            {movie.videos?.results[0]?.key?
              <button
                className='banner__button play'
                onClick={() => setIsClicked(true)}
              >
                  Play
                  { console.log(movie.videos.results[0]) }
              </button>
              : null
            }
          </div>
          <p className='banner_description'>
            {truncate(movie.overview, 100)}
          </p>
        </div>
        <div className='banner--fadeBottom'/>
      </div>
    )
  } else {
    return (
      <>
       <Container>
        <HomeContainer>
        <Iframe 
          src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?control=0&autoplay=1&mute=1`}
        >
        </Iframe>
        </HomeContainer>
      </Container>
      <button onClick={()=> setIsClicked(false)}>
        X
      </button>
      </>
    )
  }
}

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;
`

const Container = styled.div`
  display: flex;
  justify-content center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100wh;
`

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`

export default Banner