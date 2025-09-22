---
title: "Iteradores clave de array en JavaScript"
description: "Explora los iteradores fundamentales de arrays en JavaScript: for...of, entries(), keys(), values() y Symbol.iterator para un manejo eficiente de datos."
date: 2023-07-20
category: "Tech"
seo:
  title: "Iteradores clave de array en JavaScript: Guía completa"
  description: "Aprende sobre los iteradores esenciales de arrays en JavaScript: for...of, entries, keys, values y Symbol.iterator con ejemplos prácticos."
  keywords: ["JavaScript", "arrays", "iteradores", "for...of", "entries", "keys", "values", "Symbol.iterator"]
---

Los iteradores son una herramienta poderosa en JavaScript que permiten recorrer estructuras de datos de manera eficiente. En el contexto de los arrays, los iteradores proporcionan métodos que facilitan la manipulación y el acceso a los elementos de un array.

## ¿Qué son los iteradores?

Un iterador es un objeto que define una secuencia y potencialmente un valor de retorno al final. Los iteradores implementan el protocolo de iteración, que consiste en un método `next()` que devuelve un objeto con dos propiedades:

- `value`: El valor actual de la secuencia
- `done`: Un booleano que indica si la iteración ha terminado

## for...of

El bucle `for...of` permite recorrer los elementos de un array de manera sencilla y directa. Es la forma más común y legible de iterar sobre arrays.

```javascript
const array = ['a', 'b', 'c'];

for (const element of array) {
  console.log(element);
}
// Salida: a, b, c
```

### Ventajas de for...of

```javascript
const numeros = [1, 2, 3, 4, 5];

// ✅ Legible y directo
for (const numero of numeros) {
  console.log(numero * 2);
}

// ✅ Funciona con cualquier iterable
const texto = 'Hola';
for (const letra of texto) {
  console.log(letra);
}

// ✅ Se puede usar con break y continue
for (const numero of numeros) {
  if (numero === 3) break;
  console.log(numero);
}
```

### Comparación con for tradicional

```javascript
const array = ['a', 'b', 'c'];

// ❌ for tradicional (más verboso)
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}

// ✅ for...of (más limpio)
for (const element of array) {
  console.log(element);
}
```

## entries()

El método `entries()` devuelve un nuevo objeto de tipo `Array Iterator` que contiene pares clave/valor para cada índice del array.

```javascript
const array = ['a', 'b', 'c'];
const iterator = array.entries();

for (const [index, element] of iterator) {
  console.log(index, element);
}
// Salida: 0 a, 1 b, 2 c
```

### Casos de uso prácticos

```javascript
const frutas = ['manzana', 'banana', 'naranja'];

// Obtener índice y valor
for (const [indice, fruta] of frutas.entries()) {
  console.log(`${indice}: ${fruta}`);
}

// Convertir a objeto
const frutasConIndice = Object.fromEntries(frutas.entries());
console.log(frutasConIndice);
// { '0': 'manzana', '1': 'banana', '2': 'naranja' }

// Filtrar por índice
const frutasPares = [];
for (const [indice, fruta] of frutas.entries()) {
  if (indice % 2 === 0) {
    frutasPares.push(fruta);
  }
}
```

### Con objetos complejos

```javascript
const usuarios = [
  { nombre: 'Juan', edad: 25 },
  { nombre: 'María', edad: 30 },
  { nombre: 'Pedro', edad: 35 }
];

// Procesar con índice
for (const [indice, usuario] of usuarios.entries()) {
  console.log(`Usuario ${indice + 1}: ${usuario.nombre} (${usuario.edad} años)`);
}

// Crear lista numerada
const listaUsuarios = [];
for (const [indice, usuario] of usuarios.entries()) {
  listaUsuarios.push(`${indice + 1}. ${usuario.nombre}`);
}
```

## keys()

El método `keys()` devuelve un nuevo objeto de tipo `Array Iterator` que contiene las claves de cada índice del array.

```javascript
const array = ['a', 'b', 'c'];
const iterator = array.keys();

for (const key of iterator) {
  console.log(key);
}
// Salida: 0, 1, 2
```

### Casos de uso

```javascript
const productos = ['Laptop', 'Mouse', 'Teclado'];

// Obtener solo los índices
for (const indice of productos.keys()) {
  console.log(`Producto ${indice + 1}: ${productos[indice]}`);
}

// Crear array de índices
const indices = Array.from(productos.keys());
console.log(indices); // [0, 1, 2]

// Verificar índices válidos
const indiceValido = (array, indice) => {
  return Array.from(array.keys()).includes(indice);
};

console.log(indiceValido(productos, 1)); // true
console.log(indiceValido(productos, 5)); // false
```

### Con arrays dispersos

```javascript
const arrayDisperso = [1, , , 4, , 6];

// keys() incluye índices vacíos
for (const indice of arrayDisperso.keys()) {
  console.log(`Índice ${indice}: ${arrayDisperso[indice]}`);
}
// Salida: Índice 0: 1, Índice 1: undefined, Índice 2: undefined, etc.
```

## values()

El método `values()` devuelve un nuevo objeto de tipo `Array Iterator` que contiene los valores de cada índice del array.

```javascript
const array = ['a', 'b', 'c'];
const iterator = array.values();

for (const value of iterator) {
  console.log(value);
}
// Salida: a, b, c
```

### Casos de uso avanzados

```javascript
const numeros = [1, 2, 3, 4, 5];

// Iterar solo sobre valores
for (const numero of numeros.values()) {
  console.log(numero * 2);
}

// Convertir a array
const valores = Array.from(numeros.values());
console.log(valores); // [1, 2, 3, 4, 5]

// Con objetos
const personas = [
  { nombre: 'Juan', edad: 25 },
  { nombre: 'María', edad: 30 }
];

for (const persona of personas.values()) {
  console.log(`${persona.nombre} tiene ${persona.edad} años`);
}
```

### Con arrays de diferentes tipos

```javascript
const mixto = [1, 'hola', true, { nombre: 'test' }];

for (const valor of mixto.values()) {
  console.log(`${typeof valor}: ${valor}`);
}
// Salida: number: 1, string: hola, boolean: true, object: [object Object]
```

## Symbol.iterator

Los arrays en JavaScript son iterables por naturaleza, lo que significa que tienen un método `Symbol.iterator` que define su comportamiento de iteración.

```javascript
const array = ['a', 'b', 'c'];
const iterator = array[Symbol.iterator]();

console.log(iterator.next().value); // 'a'
console.log(iterator.next().value); // 'b'
console.log(iterator.next().value); // 'c'
console.log(iterator.next().done);  // true
```

### Implementación manual

```javascript
// Crear un iterador personalizado
function crearIterador(array) {
  let indice = 0;
  
  return {
    next() {
      if (indice < array.length) {
        return { value: array[indice++], done: false };
      } else {
        return { done: true };
      }
    }
  };
}

const miIterador = crearIterador(['x', 'y', 'z']);
console.log(miIterador.next().value); // 'x'
console.log(miIterador.next().value); // 'y'
console.log(miIterador.next().value); // 'z'
console.log(miIterador.next().done);  // true
```

### Iterador con lógica personalizada

```javascript
function crearIteradorPares(array) {
  let indice = 0;
  
  return {
    next() {
      while (indice < array.length) {
        const valor = array[indice++];
        if (valor % 2 === 0) {
          return { value: valor, done: false };
        }
      }
      return { done: true };
    }
  };
}

const numeros = [1, 2, 3, 4, 5, 6];
const iteradorPares = crearIteradorPares(numeros);

console.log(iteradorPares.next().value); // 2
console.log(iteradorPares.next().value); // 4
console.log(iteradorPares.next().value); // 6
console.log(iteradorPares.next().done);  // true
```

## Comparación de métodos

### Rendimiento y uso

```javascript
const array = Array.from({ length: 1000 }, (_, i) => i);

// for...of (más legible)
console.time('for...of');
for (const elemento of array) {
  // Procesar elemento
}
console.timeEnd('for...of');

// entries() (cuando necesitas índice)
console.time('entries');
for (const [indice, elemento] of array.entries()) {
  // Procesar con índice
}
console.timeEnd('entries');

// keys() (solo índices)
console.time('keys');
for (const indice of array.keys()) {
  // Procesar solo índice
}
console.timeEnd('keys');

// values() (solo valores)
console.time('values');
for (const valor of array.values()) {
  // Procesar solo valor
}
console.timeEnd('values');
```

### Cuándo usar cada uno

```javascript
const datos = ['a', 'b', 'c', 'd', 'e'];

// ✅ for...of - Uso general
for (const elemento of datos) {
  console.log(elemento);
}

// ✅ entries() - Necesitas índice y valor
for (const [indice, elemento] of datos.entries()) {
  console.log(`${indice}: ${elemento}`);
}

// ✅ keys() - Solo necesitas índices
for (const indice of datos.keys()) {
  console.log(`Índice: ${indice}`);
}

// ✅ values() - Solo necesitas valores (redundante con for...of)
for (const valor of datos.values()) {
  console.log(`Valor: ${valor}`);
}
```

## Casos de uso avanzados

### Iteradores con generadores

```javascript
function* iteradorPersonalizado(array) {
  for (let i = 0; i < array.length; i++) {
    yield { indice: i, valor: array[i] };
  }
}

const datos = ['x', 'y', 'z'];
for (const item of iteradorPersonalizado(datos)) {
  console.log(`${item.indice}: ${item.valor}`);
}
```

### Iteradores con condiciones

```javascript
function* iteradorCondicional(array, condicion) {
  for (const [indice, valor] of array.entries()) {
    if (condicion(valor)) {
      yield { indice, valor };
    }
  }
}

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const pares = iteradorCondicional(numeros, n => n % 2 === 0);

for (const par of pares) {
  console.log(`Par en índice ${par.indice}: ${par.valor}`);
}
```

### Iteradores con transformaciones

```javascript
function* iteradorTransformado(array, transformacion) {
  for (const [indice, valor] of array.entries()) {
    yield { indice, valor: transformacion(valor) };
  }
}

const palabras = ['hola', 'mundo', 'javascript'];
const mayusculas = iteradorTransformado(palabras, palabra => palabra.toUpperCase());

for (const item of mayusculas) {
  console.log(`${item.indice}: ${item.valor}`);
}
```

## Mejores prácticas

### 1. Elegir el iterador correcto

```javascript
const datos = ['a', 'b', 'c'];

// ✅ Necesitas índice y valor
for (const [indice, valor] of datos.entries()) {
  console.log(`${indice}: ${valor}`);
}

// ✅ Solo necesitas valores
for (const valor of datos) {
  console.log(valor);
}

// ✅ Solo necesitas índices
for (const indice of datos.keys()) {
  console.log(`Índice: ${indice}`);
```

### 2. Usar iteradores con métodos de array

```javascript
const numeros = [1, 2, 3, 4, 5];

// ✅ Combinar con métodos funcionales
const resultado = Array.from(numeros.entries())
  .filter(([indice, valor]) => indice % 2 === 0)
  .map(([indice, valor]) => valor * 2);

console.log(resultado); // [2, 6, 10]
```

### 3. Evitar mutaciones durante la iteración

```javascript
const array = [1, 2, 3, 4, 5];

// ❌ Modificar array durante iteración
for (const [indice, valor] of array.entries()) {
  if (valor % 2 === 0) {
    array.splice(indice, 1); // Puede causar problemas
  }
}

// ✅ Crear nuevo array
const sinPares = array.filter(valor => valor % 2 !== 0);
console.log(sinPares); // [1, 3, 5]
```

## Conclusión

Los iteradores de array en JavaScript proporcionan:

- **for...of**: La forma más común y legible de iterar
- **entries()**: Para obtener índice y valor simultáneamente
- **keys()**: Para trabajar solo con índices
- **values()**: Para trabajar solo con valores
- **Symbol.iterator**: Para implementaciones personalizadas

### Puntos clave a recordar

1. **for...of es la opción más común** para iteración simple
2. **entries() es útil** cuando necesitas tanto índice como valor
3. **keys() y values()** son especializados para casos específicos
4. **Symbol.iterator** permite implementaciones personalizadas
5. **Los iteradores son lazy** - solo se evalúan cuando se necesitan

Dominar estos iteradores te permitirá escribir código más eficiente y expresivo al trabajar con arrays en JavaScript.

### Fuentes

- [MDN Web Docs - Iteration protocols](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Iteration_protocols)
- [MDN Web Docs - for...of](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/for...of)
- [JavaScript.info - Iterables](https://javascript.info/iterable)
