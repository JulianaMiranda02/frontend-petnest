// Seleciona os principais elementos da página utilizados pelo JavaScript
const input = document.getElementById("meufile");
const preview = document.getElementById("preview");
const botaoLimpar = document.getElementById("btn-limpar");


// Aplica a máscara de telefone automaticamente durante a digitação
document.getElementById('telefone').addEventListener('input', (e) => {
    // Remove qualquer caractere que não seja número
    let v = e.target.value.replace(/\D/g, '');
    // Se o campo estiver vazio, limpa o valor e encerra a função
    if (v.length === 0) {
        e.target.value = '';
        return;
    }
    // Formata o número conforme o usuário digita
    if (v.length <= 2) {
        v = `(${v}`;
    } else if (v.length <= 6) {
        v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    } else if (v.length <= 10) {
        // ex: (11) 9999-9999 — Formato para telefone fixo
        v = `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;
    } else {
        // ex: (11) 99999-9999 —Formato para celular
        v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7, 11)}`;
    }
    e.target.value = v;
});

// Remove qualquer caractere que não seja número
document.getElementById('cep').addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length === 0) {
        e.target.value = '';
        return;
    }
    if (v.length > 5) {
        v = `${v.slice(0, 5)}-${v.slice(5, 8)}`;
    }
    e.target.value = v;
});

// Remove a imagem de pré-visualização ao limpar o formulário
botaoLimpar.addEventListener("click", function () {
    preview.style.display = "none";
})

// Exibe uma pré-visualização da imagem selecionada pelo usuário
input.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
    }
});

// Seleciona o formulário e as mensagens de retorno ao usuário
const form_cadastro = document.getElementById("form_cadastro");
const mensagemSucesso = document.getElementById("mensagem-sucesso");
const mensagemErro = document.getElementById("mensagem-erro");

// Captura o envio do formulário e envia os dados para a API
form_cadastro.addEventListener("submit", async (evento) => {
    evento.preventDefault(); // evita o mecanismo antigo de enviar dados (nao usa fetch)

    const nome_sinalizador = form_cadastro.nome.value;
    const telefone = form_cadastro.telefone.value;
    const sexo = form_cadastro.sexo.value;
    const tipo = form_cadastro.tipo.value;
    const porte = form_cadastro.porte.value;
    const descricao = form_cadastro.descricao.value;

    // Converte a imagem selecionada para o formato Base64
    function converterParaBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const fotoInput = document.getElementById("meufile");
    // Obtém a imagem selecionada pelo usuário
    const fotoArquivo = fotoInput.files[0];

    const base64 = await converterParaBase64(fotoArquivo);

    const rua = form_cadastro.rua.value;
    const numero = form_cadastro.numero.value;
    const bairro = form_cadastro.bairro.value;
    const cidade = form_cadastro.cidade.value;
    const estado = form_cadastro.estado.value;
    const cep = form_cadastro.cep.value;

    // Cria o objeto contendo todos os dados que serão enviados para a API
    const novoAnimal = {
        nome_sinalizador: nome_sinalizador,
        telefone: telefone,
        sexo: sexo,
        tipo: tipo,
        porte: porte,
        descricao: descricao,
        imagem: base64,
        type_image: fotoArquivo.type, // Tipo da imagem (PNG, JPG ou JPEG).
        rua: rua,
        numero: numero,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        cep: cep
    }

    console.log(novoAnimal);

    // Exibe a mensagem de erro caso o envio não seja realizado
    function mostraMensagemDeErro() {
        mensagemErro.style.display = "block";

        // Oculta a mensagem automaticamente após 4 segundos
        setTimeout(() => {
            mensagemErro.style.display = "none";
        }, 4000);

    }

    // Envia os dados do formulário para a API utilizando o método POST
    fetch("https://z6ix40n36f.execute-api.sa-east-1.amazonaws.com/prod/sinalizar-animal", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            novoAnimal
        )
    })
        .then(resposta => {
            if (!resposta.ok) {
                mostraMensagemDeErro()
                return;
            }

            console.log(resposta);
            // Exibe a confirmação de envio ao usuário
            mensagemSucesso.style.display = "block";

            // Limpa o formulário e remove a imagem de pré-visualização
            form_cadastro.reset();
            preview.style.display = "none";

            // Oculta a mensagem automaticamente após 4 segundos
            setTimeout(() => {
                mensagemSucesso.style.display = "none";
            }, 4000);
        }).catch(() => {
            mostraMensagemDeErro()
            return;
        })
});
