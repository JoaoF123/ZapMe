var textDDD = document.querySelector("#ddd");
var textCelular = document.querySelector("#celular");
var textPadrao = document.querySelector("#mensagem");
var btnCriarLink = document.querySelector(".btn-criar-link");
var urlBase = "https://api.whatsapp.com/send?phone=55";
var linkGerado;
var btnCopiarLink = document.querySelector(".copiarLink");

btnCopiarLink.addEventListener('click', (event) => {

    event.preventDefault();

    var link = document.querySelector(".link-container #link-zapme");

    link.select();
    link.setSelectionRange(0, 9999);

    document.execCommand('copy');

    btnCopiarLink.innerHTML = "Copiado";

    setTimeout(() => {
        btnCopiarLink.innerHTML = "Copiar link";
    }, 2000);
});

var maskDDD = IMask(textDDD, {
    mask: '{(}00{)}'
});

var maskCelular = IMask(textCelular, {
    mask: '00000-0000'
});

btnCriarLink.onclick = () => {

    if (validarCampos()) {

        var campos = sanitizarCampos();

        retornarLinkGerado(campos);

        limparCampos();
    }
}

function validarCampos() {

    var mensagem = "";

    if (textDDD.value == "") {
        mensagem += "O campo DDD é obrigatório \r\n";
    }

    if (textCelular.value == "") {
        mensagem += "O campo celular é obrigatório \r\n";
    }

    if (textPadrao.value == "") {
        mensagem += "O campo texto padrão é obrigatório \r\n";
    }

    if (mensagem !== "") {
        alert(mensagem);
        return false;
    }

    return true;
}

function sanitizarCampos() {

    var DDD = textDDD.value.replace('(', '');
    DDD = DDD.replace(')', '');

    var celular = textCelular.value.replace('-', '');

    return {
        ddd: DDD,
        celular: celular,
        mensagem: textPadrao.value
    };
}

function retornarLinkGerado(campos) {

    linkGerado = urlBase + campos.ddd + campos.celular + '&text=' + encodeURI(campos.mensagem);

    var link = document.createElement("input");
    link.setAttribute("type", "text");
    link.setAttribute("name", "link-zapme");
    link.setAttribute("id", "link-zapme");
    link.setAttribute("value", linkGerado);
    link.setAttribute("readonly", "true");

    var linkContainer = document.querySelector(".link-container");
    linkContainer.innerHTML = "";

    linkContainer.appendChild(link);
}

function limparCampos() {

    textDDD.value = "";
    textCelular.value = "";
    textPadrao.value = "";
}