import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";

//* User layout
import NotFound from "./pages/notfound/NotFound";
import GuestLayout from "./container/user/GuestLayout";
import Home from "./pages/user/Home";
import FindJob from "./pages/user/FindJob";
import PostAJob from "./pages/user/PostAJob";
import AboutUs from "./pages/user/AboutUs";
import ContactUs from "./pages/user/ContactUs";
import SignIn from "./pages/user/SignIn";
import UserLayout from "./container/user/UserLayout";
import MainFindJobs from "./pages/user/MainFindJobs";
import SavedJobs from "./pages/user/SavedJobs";
import JobApplications from "./pages/user/JobApplications";
import ApplicationDetails from "./pages/user/ApplicationDetails";
import ApplyForm from "./pages/user/ApplyForm";
import SignUpEmployer from "./features/user/signup-employer/SignUpEmployer";
import EmailVerification from "./features/user/emailverification/EmailVerification";
import CompleteProfile from "./pages/user/CompleteProfile";

//* Employer layout
import EmployerLayout from "./container/employer/EmployerLayout";
import Dashboard from "./pages/employer/Dashboard";
import PostedJob from "./pages/employer/PostedJob";
import JobsManagement from "./pages/employer/JobsManagement";
import JobsManagementView from "./pages/employer/JobsManagementView";
import Applications from "./pages/employer/Applications";
import AnalyticsReports from "./pages/employer/AnalyticsReports";
import UsersManagement from "./pages/employer/UsersManagement";
import PostJob from "./pages/employer/PostJob";
import ApplicationView from "./pages/employer/ApplicationView";
import UsersView from "./features/employer/usersmanagement/components/UsersView";
import ScheduleInterview from "./pages/employer/ScheduleInterview";
import CompanyProfile from "./pages/employer/CompanyProfile";
import { useAuth } from "./context/AuthProvider";
import { useRoutesContent } from "./hooks/useRoutesContent";
import React, { Suspense, useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authUser } = useAuth();

  if (!authUser?.token) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
};

const Routes: React.FC = () => {
  const { routes } = useRoutesContent();

  const dynamicUserRoutes = routes?.map((route) => {
    const LazyComponent = React.lazy(
      () => import(`../src/pages/user/${route.component}`)
    );
    return {
      path: route.path,
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <LazyComponent />
        </Suspense>
      ),
    };
  });

  const guestRoutes = [
    {
      path: "/",
      element: <GuestLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/find-job",
          element: <FindJob />,
        },
        {
          path: "/post-job",
          element: <PostAJob />,
        },
        {
          path: "/about-us",
          element: <AboutUs />,
        },
        {
          path: "/contact-us",
          element: <ContactUs />,
        },
        {
          path: "/sign-in",
          element: <SignIn />,
        },
        {
          path: "/sign-in/employer",
          element: <SignIn />,
        },
        {
          path: "/sign-up/employer",
          element: <SignUpEmployer />,
        },
        {
          path: "/sign-up/user",
          element: <SignUpEmployer />,
        },
      ],
    },
  ];

  const userRoutes = [
    {
      path: "/job-seeker/*",
      element: (
        <ProtectedRoute>
          <UserLayout />
        </ProtectedRoute>
      ),
      children: [
        ...(dynamicUserRoutes || []),
        // {
        //   index: true,
        //   path: "find-jobs",
        //   element: <MainFindJobs />,
        // },
        // {
        //   path: "saved-jobs",
        //   element: <SavedJobs />,
        // },
        // {
        //   path: "job-applications",
        //   element: <JobApplications />,
        // },
        // {
        //   path: "view-application/:id",
        //   element: <ApplicationDetails />,
        // },
        // {
        //   path: "apply-job/:id",
        //   element: <ApplyForm />,
        // },
        // // {
        // //   path: "/sign-up/employer/email-verification",
        // //   element: <EmailVerification />,
        // // },
        // {
        //   path: "employer/complete-profile",
        //   element: <CompleteProfile />,
        // },
      ],
    },
    {
      path: "/sign-up/user/email-verification",
      element: <EmailVerification />,
    },
    {
      path: "/user-profile",
      element: <CompleteProfile />,
    },
  ];

  const employerRoutes = [
    {
      path: "/app/*",
      element: (
        <ProtectedRoute>
          <EmployerLayout />
        </ProtectedRoute>
      ),
    },
    {
      path: "/sign-up/employer/email-verification",
      element: <EmailVerification />,
    },
    {
      path: "/app/company-profile",
      element: <CompanyProfile />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];

  const router = createBrowserRouter([
    ...guestRoutes,
    ...userRoutes,
    ...employerRoutes,
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
