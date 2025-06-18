import { Button, Col, Input, Modal, Row, Tooltip } from "antd";
import { useState } from "react";
import { StyledFormItem } from "@/modules/common/layout/DashboardLayout/styled";
import TextArea from "antd/es/input/TextArea";
import { confirmarAsistencia } from "@/services/talento-humano/confirmarAsistenciasAPI";

interface DataId {
  dataTicket: DataType;
  fetchList: () => void;
  pushNotification: (message: { title: string; type?: string }) => void;
}

interface DataType {
  key: number;
  id: number;
  fecha_confirmacion: string;
  detalle: string;
  nombres: string;
  apellidos: string;
  descripcion_proyecto: string;
}

export const ModalAsistencias = ({
  dataTicket,
  fetchList,
  pushNotification,
}: DataId) => {
  const [open, setOpen] = useState<boolean>(false);
  const [confirmacion, setConfirmacion] = useState<string>("");
  const showLoading = () => {
    setOpen(true);
  };

  const EnvioConfirmacion = () => {
    const AutorizacionTicket = {
      id: Number(dataTicket.id),
      detalle: confirmacion,
    };

    confirmarAsistencia(AutorizacionTicket)
      .then(() => {
        pushNotification({
          title: "Asistencia Confirmada",
          type: "info",
        });
      })
      .catch((err) => {
        pushNotification({
          title: err.message,
          type: "error",
        });
      })
      .finally(() => {
        setOpen(false);
        fetchList();
      });
  };

  return (
    <>
      <Tooltip title="Confirma asistencia del empleado a la obra">
        <Button type="primary" onClick={showLoading} size="small">
          CONFIRMAR ASISTENCIA
        </Button>
      </Tooltip>

      <Modal
        title={<p>CONFIRMAR ASISTENCIA</p>}
        footer={
          <>
            <Button type="primary" onClick={EnvioConfirmacion}>
              Confirmar Asistencia 
            </Button>
          </>
        }
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        width={800}
      >
        <Row gutter={24}>
          <Col xs={24} sm={8} style={{ width: "100%" }}>
            <StyledFormItem label="Nombres" labelCol={{ span: 24 }}>
              <Input allowClear disabled value={dataTicket?.nombres} />
            </StyledFormItem>
          </Col>

          <Col xs={24} sm={8} style={{ width: "100%" }}>
            <StyledFormItem label="Apellidos" labelCol={{ span: 24 }}>
              <Input allowClear disabled value={dataTicket?.apellidos} />
            </StyledFormItem>
          </Col>

          <Col xs={24} sm={8} style={{ width: "100%" }}>
            <StyledFormItem label="Proyecto" labelCol={{ span: 24 }}>
              <Input allowClear disabled value={dataTicket?.descripcion_proyecto} />
            </StyledFormItem>
          </Col>

          <Col xs={24} sm={24} style={{ width: "100%" }}>
            <StyledFormItem label="Detalle" labelCol={{ span: 24 }}>
              <TextArea
                allowClear
                maxLength={255}
                value={confirmacion}
                placeholder="Escribe un detalle en caso de requerirlo"
                onChange={(e) => setConfirmacion(e.target.value)}
              />
            </StyledFormItem>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
