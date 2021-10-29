import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Divider,
  Center,
  Spinner,
  Grid,
  Link,
} from '@chakra-ui/react';

export default function Dev({
  profile,
  renderEducation,
  renderSkills,
  renderExperience,
}) {
  const renderTwitter = () => {
    return (
      <Box p="0.6rem">
        <a
          href={`https://www.twitter.com/${profile.social.twitter}`}
          target="blank">
          <i
            className="fab fa-twitter"
            style={{ color: '#1da1f2', fontSize: '1.5rem' }}></i>
        </a>
      </Box>
    );
  };

  const renderFacebook = () => {
    return (
      <Box p="0.6rem">
        <a
          href={`https://www.facebook.com/${profile.social.facebook}`}
          target="blank">
          <i
            className="fab fa-facebook"
            style={{ color: '#4267b2', fontSize: '1.5rem' }}></i>
        </a>
      </Box>
    );
  };

  const renderLinkedin = () => {
    return (
      <Box p="0.6rem">
        <a
          href={`https://www.linkedin.com/${profile.social.linkedin}`}
          target="blank">
          <i
            className="fab fa-linkedin"
            style={{ color: '#006192', fontSize: '1.5rem' }}></i>
        </a>
      </Box>
    );
  };

  const renderYoutube = () => {
    return (
      <Box p="0.6rem">
        <a
          href={`https://www.youtube.com/${profile.social.youtube}`}
          target="blank">
          <i
            className="fab fa-youtube"
            style={{ color: '#ff0000', fontSize: '1.5rem' }}></i>
        </a>
      </Box>
    );
  };

  const renderInstagram = () => {
    return (
      <Box p="0.6rem">
        <a
          href={`https://www.instagram.com/${profile.social.instagram}`}
          target="blank">
          <i
            className="fab fa-instagram"
            style={{ color: '#833ab4', fontSize: '1.5rem' }}></i>
        </a>
      </Box>
    );
  };

  const renderGitHub = () => {
    return (
      <Box p="0.6rem">
        <a
          href={`https://www.github.com/${profile.githubusername}`}
          target="blank">
          <i
            className="fab fa-github"
            style={{ color: '#171515', fontSize: '1.5rem' }}></i>
        </a>
      </Box>
    );
  };

  if (!profile) {
    return (
      <Box h="calc(100vh - 130px)">
        <Flex justify="center" align="center" h="100%">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="#f8f1f1"
            color="#19456b"
            size="xl"
          />
        </Flex>
      </Box>
    );
  }

  return (
    <Flex align="center" direction=" column">
      <Box w="60%">
        <Box
          textAlign="center"
          bg="#def6ef"
          border="1px solid"
          borderRadius="5px"
          m="1rem">
          <Heading my="0.5rem" fontWeight="700" fontSize="2rem" color="#11698e">
            {profile.user.name}
          </Heading>
          <Text fontSize="1.2rem" fontWeight="600">
            {profile.status}
          </Text>
          <Text fontSize="1.2rem" p="0.5rem" fontWeight="600">
            {profile.location}
          </Text>
          <Flex justify="space-evenly" my="0.75rem">
            <Box>
              <Heading
                fontSize="1.2rem"
                fontWeight="600"
                display="inline"
                color="#11698e">
                Company:{' '}
              </Heading>
              <Text display="inline" fontWeight="600">
                {profile.company}
              </Text>
            </Box>
            <Box>
              <Heading
                fontSize="1.2rem"
                fontWeight="600"
                display="inline"
                color="#11698e">
                Website:{' '}
              </Heading>
              <Link
                display="inline"
                fontWeight="600"
                href={`${profile.website}`}
                target="blank"
                _focus={{ outline: 'none' }}>
                {profile.website}
              </Link>
            </Box>
          </Flex>
          <Flex justify="space-evenly" mb="0.5rem" mt="1rem">
            {profile.social?.twitter ? renderTwitter() : null}
            {profile.social?.facebook ? renderFacebook() : null}
            {profile.social?.youtube ? renderYoutube() : null}
            {profile.social?.linkedin ? renderLinkedin() : null}
            {profile.social?.instagram ? renderInstagram() : null}
            {profile?.githubusername ? renderGitHub() : null}
          </Flex>
        </Box>
        <Box
          textAlign="center"
          border="1px solid"
          borderRadius="5px"
          bg="#e9f5f9"
          m="1rem"
          p="1rem">
          <Heading fontWeight="600" fontSize="2rem" mb="0.5rem" color="#11698e">
            Bio
          </Heading>
          <Text fontWeight="600">
            {profile.bio ? profile.bio : 'No bio provided by user'}
          </Text>
          <Center>
            <Divider orientation="horizontal" m="1rem" />
          </Center>
          <Heading fontWeight="600" fontSize="2rem" mb="1rem" color="#11698e">
            Skills
          </Heading>
          <Center>
            {profile.skills.length === 0 ? (
              <Text fontWeight="600">No skills info provided by user</Text>
            ) : (
              <Grid
                templateColumns="repeat(3, 0fr)"
                columnGap="6rem"
                rowGap="1rem">
                {renderSkills()}
              </Grid>
            )}
          </Center>
        </Box>
        <Flex>
          <Box
            textAlign="center"
            border="1px solid"
            borderRadius="5px"
            bg="#e9f5f9"
            m="1rem"
            w="48%">
            <Heading
              fontWeight="600"
              fontSize="2rem"
              my="0.5rem"
              color="#11698e">
              Experience
            </Heading>
            {profile.experience.length === 0 ? (
              <Text fontWeight="600">No experience info provided by user</Text>
            ) : (
              <Box>{renderExperience()}</Box>
            )}
          </Box>

          <Box
            textAlign="center"
            border="1px solid"
            borderRadius="5px"
            bg="#e9f5f9"
            m="1rem"
            w="48%">
            <Heading
              fontWeight="600"
              fontSize="2rem"
              my="0.5rem"
              color="#11698e">
              Education
            </Heading>
            {profile.education.length === 0 ? (
              <Text fontWeight="600">No education info provided by user</Text>
            ) : (
              <Box>{renderEducation()}</Box>
            )}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
