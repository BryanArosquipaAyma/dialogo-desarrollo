# Diálogo y Desarrollo — CMS

Sistema de gestión de contenidos (CMS) para el portal periodístico **Diálogo y Desarrollo**. Permite publicar y administrar reportajes, boletines NTEP, noticias, podcasts y videos con un panel administrativo completo.

🔗 **Sitio en producción:** [https://dialogo-desarrollo.vercel.app](https://dialogo-desarrollo.vercel.app)  
🔗 **Panel admin:** [https://dialogo-desarrollo.vercel.app/admin/login](https://dialogo-desarrollo.vercel.app/admin/login)  
🔗 **Repositorio:** [https://github.com/BryanArosquipaAyma/dialogo-desarrollo](https://github.com/BryanArosquipaAyma/dialogo-desarrollo)

---

## 🚀 Stack Tecnológico

| Capa | Tecnología | Descripción |
|---|---|---|
| **Frontend** | Next.js 15 (App Router) | Framework React con SSR y server components |
| **Estilos** | Tailwind CSS 4 | Framework de CSS utility-first |
| **Lenguaje** | TypeScript 5 | JavaScript con tipos estáticos |
| **Backend** | API Routes de Next.js | Endpoints serverless |
| **Base de datos** | MySQL 8.4 (Aiven) | MySQL en la nube con SSL |
| **Autenticación** | JWT + bcrypt | Tokens firmados + hash de contraseñas |
| **Storage** | Vercel Blob | Almacenamiento de imágenes y PDFs |
| **Hosting** | Vercel | Deploy automático desde GitHub |
| **DB Hosting** | Aiven | MySQL administrado en la nube |

---

## ✨ Funcionalidades

### 📰 Módulos del CMS

- **Reportajes** — Artículos principales con galería ilimitada, PDF adjunto, autor, destacados
- **Boletines NTEP** — Boletines con PDF obligatorio, portada y número único
- **Noticias** — Notas con enlace externo a la fuente original
- **Podcasts** — Episodios con embed de Spotify, YouTube o SoundCloud
- **Videos** — Videos con embed de YouTube
- **Autores** — Autores con soporte de nickname
- **Usuarios** — Cuentas con roles (admin / editor / redactor)

### 🔐 Seguridad

- Login con JWT en cookie httpOnly
- Hash de contraseñas con bcrypt
- Middleware que protege todas las rutas `/admin/*`
- Recuperación de contraseña con token temporal
- Roles diferenciados (admin, editor, redactor)
- Protección del último administrador
- Validaciones en frontend y backend

### 🌐 Sitio público

- Portada con reportaje destacado
- Páginas de sección por categoría
- Páginas de detalle con URLs amigables
- Embeds de Spotify y YouTube
- Visor de PDFs embebido
- Diseño 100% responsive
- SEO completo (metadata dinámica, Open Graph, sitemap, robots)

### 🛠️ Panel administrativo

- Dashboard con estadísticas
- CRUD completo de todas las entidades
- Estados de publicación (borrador/publicado)
- Subida de archivos a Vercel Blob
- Editor de contenido
- Confirmaciones antes de eliminar
- Sidebar responsivo

---

## 🔑 Credenciales de Demo

Para probar el panel administrativo:

| Campo | Valor |
|---|---|
| **URL** | https://dialogo-desarrollo.vercel.app/admin/login |
| **Email** | `admin@dialogo.com` |
| **Contraseña** | `admin123` |

> ⚠️ **Cambiar contraseña en producción** para uso real.

---

## 📦 Instalación Local

### Requisitos

- Node.js 18+
- MySQL 8+
- npm o yarn

### 1. Clonar el repositorio

```bash
git clone https://github.com/BryanArosquipaAyma/dialogo-desarrollo.git
cd dialogo-desarrollo
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar MySQL local

```bash
# Entrar a MySQL
mysql -u root

# Crear la base de datos
CREATE DATABASE revista_digital CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE revista_digital;

# Importar schema
source database/schema.sql;
source database/seed.sql;

# Salir
exit;
```

### 4. Crear archivo `.env.local`

Crea un archivo `.env.local` en la raíz con:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=revista_digital
DB_SSL=false
JWT_SECRET=tu_clave_secreta_aqui
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> ⚠️ **Este archivo NO se sube a GitHub** (protegido por `.gitignore`).

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### 6. Build para producción

```bash
npm run build
npm start
```

---

## 📁 Estructura del Proyecto

```
dialogo-desarrollo/
├── app/
│   ├── api/                    # Endpoints serverless
│   │   ├── auth/               # Login, logout, recuperar contraseña
│   │   ├── autores/            # CRUD autores
│   │   ├── boletines/          # CRUD boletines
│   │   ├── noticias/           # CRUD noticias
│   │   ├── podcasts/           # CRUD podcasts
│   │   ├── reportajes/         # CRUD reportajes + galería
│   │   ├── usuarios/           # CRUD usuarios
│   │   ├── videos/             # CRUD videos
│   │   └── upload/             # Subida a Vercel Blob
│   │
│   ├── admin/                  # Panel administrativo
│   │   ├── autores/            # Gestión de autores
│   │   ├── boletines/          # Gestión de boletines
│   │   ├── login/              # Login
│   │   ├── noticias/           # Gestión de noticias
│   │   ├── podcasts/           # Gestión de podcasts
│   │   ├── recuperar/          # Recuperación de contraseña
│   │   ├── reportajes/         # Gestión de reportajes
│   │   ├── usuarios/           # Gestión de usuarios
│   │   ├── videos/             # Gestión de videos
│   │   └── page.tsx            # Dashboard
│   │
│   ├── actualidad/             # Página pública de noticias
│   ├── boletines/              # Página pública de boletines
│   ├── podcast/                # Página pública de podcasts
│   ├── reportajes/             # Página pública de reportajes
│   ├── videos/                 # Página pública de videos
│   ├── layout.tsx              # Layout global
│   ├── page.tsx                # Portada
│   ├── robots.ts               # Configuración de robots.txt
│   └── sitemap.ts              # Sitemap dinámico
│
├── components/                 # Componentes reutilizables
│   ├── Header.tsx
│   └── Footer.tsx
│
├── database/                   # Scripts SQL
│   ├── schema.sql              # Creación de tablas
│   └── seed.sql                # Datos iniciales
│
├── lib/                        # Utilidades
│   ├── auth.ts                 # JWT (Node.js)
│   ├── auth-edge.ts            # JWT (Edge Runtime)
│   ├── db.ts                   # Pool de conexión MySQL
│   └── embed.ts                # Conversor de URLs a embed
│
├── middleware.ts               # Protección de rutas
├── next.config.ts              # Configuración Next.js
└── package.json
```

---

## 🗄️ Modelo de Base de Datos

8 tablas en MySQL:

| Tabla | Descripción |
|---|---|
| `usuarios` | Administradores, editores y redactores |
| `autores` | Autores de reportajes (soporta nickname) |
| `reportajes` | Artículos principales |
| `reportajes_fotos` | Galería de fotos ilimitada por reportaje |
| `noticias` | Notas con enlace externo |
| `boletines` | Boletines NTEP con PDF |
| `podcasts` | Episodios embebidos |
| `videos` | Videos embebidos |

---

## 🔒 Buenas Prácticas Aplicadas

- ✅ **Credenciales fuera del repositorio** (`.env.local` + `.gitignore`)
- ✅ **HTTPS obligatorio** (Vercel lo da automáticamente)
- ✅ **Prepared statements** en todas las queries
- ✅ **Hash bcrypt** para contraseñas
- ✅ **Validaciones** en frontend y backend
- ✅ **Roles diferenciados** (admin/editor/redactor)
- ✅ **Configuración separada** entre dev y producción
- ✅ **Control de versiones** con commits descriptivos
- ✅ **CI/CD automático** (git push → deploy)
- ✅ **Backups automáticos** de la BD (Aiven)

---

## 🚀 Deploy

El proyecto usa **CI/CD automático**:

```
Cambio local → git push → GitHub → Vercel detecta → Redeploy → Sitio actualizado
```

### Variables de entorno en producción

Configuradas en **Vercel → Settings → Environment Variables**:

```
DB_HOST=dialogo-desarrollo-db-dialogo-desarrollo.l.aivencloud.com
DB_PORT=18284
DB_USER=avnadmin
DB_PASSWORD=••••••••
DB_NAME=revista_digital
DB_SSL=true
JWT_SECRET=••••••••
NEXT_PUBLIC_SITE_URL=https://dialogo-desarrollo.vercel.app
```

---

## 📝 Licencia

Proyecto académico — Curso: **Plataformas para el Desarrollo de Aplicaciones**  
Ingeniería de Sistemas — Semestre 2026-II

---

## 👨‍💻 Autor

**Bryan Arosquipa Ayma**  
Ingeniería de Sistemas  
Universidad Andina del Cusco

- GitHub: [@BryanArosquipaAyma](https://github.com/BryanArosquipaAyma)
- Email: 021200258h@uandina.edu.pe

---

## 📸 Capturas

### Portada pública
![Portada](https://via.placeholder.com/800x400?text=Portada+Publica)

### Panel administrativo
![Admin](https://via.placeholder.com/800x400?text=Panel+Admin)

### Aiven Console (base de datos)
![Aiven](https://via.placeholder.com/800x400?text=Aiven+MySQL)

### Vercel Dashboard
![Vercel](https://via.placeholder.com/800x400?text=Vercel+Deploy)