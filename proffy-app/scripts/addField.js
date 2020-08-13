// procurar o botao
document.querySelector("#add-time")
// clicar no botao
  .addEventListener('click', cloneField);

// executar uma acao
function cloneField() {
  // duplicar os campos
  const newFieldContainer = document.querySelector('.schedule-item')
    .cloneNode(true);
  
  // pegar os campos para limpar 
  const fields = newFieldContainer.querySelectorAll('input');
  
  // limpar cada campo
  fields.forEach((field) => {
    // pega o field e limpa
    field.value = "";
  });

  // colocar na pagina
  document.querySelector('#schedule-items')
    .appendChild(newFieldContainer);
}

