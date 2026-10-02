import React from 'react'
import { Footer, Flex, Text } from "@mantine/core"
import truboardLogo from "../../../../assets/img/TruBoardPartners_Logo_Colour.svg"
const FooterComponent = () => {
    return (
        <Footer height={50}>
            <Flex justify={"flex-end"} gap={10} align={"center"} style={{ marginTop: "0px", marginRight: "20px" }}>
                <Text size={"10px"}>Powered by</Text>
                <img width={150} src={truboardLogo} alt="Truboard Partners Logo" height={60} />
            </Flex>
        </Footer>
    )
}

export default FooterComponent;