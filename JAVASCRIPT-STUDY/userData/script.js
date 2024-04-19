/* -----------------------------------------------------------------------------*/
// <요구사항>
// 1. 주어진 ‘users’ 배열에서 나이가 25 이상 35 미만인 사용자를 필터링하여 새로운 배열을 생성해야합니다.
// 2. 필터링된 사용자 중에서 이메일 주소가 ‘gmail.com’ 도메인을 사용하는 사용자만을 추출하여 새로운 배열을 생성해야합니다.
// 3. ‘renderUserData’함수 내부에서는 각 사용자의 정보를 HTML 요소로 구성하여 화면에 표시합니다.
/* -----------------------------------------------------------------------------*/

const users = [
    { name: 'John', age: 30, email: 'john@example.com' },
    { name: 'Alice', age: 25, email: 'alice@gmail.com' },
    { name: 'Bob', age: 35, email: 'bob@gmail.com' },
    { name: 'Emma', age: 28, email: 'emma@example.com' },
    { name: 'Steve', age: 32, email: 'steve@gmail.com' },
  ];
  
  // 25세 이상 35세 미만인 사용자만을 필터링하여 새로운 배열 생성하세요
  // 여기에 코드를 작성하세요
  let people = users.filter(function (user) {
    return 25 <= user.age && user.age < 35;
  });
  console.log(people);
  
  // 필터링된 사용자 중에서 이메일 주소가 gmail.com 도메인을 사용하는 사용자만을 추출하여 새로운 배열 생성하세요
  // 여기에 코드를 작성하세요
  let gmailUsers = people.filter(function (user) {
    return user.email.indexOf('gmail.com') !== -1;
  });
  console.log(gmailUsers);
  
  // 결과를 화면에 그리는 함수
  function renderUserData(userData) {
    const userDataDiv = document.getElementById('userData');
  
    // innerHTML을 사용해 결과를 화면에 그려보세요
    // 여기에 코드를 작성하세요
    const newuuserData = document.createElement('div'); // 이것을 생성하여 각 객체의 값을 넣어 주지 않고, 기존의 userDataDiv에 넣으면 마지막 객체가 덮어씌워져 한개만 생성하게 됨. 그러므로 매겨변수로 받은 각각의 객체를 보여주고싶으면 renderUserData함수를 호출할때마다 새로운 요소를 생성하여 거기에 넣어줘야함. (userDataDiv는 html에 있던 한줄 코드)
    newuuserData.classList.add('user'); // CSS에 있는 스타일 시트를 적용. (CSS에서 user를 클래스(.)로 지정했기때문에 classList로 접근이 가능
    newuuserData.innerHTML = `사용자 이름 : ${userData.name} <br> 나이 : ${userData.age}<br>이메일 : ${userData.email}`;
    document.body.append(userDataDiv);
    userDataDiv.append(newuuserData);
    console.log(newuuserData);
  }
  
  // renderUserData(gmailUsers); // 사용자 데이터를 그리는 함수 실행
  gmailUsers.forEach((user) => { // 위에 처럼 여러 객체를 담고 있는 배열을 통으로(배열만) 접근하여 인자로 가져오면 위에 newuserData.innerHTML에서 매개변수로 받은 userData.name..등에 접근을 못함. 왜냐면 배열 안의 각각의 객체에 접근하는게 아니라, 객체 틀(묶여있는 것)들만 가지고 있는 것이라 각 객체의 내부에 직접 접근하려면(각 객체의 틀속에 접근하려면) forEach()을 사용하여 객체 하나하나에 직접 접근해야 그 객체속의 속성값에 접근할 수 있음.
    renderUserData(user);
    console.log(user);
  });
  