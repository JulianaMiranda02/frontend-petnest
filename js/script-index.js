const input = document.getElementById("meufile");
const preview = document.getElementById("preview");

input.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
    }
});

const form_cadastro = document.getElementById("form_cadastro");

form_cadastro.addEventListener("submit", (evento) => {
evento.preventDefault(); // evita o mecanismo antigo de enviar dados (nao usa fetch)

const nome = form_cadastro.nome.value; 
const telefone = form_cadastro.telefone.value;
const sexo = form_cadastro.sexo.value;
const tipo = form_cadastro.tipo.value;
const porte = form_cadastro.porte.value;
const descricao = form_cadastro.descricao.value;
// const foto = form_cadastro.//rever

const rua = form_cadastro.rua.value;
const numero = form_cadastro.numero.value;
const bairro = form_cadastro.bairro.value;
const cidade = form_cadastro.cidade.value;
const estado = form_cadastro.estado.value;
const cep = form_cadastro.cep.value;

const novoAnimal = {
        nome: nome,
        telefone: telefone,
        sexo: sexo,
        tipo: tipo,
        porte: porte,
        descrição: descricao,
        // foto = foto,//rever
        rua: rua,
        numero: numero,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        cep: cep
    }

    console.log(novoAnimal);

    fetch("http://localhost:1234/sinalizar-animal", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            novoAnimal
        )
    })
        .then(resposta => resposta.text())
        .then(resposta => {
            console.log(resposta);
        })



});
