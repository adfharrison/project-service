import { IRouter } from 'express';
function thingsController({ router }: { router: IRouter }) {
  router.post(
    '/api/v1/things',
    async function createThing(request, response, next) {
      try {
        await setTimeout(() => {
          return response.status(201).json({
            id: '214814h31rh0hfo490t820h23rt0',
          });
        }, 2000);
      } catch (error) {
        return next(error);
      }
    }
  );

  return router;
}

export default thingsController;
