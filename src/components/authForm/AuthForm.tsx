import { useState } from 'react'
import { useAuthError, useLogin, useSetAuthError, useSignup } from '../../providers/authProvider/AuthProvider'
import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { Box, styled } from '@mui/system'
import { useTriggerSnackBar } from '../../providers/utilitiesProvider/UtilitiesProvider'

const StyledBox = styled(Box, {})({
    height: '100vh',
    display: 'flex',
    alignItems: 'center'
})

const FormBox = styled(Box, {})({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '100%',
    height: 250,
})

const AuthFormHeader = styled(Box, {})({
    backgroundColor: '#1976d2',
    height: '64px',
    color: '#FFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px 5px 0 0'
})

const StyledTypography = styled(Typography, {})({
    color: 'red'
})

export default function AuthForm({ type }: { type: 'login' | 'signup' }) {
    const authError = useAuthError()
    const setAuthError = useSetAuthError()

    const [{ email, password }, setAuthFormInfo] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthFormInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const authFnMap: { [key: string]: any } = {
        signup: useSignup,
        login: useLogin,
    }

    const submitFn = authFnMap[type]()

    const triggerSnackBar = useTriggerSnackBar()

    const handleSubmit = async () => {
        setAuthError(null)
        if (!email.trim() || !password.trim()) {
            triggerSnackBar('error', 'Please fill out all required fields')
            return
        }
        const res = await submitFn({ email, password })
        if (res.ok) setAuthFormInfo({ email: '', password: '' })
    }

    return (
        <StyledBox>
            <Grid container justifyContent='center' >
                <Grid item lg={3.5} md={4} sm={6} xs={11} >
                    <Paper elevation={5}>
                        <AuthFormHeader>
                            <Typography variant='subtitle1' sx={{ textTransform: 'uppercase' }} >
                                {type}
                            </Typography>
                        </AuthFormHeader>
                        <FormBox >
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    handleSubmit()
                                }}
                            >
                                <Grid
                                    container
                                    direction='column'
                                    alignItems='center'
                                    rowSpacing='20px'
                                >
                                    <Grid item >
                                        <TextField
                                            name='email'
                                            value={email}
                                            size='small'
                                            label='email'
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item >
                                        <TextField
                                            name='password'
                                            value={password}
                                            type='password'
                                            size='small'
                                            label='password'
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item >
                                        <Button
                                            type='submit'
                                            //height and width here are exact same as TextField size small
                                            sx={{ width: '222.67px', height: '40px' }}
                                        >
                                            submit
                                        </Button>
                                    </Grid>
                                    <StyledTypography>{authError}</StyledTypography>
                                </Grid>
                            </form>
                        </FormBox>
                    </Paper>
                </Grid>
            </Grid>
        </StyledBox>
    )
}
