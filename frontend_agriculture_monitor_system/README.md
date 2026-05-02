# Sistema de Monitoreo Agrícola - Frontend (Agriculture Monitor System)

Este es el frontend del proyecto **Agriculture Monitor System**, una aplicación web diseñada para monitorear el estado y las condiciones de plantas o cultivos. 

## 🚀 Tecnologías Utilizadas

El proyecto está construido con herramientas y librerías modernas de desarrollo web:
- **Vue 3** (Composition API) - Framework progresivo de JavaScript.
- **Vite** - Herramienta de construcción rápida para proyectos web modernos.
- **Vue Router** - Enrutador oficial para Vue.js, permitiendo la navegación entre páginas (Home, Histórico, Mis Plantas).
- **Chart.js** & **vue-chartjs** - Librerías para la visualización de datos y gráficos interactivos (para ver datos históricos y monitoreo).

## 📂 Estructura del Proyecto 

```text
frontend_agriculture_monitor_system/
├── public/                 # Archivos estáticos públicos
├── src/                    # Código fuente principal de la aplicación
│   ├── components/         # Componentes reutilizables (Ej: DataCard.vue, Navbar.vue)
│   ├── layouts/            # Plantillas de diseño de la aplicación (Ej: Layout.vue)
│   ├── views/              # Vistas/Páginas de la aplicación (Home, Historico, MisPlantas)
│   ├── App.vue             # Componente raíz de Vue
│   ├── main.js             # Punto de entrada principal de la aplicación Vue
│   └── router.js           # Configuración de las rutas (Vue Router)
├── .env                    # Variables de entorno
├── index.html              # Plantilla HTML principal
├── package.json            # Configuración de dependencias y scripts de NPM
└── vite.config.js          # Configuración de Vite
```

## 🖥️ Vistas Principales

La aplicación se compone de las siguientes pantallas principales:
- **Home**: Panel principal con la información más relevante.
- **Mis Plantas**: Vista para la gestión y monitoreo del estado actual de las plantas/cultivos.
- **Histórico**: Vista que muestra datos recopilados a lo largo del tiempo, posiblemente utilizando gráficos de `Chart.js` para visualizar tendencias.

## ⚙️ Instalación y Configuración

Sigue estos pasos para levantar el entorno de desarrollo localmente:

1. **Clona el repositorio:**
   ```sh
   git clone https://github.com/JorgeRmz16/agriculture-monitor-system
   cd agriculture-monitor-system/frontend_agriculture_monitor_system
   ```

2. **Instala las dependencias:**
   ```sh
   npm install
   ```

3. **Inicia el servidor de desarrollo:**
   ```sh
   npm run dev
   ```

4. Abre tu navegador en la URL que aparece en la terminal (por defecto [http://localhost:5173](http://localhost:5173)).

## 📜 Scripts Disponibles

Dentro del directorio del proyecto, puedes ejecutar los siguientes comandos:

- `npm run dev`: Inicia el servidor de desarrollo local con Vite.
- `npm run build`: Compila y empaqueta la aplicación para producción en la carpeta `dist`.
- `npm run preview`: Inicia un servidor web local para previsualizar la compilación de producción.
