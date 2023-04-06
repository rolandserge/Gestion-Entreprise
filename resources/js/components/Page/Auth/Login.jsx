import React, { useRef } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Text, Container, Group, Button } from '@mantine/core';

const Login = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { setSession } = useContext(AuthContext)
    const navigate =  useNavigate()

    const AddLogin = async (e) => {

        e.preventDefault();
        const email = emailRef.current.value
        const password = passwordRef.current.value
        axios.get('/sanctum/csrf-cookie').then()
        try {
            const response = await axios.post("/api/user/login", {
                email: email, password: password
            });

            if(response.data.status == 200) {

                setSession(response.data.user)
                navigate("/user/projets/view-projets")

             } else if (response.data.status == 401) {

                  console.log(response.data.message);
             }

        } catch (error) {
             console.log(error);
        }

    }


    return (
        <div>
            <Container size={420} my={40}>
            <Title
              align="center"
              sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 600 })}
            >
              Content de vous revoir!
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
            Vous n'avez pas encore de compte?{' '}
              <Anchor size="sm" component="button">
                Creer un compte
              </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
              <TextInput label="Email" ref={emailRef} placeholder="you@mantine.dev" required />
              <PasswordInput ref={passwordRef} label="Mot de passe" placeholder="Votre mot de passe" required mt="md" />
              <Group position="apart" mt="lg">
                <Checkbox label="Se souvenir de moi" />
                <Anchor component="button" size="sm">
                  Mot de passe oublié?
                </Anchor>
              </Group>
              <Button onClick={AddLogin} fullWidth mt="xl">
                Se connecter
              </Button>
            </Paper>
          </Container>
        </div>
    );
};

export default Login;
