const readline = require('readline-sync');

let inventario = [];
let proximoId = 1;

function mostrarMenu() {
    console.log(`
    ---------- AGILSTORE ----------
    1. Adicionar Produto
    2. Listar Produtos
    3. Atualizar Produto
    4. Excluir Produto
    5. Buscar Produto
    0. Sair
    -------------------------------
    `);

    const opcao = readline.question("Escolha uma opcao: ");

    switch (opcao) {
        case '1': // ADICIONAR
            const nome = readline.question("Nome do Produto: ");
            const categoria = readline.question("Categoria: ");
            const qtd = readline.questionInt("Quantidade em Estoque: ");
            const preco = readline.questionFloat("Preco: ");
            inventario.push({ id: proximoId++, nome, categoria, qtd, preco });
            console.log("\n✅ Produto cadastrado!");
            break;

        case '2': // LISTAR
            console.log("\n=== INVENTARIO ATUAL ===");
            console.table(inventario);
            break;

        case '3': // ATUALIZAR
            const idAtu = readline.questionInt("ID do produto para atualizar: ");
            const prod = inventario.find(p => p.id === idAtu);
            if (prod) {
                console.log("O que deseja alterar? (1.Nome / 2.Categoria / 3.Qtd / 4.Preco)");
                const editOpcao = readline.question("Opcao: ");
                if(editOpcao === '1') prod.nome = readline.question("Novo Nome: ");
                if(editOpcao === '2') prod.categoria = readline.question("Nova Categoria: ");
                if(editOpcao === '3') prod.qtd = readline.questionInt("Nova Qtd: ");
                if(editOpcao === '4') prod.preco = readline.questionFloat("Novo Preco: ");
                console.log("✅ Atualizado!");
            } else {
                console.log("❌ Produto nao encontrado.");
            }
            break;

        case '4': // EXCLUIR
            const idExc = readline.questionInt("ID do produto para excluir: ");
            const index = inventario.findIndex(p => p.id === idExc);
            if (index !== -1) {
                inventario.splice(index, 1);
                console.log("🗑️ Produto removido!");
            } else {
                console.log("❌ ID nao encontrado.");
            }
            break;

        case '5': // BUSCAR
            const busca = readline.question("Digite o nome ou ID: ").toLowerCase();
            const res = inventario.filter(p => 
                p.nome.toLowerCase().includes(busca) || p.id.toString() === busca
            );
            console.table(res);
            break;

        case '0':
            console.log("Saindo... Boa sorte no desafio!");
            process.exit();
            break;

        default:
            console.log("Opção inválida!");
    }
    mostrarMenu();
}

mostrarMenu();