import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormLabel, Select, TextField } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useState } from 'react'
import { useStoreContext } from '../../providers/StoreProvider'

const NewTaskDialog = ({ open, handleClose = () => { }, activeSection }) => {
    const { users, boards } = useStoreContext()
    const [formState, setFormState] = useState({})

    const updateFormState = useCallback((event) => {
        const { name, value } = event.target;

        setFormState(prevState => ({
            ...prevState, [name]: value ? value : ''
        }));
    }, [setFormState])

    const addNewTask = useCallback((event) => {
        event.preventDefault();

        boards.active.addTask(activeSection, formState)
        setFormState({})
        handleClose();
    }, [activeSection, boards, formState, handleClose])

    const onCloseClick = useCallback(() => {
        setFormState({});
        handleClose();
    }, [handleClose, setFormState])




    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create A New Task</DialogTitle>
            <form onSubmit={addNewTask}>
                <DialogContent style={{ minWidth: 500 }}>
                    <Box p={1}>
                        <TextField
                            fullWidth
                            required
                            type='text'
                            name='title'
                            label='Title'
                            onChange={updateFormState}
                            value={formState?.title || ''} />

                    </Box>
                    <Box p={1}>
                        <TextField
                            fullWidth
                            required
                            type='text'
                            name='description'
                            label='Description'
                            onChange={updateFormState}
                            value={formState?.description || ''} />

                    </Box>
                    <Box p={1}>
                        <FormControl fullWidth>
                            <FormLabel>
                                Assignee
                            </FormLabel>

                            <Select
                                native
                                required
                                name='assignee'
                                value={formState?.assignee || ''}
                                onChange={updateFormState}
                            >
                                <option value='' disabled>-</option>
                                {
                                    users.list.map(user => (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    ))
                                }

                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color='secondary' onClick={onCloseClick}>Close</Button>
                    <Button type='submit' color='primary'>Create</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default observer(NewTaskDialog)