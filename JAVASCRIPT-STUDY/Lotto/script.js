/**
 * 로또 번호 생성기: 사용자 인터페이스를 통해 로또 당첨 번호 및 로또 번호를 자동으로 생성하고 표시합니다.
 *
 * 기본 요구사항:
 * 1. 로또 당첨 번호 생성 기능:
 *    - '이번 주 당첨 번호 생성하기' 버튼을 클릭하면 1부터 45까지의 숫자 중 랜덤하게 6개를 선택하여 오름차순으로 표시합니다.
 *    - 중복된 숫자가 없어야 하며, 이전에 생성된 번호는 새 번호 생성 시 화면에서 제거됩니다.
 * 2. 로또 번호 자동 선택 기능:
 *    - '로또 번호 자동 생성' 버튼을 클릭하면 5세트의 로또 번호(각 세트는 6개의 숫자)를 랜덤하게 생성하여 표시합니다.
 *    - 각 번호 세트는 중복 없이 오름차순으로 정렬되어야 하며, 당첨 번호 생성 후에만 사용 가능해야 합니다.
 * 3. 매칭 표시 기능: 자동 생성된 번호 중 당첨 번호와 일치하는 숫자는 특별히 강조하여 표시합니다.
 *
 * 사용 예:
 * - 당첨 번호 생성하기 버튼 클릭 -> 당첨 번호가 화면에 표시됩니다.
 * - 로또 번호 자동 생성 버튼 클릭 -> 5세트의 로또 번호가 화면에 표시됩니다. 당첨 번호와 일치하는 숫자는 강조됩니다.
 */

// '이번 주 당첨 번호 생성하기' 버튼에 대한 참조를 가져옵니다.
const generateWinningNumbers = document.getElementById(
    'generateWinningNumbers'
  );
  // '로또 번호 자동 생성' 버튼에 대한 참조를 가져옵니다.
  const generateLottoNumbers = document.getElementById('generateLottoNumbers');
  // 당첨 번호를 보여줄 HTML 요소에 대한 참조를 가져옵니다.
  const winningNumContainer = document.getElementById('winningNumbers');
  // 자동 생성된 로또 번호를 보여줄 HTML 요소에 대한 참조를 가져옵니다.
  const lottoNumContainer = document.getElementById('lottoNumbers');
  
let lottoNumbers = [];
   
  // 초기 당첨 번호 배열
  let winningNumbers = [];

  /**
   * 1부터 45까지의 숫자 중에서 무작위로 6개의 숫자를 선택하여 배열로 반환하는 함수입니다.
   * 중복된 숫자가 없도록 하며, 반환된 배열은 오름차순으로 정렬됩니다.
   */
  function generateNumbers(num) {
    /* TODO: 
      1. 1부터 45까지의 숫자 중에서 무작위로 6개의 숫자를 선택하여 배열로 반환하는 함수입니다.
      2. 중복된 숫자가 없어야 합니다.
      3. 배열은 오름차순으로 정렬하여 return합니다. 
    */
    if(winningNumbers === num){
        while(winningNumbers.length < 6){
            let ran = Math.floor(Math.random() * 45) + 1
            if(winningNumbers.indexOf(ran) === -1 ){
                winningNumbers.push(ran)
                winningNumbers.sort(function(a,b){ // 오름차순으로 정렬되고 값은 winningNumbers에 return됨
                    return a-b
                })
                
            }  
        }
        return displayNumbers(winningNumbers)
    }
    if(lottoNumbers === num){
        while(lottoNumbers.length < 6){
            let ran = Math.floor(Math.random() * 45) + 1
            if(lottoNumbers.indexOf(ran) === -1 ){
                lottoNumbers.push(ran)
                lottoNumbers.sort(function(a,b){ // 오름차순으로 정렬되고 값은 winningNumbers에 return됨
                    return a-b
                })
                
            }  
        }
        return displayNumbers(lottoNumbers)
    }
  
  }

  function displayNumbers(numbers) {
    /* TODO:
      1. 숫자 배열을 받아서 HTML 요소로 변환하여 반환하는 함수입니다.
      2. 각 숫자는 <span> 요소로 감싸지며, 당첨 번호와 일치하는 경우 특별한 스타일이 적용됩니다.
      3. 매개변수에 대한 설명
        - numbers - 표시할 숫자의 배열
        - winningNumbers - 당첨 번호 배열 (선택 사항)
    */
   if(numbers === winningNumbers ){
        const winDiv = document.createElement("div")
        winDiv.classList.add('number-set')
        winningNumContainer.innerHTML = ""
        console.log(winningNumbers)
        winningNumContainer.appendChild(winDiv)
        for(let i =0; i<numbers.length; i++) {
            const Span = document.createElement("span")
            Span.classList.add('number')
            Span.classList.add('match')
            Span.textContent = numbers[i]
            winDiv.appendChild(Span)
        }
        
   }
   
    if(numbers === lottoNumbers){
        const lottoDiv = document.createElement("div")
        lottoDiv.classList.add('number-set')
        lottoNumContainer.appendChild(lottoDiv)
        for(let i =0; i<numbers.length; i++) {
            const lottoSpan = document.createElement("span")
            lottoSpan.classList.add('number')
            
            lottoSpan.textContent = numbers[i]
            for(let j = 0; j<numbers.length; j++){
                console.log(winningNumbers[i])
                console.log(lottoNumbers[j])
                if(winningNumbers[j] === lottoNumbers[i] ) {
                    lottoSpan.classList.add('match')
                    break;
                }

            }
            lottoDiv.appendChild(lottoSpan)
            
        }
        
    
    }
    
  }
 
  
  generateWinningNumbers.addEventListener('click', () => {
    /* TODO:
      - '이번 주 당첨 번호 생성하기' 버튼 클릭 시 실행되는 이벤트 핸들러입니다.
      - generateNumbers 함수를 호출하여 당첨 번호를 생성하고, 이를 화면에 표시합니다.
      - 이전에 표시된 당첨 번호가 있다면, 화면에서 제거한 후 새로운 당첨 번호를 표시합니다.
    */
      winningNumbers.splice(0, 6);
      winningNumContainer.innerHTML = ""
      generateNumbers(winningNumbers)
  });
  
  generateLottoNumbers.addEventListener('click', () => {
    /* TODO:
      - '로또 번호 자동 생성' 버튼 클릭 시 실행되는 이벤트 핸들러입니다.
      - 당첨 번호가 먼저 생성되어 있는지 확인한 후, 5세트의 로또 번호를 생성하고 화면에 표시합니다.
      - 당첨 번호가 아직 생성되지 않았다면, 사용자에게 경고 메시지를 표시합니다.
      - 이전에 생성된 로또 번호가 있다면, 화면에서 제거한 후 새로운 로또 번호를 표시합니다.
    */
    lottoNumContainer.innerHTML = ""
    if(winningNumbers.length === 0){
        alert("당첨 번호 생성하기 버튼을 눌러주세요.")
    } else {
         for(let i = 0; i< 5; i++){
            lottoNumbers.splice(0, 6);
            generateNumbers(lottoNumbers)
        }    
    }
  });
  