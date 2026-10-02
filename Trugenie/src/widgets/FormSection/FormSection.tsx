import { Button, Group, Select, SimpleGrid, Table, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { TableRow } from '../tables/MantineTable/TableRow';

export function FormSection() {
    const form = useForm({
        initialValues: {
            name: '',
            selector1: '',
            selector2: '',
            selector3: '',
        },
        validate: {
            name: (value) => value.trim().length < 2,
            // selector:(value) => 
        },
    });

    return (
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        <form onSubmit={form.onSubmit(() => { })}>
            <Table>
                <tbody>
                    <SimpleGrid
                        mt="xl">

                        <TableRow
                            title={"Group"}
                            withAsterisk
                            value={
                                <TextInput
                                    placeholder="Group"
                                    name="name"
                                    // variant="filled"
                                    {...form.getInputProps("name")}
                                />
                            }
                        />
                        <TableRow
                            title={"Lead RM"}
                            withAsterisk
                            value={
                                <Select
                                    data={['React', 'Angular', 'Svelte', 'Vue']}
                                    placeholder="Select Lead RM"
                                    {...form.getInputProps('selector1')}
                                />
                            }
                        />
                        <TableRow
                            title={"RM 2"}
                            value={
                                <Select
                                    data={['React', 'Angular', 'Svelte',]}
                                    placeholder="Select RM 2"
                                    {...form.getInputProps('selector2')}
                                />
                            }
                        />
                        <TableRow
                            title={"RM 3"}
                            value={
                                <Select
                                    data={['React', 'Angular', 'Svelte', 'Vue']}
                                    placeholder="Select RM 3"
                                    {...form.getInputProps('selector3')}
                                />
                            }
                        />
                    </SimpleGrid>
                </tbody>
            </Table>

            <Group
                mt="xl"
                style={{ display: 'flex', justifyContent: 'center', paddingTop: "30px" }}
            >
                <Button type="submit" size="md" variant='outline' className='reset-btn-onhover'>
                    Reset
                </Button>
                <Button type="submit" size="md">
                    Submit
                </Button>
            </Group>
        </form>
    );
}