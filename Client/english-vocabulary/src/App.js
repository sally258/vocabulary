// import { type } from '@testing-library/user-event/dist/type';
import {useState, useEffect} from 'react';
import './App.css';

const randomVocabulary = (listKey, btnStart) => {
  if (btnStart === 'Start') {
    return `Let's Start`
  }
  const rd = Math.floor(Math.random() * listKey.length);
  return listKey[rd];
}

const checkAnswer = (answer, vocabulary, data) => {
  return data[vocabulary].includes(answer);
}

const setVocabularyWhenSubmit = (data, vocabulary) => {
  let result = vocabulary + "\n";
  let arr = data[vocabulary];

  result += arr[0];
  for (let i=1; i<arr.length; i++)
    result += ', ' + arr[i];
  return result
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function App() {
  const [answer, setAnswer] = useState('');
  const [btnStart, setBtnStart] = useState('Start');
  const [data, setData] = useState({});
  const [listKey, setLstKey] = useState([]);
  const [vocabulary, setVocabulary] = useState(randomVocabulary(listKey, btnStart));
  const [correct, setCorrect] = useState('none-answer'); // correct == 'none-answer' || 'correct-answer' || 'wrong-answer'

  useEffect(() => {
    fetch('http://127.0.0.1:5000/vocabulary')
      .then(res => res.json())
        .then(out => {
            setData(out);
            setLstKey(Object.keys(out));
          })
    setVocabulary(randomVocabulary(listKey, btnStart))
  }, [btnStart])

  return (
    <div className="App">
      <h1>Vocabulary</h1>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-3'>
            phần cài đặt tốc độ (coming soon)
          </div>
          <div className='col-6'>
            <pre id='vocabulary-show' className={'border border-secondary text-center ' + correct}>
              {vocabulary}
            </pre>
            <div className='row'>
              <div className='col-9'>
                <input id='text-answer' type='text' autoFocus
                  onKeyUp=
                  {
                    (e) => {
                      setAnswer(e.target.value);
                      if (e.key === 'Enter') {
                        if (btnStart === 'Stop') {
                          // check answer with vocabulary
                          const check = checkAnswer(answer, vocabulary, data)
                          if (check === true) {
                            setCorrect('correct-answer')
                          } else if (check === false) {
                            setCorrect('wrong-answer')
                          }
                          setVocabulary(setVocabularyWhenSubmit(data, vocabulary));
                          sleep(1000).then(() => {
                            setVocabulary(randomVocabulary(listKey))
                            setCorrect('none-answer')
                          });
                        }
                        e.target.value = ''
                        setAnswer(e.target.value)
                      }
                    }
                  }
                  >
                </input>
              </div>
              <div className='col-3'>
                <button id='btn-start' className='btn btn-outline-secondary' type='button'
                  onClick={() => setBtnStart(btnStart === 'Start' ? 'Stop' : 'Start')}>
                  {btnStart}
                </button>
              </div>
            </div>
          </div>
          <div className='col-3'>
            phần tính điểm (coming soon)
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
