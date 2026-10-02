import { Button, Modal, rem } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import routeIcon from "../../assets/logos/SVG/zone_region_location.svg";
import { FormSection } from '../FormSection/FormSection';

export function AddButton() {
    const [isModalOpen, { open: openModal, close: closeModal }] =
        useDisclosure(false);

    return (
        <>
            <Button
                variant="light"
                radius="xl"
                size="md"
                leftIcon={<img src={routeIcon} style={{ width: "20px", height: "20px", filter: "invert(1)" }} />}
                styles={{
                    root: {
                        paddingRight: rem(14),
                        height: rem(30),
                        color: 'white',
                        backgroundColor: 'navy',
                    },
                }}
                onClick={openModal}
            >
                Add
            </Button>
            <Modal
                // title={<><IconMapPlus style={{ marginRight: '0.5rem' }} /> Add Group</>}
                title={<><img src={routeIcon} style={{ width: "20px", height: "20px", filter: "invert(1)", marginRight: '0.5rem' }} /> Add Group</>}
                opened={isModalOpen}
                onClose={closeModal}
            >
                <FormSection />
            </Modal>
        </>
    );
}
