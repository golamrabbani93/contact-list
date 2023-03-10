import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
const SignIn = () => {
	const theme = createTheme();
	const navigate = useNavigate();

	//*Get Form data
	const {
		register,
		handleSubmit,
		formState: {errors},
		reset,
	} = useForm();
	//* Add signIn method
	const handleSignIn = (data) => {
		const {email, password} = data;
		const user = {
			email,
			password,
		};
		//* Check signin User data from databse
		fetch('https://contact-list-server.vercel.app/signin', {
			method: 'POST',
			headers: {
				'content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.status === 200) {
					toast.success('Sign in Successfull', {
						style: {
							border: '1px solid #D94A38',
							padding: '16px',
							color: '#D94A38',
							fontWeight: 'bold',
						},
					});
					//*Set Token To Local Storage
					window.localStorage.setItem('Token', data.data);
					navigate('/');
				}
				if (data.error) {
					toast.success(`${data.error}`, {
						style: {
							border: '1px solid #D94A38',
							padding: '16px',
							color: '#D94A38',
							fontWeight: 'bold',
						},
					});
				}
				reset();
			});
	};
	return (
		<ThemeProvider theme={theme}>
			<Grid container component="main" sx={{height: '100vh'}}>
				<CssBaseline />
				<Grid
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundImage: 'url(https://i.ibb.co/yNLQRmb/manu-image-1.jpg)',
						backgroundRepeat: 'no-repeat',
						backgroundColor: (t) =>
							t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				/>
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h3">
							Sign in
						</Typography>
						<Box component="form" noValidate onSubmit={handleSubmit(handleSignIn)} sx={{mt: 1}}>
							<TextField
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								{...register('email', {
									required: 'Please Enter Your Email',
								})}
							/>
							{errors.email && <small style={{color: 'red'}}>{errors.email.message}</small>}
							<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								{...register('password', {
									required: 'Please Enter Your password',
								})}
							/>
							{errors.password && <small style={{color: 'red'}}>{errors.password.message}</small>}
							{/* <FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me"
							/> */}
							<Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
								Sign In
							</Button>
							<Grid container>
								<Grid item xs>
									{/* <Link to="#" variant="body2">
										Forgot password?
									</Link> */}
								</Grid>
								<Grid item>
									<Link to="/signup" variant="body2">
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
							{/* <Copyright sx={{ mt: 5 }} /> */}
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
};

export default SignIn;
