---
title: "Trabajo asíncrono en JavaScript: Promesas y async/await"
description: "Descubre cómo manejar operaciones asíncronas en JavaScript utilizando promesas y async/await para mejorar el rendimiento de tu código."
date: 2023-09-05
category: "Tech"
seo:
  title: "Trabajo asíncrono en JavaScript: Promesas y async/await"
  description: "Aprende a manejar operaciones asíncronas en JavaScript con promesas y async/await. Guía completa con ejemplos prácticos."
  keywords: ["JavaScript", "promesas", "async/await", "asincronía", "programación"]
---

Como desarrollador en JavaScript, es probable que hayas escuchado acerca de las promesas y el uso de async/await para manejar su flujo. En este artículo, te explicaré qué son las promesas, cómo se usan y cómo async/await puede ayudar a manejar el flujo de trabajo.

## ¿Qué son las promesas?

Una promesa en JavaScript es un objeto que representa un valor que puede no estar disponible todavía, pero que se espera que lo esté en algún momento. Las promesas se utilizan para manejar operaciones asíncronas que toman tiempo en completarse, como hacer una solicitud HTTP o leer un archivo.

### Estados de una promesa

Las promesas tienen tres estados posibles:

1. **Pending (Pendiente)**: Estado inicial, ni cumplida ni rechazada
2. **Fulfilled (Cumplida)**: La operación se completó exitosamente
3. **Rejected (Rechazada)**: La operación falló

### Creando una promesa

Para crear una promesa en JavaScript, utilizamos el constructor `Promise`. Este constructor toma una función como argumento, que a su vez toma dos argumentos: `resolve` y `reject`.

```javascript
const promise = new Promise((resolve, reject) => {
  // Simulamos una operación asíncrona
  setTimeout(() => {
    const success = Math.random() > 0.5;
    if (success) {
      resolve('Operación exitosa');
    } else {
      reject('Error en la operación');
    }
  }, 1000);
});
```

### Consumiendo una promesa

Para consumir una promesa, podemos usar los métodos `then` y `catch`:

```javascript
promise
  .then((result) => {
    console.log('Éxito:', result);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

### Encadenando promesas

Una de las ventajas de las promesas es que se pueden encadenar:

```javascript
fetch('/api/users')
  .then(response => response.json())
  .then(data => {
    console.log('Usuarios:', data);
    return fetch(`/api/users/${data[0].id}/posts`);
  })
  .then(response => response.json())
  .then(posts => console.log('Posts:', posts))
  .catch(error => console.error('Error:', error));
```

## Async/Await: Una sintaxis más limpia

`async/await` es una forma de manejar promesas en JavaScript que se introdujo en ES2017. Es una sintaxis más limpia y fácil de leer que el encadenamiento de `.then()`.

### Función async

Una función `async` siempre devuelve una promesa:

```javascript
async function miFuncion() {
  return 'Hola mundo';
}

// Es equivalente a:
function miFuncion() {
  return Promise.resolve('Hola mundo');
}
```

### Usando await

La palabra clave `await` solo puede usarse dentro de funciones `async`:

```javascript
async function obtenerDatos() {
  try {
    const response = await fetch('/api/datos');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### Convirtiendo el ejemplo anterior con async/await

```javascript
async function obtenerUsuariosYPosts() {
  try {
    const usersResponse = await fetch('/api/users');
    const users = await usersResponse.json();
    
    const postsResponse = await fetch(`/api/users/${users[0].id}/posts`);
    const posts = await postsResponse.json();
    
    console.log('Usuarios:', users);
    console.log('Posts:', posts);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

## Comparación: Promesas vs Async/Await

### Con promesas (método tradicional)

```javascript
function procesarDatos() {
  return fetch('/api/datos')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la respuesta');
      }
      return response.json();
    })
    .then(data => {
      return procesarInformacion(data);
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}
```

### Con async/await (método moderno)

```javascript
async function procesarDatos() {
  try {
    const response = await fetch('/api/datos');
    
    if (!response.ok) {
      throw new Error('Error en la respuesta');
    }
    
    const data = await response.json();
    return procesarInformacion(data);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

## Buenas prácticas

### 1. Manejo de errores

Siempre envuelve tu código `await` en bloques `try/catch`:

```javascript
async function operacionSegura() {
  try {
    const resultado = await operacionAsincrona();
    return resultado;
  } catch (error) {
    console.error('Error capturado:', error);
    // Manejar el error apropiadamente
    throw error; // Re-lanzar si es necesario
  }
}
```

### 2. Paralelización cuando sea posible

```javascript
// ❌ Secuencial (lento)
async function lento() {
  const user1 = await fetch('/api/user/1');
  const user2 = await fetch('/api/user/2');
  const user3 = await fetch('/api/user/3');
}

// ✅ Paralelo (rápido)
async function rapido() {
  const [user1, user2, user3] = await Promise.all([
    fetch('/api/user/1'),
    fetch('/api/user/2'),
    fetch('/api/user/3')
  ]);
}
```

### 3. No usar async/await innecesariamente

```javascript
// ❌ No necesario
async function suma(a, b) {
  return a + b;
}

// ✅ Mejor
function suma(a, b) {
  return a + b;
}
```

## Casos de uso comunes

### 1. Peticiones HTTP

```javascript
async function obtenerUsuario(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    throw error;
  }
}
```

### 2. Operaciones de archivos (Node.js)

```javascript
const fs = require('fs').promises;

async function leerArchivo(ruta) {
  try {
    const contenido = await fs.readFile(ruta, 'utf8');
    return contenido;
  } catch (error) {
    console.error('Error leyendo archivo:', error);
    throw error;
  }
}
```

### 3. Timeouts y delays

```javascript
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function procesoConDelay() {
  console.log('Iniciando proceso...');
  await delay(2000);
  console.log('Proceso completado');
}
```

## Errores comunes que evitar

### 1. Olvidar await

```javascript
// ❌ Error: resultado es una promesa, no el valor
async function mal() {
  const resultado = fetch('/api/datos');
  console.log(resultado); // [object Promise]
}

// ✅ Correcto
async function bien() {
  const resultado = await fetch('/api/datos');
  console.log(resultado); // Response object
}
```

### 2. No manejar errores

```javascript
// ❌ Error no manejado
async function sinManejoDeErrores() {
  const response = await fetch('/api/datos-inexistentes');
  const data = await response.json();
}

// ✅ Con manejo de errores
async function conManejoDeErrores() {
  try {
    const response = await fetch('/api/datos-inexistentes');
    const data = await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### 3. Usar async/await en bucles innecesariamente

```javascript
// ❌ Secuencial innecesario
async function procesarArray(array) {
  const resultados = [];
  for (const item of array) {
    const resultado = await procesarItem(item);
    resultados.push(resultado);
  }
  return resultados;
}

// ✅ Paralelo cuando sea posible
async function procesarArrayParalelo(array) {
  const promesas = array.map(item => procesarItem(item));
  return await Promise.all(promesas);
}
```

## Conclusión

Las promesas y async/await son herramientas fundamentales para manejar operaciones asíncronas en JavaScript:

- **Promesas**: Proporcionan una forma estructurada de manejar operaciones asíncronas
- **Async/await**: Ofrece una sintaxis más limpia y legible para trabajar con promesas
- **Ambas son complementarias**: No son mutuamente excluyentes

### Cuándo usar cada una

- **Usa promesas** cuando necesites control granular sobre el flujo asíncrono
- **Usa async/await** para código más legible y mantenible
- **Combina ambas** según las necesidades específicas de tu aplicación

Recuerda siempre manejar los errores apropiadamente y considerar la paralelización cuando sea posible para optimizar el rendimiento.

Si quieres profundizar más sobre el tema, te recomiendo revisar la documentación oficial de MDN y practicar con ejemplos reales en tus proyectos.

### Fuentes

- [MDN Web Docs - Promise](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN Web Docs - async function](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function)
- [JavaScript.info - Async/await](https://javascript.info/async-await)
