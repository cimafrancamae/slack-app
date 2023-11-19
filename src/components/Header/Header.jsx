import { Flex, Input, Avatar, AvatarBadge, IconButton, Popover, PopoverTrigger, PopoverContent } from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';
import logo from '../../../public/slack-logo.png'
import LogoutPopover from './components/LogoutPopover';
import { useState } from 'react';

const Header = ({ signedInUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handlePopOver = () => {
    console.log(isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  }

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

      <Input 
        placeholder="Search..." 
        maxW="lg" 
        mr="4" 
        size="xs" 
      />

      <Flex align="center">
        <IconButton 
          aria-label="Search notifications" 
          icon={<BellIcon />} 
          mr="4" 
          size="xs"
        />
        <Popover placement="bottom-end">
          <PopoverTrigger>
            <Avatar 
              size="xs" 
              name={signedInUser} 
              cursor="pointer" 
              onClick={handlePopOver}
            >
              <AvatarBadge boxSize='1.25em' bg='green.500' />
            </Avatar>
          </PopoverTrigger>
          <PopoverContent w="max-content" minW="200px" borderColor="gray.300">
            <LogoutPopover 
              handlePopOver={handlePopOver} 
              signedInUser={signedInUser} 
            />
          </PopoverContent>
        </Popover>
      </Flex>
    </Flex>
  );
};

export default Header;
