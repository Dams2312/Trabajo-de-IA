import { encoding_for_model } from "tiktoken";
import fs from 'fs';

async function procesamiento() {
    
    const encoding = encoding_for_model('gpt-4');

    const libro = fs.readFileSync('./cien_años_de_soledad.txt', 'utf-8');

    const tokens = encoding.encode(libro);

    console.log(`Número total de tokens: ${tokens.length}`);

    const maximo = 500;

    let chunks = [];
    let actual = [];

    for (let token of tokens) {
        if (actual.length >=  maximo) {
            chunks.push(actual);
            actual = [];
        }
        actual.push(token);
    }
    if (actual.length > 0) {
        chunks.push(actual);
    }
    console.log(`Número total de fragmentos: ${chunks.length}`);

    const costo = 0.03
    let precio = 0

    chunks.forEach((chunk, index) => {  

        const numTokens = chunk.length;
        let preciochunk = (numTokens / 1000) * costo;
        let total = precio + preciochunk;
        precio = total;
        console.log(`Fragmento ${index + 1}: ${numTokens} tokens, Costo: $${precio.toFixed(4)}`);
    });
    console.log(`Costo total estimado: $${precio.toFixed(4)}`);

}
procesamiento();

