import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { listDataUpdate } from '../Redux/employeeCrud';
import { EmployeeData, SimpleDialogProps } from '../Constants/interface';
import { Button } from '@mui/material';


function CustomModal(props: SimpleDialogProps) {
    const dispatch = useDispatch<any>()
    const store = useSelector((state: any) => state.employee)
    const { onClose, open, data } = props;
    const handleClose = () => {
        onClose();
    };

    const handleDeleteEntity = (value: number) => {
        const list = store.list.filter((element: EmployeeData) => element.id !== value)
        dispatch(listDataUpdate(list))
        handleClose()
    }

    if (open) {
        return (
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Do you want to delete this Employee Details ?</DialogTitle>
                <div style={{ display: 'flex', justifyContent: "space-between", padding: "5%" }}>
                    <Button className="animationBtn1" onClick={() => handleDeleteEntity(Number(data))}>Yes</Button>
                    <Button className="animationBtn1" onClick={() => handleClose()}>No</Button>
                </div>
            </Dialog>
        );
    }
    return <></>
}

export default CustomModal



