const inputElement = document.getElementById("formAddress");
const inputsElments = document.getElementsByTagName("input");
function changeFont(event){
    const upper = "text-transform:uppercase;";
    const cap = "text-transform:capitalize;";
    const style = event.target.getAttribute("style");
    // verifica se existe um atributo style na tag
    if(event.target.getAttribute("style")){
        // verifica se o input não está vazio
        if(event.target.value.length!==0){
            // verifica se dentro da string do valor já existe a propriedade com valor captalize 
            if(style.includes(cap)){
                event.target.setAttribute("style",style.replace(cap,"")+upper);
            }else{
                event.target.setAttribute("style",upper+style);
            }
        }else{
            // verifica se dentro da string do valor já existe a propriedade com valor uppercase
            if(style.includes(upper)){
                event.target.setAttribute("style",style.replace(upper,"")+cap);
            }else{
                event.target.setAttribute("style",cap+style);
            }
        }
    }else{
        event.target.setAttribute("style",cap);
    }
}
// previne a ação padrão de submit para o botão "previne o recarregamento da página";
function prevent(event){
    event.preventDefault()
}
// em caso de clicar no botão do formulário
inputElement.addEventListener("submit",prevent);

// em caso de alteração em um input seta a mudança conforme a lógica
inputElement.addEventListener("keyup",changeFont);