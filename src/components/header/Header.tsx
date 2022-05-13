import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { useActiveUser, useLogout } from '../../providers/authProvider/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/system'

const StyledButton = styled(Button, {})({
    color: '#FFF',
})

const StyledToolBar = styled(Toolbar, {})({
    display: 'flex',
    justifyContent: 'space-between',
})

export default function Header() {

    const activeUser = useActiveUser()
    const navigate = useNavigate()
    const logout = useLogout()

    return (
        <AppBar position='fixed' >
            <StyledToolBar >
                <StyledButton
                    onClick={() => navigate('/')}
                >
                    home
                </StyledButton>
                {activeUser && (
                    <>
                        <Typography variant="h6" color="inherit" component="div">
                            Hello {activeUser.email}
                        </Typography>
                        <StyledButton
                            onClick={logout}
                        >
                            logout
                        </StyledButton>
                    </>
                )}
                {!activeUser && (
                    <Box>
                        <StyledButton
                            onClick={() => navigate('/login')}
                        >
                            login
                        </StyledButton>
                        <StyledButton
                            onClick={() => navigate('/signup')}
                        >
                            signup
                        </StyledButton>
                    </Box>
                )}
            </StyledToolBar>
        </AppBar>
    )
}
