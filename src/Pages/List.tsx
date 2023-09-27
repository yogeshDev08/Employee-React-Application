import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { personalDetailsUpdate, bankDetailsUpdate, experienceDetailUpdate } from '../Redux/employeeCrud'
import CustomModal from '../Component/CustomModal';
import CustomTypography from '../Component/customTypo';
import { EmployeeData } from '../Constants/interface';
import Card from '@mui/material/Card';
import { Button, Typography } from '@mui/material';

interface RenderListProps {
  list: EmployeeData[];
}

function ActionCellRender({ params }: any) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Link to={`/edit/${params.row.id}`}>
        <Button className='editButton animationBtn1' variant='contained'>
          Edit
        </Button>
      </Link>
      <Button className='deleteButton animationBtn1' onClick={() => setOpen(!open)}>
        Delete
      </Button>
      <CustomModal
        open={open}
        data={params.id}
        onClose={() => setOpen(!open)}
      />
    </>
  )
}
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 150 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 400,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 400,
    editable: false,
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 400,
    renderCell: (params: any) => <ActionCellRender params={params} />
  },
];

const ListPage = () => {
  const store = useSelector((state: any) => state.employee)
  const dispatch = useDispatch<any>()
  useEffect(() => {
    dispatch(personalDetailsUpdate(null))
    dispatch(bankDetailsUpdate(null))
    dispatch(experienceDetailUpdate(null))
  }, [])

  return (
    <>
      <Typography className='p-10' sx={{
        fontWeight: '700',
        fontSize: 'x-large'
      }} >Employee CRUD operations.</Typography>
      <RenderList list={store.list} />
    </>
  )
}

function RenderList({ list }: RenderListProps) {
  const navigate = useNavigate()
  return (
    <Box sx={{ height: "100vh", width: '100%' }}>
      <Card style={{ boxShadow: "1px 4px 10px -1px #000", padding: "1%" }}>
        <Button className="add-btn animationBtn1" color='primary' variant='contained' onClick={() => navigate('/add')}>
          Add
        </Button>
        <DataGrid
          rows={list}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
          sx={{ fontSize: "larger" }}
        />
      </Card>
    </Box>
  )
}

export default ListPage;