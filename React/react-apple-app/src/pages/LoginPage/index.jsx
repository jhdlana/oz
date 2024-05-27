import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const LoginPage = () => {
  const [userIdData, setUserIdData] = useState("")
  const [userPwData, setUserPwData] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate()

  const handleId = (e) => {
    setUserIdData(e.target.value)
  }

  const handlePw = (e) => {
    setUserPwData(e.target.value)
  }

  // 로그인 버튼을 클릭했을 때, 로컬 스토리지에서 회원가입 정보를 가져오기.
  const storedUserId = localStorage.getItem('userId');
  const storedUserPw = localStorage.getItem('userPw');
  console.log(storedUserId)

  useEffect(()=> {
    if(isLoggedIn === false) {
      navigate('/')
    } else if(isLoggedIn === true){
      navigate('/main')
    }
  },[isLoggedIn])

  useEffect(() => {
    if(storedUserId === null || storedUserPw === null){
      setIsLoggedIn(false)
    } 
  },[storedUserId,storedUserPw ])

  const handleLogin = () => {
     // 입력한 아이디와 비밀번호가 저장된 아이디와 비밀번호와 일치하는지 확인.
     if (userIdData === storedUserId && userPwData === storedUserPw) {
       console.log("로그인 성공!");
       setIsLoggedIn(true)
     } else if(userIdData === "" || userPwData === "") {
      setIsLoggedIn(false)
      alert('아이디 또는 비밀번호를 입력해주세요.')
     } else {
      alert('아이디 또는 비밀번호가 일치하지 않습니다.')
      setIsLoggedIn(false)
       console.log("아이디 또는 비밀번호가 일치하지 않습니다.");
     }
  }
  const handleSignup = () => {
    navigate('/signup')
  }
  return (
    <Container>
      <Center>
        <Logo src="public/images/apple-gray-logo.svg" />
        <HeadingText>로그인</HeadingText>
        <DescriptionText>You will be signed in to Apple TV and Apple Music.</DescriptionText>
        <Input type="text" placeholder="아이디를 입력해주세요." value={userIdData} onChange={handleId}/>
        <Input type="password" placeholder="비밀번호를 입력해주세요." value={userPwData} onChange={handlePw}/>
        <Button onClick={handleLogin}>로그인</Button>
        <Button onClick={handleSignup}>회원가입 하기</Button>
      </Center>
    </Container>
  )
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Center = styled.div`
  max-width: 650px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HeadingText = styled.h1`
  font-size: 1.9rem;
`

const DescriptionText = styled.p`
  margin: 0;
  font-size: 1.3rem;
`

const Logo = styled.img`
  margin-bottom: 1.3rem;
  width: 50px;
`

const Button = styled.button`
  margin-top: 2.5rem;
  font-size: 18px;
  text-align: center;
  color: white;
  padding: 1rem;
  border: 1px solid transparent;
  border-radius: 12px;
  border-color: #424245;
  background-color: skyblue;
  width: 310px;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    background-color: blue;
  }
`

const Input = styled.input`
  color: white;
  margin-top: 2.5rem;
  font-size: 18px;
  padding: 1rem;
  border: 1px solid transparent;
  border-radius: 12px;
  border-color: #424245;
  background-color: hsla(0, 0%, 100%, 0.04);
  width: 310px;
  font-weight: 400;
  cursor: pointer;

  &::placeholder {
    color: #999;
  }
`

export default LoginPage
