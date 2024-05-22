/* eslint-disable react/prop-types */
import React from 'react'
import { imageBasePath } from '../../constant'
import './MovieModal.css'

const MovieModal= ({
    // {...movieSelected}에서 가져온 데이터의 세부사항? (console로 (영화 20개 요청해서 가져온)data 아래(reseults안에 각 영화의 세부사항)에서 확인가능)
    backdrop_path,
    title,
    overview,
    name,
    release_date,
    first_air_date,
    vote_average,
    setModalOpen}) => {
  return (
    <div className='presentation' role='presentation'>
        <div className='wrapper-modal'>
            <div className='modal'>
                <span
                    className='modal-close'
                    onClick={() => {
                        setModalOpen(false)
                    }}
                >
                    X
                </span>

                <img
                    className='modal__poster-img'
                    src={`${imageBasePath}${backdrop_path}`}
                    alt='modal_poster-img'
                />

                <div className='modal__content'>
                    <p className='modal__details'>
                        <span>
                            100% for you
                        </span>
                        {release_date ? release_date : first_air_date}
                    </p>
                    <h2 className='modal__title'>
                        {title ? title : name}
                    </h2>
                    <p className='modal__overview'>평점: {vote_average}</p>
                    <p className='modal__overview'>{overview}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MovieModal