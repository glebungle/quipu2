import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  let [블로그명] = useState('찐빵 블로그');
  let [글제목, 글제목변경] = useState(['굿즈 추천', '영화 추천', '노래 추천']);
  let [따봉, 따봉변경] = useState([0, 0, 0]);
  let [싫어요, 싫어요변경] = useState([0, 0, 0]);
  let [모달, 모달변경] = useState(false);
  let [선택된글, 선택된글변경] = useState(0);

  const toggleModal = (index) => {
    if (선택된글 === index && 모달) {
      모달변경(false);
    } else {
      선택된글변경(index);
      모달변경(true);
    }
  };

  return (
    <div className="App">
      <div className="black-nav">
        <h4>{ 블로그명 }</h4>
      </div>

      <div>
      { 글제목.map((title, index) => (
        <List
          title={title}
          index={index}
          따봉={따봉}
          따봉변경={따봉변경}
          글제목={글제목}
          글제목변경={글제목변경}
          싫어요={싫어요}
          싫어요변경={싫어요변경}
          toggleModal={toggleModal}
        />
      ))}
      </div>
      <div>
        <input type="text" id="newTitle" placeholder="제목을 입력하세요" />
      <button onClick={() => {
        const newTitle = document.getElementById('newTitle').value;
        if (!newTitle) {
          alert('제목을 입력해주세요!!!');
          return;
        }
        글제목변경([newTitle, ...글제목]);
        따봉변경([0, ...따봉]);
        싫어요변경([0, ...싫어요]);
      
      }}>저장</button>
      </div>
      {모달 && <Modal 글제목={글제목} 선택된글={선택된글} />}
    </div>
  );
}

function List({ title, index, 따봉, 따봉변경, 글제목, 글제목변경, 싫어요, 싫어요변경, toggleModal }) {
  const Like = () => {
    const Likes = [...따봉];
    Likes[index] += 1;
    따봉변경(Likes);
  };

  const Dislike = () => {
    const Dislikes = [...싫어요];
    Dislikes[index] += 1;
    싫어요변경(Dislikes);
  };

  const Delete = () => {
    const Titles = [...글제목];
    Titles.splice(index, 1);
    const onRemove = (index) => {

      글제목변경(글제목.filter((_, i) => i !== index));
  
    };
    글제목변경(Titles);
    따봉변경(따봉.filter((_, i) => i !== index));
    싫어요변경(싫어요.filter((_, i) => i !== index));
  };

  return (
    <div className="list">
      <h4 onClick={() => toggleModal(index)}>{ title }
        <span onClick={(e) => { e.stopPropagation(); Like(); }}>👍</span> {따봉[index]}
        <span onClick={(e) => { e.stopPropagation(); Dislike(); }}>👎</span> {싫어요[index]}
      </h4>
      <p>2월 17일 발행</p>
      <button onClick={Delete}>삭제</button>
    </div>
  );
}

function Modal({ 글제목, 선택된글 }) {
  return (
    <div className="modal">
      <h4>{ 글제목[선택된글] }</h4>
      <p>2월 17일 발행</p>
      <p>상세내용</p>
    </div>
  );
}

export default App;
