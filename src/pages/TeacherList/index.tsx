import React from "react";

// COMPONENTS
import PageHeader from "../../components/PageHeader";
import TeacherItem from "../../components/TeacherItem";

// STYLES
import "./styles.css";

// COMPONENT
function TeacherList() {
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers">
          <div className="input-block">
            <label htmlFor="subject">Matéria</label>
            <input type="text" id="subject" />
          </div>

          <div className="input-block">
            <label htmlFor="week_day">Dia da semana</label>
            <input type="date" id="week_day" />
          </div>

          <div className="input-block">
            <label htmlFor="subject">Hora</label>
            <input type="time" id="time" />
          </div>
        </form>
      </PageHeader>

      <main>
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
      </main>
    </div>
  );
}

export default TeacherList;
