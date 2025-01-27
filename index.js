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

let estoque = [];

app.post('/cadastro', (req, res) => { 
    const { nomeprod, fornecedor, preco1, preco2 ,quant} = req.body;
    const produto = { nomeprod,fornecedor,preco1,preco2,quant};
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
        </head>
        <body>
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

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
