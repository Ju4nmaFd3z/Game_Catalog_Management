# Respuestas a las cuestiones finales

**1. ¿Qué proporciona FormsModule?**
Las herramientas de los formularios Template-Driven: `ngModel`, `ngForm`, `ngSubmit` y las validaciones del HTML como `required`, `minlength` o `max`.

**2. ¿Qué función tiene [(ngModel)]?**
Enlaza un campo del formulario con una propiedad del componente en los dos sentidos: si cambia la propiedad se actualiza el campo, y si el usuario escribe se actualiza la propiedad.

**3. ¿Por qué es necesario utilizar name?**
Porque `ngModel` dentro de un formulario usa el atributo `name` para registrar el control en el formulario. Sin `name`, Angular da error.

**4. ¿Qué representa #gameForm="ngForm"?**
Una referencia al objeto `NgForm` del formulario. Con ella se puede consultar su estado completo (`valid`, `dirty`...) y usar métodos como `resetForm()`.

**5. ¿Qué representa #title="ngModel"?**
Una referencia al control de ese campo. Con ella se consulta su estado (`valid`, `touched`, `errors`...) para mostrar mensajes y cambiar su aspecto.

**6. ¿Qué diferencia existe entre valid e invalid?**
`valid` significa que el campo cumple todas las reglas de validación. `invalid` significa que tiene al menos un error.

**7. ¿Qué diferencia existe entre pristine y dirty?**
`pristine` significa que el usuario todavía no ha modificado el campo. `dirty` significa que ya ha cambiado su contenido.

**8. ¿Qué diferencia existe entre untouched y touched?**
`untouched` significa que el usuario todavía no ha entrado y salido del campo. `touched` significa que ya ha interactuado con él y lo ha abandonado.

**9. ¿Qué información contiene errors?**
Un objeto con los errores de validación activos, por ejemplo `{ required: true }` o `{ minlength: {...} }`. Si el campo es válido, vale `null`.

**10. ¿Por qué utilizamos normalmente invalid && (dirty || touched) para mostrar errores?**
Para que no salgan errores nada más abrir el formulario. Solo se muestran cuando el campo es inválido y el usuario ya ha interactuado con él. En esta versión también se muestran al pulsar el botón de guardar (`gameForm.submitted`), para avisar de todos los campos pendientes.

**11. ¿Por qué los mensajes desaparecen automáticamente al corregir un dato?**
Porque Angular recalcula la validación cada vez que cambia el valor. Cuando `errors` cambia, el `@if` se vuelve a evaluar y el mensaje deja de mostrarse.

**12. ¿Por qué el botón puede habilitarse automáticamente cuando cambia el formulario?**
Porque, si se enlaza con `[disabled]="gameForm.invalid"`, Angular recalcula `invalid` cada vez que cambia el formulario y actualiza el botón sin que tengamos que hacer nada. En esta versión no se bloquea el botón: se añade `novalidate` al formulario, los errores aparecen también al enviar y `saveGame()` filtra con `if (form.invalid) return` para no guardar datos inválidos.

**13. ¿Qué ventaja tiene utilizar ngSubmit frente a escuchar únicamente el click de un botón?**
`ngSubmit` se lanza al enviar el formulario, también cuando se pulsa Enter en un campo, y evita que la página se recargue. Con `click` solo se detecta el clic en ese botón.

**14. ¿Qué operación HTTP se utiliza para crear un videojuego?**
`POST /games`.

**15. ¿Qué operación se utiliza para actualizarlo?**
`PUT /games/:id`.

**16. ¿Por qué utilizamos gameForm.resetForm() después de guardar?**
Porque vaciar solo el objeto no siempre devuelve los controles a `pristine` y `untouched`. Con `resetForm()` se reinicia también el estado del formulario y no aparecen errores al limpiarlo.

**17. ¿Qué diferencia existe entre la validación reactiva utilizada en esta actividad y los Reactive Forms de Angular?**
En esta actividad el formulario es Template-Driven: `ngModel` mantiene el estado, los validadores se declaran en el HTML y la plantilla reacciona a ese estado. En Reactive Forms el modelo se crea de forma explícita en TypeScript con `FormControl` y `FormGroup`, y los validadores se configuran allí.
