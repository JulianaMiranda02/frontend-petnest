function pesquisarAnimais() {
    let cidade = document.getElementById("cidade").value;
    let estado = document.getElementById("estado").value;

    console.log(cidade);
    console.log(estado);

    fetch(`http://localhost:1234/animais-perdidos?cidade=${cidade}&estado=${estado}`, {
        method: "GET",
    })
        .then(resposta => resposta.json())
        .then((animais_perdidos) => {

            const lista = document.getElementById("exibir_animais");

            // limpa os cards antigos
            lista.innerHTML = "";

            for (let animal of animais_perdidos) {
                console.log(animal);

                const item = document.createElement("div");

                item.innerHTML = `
                <div class="card-animal">
                    <div class="flex conteudo-card">
                        <img src="${animal.link_foto}">
                        
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
                        <button class=" botao botao-adotado">Adotado</button>
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




