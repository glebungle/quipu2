import './App.css';
import { useState } from 'react';

function App() {
  let [글제목, 글제목변경] = useState(['영화 추천', '맛집 추천', '노래 추천']);
  let [좋아요, 좋아요변경] = useState([0, 0, 0]);
  let [싫어요, 싫어요변경] = useState([0, 0, 0]);
  let [모달, 모달변경] = useState(false);
  let [선택, 선택변경] = useState('');
  let [입력값, 입력값변경] = useState('');


  return (
    <div className="Container">
      <div className="nav">
        <h3>찐빵 블로그</h3>
      </div>
      <div className="list-container">
        {
        글제목.map((element, count) => (
          <List key={count} index={count} 글제목={글제목} 글제목변경={글제목변경}
            좋아요={좋아요} 좋아요변경={좋아요변경}
            싫어요={싫어요} 싫어요변경={싫어요변경}
            모달={모달} 모달변경={모달변경}
            선택={선택} 선택변경={선택변경} />
        ))
      }
      </div>
      <div className="input-modal-container">
        <div className="input-container">
          <input onChange={(e)=>{
            입력값변경(e.target.value);
          }} value={입력값} placeholder="제목을 입력하세요" />
          <button onClick={(e)=>{
            if (입력값.trim() === '') {
              alert("제목을 입력하세요!");
            } else {
              let copy글제목 = [...글제목];
              let copy좋아요 = [...좋아요];
              let copy싫어요 = [...싫어요];
              copy글제목.unshift(입력값);
              copy좋아요.unshift(0);
              copy싫어요.unshift(0);
              글제목변경(copy글제목);
              좋아요변경(copy좋아요);
              싫어요변경(copy싫어요);
              입력값변경('');
            }
          }}>저장</button>
        </div>
        {모달 && <Modal 선택={글제목[선택]} />}
      </div>

    </div>
  );
}

function Modal({ 선택 }) {
  return (
    <div className="modal">
      <h4>{선택}</h4>
      <p>12월 12일</p>
      <p>블라블라</p>
    </div>
  );
}

function List(props) {
  return (
    <div className="list">
      <h4 onClick={() => {
        props.모달변경(!props.모달);
        props.선택변경(props.글제목[props.index]);
      }}>{props.글제목[props.index]}</h4>
      <span onClick={(e) => {
        e.stopPropagation();
        let copy좋아요 = [...props.좋아요];
        copy좋아요[props.index] += 1;
        props.좋아요변경(copy좋아요);
      }}>👍{props.좋아요[props.index]}</span>
      <span onClick={(e) => {
        e.stopPropagation();
        let copy싫어요 = [...props.싫어요];
        copy싫어요[props.index] += 1;
        props.싫어요변경(copy싫어요);
      }}>👎{props.싫어요[props.index]}</span>
      <p>12월 12일 발행</p>
      <button onClick={() => {
        let copy글제목 = [...props.글제목];
        let copy싫어요 = [...props.싫어요];
        let copy좋아요 = [...props.좋아요];
        copy글제목.splice(props.index, 1);
        copy싫어요.splice(props.index, 1);
        copy좋아요.splice(props.index, 1);
        props.글제목변경(copy글제목);
        props.싫어요변경(copy싫어요);
        props.좋아요변경(copy좋아요);
      }}>삭제</button>
    </div>
  );
}

export default App;
