import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppShell from '@platform/components/layout/AppShell.jsx';

// Each feature is its own isolated module under src/features/<name>, loaded on
// demand via its index.js public entry point — no feature is bundled until its
// route is actually visited, the same boundary a real micro-frontend would have.
const Home = lazy(() => import('@features/home'));
const Dashboard = lazy(() => import('@features/dashboard'));
const Grades = lazy(() => import('@features/grades'));
const Attendance = lazy(() => import('@features/attendance'));
const Canteen = lazy(() => import('@features/canteen'));
const Library = lazy(() => import('@features/library'));
const Customize = lazy(() => import('@features/customize'));
const Profile = lazy(() => import('@features/profile'));
const Settings = lazy(() => import('@features/settings'));
const Search = lazy(() => import('@features/search'));
const Notifications = lazy(() => import('@features/notifications'));

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/canteen" element={<Canteen />} />
          <Route path="/library" element={<Library />} />
          <Route path="/customize" element={<Customize />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/search" element={<Search />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
