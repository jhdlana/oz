import { useState } from 'react';
import axios from 'axios';
import styled from "styled-components"
import { head } from 'request';

const Gallery = () => {
    const [photos, setPhotos] = useState([]);
    const [inputValue, setInputValue] = useState('');


    const fetchPhotos = async (query) => {
        const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
        const url = `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${accessKey}`;

        try {
            const response = await axios.get(url);
            setPhotos(response.data.results);
        } catch (error) {
            console.log(error);
            setPhotos([]);
        }
    };

    const handleInput = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputSearch = (e) => {
        e.preventDefault(); 
        fetchPhotos(inputValue);
        setInputValue('');
    };

    return (
        <GalleryWarp>
            <form onSubmit={handleInputSearch}>
                <h1 className='gallery__name'>
                    Image Gallery
                </h1>
                <p className='gallery__searchText'>
                    원하는 이미지를 검색하세요.
                </p>
                <input 
                    type='text' 
                    className='gallery__search' 
                    placeholder='Search for images...' 
                    value={inputValue} 
                    onChange={handleInput} 
                />
                <button className='gallery__search-button' type='submit'>검색</button>
            </form>  
            <PhotoGrid>
                {photos.map(photo => (
                    <Photo key={photo.id}>
                        <img
                            src={photo.urls.small}
                            alt={photo.alt_description}
                        />
                    </Photo>
                ))}
            </PhotoGrid>  
        </GalleryWarp>
    );
};

export default Gallery;

const PhotoGrid = styled.div`
    
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
    padding: 10px;
`

const Photo = styled.div`
img {
    width: 100%;
    height: auto;
    border-radius: 8px;
}
`

const GalleryWarp = styled.div`
input{
    height: 27px;
    margin: 0 5px;
}` 
