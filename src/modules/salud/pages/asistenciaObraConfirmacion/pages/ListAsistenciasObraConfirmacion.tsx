import { StyledCard } from "@/modules/common/layout/DashboardLayout/styled";
import Table, { ColumnsType } from "antd/es/table";
import { useState, useEffect } from "react";
import {
  Input,
  DatePicker,
  Select,
  Button,
  Tooltip,
  notification,
  Collapse,
} from "antd";
import dayjs from "dayjs";
import { ModalAsistencias } from "./ModalAsistencias";
import { SearchBar } from "./styled";
import { DataType } from "./types";
import { getAsistenciasConfirmar } from "@/services/talento-humano/confirmarAsistenciasAPI";

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Panel } = Collapse;

export const ListAsistenciasObraConfirmacion = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [initialData, setInitialData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    null
  );
  const [selectedPrefijo, setSelectedPrefijo] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [prefijos, setPrefijos] = useState<string[]>([]);

  useEffect(() => {
    fetchAsistencias();
  }, []);

  const fetchAsistencias = () => {
    getAsistenciasConfirmar().then(({ data: { data } }) => {
      const DataPapeleria = data.map((data) => {
        return {
          key: data.id,
          id: data.id,
          nombres: data.nombres,
          apellidos: data.apellidos,
          descripcion_proyecto: data.descripcion_proyecto,
          cargo: data.cargo,
          confirmacion: data.confirmacion.toString(),
          fecha_programacion: data.fecha_programacion,
          fecha_confirmacion: data?.fecha_confirmacion,
          detalle: data?.detalle,
          cedula: data?.cedula,
          activo: data?.activo ? data?.activo.toString() : "",
          created_at: dayjs(data?.created_at),
          updated_at: dayjs(data?.updated_at),
          created_at_string: dayjs(data?.created_at).format("DD-MM-YYYY"),
        };
      });

      // Extraer prefijos únicos
      const uniqueProyecto = [
        ...new Set(DataPapeleria.map((item) => item.descripcion_proyecto)),
      ];

      setInitialData(DataPapeleria);
      setDataSource(DataPapeleria);
      setPrefijos(uniqueProyecto);
      setLoading(false);
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    applyFilters(initialData, dateRange, selectedPrefijo, value);
  };

  const handleDateRangeChange = (dates: [dayjs.Dayjs, dayjs.Dayjs] | null) => {
    setDateRange(dates);
    applyFilters(initialData, dates, selectedPrefijo, searchValue);
  };

  const handleSelectChange = (value: string | undefined) => {
    const prefijo = value || null;
    setSelectedPrefijo(prefijo);
    applyFilters(initialData, dateRange, prefijo, searchValue);
  };

  const applyFilters = (
    data: DataType[],
    dates: [dayjs.Dayjs, dayjs.Dayjs] | null,
    prefijoFilter: string | null,
    search: string
  ) => {
    let filteredData = [...data];

    // Filtro por búsqueda
    if (search) {
      filteredData = filteredData.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    // Filtro por rango de fechas
    if (dates && dates[0] && dates[1]) {
      const [start, end] = dates;
      filteredData = filteredData.filter((item) => {
        const itemDate = item.created_at;
        return (
          itemDate.isAfter(start.startOf("day")) &&
          itemDate.isBefore(end.endOf("day"))
        );
      });
    }

    // Filtro por prefijo
    if (prefijoFilter) {
      filteredData = filteredData.filter(
        (item) => item.descripcion_proyecto === prefijoFilter
      );
    }

    setDataSource(filteredData);
  };

  //notificacion
  const pushNotification = ({ title }: { title: string }) => {
    notification.success({
      message: "Notificación",
      description: title,
      placement: "topRight",
    });
  };

  // Agrupar por fecha_programacion
  const groupedData = dataSource.reduce((acc, item) => {
    const fecha = dayjs(item.fecha_programacion).format("YYYY-MM-DD");
    if (!acc[fecha]) {
      acc[fecha] = [];
    }
    acc[fecha].push(item);
    return acc;
  }, {} as Record<string, DataType[]>);

  const columns: ColumnsType<DataType> = [
    {
      title: "Nombre Empleado",
      dataIndex: "nombres",
      key: "nombres",
      align: "center",
      width: 90,
      sorter: (a, b) => a.nombres.localeCompare(b.nombres),
    },
    {
      title: "Apellidos",
      dataIndex: "apellidos",
      key: "apellidos",
      align: "center",
      width: 120,
      sorter: (a, b) => a.apellidos.localeCompare(b.apellidos),
    },
    {
      title: "Cedula",
      dataIndex: "cedula",
      key: "cedula",
      align: "center",
      width: 120,
      sorter: (a, b) => a.cedula.localeCompare(b.cedula),
    },
    {
      title: "Proyecto(obra)",
      dataIndex: "descripcion_proyecto",
      key: "descripcion_proyecto",
      sorter: (a, b) =>
        a.descripcion_proyecto.localeCompare(b.descripcion_proyecto),
    },
    {
      title: "Fecha programacion",
      dataIndex: "fecha_programacion",
      key: "fecha_programacion",
      sorter: (a, b) =>
        a.fecha_programacion.localeCompare(b.fecha_programacion),
    },
    {
      title: "Estado",
      dataIndex: "activo",
      key: "activo",
      align: "center",
      render: (
        _: any,
        record: { key: React.Key; activo: string; confirmacion: string }
      ) => {
        return (
          <>
            {record.confirmacion === "1" ? (
              <Tooltip title="La asistencia fue confirmada con éxito">
                <Button
                  disabled={record.activo === "0"}
                  style={{ color: "white", background: "blue" }}
                  type="primary"
                  size="small"
                >
                  CONFIRMADA
                </Button>
              </Tooltip>
            ) : record.activo !== "1" ? (
              <Tooltip title="No se puede confirmar ya que no es el día de la programación del usuario">
                <Button
                  disabled={record.activo === "0"}
                  style={{ color: "white", background: "red" }}
                  type="primary"
                  size="small"
                >
                  NO HABILITADO
                </Button>
              </Tooltip>
            ) : (
              <ModalAsistencias
                dataTicket={record}
                fetchList={() => getAsistenciasConfirmar()}
                pushNotification={pushNotification}
              />
            )}
          </>
        );
      },
    },
  ];

  return (
    <StyledCard title={"Confirmar Asistencia en las Obras"}>
      <SearchBar>
        <div style={{ display: "flex", width: "100%", gap: "10px" }}>
          <Input
            placeholder="Buscar"
            onChange={handleSearch}
            style={{ width: "40%" }}
          />
          <RangePicker
            format="DD-MM-YYYY"
            onChange={handleDateRangeChange}
            style={{ width: "30%" }}
          />
          <Select
            placeholder="Selecciona obra"
            onChange={handleSelectChange}
            allowClear
            style={{ width: "30%" }}
          >
            {prefijos.map((prefijo) => (
              <Option key={prefijo} value={prefijo}>
                {prefijo}
              </Option>
            ))}
          </Select>
        </div>
      </SearchBar>
      {/* <Table
        className="custom-table"
        rowKey={(record) => record.key}
        size="small"
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        scroll={{ x: "max-content" }}
        pagination={{
          total: dataSource?.length,
          showSizeChanger: true,
          defaultPageSize: 20,
          pageSizeOptions: ["5", "15", "30", "100"],
          showTotal: (total: number) => {
            return <Text>Total Registros: {total}</Text>;
          },
        }}
        bordered
      /> */}
      <Collapse accordion style={{ background: "#1a4c9e" }}>
        {Object.entries(groupedData).map(([fecha, registros]) => (
          <Panel
            header={`Programación del ${dayjs(fecha).format("DD-MM-YYYY")} - ${
              registros.length
            } personas`}
            key={fecha}
          >
            <Table
              className="custom-table"
              rowKey={(record) => record.key}
              size="small"
              dataSource={registros}
              columns={columns}
              pagination={false}
              bordered
            />
          </Panel>
        ))}
      </Collapse>
    </StyledCard>
  );
};
