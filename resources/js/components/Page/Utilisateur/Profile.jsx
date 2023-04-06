import React from 'react';
import { Paper, Text, TextInput, Textarea, Button, Group, SimpleGrid, createStyles } from '@mantine/core';



const useStyles = createStyles((theme) => {
    const BREAKPOINT = theme.fn.smallerThan('sm');

    return {
        profile : {
            minHeight: "100vh",
        },
      wrapper: {
        display: 'flex',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        padding: '1rem',
        border: `${'1rem'} solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
        }`,

        [BREAKPOINT]: {
          flexDirection: 'column',
        },
      },

      form: {
        boxSizing: 'border-box',
        flex: 1,
        padding: theme.spacing.xl,
        paddingLeft: `calc(${theme.spacing.xl} * 2)`,
        borderLeft: 0,

        [BREAKPOINT]: {
          padding: theme.spacing.md,
          paddingLeft: theme.spacing.md,
        },
      },

      fields: {
        marginTop: "1rem",
      },

      fieldInput: {
        flex: 1,

        '& + &': {
          marginLeft: theme.spacing.md,

          [BREAKPOINT]: {
            marginLeft: 0,
            marginTop: theme.spacing.md,
          },
        },
      },

      fieldsGroup: {
        display: 'flex',

        [BREAKPOINT]: {
          flexDirection: 'column',
        },
      },

      contacts: {
        boxSizing: 'border-box',
        position: 'relative',
        borderRadius: theme.radius.lg,
        background: `orange`,
        padding: theme.spacing.xl,
        flex: "0 0 20rem",

        [BREAKPOINT]: {
          marginBottom: theme.spacing.sm,
          paddingLeft: theme.spacing.md,
        },
      },

      title: {
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,

        [BREAKPOINT]: {
          marginBottom: theme.spacing.xl,
        },
      },

      control: {
        [BREAKPOINT]: {
          flex: 1,
        },
      },
    };
  });

const Profile = () => {

    const { classes } = useStyles();

    return (
        <div className={classes.profile}>
            <Paper shadow="md" radius="lg">
            <div className={classes.wrapper}>
                <div className={classes.contacts}>
                <Text fz="lg" fw={700} className={classes.title} c="#fff">
                    Contact information
                </Text>
                </div>

                <form className={classes.form} onSubmit={(event) => event.preventDefault()}>
                <Text fz="lg" fw={700} className={classes.title}>
                    Get in touch
                </Text>

                <div className={classes.fields}>
                    <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                    <TextInput label="Your name" placeholder="Your name" />
                    <TextInput label="Your email" placeholder="hello@mantine.dev" required />
                    </SimpleGrid>

                    <TextInput mt="md" label="Subject" placeholder="Subject" required />

                    <Textarea
                    mt="md"
                    label="Your message"
                    placeholder="Please include all relevant information"
                    minRows={3}
                    />

                    <Group position="right" mt="md">
                    <Button type="submit" className={classes.control}>
                        Send message
                    </Button>
                    </Group>
                </div>
                </form>
            </div>
            </Paper>
        </div>
    );
};

export default Profile;
