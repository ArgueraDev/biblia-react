### `npm start`

### `npm run build`

# 📖 Biblia Presenter

Una aplicación web desarrollada en **React** con **Socket.IO** para proyectar en tiempo real textos bíblicos en **OBS Studio**. Diseñada especialmente para transmisiones en vivo, servicios cristianos y reuniones donde se desea mostrar versículos de manera profesional y sincronizada.

## 🚀 Características principales

- 📚 Navegación intuitiva por libros, capítulos y versículos
- 💬 Proyección en tiempo real vía Socket.IO
- 🖥️ Compatible con OBS mediante Browser Source
- 🎨 Interfaz personalizable para adaptarse a cualquier estilo visual

## 🛠️ Tecnologías utilizadas

- ⚛️ **React**
- 🔌 **Socket.IO**
- 💅 **Bootstrap**
- 🌐 **OBS Studio**
- 📦 **Node.js**

## 🧩 ¿Cómo funciona?

- El **panel de control** envía el versículo seleccionado vía Socket.IO
- El **modo de proyección** lo recibe y actualiza el texto instantáneamente
- OBS captura esta vista usando una fuente de navegador

## ⚙️ Instalación

1. **Clona este repositorio:**

   ```bash
   git clone https://github.com/ArgueraDev/biblia-presenter.git
   cd biblia-presenter
   ```

2. **Instala dependencias:**

   ```bash
   # Para el cliente React
   npm install

   # Para el servidor
   cd server
   npm install
   ```

3. **Inicia el servidor Socket.IO:**

   ```bash
   cd server
   node index.js
   ```

4. **Inicia el cliente React:**

   ```bash
   npm start
   ```

5. **Configura OBS:**

   - Agrega una nueva fuente de navegador
   - Usa la URL `http://localhost:4000/preview`
   - Ajusta el ancho y alto (ej: 1280x200)
   - ¡Listo! Cada versículo que selecciones se actualizará en tiempo real.

## ✨ Personalización

- Modifica estilos desde `src/components/Preview.js`
- Puedes agregar temas oscuros, efectos de fade-in, o cambiar la tipografía según tu preferencia

## 📄 Licencia

MIT – Puedes usarlo libremente para proyectos personales o en iglesias.

---
