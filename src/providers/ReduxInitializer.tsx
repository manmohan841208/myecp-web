'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFlutterAppStatus } from '@/store/slices/appSlice'; // Adjust path

export default function ReduxInitializer({
  isFlutterApp,
}: {
  isFlutterApp: boolean | undefined;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the action only once when the component mounts on the client
    dispatch(setFlutterAppStatus(!!isFlutterApp));
  }, [dispatch, isFlutterApp]);

  return null; // This component renders nothing itself
}
