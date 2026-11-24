# Reglas de Animación y Movimiento: 06_motion_rules
> **Filosofía**: Animaciones con peso e inercia física real (inspiradas en el scroll de Jordan Gilroy y Webflow IX2). Cada animación acompaña al ojo del lector en lugar de distraerlo.

---

## 1. Configuración de Smooth Scroll (Lenis)

Para emular la sensación de inercia pesada y fluida:

```typescript
// Configuración recomendada de Lenis en React / Next.js
import Lenis from 'lenis';

const lenis = new Lenis({
  duration: 1.2,                // Duración del deslizamiento
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva exponencial suave
  direction: 'vertical',
  smoothWheel: true,
  touchMultiplier: 1.5,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```

---

## 2. Máscara de Revelado de Texto (Split-Text Animation)

Para titulares del Hero y títulos de sección:
* **Efecto:** El texto emerge desde abajo de una línea invisible (*overflow hidden*).
* **Parámetros:**
  * Estado inicial: `opacity: 0, transform: translateY(105%)`.
  * Estado final: `opacity: 1, transform: translateY(0%)`.
  * Duración: `0.7s`.
  * Curva de aceleración (*Easing*): `cubic-bezier(0.16, 1, 0.3, 1)` (arranque rápido y desaceleración elegante).
  * Desfase (*Stagger*): `0.08s` entre líneas sucesivas.

---

## 3. Despliegue de Acordeón In-Situ (Framer Motion)

Para abrir el caso de estudio dentro de la tarjeta Sticky sin provocar saltos bruscos:

```jsx
<motion.div
  initial={false}
  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
  className="overflow-hidden"
>
  {/* Contenido expandido del caso de estudio */}
</motion.div>
```

---

## 4. Regla de Accesibilidad (Prefers-Reduced-Motion)

Si el sistema del usuario tiene activada la preferencia de movimiento reducido:
* Desactivar la inercia de Lenis (`smoothWheel: false`).
* Reemplazar las translaciones de Split-Text por simples desvanecimientos instantáneos de opacidad (`opacity 0 -> 1`).
