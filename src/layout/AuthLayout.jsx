import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main className="h-full">
        <Outlet />
      </main>
    </>
  )
}

export default AuthLayout;