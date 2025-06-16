import { RoutesWithNotFound } from "@/modules/common/components";
import { AuthGuard } from "@/modules/common/guards";
import { Route } from "react-router-dom";
import { TalentoHumanoPages } from "../pages";
import { PersonalRoutes } from "../pages/personal/routes";


export const TalentoHumanoRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route element={<AuthGuard />}>
        <Route path="/" element={<TalentoHumanoPages />} />
        <Route path="/administrar-personal/*" element={<PersonalRoutes />} />
        {/* <Route path="/gestion-proyectos/*" element={<GestionProyectoRoutes />} /> */}
      </Route>
    </RoutesWithNotFound>
  );
};
