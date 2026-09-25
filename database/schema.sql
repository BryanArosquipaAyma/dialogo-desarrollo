-- ============================================================
-- Tablas restantes (usuarios y autores ya existen)
-- ============================================================

USE revista_digital;

CREATE TABLE IF NOT EXISTS reportajes (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  resumen_corto VARCHAR(500) NULL,
  desarrollo LONGTEXT NOT NULL,
  foto_principal VARCHAR(255) NULL,
  pdf_adjunto VARCHAR(255) NULL,
  fecha_publicacion DATE NOT NULL,
  es_destacado TINYINT(1) NOT NULL DEFAULT 0,
  estado ENUM('borrador','publicado') NOT NULL DEFAULT 'borrador',
  autor_id INT UNSIGNED NULL,
  usuario_id INT UNSIGNED NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_reportajes_autor
    FOREIGN KEY (autor_id) REFERENCES autores(id)
    ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT fk_reportajes_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  INDEX idx_reportajes_fecha (fecha_publicacion),
  INDEX idx_reportajes_destacado (es_destacado),
  INDEX idx_reportajes_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS reportajes_fotos (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  reportaje_id INT UNSIGNED NOT NULL,
  url_foto VARCHAR(255) NOT NULL,
  orden SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  descripcion VARCHAR(255) NULL,
  CONSTRAINT fk_reportajes_fotos_reportaje
    FOREIGN KEY (reportaje_id) REFERENCES reportajes(id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  INDEX idx_reportajes_fotos_reportaje (reportaje_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS noticias (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  foto VARCHAR(255) NULL,
  link_externo VARCHAR(500) NULL,
  fecha_publicacion DATE NOT NULL,
  estado ENUM('borrador','publicado') NOT NULL DEFAULT 'borrador',
  usuario_id INT UNSIGNED NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_noticias_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  INDEX idx_noticias_fecha (fecha_publicacion),
  INDEX idx_noticias_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS boletines (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  numero_boletin VARCHAR(50) NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  resumen VARCHAR(500) NULL,
  foto_portada VARCHAR(255) NULL,
  archivo_pdf VARCHAR(255) NOT NULL,
  fecha_publicacion DATE NOT NULL,
  estado ENUM('borrador','publicado') NOT NULL DEFAULT 'borrador',
  usuario_id INT UNSIGNED NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_boletines_numero UNIQUE (numero_boletin),
  CONSTRAINT fk_boletines_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  INDEX idx_boletines_fecha (fecha_publicacion),
  INDEX idx_boletines_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS podcasts (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descripcion VARCHAR(500) NULL,
  url_embed VARCHAR(500) NOT NULL,
  fecha_publicacion DATE NOT NULL,
  estado ENUM('borrador','publicado') NOT NULL DEFAULT 'borrador',
  usuario_id INT UNSIGNED NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_podcasts_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  INDEX idx_podcasts_fecha (fecha_publicacion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS videos (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descripcion VARCHAR(500) NULL,
  url_embed VARCHAR(500) NOT NULL,
  fecha_publicacion DATE NOT NULL,
  estado ENUM('borrador','publicado') NOT NULL DEFAULT 'borrador',
  usuario_id INT UNSIGNED NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_videos_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  INDEX idx_videos_fecha (fecha_publicacion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;