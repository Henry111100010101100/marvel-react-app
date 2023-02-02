import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
//import MarvelService from './services/MarvelService';
import './style/style.scss';


//const marvelService = new MarvelService();
//marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name)));
//marvelService.getCharacter(1011334).then(res => console.log(res));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

