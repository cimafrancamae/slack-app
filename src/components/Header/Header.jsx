import { Flex, Input, Avatar, IconButton } from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';
import logo from '../../../public/slack-logo.png'

const Header = () => {
  return (
    <Flex 
      justify="space-between" 
      align="center" 
      p="4" 
      boxShadow="md"
    >
      <div>
        <img src={logo} className='header-logo' title='logo' />
      </div>

      <Input placeholder="Search..." maxW="xs" mr="4" />

      <Flex align="center">
        <IconButton aria-label="Search notifications" icon={<BellIcon />} mr="4" />
        <Avatar size="sm" name="User" />
      </Flex>
    </Flex>
  );
};

export default Header;
