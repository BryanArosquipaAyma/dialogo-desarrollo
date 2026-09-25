USE revista_digital;

-- Autor por defecto (Redacción)
INSERT INTO autores (nombres, ap_paterno, nickname, es_nickname)
VALUES ('Redacción', 'D&D', 'Redacción', 1);

-- Usuario administrador
INSERT INTO usuarios (nombres, ap_paterno, email, password_hash, rol)
VALUES (
  'Bryan',
  'Admin',
  'admin@dialogo.com',
  '$2b$10$Xnsvomop8VCGse61iHrCl.PEeyEq3pFppdgO3r1nZ/NIKRmbzRC0K',
  'admin'
);

SELECT id, nombres, ap_paterno, email, rol FROM usuarios;
SELECT id, nombres, nickname FROM autores;