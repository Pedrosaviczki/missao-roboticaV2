const nomes = ["Pedro", "Arthur", "Enzo", "Igor", "Rafael", "Yasmin", "Emilly", "Ana", "Kamilly", "Fernanda"];



export function aleatorio (lista){
    const posicao = Math.floor(Math.random()* lista.length);
    return lista[posicao];
}

export const nome = aleatorio(nomes);