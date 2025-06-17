import {
  BodegasxUsuario,
  EmpresaxUsuario,
} from "@/modules/admin-usuarios/pages/usuarios/types";

export interface ResponseLogin {
  data: Token;
}

export interface Token {
  token: string;
}

export interface ResponseProfile {
  data: {
    userData: UserData;
    message: string;
  };
}

export interface ResponseEmpresas {
  data: {
    status: string;
    data: Empresa[];
  };
}

export interface ResponseEmpresa {
  data: {
    status: string;
    data: Empresa;
  };
}

export interface ResponseUsers {
  data: {
    status: string;
    data: UserData[];
  };
}
export interface ResponseUser {
  data: {
    data: UserData;
  };
}

export interface UserData {
  id: number;
  nombre: string;
  username: string;
  password: string;
  image: string;
  last_login: Date;
  rol: string;
  id_empresa: string;
  estado: string;
  cargo: string;
  cedula: string;
  telefono: string;
  created_at: Date;
  updated_at: Date;
  bodega: BodegasxUsuario[];
  empresa: Empresa[];
  empresas: EmpresaxUsuario[];
  perfiles: Perfil[];
  cargos: Cargo[];
  has_fuentes: string;
  fuentes: string[];
  has_limite_reportes: string;
  proceso_id: number;
  horario: Horario; // Usamos la nueva interfaz aquí
  horario_adicional: {
    fecha_inicio: string; // "HH:mm"
    fecha_final: string; // "HH:mm"
  };
}

export interface HorarioDetalle {
  dia: string;
  hora_inicio: string; // "HH:mm"
  hora_final: string; // "HH:mm"
}

export interface Horario {
  inicio: string; // "HH:mm"
  fin: string; // "HH:mm"
  detalles: HorarioDetalle[]; // Agregamos detalles aquí
}

export interface Empresa {
  id: number;
  emp_nombre: string;
  estado: string;
  nit: string;
  direccion: string;
  telefono: string;
  servidor_smtp: string;
  protocolo_smtp: string;
  cuenta_de_correo: string;
  contrasena_correo: string;
  created_at: Date;
  updated_at: Date;
  pivot?: EmpresaPivot;
}

export interface EmpresaPivot {
  id_user: string;
  id_empresa: string;
}

export interface ResponsePerfil {
  data: Perfil[];
}

export interface Perfil {
  id: number;
  cod_perfil: string;
  nom_perfil: string;
  desc_perfil: string;
  estado: string;
  id_empresa: string;
  created_at: Date;
  updated_at: Date;
  modulos: ModulosXPerfil[];
  empresa: Empresa;
  menu: MenuElement[];
}

export interface MenuElement {
  key: string;
  cod_modulo: string;
  label: string;
  title: string;
  children?: MenuElement[];
}

export interface Modulo {
  id: number;
  cod_modulo: string;
  nom_modulo: string;
  desc_modulo: string;
  estado: string;
  created_at: Date;
  updated_at: Date;
  pivot: ModuloPivot;
  menus: Menu[];
}

export interface ModuloPivot {
  id_perfil: string;
  id_modulo: string;
}

export interface ModulosXPerfil {
  id: number;
  id_modulo: string;
  id_menu: string;
  id_submenu: string;
  created_at: Date;
  updated_at: Date;
  menu: Menu;
  submenu: SubMenu;
  modulo: Modulo;
}

export interface SubMenu {
  id: number;
  nom_smenu: string;
  link_smenu: string;
  desc_smenu: string;
  id_menu: string;
  created_at: Date;
  updated_at: Date;
  menu: Menu;
  estado: boolean;
}

export interface Menu {
  id: number;
  nom_menu: string;
  link_menu: string;
  desc_menu: string;
  id_modulo: string;
  created_at: Date;
  updated_at: Date;
  modulo: Modulo;
  estado: boolean;
  submenus: SubMenu[];
}

export interface Modulo {
  id: number;
  cod_modulo: string;
  nom_modulo: string;
  desc_modulo: string;
  estado: string;
  created_at: Date;
  updated_at: Date;
}

export interface ResponseSubMenus {
  data: SubMenu[];
}

export interface ResponseSubMenu {
  data: SubMenu;
}

export interface ResponseMenus {
  data: Menu[];
}

export interface ResponseMenu {
  data: Menu;
}

export interface ResponseModulos {
  data: Modulo[];
}

export interface ResponseModulo {
  data: Modulo;
}
export interface ResponseBlob {
  data: Blob;
}

export interface ResponseCargo {
  data: {
    status: string;
    data: Cargo[];
  };
}

export interface Cargo {
  id: number;
  nombre: string;
  descripcion: string;
  estado: string;
  id_empresa: string;
  created_at: Date;
  updated_at: Date;
  empresas: Empresa;
}

export interface Festivo {
  id: number;
  festivo_fecha: string;
  created_at: string;
  updated_at: string;
}

export interface ResponseFestivos {
  data: {
    status: string;
    data: Festivo[];
  };
}

/* type de datos categorias */
export interface ResponseTkCategorias {
  data: {
    status: string;
    data: TkCategoria[];
  };
}
export interface TkCategoria {
  id: number;
  name: string;
  prefijo: string;
  user_id: number;
  estado: string;
  nombre: string;
  created_at: string;
  updated_at: string;
}

/* type de datos categorias */
export interface ResponseAmClientes {
  data: {
    status: string;
    data: AmClientes[];
  };
}
export interface AmClientes {
  id: number;
  emp_nombre: string;
  estado: string;
  nit: number;
  direccion: string;
  telefono: string;
  cuenta_de_correo: string;
  id_user: string;
  nombre: string;
  created_at: string;
  updated_at: string;
}

export interface ResponseTkSubCategorias {
  data: {
    status: string;
    data: TkSubCategoria[];
  };
}

export interface TkSubCategoria {
  id: number;
  tk_categoria_id: string;
  name: string;
  user_id: string;
  estado: string;
  prioridad: string;
  proceso_id: string;
  proceso_autoriza_id: string | null;
  autorizacion: string;
  created_at: string;
  nombre_usuario: string;
  categoria_padre: string;
  updated_at: string;
  tiempo_gestion: string;
  usuarios_autorizados: string;
}

export interface ResponseTkTickts {
  data: {
    status: string;
    data: TkTicket[];
  };
}

export interface ResponseTkPerfilModerador {
  data: {
    status: string;
    data: TkPerfilModerador;
  };
}

export interface TkPerfilModerador {
  id: number;
  perfil: string;
}

export interface TkTicket {
  id: number;
  created_at: string;
  prioridad: string;
  listo: string;
  detalle: string;
  estado: string;
  numero_ticket: string;
  autorizacion: string;
  nombre_autorizador: string | null;
  respuesta_autorizacion: string | null;
  userSoluciona_id: number | null;
  categoria: string;
  subcategoria: string;
  creador_ticket: string;
  rechazo: string | null;
  fin_autorizacion: string | null;
  bodega: string;
  idLogueado: number;
  documento: number;
  proceso_id: number;
  usuarioGestiona: string | null;
  nombre_proceso: string;
  usuarioAsignado: string | null;
  Tiempovencido: string | null; //tiempo en que el ticket lleva vencido
  vencido: boolean;
  tiempo_gestion: string;
  observacion: string;
  tiempo_restante: string;
  categoria_id: string;
  subcategoria_id: string;
  usuarioCrear: string;
  farmacia: string;
}

export interface ResponseTkTicktsAutorizacion {
  data: {
    status: string;
    data: TkTicketAutorizacion[];
  };
}

export interface TkTicketAutorizacion {
  id: number;
  numero_ticket: string;
  autorizacion: string;
  detalle: string;
  created_at: string;
  estado: string;
  categoria: string;
  subcategoria: string;
  bodega: string;
  creador_ticket: string;
  fin_autorizacion: string;
  respuesta_autorizacion: string;
  documento: number;
  nombre_proceso: string;
}

export interface ResponseEstadosTickets {
  data: {
    status: string;
    calificaciones: TkCalificaciones[];
    data: EstadosTickets[];
  };
}

export interface EstadosTickets {
  id: number;
  created_at: string;
  cierre_ticket: string;
  prioridad: string;
  numero_ticket: string;
  autorizacion: string;
  detalle: string;
  respuesta_autorizacion: string;
  rechazo: string;
  calificacion_final: string;
  usuario_solicita: string;
  usuario_soluciona: string;
  categoria: string;
  subcategoria: string;
  bodega: string;
  estado: string;
  creador_ticket: string;
  documento: number;
  nombre_proceso: string;
  usuarioCrear: string;
  motivo_cancelacion: string | null;
}

export interface ResponseTkPreguntas {
  data: {
    status: string;
    data: TkPreguntas[];
  };
}

export interface TkPreguntas {
  id: number;
  key: number;
  pregunta: string;
  estado: string;
  tipo: string;
  user_id: string;
  proceso_id: number;
  created_at: string;
  nombre_crea: string;
}

export interface ResponseTkProcesos {
  data: {
    status: string;
    data: TkProcesos[];
  };
}

export interface TkProcesos {
  id: number;
  nombre_proceso: string;
  user_id: string;
  creador: string;
  created_at: string;
}

export interface ResponseTkPPreguntasDinamicas {
  data: {
    status: string;
    data: TkPPreguntasDinamicas[];
  };
}

export interface TkPPreguntasDinamicas {
  id: number;
  pregunta: string;
  subcategoria_id: string;
  categoria_id: string;
  estado: string;
  created_at: string;
  subcategoria: string;
}

export interface ResponseTkCalificaciones {
  data: {
    status: string;
    data: TkCalificaciones[];
  };
}

export interface TkCalificaciones {
  id: number;
  IdCa: number;
  calificacion: string;
  pregunta: string;
}

export interface ResponseTkUsers {
  data: {
    status: string;
    data: TkUsers[];
  };
}

export interface TkUsers {
  id: number;
  nombre: string;
}

//fin tipos tickets

//horarios

export interface ResponseHorarios {
  status: string;
  data: Horarios[];
  perfil?: string;
}

export interface Horarios {
  id?: number; // Opcional si no siempre está presente
  dia: string;
  hora_inicio: string;
  hora_final: string;
  horario_id: string; // En el JSON que enviaste, se llama 'horario_id'
  usuarios_autorizados: string;
}

export interface ResponseHorariosAdicionales {
  status: string;
  data: HorariosAdicional[];
}

export interface HorariosAdicional {
  id?: number;
  observacion: string;
  dia: string;
  fecha_inicio: string;
  fecha_final: string;
  horario_id: string;
  usuarios_autorizados: string;
}

export interface ResponsePerfilesHorarios {
  status: string;
  data: Horarios[];
  perfil?: string;
}

export interface HorariosPerfiles {
  id?: number; // Opcional si no siempre está presente
  nombre_perfil: string;
}

//fin horarios

//marcaciones asistencias

export interface ResponseMaLink {
  data: {
    status: string;
    data: MaLink[];
  };
}

export interface MaLink {
  id: number;
  nombre: string;
  link_descarga: string;
  estado: string;
  version: string;
  created_at: string;
}

export interface ResponseMaTelefonos {
  data: {
    status: string;
    data: MaTelefonos[];
  };
}

export interface MaTelefonos {
  id: number;
  marca: string;
  activo: string;
  serial_email: string;
  bod_nombre: string;
  estado: string;
  created_at: string;
}

export interface ResponseMaRegistroMarcaciones {
  data: {
    status: string;
    data: MaRegistroMarcaiones[];
  };
}

export interface MaRegistroMarcaiones {
  id: number;
  nombre_usuario: string;
  cedula: string;
  bodega_usuario: string;
  fecha: string;
  hora: string;
  bodega_registro: string;
  tipo_marcacion: string;
}

export interface ResponseMaFarmcias {
  data: {
    status: string;
    data: MaFarmacias[];
  };
}

export interface MaFarmacias {
  id: number;
  bod_nombre: string;
  estado: string;
  direccion: string;
  created_at: string;
}

export interface ResponseUsuarioRegistrados {
  data: {
    status: string;
    data: MaUsuariosRegistrados[];
  };
}

export interface MaUsuariosRegistrados {
  id: number;
  nombre_completo: string;
  cedula: string;
  telefono: number;
  bod_nombre: string;
  nombre_cargo: string;
  foto: string;
  foto_url: string;
  created_at: string;
}

//fin marcación

//tipo proyectos
export interface ResponseTipoProyectos {
  data: {
    status: string;
    data: MaFarmacias[];
  };
}

export interface TipoProyectos {
  id: number;
  nombre_tipo: string;
  user_id: string;
  nombre: string;
  created_at: string;
}

/* type de proceos proyecos */
export interface ResponseProcesosProyectos {
  data: {
    status: string;
    data: ProcesosProyectos[];
  };
}
export interface ProcesosProyectos {
  id: number;
  tipoPoryecto_id: string;
  nombre_tipo: string;
  estado: string;
  nombre_proceso: number;
  id_user: string;
  nombre: string;
  created_at: string;
  updated_at: string;
}

/* type de proyectos */
export interface ResponseProyectos {
  data: {
    status: string;
    data: Proyectos[];
  };
}
export interface Proyectos {
  id: number;
  tipoPoryecto_id: string;
  cliente_id: string;
  usuario_crea_id: string;
  encargado_id: string;
  descripcion_proyecto: string;
  fecha_inicio: string;
  codigo_proyecto: string;
  torres: string;
  cant_pisos: string;
  apt: string;
  pisoCambiarProceso: string;
  estado: string;
  fecha_ini_proyecto: string;
  nombre_tipo: string;
  emp_nombre: string;
  porcentaje: string;
  avance: string;
  created_at: string;
  updated_at: string;
}

/* info proyectos dashboard */
export interface ResponseInfoProyectosDash {
  data: {
    status: string;
    data: InfoProyectosDash[];
  };
}
export interface InfoProyectosDash {
  proyectosActivos: string;
  proyectosInactivos: string;
  proyectosTerminados: string;
  clientesInactivos: string;
  clientesActivos: string;
}

//compras

export interface ResponsePapeleria {
  data: {
    status: string;
    data: Papeleria[];
  };
}
export interface Papeleria {
  id: number;
  codigo_insumo: string;
  insumo_descripcion: string;
  unidad: string;
  mat_requerido: string;
  agrupacion_descripcion: string;
  nombre_tercero: string;
  prefijo: string;
  fecha_pedido: string;
  punto_envio: string;
  created_at: string;
  updated_at: string;
}

//fin papeleria

/* type de datos proveedor */
export interface ResponseProveedores {
  data: {
    status: string;
    data: Proveedores[];
  };
}
export interface Proveedores {
  id: number;
  nombre: string;
  correo: string;
  estado: number;
  ciudad: string;
  telefono: string;
  created_at: string;
  updated_at: string;
}

/* type de datos personal */
export interface ResponsePersonales {
  data: {
    status: string;
    data: Personales[];
  };
}
export interface Personales {
  id: number;
  nombres: string;
  apellidos: string;
  cedula: number;
  estado: string;
  telefono: string;
  cargo_id: string;
  created_at: string;
  updated_at: string;
}

/* type de datos asistencias obras */
export interface ResponseAsistencia {
  data: {
    status: string;
    data: Asistencia[];
  };
}
export interface Asistencia {
  id: number;
  personl_id: string;
  proyecto_id: string;
  usuario_asigna: number;
  usuario_confirma: string;
  confirmacion: string;
  detalle: string;
  fecha_programacion: string;
  fecha_confirmacion: string;
  cargo: string;
  nombres: string;
  apellidos: string;
  usurioConfirma: string;
  descripcion_proyecto: string;
  created_at: string;
  updated_at: string;
  created_at_string: string;
}
