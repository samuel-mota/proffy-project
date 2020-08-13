import React from "react";

// STYLES
import "./styles.css";

// IMAGES/ICONS
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars3.githubusercontent.com/u/34915411?s=460&u=c8e940ebd7f5835b9ce2cf7e1aa7d175a1de2f79&v=4"
          alt="Professor"
        />
        <div>
          <strong>Samuel Mota</strong>
          <span>IT</span>
        </div>
      </header>

      <p>
        Teste kkkkkkkkkkkkkkkkkkkkkkkkk <br /> <br /> lllllllllll aaaaaaaaaaaa
        00000000000 lllllllll kkkkkkkk
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 80,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;
