import {
  Button,
  PopoverHeader,
  PopoverBody,
  Avatar,
  Menu,
  MenuButton,
  Flex,
  Text
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function LogoutPopover({ signedInUser, handlePopOver }) {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
        handlePopOver();
    };
    
    return (
        <>
            <PopoverHeader border="1px solid" borderColor="gray.300">
                <Flex 
                    gap="5px"
                    alignItems="center"
                    paddingY="2"
                >
                    <Avatar name={signedInUser} size="sm" borderRadius={5} />
                    <Text fontSize="md" fontWeight="bold">{signedInUser}</Text>
                </Flex>
            </PopoverHeader>
            <PopoverBody>
            <Menu>
                <Flex 
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                >
                    <MenuButton 
                        as={Button} 
                        variant="ghost" 
                        w="100%" 
                        textAlign="left" 
                        onClick={handleLogout}
                    >
                        Sign Out
                    </MenuButton>
                </Flex>
            </Menu>
            </PopoverBody>
        </>
       
    );
}

export default LogoutPopover;