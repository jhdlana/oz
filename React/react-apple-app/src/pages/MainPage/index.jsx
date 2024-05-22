import Nav from '../../components/Nav'
import Banner from '../../components/Banner'
import Row from '../../components/Row'
import requests from '../../api/request'
import styled from 'styled-components'

const MainPage = () => {
  return (
    <Container>
        <Nav />
        <Banner />
        <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
        <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRate} />
        <Row title="Action Movies" id="AM" fetchUrl={requests.fetchActionMovies} />
        <Row title="Comedy Movies" id="CM" fetchUrl={requests.fetchComedyMovies} />
  </Container>
  )
}

export default MainPage

const Container = styled.main`
  position: relative;
  display: block;
  top: 70px;
  padding: 0 calc(3.5w + 5pw);
`