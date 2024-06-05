import React, { useRef ,useRouter} from 'react'
import classes from './NewMeetUpForm.module.css'
import Card from '../ui/Card'

const NewMeetupForm = () => {

    const router = useRouter()

    const titleInputRef = useRef()
    const ImageInputRef = useRef()
    const AddressInputRef = useRef()
    const DescriptionInputRef = useRef()


    const handleSubmit = (e) => {
        e.preventDefault();

        const enteredTitle = titleInputRef.current.value
        const enteredImage = ImageInputRef.current.value
        const enteredAddress = AddressInputRef.current.value
        const enteredDescription = DescriptionInputRef.current.value

        const meetupData = {
            title: enteredTitle,
            image: enteredImage,
            address: enteredAddress,
            description: enteredDescription
        }

        handleAddMeetup(meetupData)
    }

    const handleAddMeetup = async (enteredMeetupData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST', 
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type' : 'application/json'
            }
        })

        const data = await response.json()
        console.log(data)

        router.push('/') // 이 경로로 이동
    }


  return (
    <Card>
    <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.control}>
            <label htmlFor='title'>
                모임 이름
            </label>
            <input
                type='text'
                required
                id='title'
                ref={titleInputRef}
            />
        </div>
        <div className={classes.control}>
            <label htmlFor='image'>
                모임 사진
            </label>
            <input
                type='url'
                required
                id='img'
                ref={ImageInputRef}
            />
        </div>
        <div className={classes.control}>
            <label htmlFor='address'>
                주소
            </label>
            <input
                type='text'
                required
                id='address'
                ref={AddressInputRef}
            />
        </div>
        <div className={classes.control}>
            <label htmlFor='description'>
                설명
            </label>
            <textarea
                type='text'
                required
                rows='5'
                id='description'
                ref={DescriptionInputRef}
            />
        </div>
        <div> className={classes.actions}
            <button>모임 생성하기</button>
        </div>
    </form>
    </Card>
  )
}

export default NewMeetupForm