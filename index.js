import express from 'express';
const PORT = 4000;
const app = express();

app.use(express.static('public')); //Pega da pasta publica
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {     //Redireciona pra pagina inicial
    res.redirect('/home.html');
});

app.get('/cadastro', (req, res) => { //Redireciona para o cadastro de peças
    res.redirect('/cadprod.html');
});

app.get('/fornecedor', (req, res) => { //Redireciona para o cadastro de fornecedores
    res.redirect('/cadfornecedor.html');
});

app.get('/cliente', (req, res) => { //Redireciona para o cadastro de clientes
    res.redirect('/cadcliente.html');
});

app.get('/vendedor', (req, res) => { //Redireciona para o cadastro de vendedores
    res.redirect('/cadvendedor.html');
});

let estoque = []; //Vetor para armazenar os produtos
let clientes = []; //Vetor para armazenar os clientes
let fornecedores = []; //Vetor para armazenar os fornecedores
let vendedores = []; //Vetor para armazenar os vendedores

app.post('/cadastro', (req, res) => { 
    const { nomeprod, fornecedor, preco1, preco2 ,quant} = req.body;
    const produto = { nomeprod, fornecedor, preco1, preco2, quant };
    estoque.push(produto);

    // Exibe uma mensagem de sucesso no próprio formulário de cadastro
    res.redirect('/cadprod.html?sucesso=true');
});

// Rota para exibir os produtos cadastrados
app.get('/consulta', (req, res) => {
    res.write(
        `<html>
        <head>
            <meta charset="UTF-8">
            <title>Lista de Produtos</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
            <link rel="stylesheet" href="/style.css">
        </head>
        <body class="fundo">
            <h1 class="text-center">Produtos Cadastrados</h1>
            <div class="container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Nome Produto</th>
                            <th>Fornecedor</th>
                            <th>Preço De Compra</th>
                            <th>Preço De Venda</th>
                            <th>Quantidade</th>
                        </tr>
                    </thead>
                    <tbody>`
    );

    // Adiciona cada produto à tabela
    estoque.forEach(produto => {
        res.write(
            `<tr>
                <td>${produto.nomeprod}</td>
                <td>${produto.fornecedor}</td>
                <td>${produto.preco1}</td>
                <td>${produto.preco2}</td>
                <td>${produto.quant}</td>
            </tr>`
        );
    });

    res.write(
        `</tbody>
                </table>
            </div>
        </body>
        </html>`
    );
    res.end();
});

// Cadastro de cliente
app.post('/cliente', (req, res) => {
    const { nomecliente, endereco, telefone } = req.body;
    const cliente = { nomecliente, endereco, telefone };
    clientes.push(cliente);
    res.redirect('/cadcliente.html?sucesso=true');
});

// Rota para exibir os clientes cadastrados
app.get('/consulta-cliente', (req, res) => {
    res.write(
        `<html>
        <head>
            <meta charset="UTF-8">
            <title>Lista de Clientes</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
        </head>
        <body>
            <h1 class="text-center">Clientes Cadastrados</h1>
            <div class="container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Nome Cliente</th>
                            <th>Endereço</th>
                            <th>Telefone</th>
                        </tr>
                    </thead>
                    <tbody>`
    );

    // Adiciona cada cliente à tabela
    clientes.forEach(cliente => {
        res.write(
            `<tr>
                <td>${cliente.nomecliente}</td>
                <td>${cliente.endereco}</td>
                <td>${cliente.telefone}</td>
            </tr>`
        );
    });

    res.write(
        `</tbody>
                </table>
            </div>
        </body>
        </html>`
    );
    res.end();
});

app.post('/fornecedor', (req, res) => {
    const { nomefornecedor, cidade, pedidomin } = req.body;
    const fornecedor = { nomefornecedor, cidade, pedidomin };
    fornecedores.push(fornecedor);
    res.redirect('/cadfornecedor.html?sucesso=true');
});

app.get('/consulta-fornecedor',(req,res)=>{
    res.write(
        `<html>
        <head>
            <meta charset="UTF-8">
            <title>Lista de Fornecedores</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
        </head>
        <body>
            <h1 class="text-center">Fornecedores Cadastrados</h1>
            <div class="container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Nome Fornecedor</th>
                            <th>Cidade</th>
                            <th>Pedido Mínimo</th>
                        </tr>
                    </thead>
                    <tbody>`
    );

    // Adiciona cada fornecedor à tabela
    fornecedores.forEach(fornecedor => {
        res.write(
            `<tr>
                <td>${fornecedor.nomefornecedor}</td>
                <td>${fornecedor.cidade}</td>
                <td>${fornecedor.pedidomin}</td>
            </tr>`
        );
    });

    res.write(
        `</tbody>
                </table>
            </div>
        </body>
        </html>`
    )
})

app.post('/vendedor', (req, res) => {
    const { nomevendedor, endereco, telefone } = req.body;
    const vendedor = { nomevendedor, endereco, telefone };
    vendedores.push(vendedor);
    res.redirect('/cadvendedor.html?sucesso=true');
});

app.get('/consulta-vendedor', (req, res) => {
    res.write(
        `<html>
        <head>
            <meta charset="UTF-8">
            <title>Lista de Vendedores</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
        </head>
        <body>
            <h1 class="text-center">Vendedores Cadastrados</h1>
            <div class="container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Nome Vendedor</th>
                            <th>Endereço</th>
                            <th>Telefone</th>
                        </tr>
                    </thead>
                    <tbody>`
    );

    // Adiciona cada vendedor à tabela
    vendedores.forEach(vendedor => {
        res.write(
            `<tr>
                <td>${vendedor.nomevendedor}</td>
                <td>${vendedor.endereco}</td>
                <td>${vendedor.telefone}</td>
            </tr>`
        );
    });

    res.write(
        `</tbody>
                </table>
            </div>
        </body>
        </html>`
    );
    res.end();
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
