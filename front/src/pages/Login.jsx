import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import axios from 'axios';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import Typography from '@mui/material/Typography';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import TypeAnimation from '../components/TypeAnimation';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(true);
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // const [typedText, setTypedText] = useState('');
  // const [percent, setPercent] = useState(0);
  const [filledBars, setFilledBars] = useState(0);
  const [isTypingPassword, setIsTypingPassword] = useState(false);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  // const words  = ["Loading"];
  // const containerVariants = {
  //   animate: {
  //     transition: {
  //       staggerChildren: 0.05,
  //     },
  //   },
  // };
  // const letterVariants = {
  //   initial: { y: 0 },
  //   animate: {
  //     y: [-5, 5, -5], // bounce up and down
  //     transition: {
  //       repeat: Infinity,
  //       repeatType: "loop",
  //       duration: 1.2,
  //       ease: "easeInOut",
  //     },
  //   },
  // };

  useEffect(() => {
    if (!showPopup) return;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setFilledBars(step);
      if (step >= 10) clearInterval(interval);
    }, 500);

    const closeTimer = setTimeout(() => {
      setShowPopup(false);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(closeTimer);
    };
  }, [showPopup]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      });

      const token = response.data.access_token;
      localStorage.setItem('token', token); // Save token for future requests
      localStorage.setItem('username', username);

      // You can redirect or update UI here
      // alert('✅ Logged in!');
      setMessage('You\'re in, pookie!');
      setSnackbarOpen(true);
      setTimeout(() => {
        window.location.href = '/home';
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <>
      {/* ✅ Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <AnimatePresence>
        {showPopup && (
          <motion.div
            key="popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'all',
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <Box
                sx={{
                  background: '#fff',
                  borderRadius: 4,
                  px: 4,
                  py: 3,
                  textAlign: 'center',
                  boxShadow: 4,
                  maxWidth: 300,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    justifyContent: 'center',
                    mt: 2,
                  }}
                >
                  {/* {words.map((word, i) => (
                    <motion.div
                      key={i}
                      variants={containerVariants}
                      initial="initial"
                      animate="animate"
                      style={{ display: "inline-flex", margin: "0 8px" }}
                    >
                      {word.split("").map((char, j) => (
                        <motion.span
                          key={j}
                          variants={letterVariants}
                          style={{ display: "inline-block" }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </motion.div>
                  ))} */}
                  {/* {Array.from({ length: 10 }).map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ backgroundColor: '#eee' }}
                      animate={{
                        backgroundColor: index < filledBars ? '#d81b60' : '#eee',
                        transition: { duration: 0.4 },
                      }}
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '4px',
                      }}
                    />
                  ))} */}
                </Box>
                <Typography
                  variant="h6"
                  className='default'
                  sx={{
                    color: '#111',
                    fontFamily: 'default',
                    fontWeight: 600,
                  }}
                >
                  <TypeAnimation
                    text='Babyyy a little trick for u'
                    speed={0.25}
                    loop={false}
                    delayBeforeStart={0}
                  />
                </Typography>
                <Typography
                  variant="body2"
                  className='default'
                  sx={{
                    mt: 1,
                    color: '#444',
                    fontFamily: 'default',
                  }}
                >
                  <TypeAnimation
                    text='Click on the page a few times to see my bubbles (≧◡≦)'
                    speed={0.25}
                    loop={false}
                    delayBeforeStart={0.4}
                  />

                </Typography>
              </Box>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Container sx={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 35% 50%, #870000 0%, #190a05 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#E0F7FA',
        flexDirection: 'column',
      }} maxWidth='xl' className="login-container">

        <motion.h2


          className='default'>Login </motion.h2>

        <Box
          sx={{
            background: 'rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 22px 0 rgba(0, 0, 0, 0.37)',
            p: 4,
            marginTop: 2,
            width: '100%',
            maxWidth: 300,
            color: '#E0F7FA',

          }}
        >


          <form className='login-form' onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              className='default'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className='default'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsTypingPassword(true)}
              onBlur={() => setIsTypingPassword(false)}
              // onChange={(e) => setIsTypingPassword(e.target.value.length > 0)}
              required
            />

            <button className="default login-btn" type="submit" >Login</button>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {isTypingPassword ? '🙈' : '👀'}
            </motion.div>
          </form>
        </Box>


        {error && <p className='default' style={{ color: '#E0F7FA', fontWeight: "bold", fontSize: '12px' }}>{error} !</p>}
      </Container>
    </>

  );
}

export default Login;
