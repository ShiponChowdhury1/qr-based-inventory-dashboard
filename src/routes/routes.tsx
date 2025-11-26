import App from "@/App";
import AboutUsPage from "@/pages/AboutUsPage";
import SettingsPage from "@/pages/SettingPage";
import EditAboutUsPage from "@/pages/EditAboutUsPage";
import EditPrivacyPolicyPage from "@/pages/EditPrivacyPolicyPage";
import ForgotPasswordPage from "@/pages/FotgotPasswordPage";
import OTPVerificationPage from "@/pages/OTPVerificationPage";
import { ResetPasswordPage } from "@/pages/ResetPasswordPage";
import SignInPage from "@/pages/SigninPage";
import { createBrowserRouter } from "react-router-dom";
import ProductsPage from "@/pages/ProductsPage";
import CategoriesPage from "@/pages/CategoriesPage";
import CustomersPage from "@/pages/CustomersPage";
import PersonalInformationPage from "@/pages/PersonalInformationPage";
import EditPersonalInformationPage from "@/pages/EditPersonalInformationPage";
import NotFoundPage from "@/pages/NotFoundPage";
import DashboardPage from "@/pages/DashboardPage";
import { ChangePasswordPage } from "@/pages/ChangePasswordPage";
import TermsConditionPage from "@/pages/TermsConditionPage";
import EditTermsConditionPage from "@/pages/EditTermsConditionPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import Assign from "@/pages/Assign";
import PrivateRoute from "@/components/auth/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/products",
        element: (
          <PrivateRoute>
            <ProductsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/categories",
        element: (
          <PrivateRoute>
            <CategoriesPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/customers",
        element: (
          <PrivateRoute>
            <CustomersPage />
          </PrivateRoute>
        ),
      },
       {
        path: "/assign",
        element: (
          <PrivateRoute>
            <Assign />
          </PrivateRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <PrivateRoute>
            <SettingsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/settings/personal-information",
        element: (
          <PrivateRoute>
            <PersonalInformationPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/settings/personal-information/edit",
        element: (
          <PrivateRoute>
            <EditPersonalInformationPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/settings/change-password",
        element: (
          <PrivateRoute>
            <ChangePasswordPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/settings/terms-condition",
        element: (
          <PrivateRoute>
            <TermsConditionPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/settings/terms-condition/edit",
        element: (
          <PrivateRoute>
            <EditTermsConditionPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/settings/privacy-policy",
        element: (
          <PrivateRoute>
            <PrivacyPolicyPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/settings/privacy-policy/edit",
        element: (
          <PrivateRoute>
            <EditPrivacyPolicyPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/settings/about-us",
        element: (
          <PrivateRoute>
            <AboutUsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/settings/about-us/edit",
        element: (
          <PrivateRoute>
            <EditAboutUsPage />
          </PrivateRoute>
        ),
      },
      
    ],
  },
  {
    path: "signin",
    element: <SignInPage />,
  },
  {
    path: "forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "otp-verification",
    element: <OTPVerificationPage />,
  },
  {
    path: "reset-password",
    element: <ResetPasswordPage />,
  },
   {
    path: "change-password",
    element: <ChangePasswordPage />,
  },
]);

export default router;
