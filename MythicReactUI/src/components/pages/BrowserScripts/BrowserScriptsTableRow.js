import React, {useEffect} from 'react';
import {Button, Switch} from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { MythicDialog } from '../../MythicComponents/MythicDialog';
import {EditScriptDialog} from './EditScriptDialog';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {MythicConfirmDialog} from '../../MythicComponents/MythicConfirmDialog';
import {useTheme} from '@mui/material/styles';

export function BrowserScriptsTableRow(props){
    const theme = useTheme();
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const onSubmitEdit = ({script, command_id, payload_type_id}) => {
        props.onSubmitEdit({browserscript_id: props.id, script, command_id, payload_type_id});
    }
    const onRevert = () => {
        props.onRevert({browserscript_id: props.id, script: props.container_version});
    }
    const onToggleActive = () => {
        props.onToggleActive({browserscript_id: props.id, active: !props.active});
    }
    const onConfirmDelete = () => {
        props.onDelete({browserscript_id: props.id})
    }
    return (
        <React.Fragment>
            <TableRow key={"payload" + props.id} hover>
                <TableCell>
                    <IconButton size="small" onClick={()=>{setOpenDeleteDialog(true);}} style={{color: theme.palette.error.main}} variant="contained"><DeleteIcon/></IconButton>
                    <MythicConfirmDialog onClose={() => {setOpenDeleteDialog(false);}} onSubmit={onConfirmDelete} open={openDeleteDialog}/>
                </TableCell>
                <TableCell>
                    <Switch
                        checked={props.active}
                        onChange={onToggleActive}
                        color="primary"
                        inputProps={{ 'aria-label': 'checkbox', "track": "white" }}
                        name="Active"
                      />
                </TableCell>
                <TableCell>{props.payloadtype.name}</TableCell>
                <TableCell>{props.command.cmd}</TableCell>
                <TableCell>{props.author}</TableCell>
                <TableCell>{props.user_modified ? "User Modified" : "" } </TableCell>
                <TableCell><Button size="small" variant="contained" onClick={ () => {setOpenEdit(true);} } color="primary"> Edit </Button></TableCell>
                {openEdit &&
                    <MythicDialog fullWidth={true} maxWidth="xl" open={openEdit} 
                        onClose={()=>{setOpenEdit(false);}} 
                        innerDialog={
                            <EditScriptDialog me={props.me} onClose={()=>{setOpenEdit(false);}} payload_type_id={props.payloadtype.id} command_id={props.command.id}
                                script={props.script} onSubmitEdit={onSubmitEdit} onRevert={onRevert} author={props.author}/>
                        } />
                    }
            </TableRow>
        </React.Fragment>
        )
}

