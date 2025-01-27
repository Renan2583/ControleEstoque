const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('sucesso') === 'true') {
    alert('Produto cadastrado com sucesso!');
    
}

