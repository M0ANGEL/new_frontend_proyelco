import { Route } from "react-router-dom";
import { GlobalProvider } from "./GlobalContext";
import { RoutesWithNotFound } from "../modules/common/components";
import { DashboardLayout } from "../modules/common/layout";
import { DashboardRoutes } from "../modules/dashboard/routes";
import { GestionEmpresasRoutes } from "../modules/gestion-empresas";
import { AdminUsuariosRoutes } from "../modules/admin-usuarios";
import { ConfigSisRoutes } from "../modules/config-sistema";
import { SaludRoutes } from "../modules/salud";
import { LogSistemaRoutes } from "../modules/logs-sistema";
import { AdministrarClientesRoutes } from "../modules/clientes";
import { AdministrarProcesosProyectoRoutes } from "../modules/procesosObra";
import { ComprasRoutes } from "@/modules/compras";
import { TalentoHumanoRoutes } from "@/modules/talento-humano/routes/TalentoHumanoRoutes";

export const AdminRoutes = () => {
  return (
    <>
      <GlobalProvider>
        <RoutesWithNotFound>
          <Route path="/" element={<DashboardLayout />}>
            <Route path={"dashboard/*"} element={<DashboardRoutes />} />
            <Route
              path={"gestiondeempresas/*"}
              element={<GestionEmpresasRoutes />}
            />
            <Route
              path={"administraciondeusuarios/*"}
              element={<AdminUsuariosRoutes />}
            />
            <Route
              path={"configuraciondelsistema/*"}
              element={<ConfigSisRoutes />}
            />
            <Route path={"proyectos/*"} element={<SaludRoutes />} />
            <Route path={"logsdelsistema/*"} element={<LogSistemaRoutes />} />
            <Route
              path={"clientes/*"}
              element={<AdministrarClientesRoutes />}
            />
            <Route
              path={"configuracionproyectos/*"}
              element={<AdministrarProcesosProyectoRoutes />}
            />
            <Route path={"compras/*"} element={<ComprasRoutes />} />
            <Route path={"modulodetalentohumano/*"} element={<TalentoHumanoRoutes />} />

            {/* 
            <Route path={"tickets/*"} element={<TickestRoutes />} />
            <Route path={"marcaciones/*"} element={<MarcacionAsistenciasRoutes />} /> */}
          </Route>
        </RoutesWithNotFound>
      </GlobalProvider>
    </>
  );
};
