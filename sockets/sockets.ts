import SocketIO, { Socket } from "socket.io";
import socketIO from "socket.io";
import { UsuariosLista } from "../classes/usuarios-lista";
import { Usuario } from "../classes/usuario";

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket) => {
  const usuario = new Usuario(cliente.id);
  usuariosConectados.agregar(usuario);
};

export const desconectar = (cliente: Socket) => {
  cliente.on("disconnect", () => {
    console.log("Cliente desconectado");

    usuariosConectados.borrarUsuario(cliente.id);
  });
};

export const mensaje = (cliente: Socket, io: socketIO.Server) => {
  cliente.on("mensaje", (payload: { de: String; cuerpo: String }) => {
    console.log("Mensaje recibido", payload);
    io.emit("mensaje-nuevo", payload);
  });
};

export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {
  cliente.on(
    "configurar-usuario",
    (payload: { nombre: String }, callback: Function) => {
      usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
      console.log("Bienvenido Usuario", payload.nombre);

      callback({
        ok: true,
        mensaje: `Usuario ${payload.nombre}, configurado`,
      });
    }
  );
};