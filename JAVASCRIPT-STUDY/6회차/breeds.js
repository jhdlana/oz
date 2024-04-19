const apiRandomDogs = "https://dog.ceo/api/breeds/image/random/42"
const apiAllBreeds = "https://dog.ceo/api/breeds/list/all"
const request1 = new XMLHttpRequest()
const request2 = new XMLHttpRequest()

const header = document.getElementById("header")
const main = document.getElementById("main")
const input = document.getElementById("filter-text")
const button = document.getElementById("filter-button")
const select = document.getElementById("filter-select")
const more = document.getElementById("more")
const tothetop = document.getElementById("tothetop")

const currentDogs = [] //현재 화면에 표시되고 있는 강아지 전부

function displayDogs(item){
    const dogImgDiv = document.createElement("div")
            dogImgDiv.classList.add("flex-item")
            // 이미지 태그를 직접 써서 scr에다가 item을 녹여 넣기. => forEach()문으로 인해 하나씩 계속 만들어짐
            dogImgDiv.innerHTML = `
                <img src=${item}> 
            `
            main.appendChild(dogImgDiv)
            //console.log(currentDogs)
}

// 페이지가 처음에 펼처졌을때 그때 하고 싶은 동작 방법
window.addEventListener("load", function() { // 웹 브라우저가 load라는 이벤트를 발생시켰을때 웹페이지가 최초 loading 되었을때의 동작
    
    // 강아지 사진 뿌리기
    request1.open("get", apiRandomDogs)
    request1.addEventListener("load", function() { 
        const response = JSON.parse(request1.response)
        response.message.forEach(function(item){ // response.message 는 응답 받은 메시지, 강아지 정보가 있음 그리고 배열의 멤버 하나가 이미지 소스 하나임, 
                                                    // 이것을 각각 하나씩 화면에 처리해야하므로 배열에 대해서니까 forEach()문 사용 (모든 요소에 한번씩 기능을 수헹)
            currentDogs.push(item) // currentDogs에 42개가 채워짐
            // const dogImgDiv = document.createElement("div")
            // dogImgDiv.classList.add("flex-item")
            // // 이미지 태그를 직접 써서 scr에다가 item을 녹여 넣기. => forEach()문으로 인해 하나씩 계속 만들어짐
            // dogImgDiv.innerHTML = `
            //     <img src=${item}> 
            // `
            // main.appendChild(dogImgDiv)
            // console.log(currentDogs)
            displayDogs(item)
        })
    })
    request1.send()


    //select에 견종 정보 뿌리기
    request2.open("get", apiAllBreeds)
    request2.addEventListener("load", function() {
        const response = JSON.parse(request2.response)
        //console.log(Object.keys(response.message)) // Object.keys()는 안에 있는 객체의 key이름 만 반환해줌. => Object.keys(response.message)는 resposnse.message의 모든 key이름을 반환
        Object.keys(response.message).forEach(function(item){
            const option = document.createElement("option")
            option.textContent = item
            option.value = item
            select.appendChild(option)
        })
    })
    request2.send()
})

button.addEventListener("click", function() {
    main.innerHTML = "" // 일단 처음 화면에 있는 사진들을 없앰. why? 검색할 요소를 입력하고 필터링 버튼을 클릭했을때 원하는 사진만 나오게 해야하므로! 일단 화면을 다 지움
    let filteredDogs = currentDogs.filter(function(item){
        return item.indexOf(input.value) !== -1 // item(견종정보)안에 input.value 내용이 포함되어 있으면 리턴
    })

    input.value = "" // 검색 후 검색창 자동 비워주기

    filteredDogs.forEach(function(item) {
        // currentDogs.push(item)이거 주면 강아지가 계속 많아짐
        // -> currentDogs.push(item) // 원래 페이지에 있던 42개는 main.innerHTML = ""에 의해 지워지는 것 처럼 보이지만 뒤에 더 쌓임 하지만 화면엔 42개를 지워서 뒤에 쌓인것만 보이게 되는 것
        //     const dogImgDiv = document.createElement("div")
        //     dogImgDiv.classList.add("flex-item")
        //     // 이미지 태그를 직접 써서 scr에다가 item을 녹여 넣기. => forEach()문으로 인해 하나씩 계속 만들어짐
        //     dogImgDiv.innerHTML = `
        //         <img src=${item}> 
        //     `
        //     main.appendChild(dogImgDiv)
        //console.log(currentDogs) //확인해보면 원래있던 currentsDog에 filteredDogs가 더해짐
        // 
        displayDogs(item) 
        //console.log(filteredDogs)  
    })
})

// select와 button이 하는 동작이 똑같음. 그대로 위의 코드 복붙
select.addEventListener("change", function() { // 항목을 선택했을때 변화를 주는 것이므로 'click'이 아니라 'change' 사용
    main.innerHTML = "" // 일단 처음 화면에 있는 사진들을 없앰. why? 검색할 요소를 입력하고 필터링 버튼을 클릭했을때 원하는 사진만 나오게 해야하므로! 일단 화면을 다 지움
    let filteredDogs = currentDogs.filter(function(item){
        return item.indexOf(select.value) !== -1 // item(견종정보)안에 select.value 내용이 포함되어 있으면 리턴
    })

    filteredDogs.forEach(function(item) {
            //currentDogs.push(item) // 원래 페이지에 있던 42개는 main.innerHTML = ""에 의해 지워지는 것 처럼 보이지만 뒤에 더 쌓임 하지만 화면엔 42개를 지워서 뒤에 쌓인것만 보이게 되는 것
            // const dogImgDiv = document.createElement("div")
            // dogImgDiv.classList.add("flex-item")
            // // 이미지 태그를 직접 써서 scr에다가 item을 녹여 넣기. => forEach()문으로 인해 하나씩 계속 만들어짐
            // dogImgDiv.innerHTML = `
            //     <img src=${item}> 
            // `
            // main.appendChild(dogImgDiv)
            console.log(currentDogs) //확인해보면 원래있던 currentsDog에 filteredDogs가 더해짐
            displayDogs(item)
        })
})

more.addEventListener("click", function(){
    request1.open("get", apiRandomDogs)
    request1.addEventListener("load", function(){
        const response = JSON.parse(request1.response)
        response.message.forEach(function(item){
            currentDogs.push(item)
            displayDogs(item)
        })
    })
    request1.send()
})

tothetop.addEventListener("click", function() { 
    // scroll은 윈도우가 가져고 있음(웹브라우져가 가지고있음)
    // scrollTo : 주어진 위치로 스크롤으 이동한다.
    window.scrollTo({ top : 0}) // 위치에 대한 값을 객체 리터럴로 보낸다. 위치(css) top


})