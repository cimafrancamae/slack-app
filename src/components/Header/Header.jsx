import { Flex, Input, Avatar, AvatarBadge, IconButton, Popover, PopoverTrigger, PopoverContent, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { BellIcon, SearchIcon } from '@chakra-ui/icons';
import logo from '../../../public/slack-logo.png'
import LogoutPopover from './components/LogoutPopover';
import { useState } from 'react';

const Header = ({ signedInUser }) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handles Popup Menu at header avatar
  const handlePopOver = () => {
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
      <InputGroup size="xs" maxW="md" mr={4}>
        <InputLeftElement>
          <SearchIcon color="gray.500"  />
        </InputLeftElement>
        <Input 
          type="search"
          placeholder="Search..." 
        />
      </InputGroup>
      <Flex align="center">
        <IconButton 
          aria-label="Search notifications" 
          icon={<BellIcon />} 
          mr="4" 
          size="xs"
        />
        <Popover placement="bottom-end" >
          <PopoverTrigger>
            <Avatar 
              size="xs" 
              borderRadius="5"
              name={signedInUser} 
              cursor="pointer" 
              onClick={handlePopOver}
            >
              <AvatarBadge boxSize='1.25em' bg='green.500' />
            </Avatar>
          </PopoverTrigger>
          <PopoverContent 
            w="max-content" 
            minW="200px" 
            borderColor="gray.300" 
            boxShadow="lg"
          >
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
