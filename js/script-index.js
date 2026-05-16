
const input = document.getElementById("meufile");
const preview = document.getElementById("preview");
const botaoLimpar = document.getElementById("btn-limpar");

// Quando o usuario clica em limpar
botaoLimpar.addEventListener("click", function(){
     preview.style.display = "none";
})

input.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
    }
});

const form_cadastro = document.getElementById("form_cadastro");
const mensagemSucesso = document.getElementById("mensagem-sucesso");


form_cadastro.addEventListener("submit", async (evento) => {
    evento.preventDefault(); // evita o mecanismo antigo de enviar dados (nao usa fetch)

    const nome_sinalizador = form_cadastro.nome.value;
    const telefone = form_cadastro.telefone.value;
    const sexo = form_cadastro.sexo.value;
    const tipo = form_cadastro.tipo.value;
    const porte = form_cadastro.porte.value;
    const descricao = form_cadastro.descricao.value;

    function converterParaBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const fotoInput = document.getElementById("meufile");
    // pega o arquivo enviado
    const fotoArquivo = fotoInput.files[0];

    const base64 = await converterParaBase64(fotoArquivo);

    console.log(base64);

    const rua = form_cadastro.rua.value;
    const numero = form_cadastro.numero.value;
    const bairro = form_cadastro.bairro.value;
    const cidade = form_cadastro.cidade.value;
    const estado = form_cadastro.estado.value;
    const cep = form_cadastro.cep.value;

    const novoAnimal = {
        nome_sinalizador: nome_sinalizador,
        telefone: telefone,
        sexo: sexo,
        tipo: tipo,
        porte: porte,
        descricao: descricao,
        link_foto: '',
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
            // mostra a mensagem de sucesso
            mensagemSucesso.style.display = "block";

            // limpa formulário e esconde a imagem de preview
            form_cadastro.reset();
            preview.style.display = "none";

            // esconde depois de 4 segundos
            setTimeout(() => {
                mensagemSucesso.style.display = "none";
            }, 4000);
        })
});
