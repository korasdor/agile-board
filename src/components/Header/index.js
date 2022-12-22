import { AppBar, FormControl, Grid, Select, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useStoreContext } from '../../providers/StoreProvider'
import User from '../common/User'

const Header = () => {
    const { boards, users } = useStoreContext()

    return (
        <AppBar position='static'>
            <Toolbar variant='dense'>
                <Grid container justifyContent='space-between' alignItems='center'>
                    <Grid item>
                        <Box display='flex' alignItems='center'>
                            <Typography variant='h6'>
                                Dashboard:
                            </Typography>
                            <FormControl>
                                <Select
                                    style={{
                                        backgroundColor: '#ffffff',
                                        marginLeft: 10,
                                    }}
                                    native
                                    value={boards.active?.id || ''}
                                    onChange={(event) => {
                                        const { value } = event.target;

                                        boards.selectBoard(value);

                                    }}>
                                    <option value='' disabled>-</option>
                                    {
                                        boards.list.map(board => (
                                            <option key={board.id} value={board.id}>{board.title}</option>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid>
                        <User user={users?.me} />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default observer(Header)