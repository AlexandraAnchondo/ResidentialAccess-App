const perro = {
    sonido: "¡Guau! ¡Guau!"
};

const gato = {
    sonido: "¡Miau! ¡Miau!"
}

const pato = {
    sonido: "¡Cuak! ¡Cuak!"
}

const animal = "pato";

switch(animal)
{
    case 'perro': console.log(perro.sonido);
    break;
    case 'gato': console.log(gato.sonido);
    break;
    case 'pato': console.log(pato.sonido);
    break;
}