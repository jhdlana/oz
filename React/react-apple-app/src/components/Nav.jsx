import { useState ,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut} from 
"firebase/auth";
import app from "../firebase";

const initialUserData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')):{}

const Nav = () => {
    const [show, setShow] = useState("false")
    const [searchValue, setSearchValue] = useState('')
    // const [userData, setUserData] = useState(localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')):{}) // 코드에선 String타입이 아니라 객체 타입으로 가져와서 사용해야하므로 바꿔주기
    const [userData, setUserData] = useState(initialUserData) // 코드에선 String타입이 아니라 객체 타입으로 가져와서 사용해야하므로 바꿔주기

    const navigate = useNavigate()
    const {pathname} = useLocation()

    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()

    const listener = () => {
        if(window.scrollY > 50) {
            setShow("true")
        } else {
            setShow("false")
        }
    }

    useEffect(() => {
      onAuthStateChanged(auth, (user)=> {
        // if(user) {
        //     // 로그인 되어있으면 무조건 main으로 => search 페이지를 찾고싶어도 main으로 경로를 이동하게 됨
        //     navigate('/main')
        //     //const uid = user.uid
        // } else {
        //     // 로그인 안되어있으면
        //     navigate('/')
        // }

        if(!user) { // 로그인이 안되어있다면
            navigate('/') // 로그인 페이지
        } else if (user && pathname === '/') { // 로그인이 되어있고 현재 경로가 '/'(로그인페이지)이라면 -> 사용자가 로그인한 상태에서 다른 페이지를 방문하려고 하면, 해당 페이지로 이동할수있음
            navigate('/main')
        }
      })
    
    }, [auth, navigate, pathname])
    

    useEffect(() => {
        window.addEventListener('scroll', listener)
        return () => {
            window.removeEventListener('scroll', listener)
        }
    }, [])

    const handleChange = (e) => {
        setSearchValue(e.target.value)
        navigate(`/search?q=${e.target.value}`)
    }

    const handleAuth = () => {
        signInWithPopup(auth, provider) // 팝업이 뜨게 됨
        // 로그인을 잘 하게 됐으면
        .then((result) => {
            console.log(result)
            console.log('result.user', result.user)
            setUserData(result.user)
            localStorage.setItem('userData', JSON.stringify(result.user))
        }) 
        // 에러가 발생했다면
        .catch((error) => {
            alert(error.message)
        })
    }

    const handleLogOut = () => {
        signOut(auth).then(() => {
            // 로그아웃에 성공하면 setUserData 상태 비워주기.
            setUserData({})
            localStorage.removeItem('userData')
        }).catch((error) => {
            alert(error.message)
        })
    }

  return (
    <>
        {/* props로 show 내려줌  => show가 true일때와 false일때에 따라 background-color 조정하기 위해서 */}
        <NavWrapper show={show}> 
            <Logo>
                <img
                    alt="logo"
                    src="/public/images/apple-logo.png"
                    onClick={() => (window.location.href = '/')}
                />
            </Logo>

            {/* 로그인을 제외한 상태에서는 input이 보여야하므로! */}
            {pathname === "/" ? (<Login
                onClick={handleAuth}
            >로그인</Login>) : (
                <Input
                type="text"
                className="nav__input"
                placeholder="영화를 검색해주세요."
                value={searchValue}
                onChange={handleChange}
            />
            )}   

            {pathname !== '/' ?
                <SignOut>
                    <UserImg src={userData.photoURL} alt={userData.displayName} />
                    <DropDown>
                        <span onClick={handleLogOut}>
                            Sign Out
                        </span>
                    </DropDown>
                </SignOut>
            : null
            }

        </NavWrapper>
    </>
   
  )
}

const DropDown = styled.div`
    position: absolute;
    top: 48px;
    right: 0px;
    background: rgb(19, 19, 19);
    border : 1px solid rgba(151, 151, 151, 0.34);
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
    padding: 10px;
    font-size: 14px;
    letter-spacing: 3px;
    width: 100px;
    opacity: 0;
`

const SignOut = styled.div`
    position: relative;
    height: 48px;
    width: 48px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;

    &:hover {
        ${DropDown} {
            opacity: 1;
            transition-duration: 1s;
        }
    }
`

const UserImg = styled.img`
    border-radius: 50%;
    width: 100%;
    height: 100%;
`


const Input = styled.input`
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: rgba(0, 0, 0, 0.582);
    border-radius: 5px;
    color: white;
    padding: 5px;
    border: 1px solid lightgray;
`

const Login = styled.a`
    background-color: rgba(0, 0, 0, 0.6);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    transition: all 0.2s ease 0s;

    &:hover {
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`

const Logo = styled.a`
    padding: 0;
    width: 70px;
    font-size: 0;
    display: inline-block;
    margin-bottom: 10px;
    img {
        display: block;
        width: 100%
    }
`

const NavWrapper = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color:  ${props => props.show === true ? "#090b13" : "#000000"};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
`;

export default Nav;
