import React from 'react';
import { Box, VStack, Heading } from '@chakra-ui/react';

const Toddler = () => {
  return (
    <Box p={25}>
      <VStack spacing={2}>
        <Heading>Toddler Routine App Features</Heading>
        <Box>
          <strong>User Authentication:</strong> Sign up and log in for parents,
          password recovery options.
        </Box>
        <Box>
          <strong>Profile Management:</strong> Create and manage profiles for
          multiple toddlers, customizable profile pictures.
        </Box>
        <Box>
          <strong>Routine Management:</strong> Add, edit, and delete routine
          tasks, schedule tasks for specific times, repeat tasks daily, weekly,
          etc.
        </Box>
        <Box>
          <strong>Reminders and Notifications:</strong> Push notifications for
          upcoming tasks, visual and audio reminders.
        </Box>
        <Box>
          <strong>Task Completion Tracking:</strong> Mark tasks as completed,
          track daily and weekly task completion, progress reports for parents.
        </Box>
        <Box>
          <strong>Customizable Routine Templates:</strong> Predefined templates
          for common routines, ability to create custom routines.
        </Box>
        <Box>
          <strong>Interactive and Engaging Features:</strong> Visual timers for
          tasks, reward system (e.g., stickers, badges), interactive animations
          and sounds.
        </Box>
        <Box>
          <strong>Parental Controls:</strong> Lock certain features behind a
          parental control screen, set up and manage routines only accessible to
          parents.
        </Box>
        <Box>
          <strong>Offline Functionality:</strong> Basic functionality available
          offline, sync data when the device is back online.
        </Box>
        <Box>
          <strong>Support and Feedback:</strong> In-app support for technical
          issues, feedback form for suggestions and improvements.
        </Box>
      </VStack>
    </Box>
  );
};

export default Toddler;
