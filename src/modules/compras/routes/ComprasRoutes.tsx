import { RoutesWithNotFound } from "@/modules/common/components";
import { AuthGuard } from "@/modules/common/guards";
import { Route } from "react-router-dom";
import { ComprasPages, ProveedoresRoutes } from "../pages";




export const ComprasRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route element={<AuthGuard />}>
        <Route path="/" element={<ComprasPages />} />
        <Route path="/admin-proveedores/*" element={<ProveedoresRoutes />} />
      </Route>
    </RoutesWithNotFound>
  );
};


