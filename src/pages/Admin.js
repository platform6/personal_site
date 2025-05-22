import { Studio, StudioProvider } from 'sanity';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import SanityTest from '../components/SanityTest';

// Import schemas
import author from '../schemas/author';
import post from '../schemas/post';
import category from '../schemas/category';
import blockContent from '../schemas/blockContent';

const config = defineConfig({
  name: 'default',
  title: 'The Feedback Loop',
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: process.env.REACT_APP_SANITY_DATASET,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [post, author, category, blockContent],
  },
  basePath: '/admin',
  auth: {
    loginMethod: 'token',
    redirectOnSingle: true,
    storage: {
      type: 'cookie',
      name: 'sanitySession',
      options: {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        httpOnly: true,
      },
    },
    providers: [
      {
        name: 'sanity',
        title: 'Log in with Sanity',
        url: 'https://api.sanity.io/v1/auth/login',
      },
    ],
  },
});

// Wrap the Studio component with the auth check
const AdminStudio = () => {
  return (
    <div style={{ height: '100vh' }}>
      <SanityTest />
      <Studio config={config} />
    </div>
  );
};

// Main Admin component that provides the Sanity context
const Admin = () => {
  return (
    <StudioProvider config={config}>
      <AdminStudio />
    </StudioProvider>
  );
};

export default Admin;
