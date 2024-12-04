import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import RoutingLoader from './Loader';
import Play from '../pages/play';
import VideoPlayer from '../pages/video-player/VideoPlayer';

// Lazy load pages
const AddPlayer = lazy(() => import('../pages/add-player'));
const Info = lazy(() => import('../pages/info'));
const NotFound = lazy(() => import('../pages/not-found'));
const Sing = lazy(() => import('../pages/sing'));

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Play />} />
      <Route
        path="/add-player"
        element={
          <RoutingLoader>
            <AddPlayer />
          </RoutingLoader>
        }
      />
      <Route
        path="/info"
        element={
          <RoutingLoader>
            <Info />
          </RoutingLoader>
        }
      />
      <Route
        path="/sing"
        element={
          <RoutingLoader>
            <Sing />
          </RoutingLoader>
        }
      />
       <Route
        path="/video-player"
        element={
          <RoutingLoader>
            <VideoPlayer />
          </RoutingLoader>
        }
      />
      <Route
        path="*"
        element={
          <RoutingLoader>
            <NotFound />
          </RoutingLoader>
        }
      />
    </Routes>
  );
};

export default Routing;