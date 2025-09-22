---
title: "Estructuras de control en JavaScript"
description: "Domina las estructuras de control en JavaScript: condicionales, bucles y manejo de flujo para escribir código más eficiente y legible."
date: 2023-08-15
category: "Tech"
seo:
  title: "Estructuras de control en JavaScript: Condicionales y Bucles"
  description: "Aprende sobre las estructuras de control en JavaScript: if/else, switch, for, while, y más. Guía completa con ejemplos prácticos."
  keywords: ["JavaScript", "estructuras de control", "condicionales", "bucles", "if", "switch", "for", "while"]
---

Las estructuras de control son fundamentales en cualquier lenguaje de programación. En JavaScript, nos permiten controlar el flujo de ejecución de nuestro código, tomar decisiones y repetir operaciones. En este artículo exploraremos las principales estructuras de control y cómo utilizarlas efectivamente.

## Estructuras condicionales

### if/else

La estructura condicional más básica y utilizada en JavaScript.

```javascript
const edad = 18;

if (edad >= 18) {
  console.log('Eres mayor de edad');
} else {
  console.log('Eres menor de edad');
}
```

### if/else if/else

Para múltiples condiciones:

```javascript
const nota = 85;

if (nota >= 90) {
  console.log('Excelente (A)');
} else if (nota >= 80) {
  console.log('Bueno (B)');
} else if (nota >= 70) {
  console.log('Regular (C)');
} else {
  console.log('Necesitas mejorar (D)');
}
```

### Operador ternario

Una forma concisa de escribir condicionales simples:

```javascript
const edad = 20;
const mensaje = edad >= 18 ? 'Mayor de edad' : 'Menor de edad';
console.log(mensaje);

// Operador ternario anidado
const calificacion = 85;
const resultado = calificacion >= 90 ? 'A' : 
                 calificacion >= 80 ? 'B' : 
                 calificacion >= 70 ? 'C' : 'D';
```

### Operador lógico AND (&&)

Útil para ejecutar código condicionalmente:

```javascript
const usuario = { nombre: 'Juan', autenticado: true };

// Solo ejecuta si usuario existe y está autenticado
usuario && usuario.autenticado && console.log(`Hola ${usuario.nombre}`);
```

### Operador lógico OR (||)

Para valores por defecto:

```javascript
const nombre = null;
const nombrePorDefecto = nombre || 'Usuario anónimo';
console.log(nombrePorDefecto); // "Usuario anónimo"

// Con valores falsy
const configuracion = {
  puerto: process.env.PORT || 3000,
  baseDatos: process.env.DB_URL || 'localhost:5432'
};
```

### Nullish coalescing (??)

Para manejar valores null y undefined específicamente:

```javascript
const valor = null;
const valorPorDefecto = valor ?? 'Valor por defecto';
console.log(valorPorDefecto); // "Valor por defecto"

// Diferencia con ||
const cero = 0;
console.log(cero || 'fallback'); // "fallback"
console.log(cero ?? 'fallback'); // 0
```

## Estructura switch

Ideal para múltiples condiciones basadas en el mismo valor:

```javascript
const dia = 'lunes';

switch (dia) {
  case 'lunes':
    console.log('Inicio de semana');
    break;
  case 'viernes':
    console.log('¡Fin de semana!');
    break;
  case 'sabado':
  case 'domingo':
    console.log('Día de descanso');
    break;
  default:
    console.log('Día laboral');
}
```

### Switch con múltiples casos

```javascript
const mes = 3;

switch (mes) {
  case 12:
  case 1:
  case 2:
    console.log('Invierno');
    break;
  case 3:
  case 4:
  case 5:
    console.log('Primavera');
    break;
  case 6:
  case 7:
  case 8:
    console.log('Verano');
    break;
  case 9:
  case 10:
  case 11:
    console.log('Otoño');
    break;
  default:
    console.log('Mes inválido');
}
```

### Switch con expresiones

```javascript
const numero = 15;

switch (true) {
  case numero < 10:
    console.log('Número pequeño');
    break;
  case numero < 20:
    console.log('Número mediano');
    break;
  case numero < 50:
    console.log('Número grande');
    break;
  default:
    console.log('Número muy grande');
}
```

## Bucles

### for tradicional

```javascript
// Bucle básico
for (let i = 0; i < 5; i++) {
  console.log(`Iteración ${i}`);
}

// Bucle con array
const frutas = ['manzana', 'banana', 'naranja'];
for (let i = 0; i < frutas.length; i++) {
  console.log(frutas[i]);
}
```

### for...of

Para iterar sobre elementos de arrays y objetos iterables:

```javascript
const colores = ['rojo', 'verde', 'azul'];

for (const color of colores) {
  console.log(color);
}

// Con strings
const texto = 'Hola';
for (const letra of texto) {
  console.log(letra);
}

// Con Map y Set
const mapa = new Map([['a', 1], ['b', 2]]);
for (const [clave, valor] of mapa) {
  console.log(`${clave}: ${valor}`);
}
```

### for...in

Para iterar sobre propiedades de objetos:

```javascript
const persona = {
  nombre: 'Juan',
  edad: 30,
  ciudad: 'Madrid'
};

for (const propiedad in persona) {
  console.log(`${propiedad}: ${persona[propiedad]}`);
}

// Con arrays (no recomendado)
const array = ['a', 'b', 'c'];
for (const indice in array) {
  console.log(`${indice}: ${array[indice]}`);
}
```

### while

Ejecuta mientras la condición sea verdadera:

```javascript
let contador = 0;
while (contador < 5) {
  console.log(`Contador: ${contador}`);
  contador++;
}
```

### do...while

Ejecuta al menos una vez, luego verifica la condición:

```javascript
let numero;
do {
  numero = Math.floor(Math.random() * 10);
  console.log(`Número generado: ${numero}`);
} while (numero !== 7);
```

## Control de flujo en bucles

### break

Sale completamente del bucle:

```javascript
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (const numero of numeros) {
  if (numero === 5) {
    console.log('Encontrado el 5, saliendo...');
    break;
  }
  console.log(numero);
}
```

### continue

Salta a la siguiente iteración:

```javascript
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (const numero of numeros) {
  if (numero % 2 === 0) {
    continue; // Salta números pares
  }
  console.log(numero); // Solo imprime impares
}
```

### Etiquetas (labels)

Para controlar bucles anidados:

```javascript
outer: for (let i = 0; i < 3; i++) {
  inner: for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break outer; // Sale del bucle exterior
    }
    console.log(`i: ${i}, j: ${j}`);
  }
}
```

## Métodos de array para iteración

### forEach

Ejecuta una función para cada elemento:

```javascript
const numeros = [1, 2, 3, 4, 5];

numeros.forEach((numero, indice) => {
  console.log(`Elemento ${indice}: ${numero}`);
});
```

### map

Crea un nuevo array con los resultados:

```javascript
const numeros = [1, 2, 3, 4, 5];
const cuadrados = numeros.map(numero => numero * numero);
console.log(cuadrados); // [1, 4, 9, 16, 25]
```

### filter

Crea un nuevo array con elementos que cumplen una condición:

```javascript
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const pares = numeros.filter(numero => numero % 2 === 0);
console.log(pares); // [2, 4, 6, 8, 10]
```

### find

Encuentra el primer elemento que cumple una condición:

```javascript
const usuarios = [
  { id: 1, nombre: 'Juan', activo: true },
  { id: 2, nombre: 'María', activo: false },
  { id: 3, nombre: 'Pedro', activo: true }
];

const usuarioActivo = usuarios.find(usuario => usuario.activo);
console.log(usuarioActivo); // { id: 1, nombre: 'Juan', activo: true }
```

## Estructuras de control avanzadas

### try/catch/finally

Para manejo de errores:

```javascript
function dividir(a, b) {
  try {
    if (b === 0) {
      throw new Error('División por cero');
    }
    return a / b;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  } finally {
    console.log('Operación completada');
  }
}
```

### throw

Para lanzar errores personalizados:

```javascript
function validarEdad(edad) {
  if (typeof edad !== 'number') {
    throw new TypeError('La edad debe ser un número');
  }
  if (edad < 0) {
    throw new RangeError('La edad no puede ser negativa');
  }
  return true;
}
```

## Patrones comunes

### Validación de entrada

```javascript
function procesarUsuario(usuario) {
  if (!usuario) {
    throw new Error('Usuario requerido');
  }
  
  if (!usuario.nombre) {
    throw new Error('Nombre requerido');
  }
  
  if (!usuario.email || !usuario.email.includes('@')) {
    throw new Error('Email válido requerido');
  }
  
  return usuario;
}
```

### Búsqueda con early return

```javascript
function buscarUsuario(usuarios, id) {
  for (const usuario of usuarios) {
    if (usuario.id === id) {
      return usuario; // Early return
    }
  }
  return null; // No encontrado
}
```

### Validación múltiple

```javascript
function validarFormulario(datos) {
  const errores = [];
  
  if (!datos.nombre) errores.push('Nombre requerido');
  if (!datos.email) errores.push('Email requerido');
  if (datos.edad < 18) errores.push('Debe ser mayor de edad');
  
  if (errores.length > 0) {
    throw new Error(`Errores de validación: ${errores.join(', ')}`);
  }
  
  return true;
}
```

## Mejores prácticas

### 1. Usar const y let en lugar de var

```javascript
// ❌ Evitar
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Imprime 3, 3, 3
}

// ✅ Correcto
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Imprime 0, 1, 2
}
```

### 2. Preferir métodos de array sobre bucles manuales

```javascript
// ❌ Bucle manual
const numeros = [1, 2, 3, 4, 5];
const cuadrados = [];
for (let i = 0; i < numeros.length; i++) {
  cuadrados.push(numeros[i] * numeros[i]);
}

// ✅ Método de array
const cuadrados = numeros.map(n => n * n);
```

### 3. Usar early returns para reducir anidación

```javascript
// ❌ Anidado
function procesarUsuario(usuario) {
  if (usuario) {
    if (usuario.activo) {
      if (usuario.permisos) {
        return procesarPermisos(usuario.permisos);
      }
    }
  }
  return null;
}

// ✅ Early returns
function procesarUsuario(usuario) {
  if (!usuario) return null;
  if (!usuario.activo) return null;
  if (!usuario.permisos) return null;
  
  return procesarPermisos(usuario.permisos);
}
```

### 4. Usar switch para múltiples condiciones simples

```javascript
// ❌ Múltiples if/else
function obtenerDiaSemana(numero) {
  if (numero === 1) return 'Lunes';
  else if (numero === 2) return 'Martes';
  else if (numero === 3) return 'Miércoles';
  // ...
  else return 'Día inválido';
}

// ✅ Switch
function obtenerDiaSemana(numero) {
  switch (numero) {
    case 1: return 'Lunes';
    case 2: return 'Martes';
    case 3: return 'Miércoles';
    // ...
    default: return 'Día inválido';
  }
}
```

## Casos de uso avanzados

### Bucle con async/await

```javascript
async function procesarElementos(elementos) {
  for (const elemento of elementos) {
    try {
      const resultado = await procesarElemento(elemento);
      console.log('Procesado:', resultado);
    } catch (error) {
      console.error('Error procesando:', error);
    }
  }
}
```

### Bucle con Promise.all

```javascript
async function procesarElementosParalelo(elementos) {
  try {
    const promesas = elementos.map(elemento => procesarElemento(elemento));
    const resultados = await Promise.all(promesas);
    return resultados;
  } catch (error) {
    console.error('Error en procesamiento paralelo:', error);
  }
}
```

### Generadores con bucles

```javascript
function* generadorNumeros() {
  let i = 0;
  while (i < 5) {
    yield i++;
  }
}

for (const numero of generadorNumeros()) {
  console.log(numero);
}
```

## Conclusión

Las estructuras de control son la base de la programación en JavaScript:

- **Condicionales**: Para tomar decisiones basadas en condiciones
- **Bucles**: Para repetir operaciones de manera eficiente
- **Control de flujo**: Para manejar la ejecución del código
- **Métodos de array**: Para operaciones funcionales más elegantes

### Puntos clave a recordar

1. **Usa const/let** en lugar de var
2. **Preferir métodos de array** sobre bucles manuales cuando sea posible
3. **Early returns** para reducir anidación
4. **Manejo de errores** con try/catch
5. **Async/await** para operaciones asíncronas

Dominar estas estructuras te permitirá escribir código más limpio, eficiente y mantenible.

### Fuentes

- [MDN Web Docs - Control flow and error handling](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- [MDN Web Docs - Loops and iteration](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Loops_and_iteration)
- [JavaScript.info - Conditional operators](https://javascript.info/ifelse)
