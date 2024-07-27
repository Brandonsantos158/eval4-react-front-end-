import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./App.css";

function App() {
const [usuarios, setUsuarios] = useState([]);
const [nuevoUsuarioId, setNuevoUsuarioId] = useState("");
const [nuevoUsuarioNombre, setNuevoUsuarioNombre] = useState("");
const [nuevoUsuarioGenero, setNuevoUsuarioGenero] = useState("");
const [nuevoUsuarioNacimiento, setNuevoUsuarioNacimiento] = useState("");
const [editandoUsuario, setEditandoUsuario] = useState(null);
const [error, setError] = useState(""); 

const handleNuevoUsuarioId = (e) => setNuevoUsuarioId(e.target.value);
const handleNuevoUsuarioNombre = (e) => setNuevoUsuarioNombre(e.target.value);
const handleNuevoUsuarioGenero = (e) => setNuevoUsuarioGenero(e.target.value);
const handleNuevoUsuarioNacimiento = (e) => setNuevoUsuarioNacimiento(e.target.value);

const handleAgregarUsuario = () => {
  if (!nuevoUsuarioId || !nuevoUsuarioNombre || !nuevoUsuarioGenero || !nuevoUsuarioNacimiento) {
    setError("Todos los campos deben ser completados");
    return;
  }

    
const idExistente = usuarios.some(usuario => usuario.id === nuevoUsuarioId);
  if (idExistente) {
    setError("La ID ya existe ingrese otra ID");
    return;
  }

const nuevoUsuario = {
  id: nuevoUsuarioId,
  nombre: nuevoUsuarioNombre,
  genero: nuevoUsuarioGenero,
  nacimiento: nuevoUsuarioNacimiento
};

console.log("Datos del usuario nuevo:", nuevoUsuario);
  setUsuarios(prev => {
    const nuevoArreglo = [...prev, nuevoUsuario];
    localStorage.setItem("usuarios", JSON.stringify(nuevoArreglo));
    return nuevoArreglo;
  });

  setNuevoUsuarioId("");
  setNuevoUsuarioNombre("");
  setNuevoUsuarioGenero("");
  setNuevoUsuarioNacimiento("");
  setError("");
};

const handleEliminarUsuario = (idUsuario) => {
  setUsuarios(prev => {
    const resultadosEliminados = prev.filter(objeto => objeto.id !== idUsuario);
    localStorage.setItem("usuarios", JSON.stringify(resultadosEliminados));
    return resultadosEliminados;
  });
};

const handleEditarUsuario = (usuario) => {
  setEditandoUsuario(usuario);
  setNuevoUsuarioId(usuario.id);
  setNuevoUsuarioNombre(usuario.nombre);
  setNuevoUsuarioGenero(usuario.genero);
  setNuevoUsuarioNacimiento(usuario.nacimiento);
  setError("");
};

const handleGuardarEdicion = () => {
  if (!nuevoUsuarioId || !nuevoUsuarioNombre || !nuevoUsuarioGenero || !nuevoUsuarioNacimiento) {
    setError("Todos los campos deben ser completados");
    return;
  }

const idExistente = usuarios.some(usuario => usuario.id === nuevoUsuarioId && usuario.id !== editandoUsuario.id);
  if (idExistente) {
    setError("La ID ya existe ingrese otra ID");
    return;
  }

  setUsuarios(prev => {
    const usuariosActualizados = prev.map(u =>
      u.id === editandoUsuario.id ? { ...u, id: nuevoUsuarioId, nombre: nuevoUsuarioNombre, genero: nuevoUsuarioGenero, nacimiento: nuevoUsuarioNacimiento } : u
    );
    localStorage.setItem("usuarios", JSON.stringify(usuariosActualizados));
    return usuariosActualizados;
  });
  setEditandoUsuario(null);
  setNuevoUsuarioId("");
  setNuevoUsuarioNombre("");
  setNuevoUsuarioGenero("");
  setNuevoUsuarioNacimiento("");
  setError("");
};

const handleCancelarEdicion = () => {
  setEditandoUsuario(null);
  setNuevoUsuarioId("");
  setNuevoUsuarioNombre("");
  setNuevoUsuarioGenero("");
  setNuevoUsuarioNacimiento("");
  setError("");
};

  
useEffect(() => {
  const usuariosAlmacenados = JSON.parse(localStorage.getItem("usuarios") || "[]");
  setUsuarios(usuariosAlmacenados);
  console.log("Usuarios cargados desde localStorage:", usuariosAlmacenados);
}, []);

  return (
    <div id="formulario" className="container mt-4">
      <h1>Formulario</h1>
      <div className="mb-4">
        <form onSubmit={(e) => e.preventDefault()}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label htmlFor="id_usuario" className="form-label">ID Usuario</label>
            <input
              type="number"
              className="form-control"
              value={nuevoUsuarioId}
              onChange={handleNuevoUsuarioId}
              name="id_usuario"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nombre_usuario" className="form-label">Nombre Usuario</label>
            <input
              type="text"
              className="form-control"
              value={nuevoUsuarioNombre}
              onChange={handleNuevoUsuarioNombre}
              name="nombre_usuario"
              placeholder="Ingrese un nombre"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Género</label>
            <div id="booleano">
              <label className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  value="hombre"
                  checked={nuevoUsuarioGenero === "hombre"}
                  onChange={handleNuevoUsuarioGenero}
                  name="genero_usuario"
                />
                <span className="form-check-label">Hombre</span>
              </label>
              <label className="form-check ms-3">
                <input
                  type="radio"
                  className="form-check-input"
                  value="mujer"
                  checked={nuevoUsuarioGenero === "mujer"}
                  onChange={handleNuevoUsuarioGenero}
                  name="genero_usuario"
                />
                <span className="form-check-label">Mujer</span>
              </label>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="nacimiento_usuario" className="form-label">Lugar de Nacimiento</label>
            <input
              type="text"
              className="form-control"
              value={nuevoUsuarioNacimiento}
              onChange={handleNuevoUsuarioNacimiento}
              name="nacimiento_usuario"
              placeholder="Ingrese lugar de nacimiento"
            />
          </div>
          {editandoUsuario ? (
            <>
              <button type="button" className="btn btn-primary me-2" onClick={handleGuardarEdicion}>Guardar Cambios</button>
              <button type="button" className="btn btn-secondary" onClick={handleCancelarEdicion}>Cancelar</button>
            </>
          ) : (
            <button type="button" className="btn btn-outline-success" onClick={handleAgregarUsuario}>Añadir Usuario</button>
          )}
        </form>
        <hr />
      </div>
      <div>
        <h3>Lista de Usuarios</h3>
        <ul className="list-group">
          {usuarios.map((usu) => (
            <li key={usu.id} className="list-group-item d-flex justify-content-between align-items-center">
              (ID: {usu.id}) (Nombre: {usu.nombre}) (Genero: {usu.genero}) (Lugar de Nacimiento: {usu.nacimiento})
              <div id="botones">
                <button id="boton1" type="button" className="btn btn-outline-dark" onClick={() => handleEditarUsuario(usu)}>Editar</button>
                <button id="boton2" type="button" className="btn btn-outline-danger" onClick={() => handleEliminarUsuario(usu.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

