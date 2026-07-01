const botaoPesquisar = document.getElementById("pesquisar");

// Remove um animal da lista após a confirmação do usuário
function deletarAnimal(id) {
    // Exibe a janela de confirmação antes de remover o animal
    const modal = document.getElementById("modal-adotado");

    modal.style.display = "flex";
    // Executa a exclusão caso o usuário confirme a ação
    document.getElementById("confirmar").onclick = function () {

        // Envia uma requisição para remover o animal da API
        fetch(`https://z6ix40n36f.execute-api.sa-east-1.amazonaws.com/prod/deletar-animal`, {
            method: "DELETE",
            body: JSON.stringify({
                id: id
            })
        })
            .then(() => {

                // Remove o card do animal da página após a exclusão
                const divAnimal = document.getElementById(`div-animal-${id}`);

                if (divAnimal) {
                    divAnimal.remove();
                }
                modal.style.display = "none";
            });
    };
    // Fecha a janela de confirmação sem remover o animal
    document.getElementById("cancelar").onclick = function () {
        modal.style.display = "none";
    };

}

// Pesquisa animais disponíveis de acordo com a cidade e o estado informados
function pesquisarAnimais() {
    let cidade = document.getElementById("cidade").value;
    let estado = document.getElementById("estado").value;

    // Seleciona os elementos utilizados durante a pesquisa
    const mensagemErro = document.getElementById("mensagem-erro");

    // Área onde os animais encontrados serão exibidos
    const lista = document.getElementById("exibir_animais");

    // Remove os resultados anteriores antes de realizar uma nova pesquisa
    lista.innerHTML = "";


    // Verifica se os campos obrigatórios foram preenchidos
    if (cidade.trim() === "" || estado === "") {

        mensagemErro.innerHTML = "Digite a cidade e selecione o estado.";

        // Remove a mensagem exibida anteriormente
        document.getElementById("mensagem-vazia").innerHTML = "";


        return;
    }
    // Remove a mensagem de erro após uma pesquisa válida
    mensagemErro.innerHTML = "";

    console.log(cidade);
    console.log(estado);

    // Indica que o campo esta sendo pesquisado
    botaoPesquisar.disabled = true;
    botaoPesquisar.textContent = "Pesquisando...";

    // Consulta a API para buscar os animais cadastrados na região informada
    fetch(`https://z6ix40n36f.execute-api.sa-east-1.amazonaws.com/prod/animais-perdidos?cidade=${cidade}&estado=${estado}`, {
        method: "GET",
    })
        .then(resposta => resposta.json())
        .then((animais_perdidos) => {

            // Restaura o botão
            botaoPesquisar.disabled = false;
            botaoPesquisar.textContent = "Pesquisar";

            const mensagem = document.getElementById("mensagem-vazia");

            // Verifica se a pesquisa retornou algum animal
            if (animais_perdidos.length === 0) {
                mensagem.innerHTML = `
                <div class="sem-animais">

            <img src="img/dog-cat-feliz.gif" 
                 alt="Cachorro e gato feliz"
                 class="gif-cachorro">

            <p>
                Nenhum pet encontrado nessa região 
            </p>

        </div>`

            } else {
                mensagem.innerHTML = "";
            }
            // Percorre a lista de animais retornada pela API
            for (let animal of animais_perdidos) {
                console.log(animal);

                // Cria um card para exibir as informações de cada animal
                const item = document.createElement("div");
                item.id = `div-animal-${animal.id}`;


                item.innerHTML = `
                <div class="card-animal">
                    <div class="flex conteudo-card">
                        <img class="imagem-animal" src="${animal.imagem}">
                        
                        <div class="info">
                            <p class="tipo-do-animal">${animal.tipo}</p><br>
                            <p>Porte: ${animal.porte}</p>
                            <p>Sexo: ${animal.sexo}</p>
                            <p>Endereço: ${animal.rua}, ${animal.numero} - ${animal.bairro}, ${animal.cidade}</p>
                            <p>Estado: ${animal.estado}</p>
                            <p>Sinalizado por: ${animal.nome_sinalizador}</p>
                            <p>Telefone: ${animal.telefone}</p>
                            <p class="descricao">
                        Descrição: ${animal.descricao}
                    </p>
                        </div>
                    </div>

                    <div class="bnt-adotado">
                        <button class="botao botao-adotado" onclick="deletarAnimal(${animal.id})">Remover da lista</button>
                    </div>
                </div>
                `;

                // Adiciona o card do animal na página
                lista.appendChild(item);
            }

        })
        // Exibe o erro no console caso a consulta à API falhe
        .catch(error => {

            botaoPesquisar.disabled = false;
            botaoPesquisar.textContent = "Pesquisar";

            console.log("Erro:", error);
        });

}




