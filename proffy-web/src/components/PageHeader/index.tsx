import React from "react";
import { Link } from "react-router-dom";

// IMAGES / ICONS
import logoImg from "../../assets/images/logo.svg";
import backIcon from "../../assets/images/icons/back.svg";

// STYLES
import "./styles.css";

interface PageHeaderProps {
  title: string; // obrigatorio, para nao obrigatorio "title?:" adicionar a exclamacao
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  // FC = Function Component
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="Voltar" />
        </Link>
        <img src={logoImg} alt="Proffy" />
      </div>

      <div className="header-content">
        <strong>{ props.title }</strong>
        { props.description && <p>{props.description}</p> /* or use ternary condition ? true : false */}

        { props.children }
      </div>
    </header>
  );
};

export default PageHeader;
