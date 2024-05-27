import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const SignUpPage = () => {
    const [userId, setUserId] = useState("")
    const [userPw, setUserPw] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        const storedUserPw = localStorage.getItem('userPw');
        
        // // 가져온 값이 있다면, 상태에 설정
        // if (storedUserId) {
        //     setUserId(storedUserId);
        // }
        // if (storedUserPw) {
        //     setUserPw(storedUserPw);
        // }
    }, []);

    

    const handleId = (e) => {
        setUserId(e.target.value)
    }
    const handlePw = (e) => {
        setUserPw(e.target.value)
    }

    const handleSignup = () => {
        // 아이디와 비밀번호를 로컬 스토리지에 저장.
        console.log("회원가입 버튼 클릭됨");
        console.log("아이디:", userId);
        console.log("비밀번호:", userPw);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userPw', userPw);

        navigate('/')

        setUserId('')
        setUserPw('')
        
    }

    return (
        <Container>
            <Center>
                <Logo src="public/images/apple-gray-logo.svg" />
                <HeadingText>Apple TV 회원가입</HeadingText>
                <DescriptionText>회원가입을 진행하신 후에 Apple TV 서비스를 이용하실 수 있습니다.</DescriptionText>
                <Input type="text" placeholder="아이디를 입력해주세요." value={userId} onChange={handleId}></Input>
                <Input type="password" placeholder="비밀번호를 입력해주세요." value={userPw} onChange={handlePw}></Input>
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

const Button = styled.a`
  margin-top: 2.5rem;
  margin-bottom: 8rem;
  font-size: 18px;
  text-align: center;
  color : white;
  padding: 1rem;
  border: 1px solid transparent;
  border-radius: 12px;
  border-color: #424245;
  background-color: skyblue;
  width: 310px;
  height: 15px;
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
  &::placeholder { /* placeholder 스타일을 정의 */
    color: #999; /* placeholder 텍스트 색상 */
  }
`

export default SignUpPage
