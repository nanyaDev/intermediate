import { useState } from 'react';
import {
  Button,
  HStack,
  IconButton,
  Input,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { BiImageAdd, BiCopy } from 'react-icons/bi';

import { fireauth, firestorage } from '@/lib/firebase';

const ImageUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);
  const toast = useToast();

  const uploadFile = async (e) => {
    setUploading(true);

    const file = Array.from(e.target.files)[0];
    const extension = file.type.split('/')[1];

    const ref = firestorage.ref(
      `uploads/${fireauth.currentUser.uid}/${Date.now()}.${extension}`
    );

    ref
      .put(file)
      .then((_) => ref.getDownloadURL())
      .then((url) => {
        setDownloadURL(url);
        setUploading(false);
      });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`![alt](${downloadURL})`);
    toast({ title: 'Copied to Clipboard', status: 'success', duration: 3000 });
  };

  return (
    <HStack spacing={4}>
      <Button
        as="label"
        colorScheme="purple"
        cursor="pointer"
        rightIcon={<BiImageAdd />}
        isLoading={uploading}
      >
        Upload Image
        <Input
          type="file"
          onChange={uploadFile}
          accept="image/x-png, image/gif, image/jpeg"
          d="none"
        />
      </Button>
      {downloadURL && (
        <Tooltip hasArrow label="Copy">
          <IconButton
            icon={<BiCopy />}
            colorScheme="purple"
            variant="outline"
            aria-label="copy image URL"
            onClick={copyToClipboard}
          />
        </Tooltip>
      )}
    </HStack>
  );
};

export default ImageUploader;
