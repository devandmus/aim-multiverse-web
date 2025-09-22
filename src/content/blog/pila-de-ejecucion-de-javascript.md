---
title: "Pila de ejecución de JavaScript"
description: "Explora cómo la pila de ejecución y el bucle de eventos controlan el flujo de ejecución y manejan la asincronía en JavaScript."
date: 2023-08-25
category: "Tech"
seo:
  title: "Pila de ejecución de JavaScript: Call Stack y Event Loop"
  description: "Aprende sobre la pila de ejecución y el bucle de eventos en JavaScript. Entiende cómo funciona el motor de JavaScript internamente."
  keywords: ["JavaScript", "pila de ejecución", "call stack", "event loop", "asincronía", "motor JavaScript"]
---

Si estás familiarizado con JavaScript, probablemente hayas oído hablar de la pila de ejecución y el bucle de eventos. Estos son dos componentes clave del motor de JavaScript que se utilizan para controlar el flujo de ejecución del código y manejar la asincronía.

## ¿Qué es la pila de ejecución?

La pila de ejecución (Call Stack) en JavaScript es una pila LIFO (Last In, First Out) que se utiliza para almacenar y controlar el contexto de ejecución de una función. Cuando se llama a una función, su contexto de ejecución se añade a la pila de ejecución. A medida que se ejecuta el código, se van añadiendo elementos a la pila y eliminando elementos de la parte superior de la misma.

### Características de la pila de ejecución

- **LIFO**: El último elemento que entra es el primero que sale
- **Síncrona**: Solo puede ejecutar una función a la vez
- **Contexto de ejecución**: Cada función tiene su propio contexto con variables locales
- **Límite de tamaño**: Tiene un límite máximo (stack overflow)

## Ejemplo de pila de ejecución

Para entender mejor cómo funciona la pila de ejecución, veamos un ejemplo. Supongamos que tenemos el siguiente código:

```javascript
function a() {
  console.log('Función A');
  b();
}

function b() {
  console.log('Función B');
  c();
}

function c() {
  console.log('Función C');
}

a();
```

### Paso a paso de la ejecución:

1. **Llamada a `a()`**: Se añade a la pila
   ```
   Pila: [a()]
   ```

2. **Dentro de `a()`, llamada a `b()`**: Se añade `b()` encima de `a()`
   ```
   Pila: [b(), a()]
   ```

3. **Dentro de `b()`, llamada a `c()`**: Se añade `c()` encima de `b()`
   ```
   Pila: [c(), b(), a()]
   ```

4. **`c()` termina**: Se elimina de la pila
   ```
   Pila: [b(), a()]
   ```

5. **`b()` termina**: Se elimina de la pila
   ```
   Pila: [a()]
   ```

6. **`a()` termina**: Se elimina de la pila
   ```
   Pila: []
   ```

### Ejemplo más detallado con console.log

```javascript
function a() {
  console.log('Función A - inicio');
  b();
  console.log('Función A - después de b()');
}

function b() {
  console.log('Función B - inicio');
  c();
  console.log('Función B - después de c()');
}

function c() {
  console.log('Función C - ejecutándose');
}

console.log('Inicio del programa');
a();
console.log('Fin del programa');
```

**Salida esperada:**
```
Inicio del programa
Función A - inicio
Función B - inicio
Función C - ejecutándose
Función B - después de c()
Función A - después de b()
Fin del programa
```

## ¿Qué es el bucle de eventos?

El bucle de eventos (Event Loop) es un mecanismo que se utiliza en JavaScript para manejar la asincronía. En lugar de esperar a que una tarea asíncrona se complete antes de continuar con otra tarea, el bucle de eventos permite que el código siga ejecutándose mientras espera que la tarea asíncrona se complete.

### Componentes del bucle de eventos

1. **Call Stack**: Pila de ejecución síncrona
2. **Web APIs**: APIs del navegador (setTimeout, DOM, etc.)
3. **Task Queue**: Cola de tareas (macrotasks)
4. **Microtask Queue**: Cola de microtareas (promises, queueMicrotask)

### Flujo del bucle de eventos

```javascript
console.log('1. Inicio');

setTimeout(() => {
  console.log('4. setTimeout');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Promise');
});

console.log('2. Fin');
```

**Salida esperada:**
```
1. Inicio
2. Fin
3. Promise
4. setTimeout
```

## Ejemplo de bucle de eventos

Para entender mejor cómo funciona el bucle de eventos, veamos otro ejemplo:

```javascript
console.log('Inicio');

setTimeout(function() {
  console.log('Temporizador');
}, 0);

console.log('Fin');
```

### Explicación paso a paso:

1. **`console.log('Inicio')`**: Se ejecuta inmediatamente
2. **`setTimeout()`**: Se envía a Web APIs, no bloquea la ejecución
3. **`console.log('Fin')`**: Se ejecuta inmediatamente
4. **Callback del setTimeout**: Se mueve a la Task Queue
5. **Event Loop**: Mueve el callback a la Call Stack cuando está vacía

## Ejemplos adicionales

### Ejemplo 1: Botón de carga

```javascript
button.addEventListener('click', function() {
  console.log('Click detectado');
  
  // Simular carga de imagen
  setTimeout(() => {
    img.src = 'https://example.com/image.jpg';
    console.log('Imagen cargada');
  }, 1000);
  
  console.log('Evento registrado');
});
```

**Flujo:**
1. Se registra el evento click
2. Se ejecuta el callback cuando se hace click
3. `setTimeout` se envía a Web APIs
4. Se ejecuta el resto del código
5. Después de 1 segundo, el callback se ejecuta

### Ejemplo 2: Animación con requestAnimationFrame

```javascript
function animate() {
  console.log('Frame de animación');
  
  element.style.left = '0';
  
  requestAnimationFrame(() => {
    element.style.left = '100%';
    console.log('Animación completada');
  });
  
  console.log('Animación iniciada');
}

animate();
```

### Ejemplo 3: Promesas y microtareas

```javascript
console.log('1. Inicio');

setTimeout(() => console.log('4. setTimeout'), 0);

Promise.resolve()
  .then(() => console.log('3. Promise 1'))
  .then(() => console.log('5. Promise 2'));

queueMicrotask(() => console.log('2. Microtask'));

console.log('6. Fin');
```

**Salida esperada:**
```
1. Inicio
6. Fin
2. Microtask
3. Promise 1
5. Promise 2
4. setTimeout
```

## Diferencias entre Task Queue y Microtask Queue

### Task Queue (Macrotasks)
- `setTimeout`, `setInterval`
- `setImmediate` (Node.js)
- Eventos DOM
- Callbacks de I/O

### Microtask Queue
- `Promise.then()`, `Promise.catch()`, `Promise.finally()`
- `queueMicrotask()`
- `MutationObserver`

### Prioridad de ejecución

1. **Call Stack** (siempre primero)
2. **Microtask Queue** (se vacía completamente)
3. **Task Queue** (un elemento por vez)

## Ejemplo avanzado: Stack Overflow

```javascript
function recursiva() {
  console.log('Llamada recursiva');
  recursiva(); // Llamada infinita
}

// Esto causará un stack overflow
// recursiva();
```

### Prevención del stack overflow

```javascript
function recursivaSegura(contador = 0) {
  if (contador > 1000) {
    console.log('Límite alcanzado');
    return;
  }
  
  console.log(`Llamada ${contador}`);
  
  // Usar setTimeout para liberar el stack
  setTimeout(() => {
    recursivaSegura(contador + 1);
  }, 0);
}

recursivaSegura();
```

## Debugging de la pila de ejecución

### Usando console.trace()

```javascript
function funcionA() {
  console.trace('Desde función A');
  funcionB();
}

function funcionB() {
  console.trace('Desde función B');
  funcionC();
}

function funcionC() {
  console.trace('Desde función C');
}

funcionA();
```

### Usando el debugger

```javascript
function debugEjemplo() {
  debugger; // Pausa la ejecución aquí
  console.log('Después del debugger');
  
  setTimeout(() => {
    debugger; // Pausa aquí también
    console.log('En setTimeout');
  }, 1000);
}
```

## Mejores prácticas

### 1. Evitar bloqueos en el Call Stack

```javascript
// ❌ Bloquea el Call Stack
function procesarGrandesDatos(datos) {
  for (let i = 0; i < datos.length; i++) {
    // Procesamiento pesado
    procesarItem(datos[i]);
  }
}

// ✅ Usar setTimeout para liberar el stack
function procesarGrandesDatosAsync(datos, indice = 0) {
  if (indice >= datos.length) return;
  
  procesarItem(datos[indice]);
  
  setTimeout(() => {
    procesarGrandesDatosAsync(datos, indice + 1);
  }, 0);
}
```

### 2. Manejar errores en operaciones asíncronas

```javascript
// ❌ Error no capturado
setTimeout(() => {
  throw new Error('Error asíncrono');
}, 1000);

// ✅ Error manejado
setTimeout(() => {
  try {
    // Código que puede fallar
    operacionRiesgosa();
  } catch (error) {
    console.error('Error capturado:', error);
  }
}, 1000);
```

### 3. Usar Promise.all para paralelización

```javascript
// ❌ Secuencial
async function procesarSecuencial() {
  const resultado1 = await operacion1();
  const resultado2 = await operacion2();
  const resultado3 = await operacion3();
  return [resultado1, resultado2, resultado3];
}

// ✅ Paralelo
async function procesarParalelo() {
  const [resultado1, resultado2, resultado3] = await Promise.all([
    operacion1(),
    operacion2(),
    operacion3()
  ]);
  return [resultado1, resultado2, resultado3];
}
```

## Herramientas de desarrollo

### Chrome DevTools

1. **Sources tab**: Para ver el Call Stack
2. **Performance tab**: Para analizar el Event Loop
3. **Console**: Para usar `console.trace()`

### Node.js debugging

```bash
# Ejecutar con debugging
node --inspect script.js

# Usar Chrome DevTools
chrome://inspect
```

## Conclusión

La pila de ejecución y el bucle de eventos son fundamentales para entender cómo funciona JavaScript:

- **Call Stack**: Maneja la ejecución síncrona de funciones
- **Event Loop**: Coordina la ejecución asíncrona
- **Web APIs**: Proporcionan funcionalidades asíncronas
- **Queues**: Organizan las tareas asíncronas por prioridad

### Puntos clave a recordar

1. **JavaScript es single-threaded** pero puede manejar asincronía
2. **El Call Stack es síncrono** y tiene un límite
3. **El Event Loop coordina** la ejecución asíncrona
4. **Las microtareas tienen prioridad** sobre las macrotareas
5. **Usa herramientas de debugging** para entender el flujo

Entender estos conceptos te ayudará a escribir código más eficiente y a debuggear problemas de asincronía más efectivamente.

### Fuentes

- [MDN Web Docs - Event Loop](https://developer.mozilla.org/es/docs/Web/JavaScript/EventLoop)
- [JavaScript.info - Event Loop](https://javascript.info/event-loop)
- [Philip Roberts - What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
