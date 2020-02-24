import React, { useState } from 'react';
import {Button, Card, CardContent, Checkbox, Divider, FormControl, FormControlLabel, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimate} from '@fuse';
import {useForm} from '@fuse/hooks';
import {Link, Redirect } from 'react-router-dom';
import clsx from 'clsx';
import { useCookies } from 'react-cookie';

const useStyles = makeStyles(theme => ({
    root: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
        color     : theme.palette.primary.contrastText
    }
}));

function Login()
{
    const classes = useStyles();

    const [ redir, setRedir ] = useState(false)
    const [ cookies, setCookie ] = useCookies(['user'])

    const {form, handleChange, resetForm} = useForm({
        email   : '',
        password: '',
        remember: true
    });

    function isFormValid()
    {
        return (
            form.email.length > 0 &&
            form.password.length > 0
        );
    }

    function handleSubmit(ev)
    {
        ev.preventDefault();
        fetch('http://localhost:3000/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: form.email,
                password: form.password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data[0] === 'success') {
                // setName(data[1].username)
                setCookie('user', data[1].username, { path: '/' });
                setRedir(!redir);
            }
        })
        resetForm();
    }

    if(redir === false ){
        return (
        <div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 p-24 md:flex-row md:p-0")}>

            <div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">

                <FuseAnimate animation="transition.expandIn">
                    <img className="w-128 mb-32" src="assets/images/logos/fuse.svg" alt="logo"/>
                </FuseAnimate>

                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <Typography variant="h3" color="inherit" className="font-light">
                        Welcome to MONOGRAPH!
                    </Typography>
                </FuseAnimate>

                <FuseAnimate delay={400}>
                    <Typography variant="subtitle1" color="inherit" className="max-w-512 mt-16">
                    Read and socialize, amywhere, anytime!
                    </Typography>
                </FuseAnimate>
            </div>

            <FuseAnimate animation={{translateX: [0, '100%']}}>

                <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>

                    <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

                        <Typography variant="h6" className="md:w-full mb-32">LOGIN TO YOUR ACCOUNT</Typography>

                        <form
                            name="loginForm"
                            noValidate
                            className="flex flex-col justify-center w-full"
                            onSubmit={handleSubmit}
                        >

                            <TextField
                                className="mb-16"
                                label="Email"
                                autoFocus
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                            />

                            <TextField
                                className="mb-16"
                                label="Password"
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                            />

                            <div className="flex items-center justify-between">

                                <FormControl>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="remember"
                                                checked={form.remember}
                                                onChange={handleChange}/>
                                        }
                                        label="Remember Me"
                                    />
                                </FormControl>

                                <Link className="font-medium" to="/pages/auth/forgot-password">
                                    Forgot Password?
                                </Link>
                            </div>

                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                className="w-full mx-auto mt-16"
                                aria-label="LOG IN"
                                disabled={!isFormValid()}
                            >
                                LOGIN
                            </Button>

                        </form>

                        <div className="my-24 flex items-center justify-center">
                            <Divider className="w-32"/>
                            <span className="mx-8 font-bold">OR</span>
                            <Divider className="w-32"/>
                        </div>

                        <Button variant="contained" color="secondary" size="small"
                                className="normal-case w-192 mb-8">
                            Log in with Google
                        </Button>

                        <Button variant="contained" color="primary" size="small"
                                className="normal-case w-192">
                            Log in with Facebook
                        </Button>

                        <div className="flex flex-col items-center justify-center pt-32 pb-24">
                            <span className="font-medium">Don't have an account?</span>
                            <Link className="font-medium" to="/pages/auth/register">Create an account</Link>
                        </div>

                    </CardContent>
                </Card>
            </FuseAnimate>
        </div>
    );
    }
    else{
        return(
            <Redirect to='/pages/profile' />
        );
    }
}

export default Login;
