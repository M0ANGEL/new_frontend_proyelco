import { RoutesWithNotFound } from "@/modules/common/components";
import { Route } from "react-router-dom";
import {
  AdminUsuariosPage,
  PerfilesRoutes,
  UsuariosRoutes,
} from "../pages";
import { CargosRoutes } from "../pages/cargos";
import { AuthGuard } from "../../common/guards";

export const AdminUsuariosRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route element={<AuthGuard />}>
        <Route path="/" element={<AdminUsuariosPage />} />
        <Route path="/usuarios/*" element={<UsuariosRoutes />} />
        <Route path="/perfiles/*" element={<PerfilesRoutes />} />
        <Route path="/cargos/*" element={<CargosRoutes />} />
      </Route>
    </RoutesWithNotFound>
  );
};
