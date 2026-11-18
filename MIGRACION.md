# Migración a Reactive Forms

## Resumen para la Pull Request

- **Modelo:** el objeto `game` y los `[(ngModel)]` desaparecen. Ahora el modelo es un `FormGroup` (`gameFormGroup`) declarado en `AppComponent`, con un `FormControl` por campo.
- **Plantilla:** `FormsModule` se sustituye por `ReactiveFormsModule`; el `<form>` usa `[formGroup]` y cada campo `formControlName`. Se conserva `#form="ngForm"`, que ahora es un `FormGroupDirective`.
- **Validaciones:** las reglas pasan de atributos HTML (`required`, `minlength`...) a `Validators` en TypeScript. Se conservan `novalidate`, el botón sin `[disabled]` y `GameService` / `Game` sin cambios.

## Qué cambia respecto a la versión Template-Driven

| Antes (template-driven) | Ahora (reactive) |
|---|---|
| `FormsModule` | `ReactiveFormsModule` |
| `[(ngModel)]="game.title"` + `name` | `formControlName="title"` |
| `#title="ngModel"` | `gameFormGroup.controls.title` |
| `#gameForm="ngForm"` (`NgForm`) | `[formGroup]` + `#form="ngForm"` (`FormGroupDirective`) |
| `required`, `minlength`... en el HTML | `Validators` en el TypeScript |
| `gameForm.invalid` / `submitted` | `gameFormGroup.invalid` / `form.submitted` |
| `gameForm.resetForm(this.game)` | `form.resetForm()` (con `nonNullable` vuelve a los valores iniciales) |
| `touched \|\| dirty \|\| submitted` | `touched \|\| form.submitted` (como pide el enunciado) |

## Decisiones

- Se conservan `maxLength(40)`, `max(100)` y `max(999)` de la versión anterior para no perder comportamiento, aunque la tabla del enunciado no los nombre.
- Se mantiene la edición (PUT) con `editingId` y `form.resetForm(game)`, para cargar los datos del videojuego en el formulario.
- Si el POST o el PUT fallan, se muestra un mensaje de error y se conservan los valores del formulario.
- No se añade `vercel.json` porque la aplicación no usa Router.

## Nota: ¿por qué la validación funciona en Vercel pero el POST puede fallar?

La validación es código Angular que se ejecuta en el navegador del visitante, así que funciona igual en Vercel que en local. El POST, en cambio, va a `http://localhost:3000/games`. En la web publicada, `localhost` es el propio ordenador del visitante, no el mío, y allí no hay ningún JSON Server. Vercel solo publica el frontend compilado, no mi API local. Para guardar datos desde la URL Preview haría falta una API pública con HTTPS y CORS permitido. Por eso el alta correcta se comprueba en local.

## Autoevaluación

**¿Dónde se encuentra ahora la fuente de verdad de los valores del formulario?**
En el `FormGroup` (`gameFormGroup`) del componente. Antes estaba en el objeto `game` enlazado con `ngModel`; ahora los valores se leen del propio formulario con `getRawValue()`.

**¿Por qué `formControlName` no necesita `[(ngModel)]`?**
Porque `formControlName` enlaza el campo HTML con el `FormControl` que tiene ese nombre dentro del `FormGroup`. Ese control ya guarda el valor, así que no hace falta otra propiedad ni un binding bidireccional.

**¿Qué diferencia hay entre `invalid`, `touched` y `dirty`?**
`invalid`: alguna regla de validación no se cumple. `touched`: el usuario entró en el campo y salió de él. `dirty`: el usuario ha cambiado el valor. Un campo puede ser `touched` sin ser `dirty` (entra y sale sin escribir).

**¿Qué aportan Git, la Pull Request y el despliegue Preview antes de fusionar `main`?**
Git deja `main` intacta mientras se trabaja en la rama. El despliegue Preview permite ver la versión migrada funcionando en una URL. La Pull Request permite revisar los cambios (Files changed) y comparar ambas versiones antes de decidir fusionar.

## Comparativa: `submitted` en NgForm y en FormGroupDirective

En los dos casos `submitted` pasa a `true` al enviar el formulario y vuelve a `false` con `resetForm()`. Lo que cambia es la directiva que lo ofrece: en template-driven es `NgForm`; con `[formGroup]` es `FormGroupDirective`, que también se exporta como `"ngForm"`. Por eso la referencia `#form="ngForm"` se mantiene y la condición `touched || form.submitted` funciona igual.