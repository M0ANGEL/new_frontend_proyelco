import { useEffect, useState } from "react";
import { StyledCard } from "@/modules/common/layout/DashboardLayout/styled";
import { Button, Input, Popconfirm, Tag, Tooltip, Typography } from "antd";
import { Link, useLocation } from "react-router-dom";
// import { SearchBar } from "@/modules/common/components/FormDocuments/styled"
import Table, { ColumnsType } from "antd/es/table";
import { ButtonTag } from "@/modules/admin-usuarios/pages/usuarios/pages/ListUsuarios/styled";
import { EditOutlined, SyncOutlined } from "@ant-design/icons";
import useSessionStorage from "@/modules/common/hooks/useSessionStorage";
import { KEY_ROL } from "@/config/api";
import dayjs from "dayjs";
import { DeleteAmCliente, getAmClientes } from "@/services/administraClientes/AdministrarClientesApi";
import { SearchBar } from "@/modules/gestion-empresas/pages/empresas/pages/ListEmpresas/styled";

interface DataType {
  key: number;
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

const { Text } = Typography;

const ListClientes = () => {
  const location = useLocation();
  const [initialData, setInitialData] = useState<DataType[]>([]);
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [loadingRow, setLoadingRow] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { getSessionVariable } = useSessionStorage();
  const user_rol = getSessionVariable(KEY_ROL);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = () => {
    getAmClientes().then(({ data: { data } }) => {
      const categorias = data.map((categoria) => {
        return {
          key: categoria.id,
          emp_nombre: categoria.emp_nombre,
          estado: categoria.estado.toString(),
          nit: categoria.nit,
          direccion: categoria.direccion,
          telefono: categoria.telefono,
          cuenta_de_correo: categoria.cuenta_de_correo,
          nombre: categoria.nombre,
          id_user: categoria.id_user,
          created_at: dayjs(categoria?.created_at).format("DD-MM-YYYY HH:mm"),
          updated_at: dayjs(categoria?.updated_at).format("DD-MM-YYYY HH:mm"),
        };
      });

      setInitialData(categorias);
      setDataSource(categorias);
      setLoadingRow([]);
      setLoading(false);
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const filterTable = initialData?.filter((o: any) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );
    setDataSource(filterTable);
  };

  //cambio de estado
  const handleStatus = (id: React.Key) => {
    setLoadingRow([...loadingRow, id]);
    DeleteAmCliente(id)
      .then(() => {
        fetchCategorias();
      })
      .catch(() => {
        setLoadingRow([]);
      });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Nombre",
      dataIndex: "emp_nombre",
      key: "emp_nombre",
      sorter: (a, b) => a.emp_nombre.localeCompare(b.emp_nombre),
    },
    {
      title: "Nit",
      dataIndex: "nit",
      key: "nit",
    },
    {
      title: "Usuario Creo",
      dataIndex: "nombre",
      key: "nombre",
      sorter: (a, b) => a.nombre.localeCompare(b.nombre),
    },
    {
      title: "Telefono",
      dataIndex: "telefono",
      key: "telefono",
      sorter: (a, b) => a.telefono.localeCompare(b.telefono),
    },
    {
      title: "direccion",
      dataIndex: "direccion",
      key: "direccion",
      sorter: (a, b) => a.direccion.localeCompare(b.direccion),
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      align: "center",
      render: (_, record: { key: React.Key; estado: string }) => {
        let estadoString = "";
        let color;
        if (record.estado === "1") {
          estadoString = "ACTIVO";
          color = "green";
        } else {
          estadoString = "INACTIVO";
          color = "red";
        }
        return (
          <Popconfirm
            title="¿Desea cambiar el estado?"
            onConfirm={() => handleStatus(record.key)}
            placement="left"
          >
            <ButtonTag
              color={color}
              disabled={!["administrador"].includes(user_rol)}
            >
              <Tooltip title="Cambiar estado">
                <Tag
                  color={color}
                  key={estadoString}
                  icon={
                    loadingRow.includes(record.key) ? (
                      <SyncOutlined spin />
                    ) : null
                  }
                >
                  {estadoString.toUpperCase()}
                </Tag>
              </Tooltip>
            </ButtonTag>
          </Popconfirm>
        );
      },
      sorter: (a, b) => a.estado.localeCompare(b.estado),
    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      key: "acciones",
      align: "center",
      render: (_, record: { key: React.Key }) => {
        return (
          <Tooltip title="Editar">
            <Link to={`${location.pathname}/edit/${record.key}`}>
              <Button icon={<EditOutlined />} type="primary" />
            </Link>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <StyledCard
      title={"Lista de Clientes"}
      extra={
        <Link to={`${location.pathname}/create`}>
          <Button type="primary">Crear</Button>
        </Link>
      }
    >
      <SearchBar>
        <Input placeholder="Buscar" onChange={handleSearch} />
      </SearchBar>
      <Table
        className="custom-table"
        rowKey={(record) => record.key}
        size="small"
        dataSource={dataSource ?? initialData}
        columns={columns}
        loading={loading}
        pagination={{
          total: initialData?.length,
          showSizeChanger: true,
          defaultPageSize: 15,
          pageSizeOptions: ["5", "15", "30"],
          showTotal: (total: number) => {
            return <Text>Total Registros: {total}</Text>;
          },
        }}
        bordered
      />
    </StyledCard>
  );
};

export default ListClientes;
