
const AuthLayout = ({
    children
  }: {
    children: React.ReactNode
  }) => {
    return (
      <div className="flex min-h-screen flex-1 flex-col items-center justify-center bg-muted">
        {children}
      </div>
     );
  }

  export default AuthLayout;
