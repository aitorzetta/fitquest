# FitQuest — Sistema de personaje y equipamiento

## Objetivo
El personaje es una recompensa visual. El equipo, el poder y la rareza no modifican calorías, proteína, peso, objetivos ni XP base.

## Personajes
- Aitor y Laura tienen avatar independiente.
- El avatar base siempre lleva ropa de novato neutra.
- Los slots pueden estar vacíos sin que el personaje quede “sin vestir”.
- El look final será fantasía MMORPG estilizada y reconocible a partir de sus fotos.

## Slots
1. Cabeza
2. Armadura
3. Arma
4. Botas
5. Accesorio
6. Compañero

## Progresión inicial
- Inicio: Cuchara +1.
- Primer día registrado: Camiseta del Respawn.
- 3 días registrados: Gorra del Tutorial.
- 5.000 pasos en un día: Zapatillas del Primer Paso.
- Primer día cumpliendo proteína: Botella del Novato.
- Primera Raid: Pollo del Tutorial.

## Rarezas
- Común
- Raro
- Épico
- Legendario

## Cofres de Raid
Una Raid otorga +100 XP y 1 cofre sin abrir.

Probabilidades:
- Común: 55%
- Raro: 30%
- Épico: 12%
- Legendario: 3%

No salen duplicados mientras queden piezas de Raid sin descubrir.

## Piezas especiales
No salen en cofres:
- Boss I: Corona del Boss Caído.
- Racha x7: Armadura de la Racha x7.
- 10 entrenamientos: Mandoble del Entreno.
- 20.000 pasos: Botas Sin Frenos.
- 5 días cumpliendo sueño: Amuleto del Sueño Profundo.
- 5 Raids: Zorro de las Cinco Raids.

## Poder cosmético
Solo mide el equipo equipado y no cambia objetivos ni XP.

- 0–9: Novato
- 10–29: Aventurero
- 30–59: Veterano
- 60–99: Élite
- 100+: Legendario

## Arquitectura gráfica
Rutas:
- `assets/characters/aitor/base.webp`
- `assets/characters/laura/base.webp`
- `assets/gear/aitor/<item_id>.webp`
- `assets/gear/laura/<item_id>.webp`

El personaje base y todas las capas deben compartir el mismo lienzo y encuadre.

### Lienzo maestro recomendado
- 1024 × 1400 px.
- Fondo transparente en las capas de equipo.
- Personaje centrado y de cuerpo entero.
- Misma pose, cámara y escala en todos los assets.
- El compañero usa preferentemente la esquina inferior derecha.
- Exportar a WebP con transparencia.

Mientras no existan los assets definitivos, FitQuest muestra un maniquí y marcadores del equipo. Al añadir los archivos en las rutas indicadas, se cargan automáticamente.
