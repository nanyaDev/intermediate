import AuthCheck from '@/components/AuthCheck';

const Admin = () => {
  // pass
  return (
    <AuthCheck>
      <h1>Hello from Admin!</h1>
    </AuthCheck>
  );
};

export default Admin;
