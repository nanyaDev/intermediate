import { IconButton } from '@chakra-ui/button';
import { FaHeart } from 'react-icons/fa';

const HeartButton = ({ onClick, color }) => (
  <IconButton
    icon={<FaHeart size={24} />}
    variant="ghost"
    size="lg"
    borderRadius="100%"
    aria-label="heart"
    color={color || null}
    onClick={onClick}
  />
);

export default HeartButton;
