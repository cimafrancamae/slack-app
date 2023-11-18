import { Flex, Input, Avatar, IconButton } from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';
import logo from '../../../public/slack-logo.png'

const Header = () => {
  return (
    <Flex 
      justify="space-between" 
      align="center" 
      paddingY="2"
      paddingX="4" 
      boxShadow="md"
    >
      <div>
        <img src={logo} className='header-logo' title='logo' />
      </div>

      <Input placeholder="Search..." maxW="lg" mr="4" size="xs" />

      <Flex align="center">
        <IconButton aria-label="Search notifications" icon={<BellIcon />} mr="4" size="xs"/>
        <Avatar size="xs" name="User" />
      </Flex>
    </Flex>
  );
};

export default Header;
