
function deletarAnimal(id) {
    //Confirmar antes de remover animal
    const modal = document.getElementById("modal-adotado");

    modal.style.display = "flex";
    document.getElementById("confirmar").onclick = function () {

        fetch(`https://18.228.86.52:1234/deletar-animal`, {
            method: "DELETE",
            body: JSON.stringify({
                id: id
            })
        })
            .then(() => {
                // remover da tela (DOM), a div do animal
                // essas divs tem ids. com prefixo 'div-animal-' e o id do animal
                const divAnimal = document.getElementById(`div-animal-${id}`);

                if (divAnimal) {
                    divAnimal.remove();
                }
                modal.style.display = "none";
            });
    };
    document.getElementById("cancelar").onclick = function () {
        modal.style.display = "none";
    };

}

function pesquisarAnimais() {
    let cidade = document.getElementById("cidade").value;
    let estado = document.getElementById("estado").value;

    const mensagemErro = document.getElementById("mensagem-erro");
    
    // pega lista de animais
    const lista = document.getElementById("exibir_animais");
    
    // LIMPA OS CARDS ANTES DA NOVA PESQUISA
    lista.innerHTML = "";


    // validação
    if (cidade.trim() === "" || estado === "") {

        mensagemErro.innerHTML = "Digite a cidade e selecione o estado.";

        // limpa mensagem de nenhum animal
        document.getElementById("mensagem-vazia").innerHTML = "";


        return;
    }
    // limpa mensagem de erro
    mensagemErro.innerHTML = "";

    console.log(cidade);
    console.log(estado);

    fetch(`https://18.228.86.52:1234/animais-perdidos?cidade=${cidade}&estado=${estado}`, {
        method: "GET",
    })
        .then(resposta => resposta.json())
        .then((animais_perdidos) => {

            const mensagem = document.getElementById("mensagem-vazia");

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

            for (let animal of animais_perdidos) {
                console.log(animal);

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


                lista.appendChild(item);
            }

        })
        .catch(error => {
            console.log("Erro:", error);
        });

}




