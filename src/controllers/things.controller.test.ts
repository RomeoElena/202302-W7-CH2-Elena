import { Response, Request, NextFunction } from 'express';
import { ThingsMongooseRepo } from '../repository/things.mongoose.repo';
import { ThingsController } from './things.controller';

describe('Given the ThingsController', () => {
  const repo: ThingsMongooseRepo = {
    query: jest.fn(),
    queryId: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };

  const req = {
    body: {},
    params: { id: '1' },
  } as unknown as Request;

  const resp = {
    json: jest.fn(),
  } as unknown as Response;

  const next = jest.fn();

  const controller = new ThingsController(repo);

  describe('When we use getAll method', () => {
    test('Then there are NOT errors', async () => {
      await controller.getAll(req, resp, next);
      expect(repo.query).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then if here are errors', async () => {
      (repo.query as jest.Mock).mockRejectedValue(new Error());
      await controller.getAll(req, resp, next);
      expect(repo.query).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When get method is called', () => {
    test('Then if there are NOT errors from the repo', async () => {
      await controller.get(req, resp, next);

      expect(repo.queryId).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then if there are errors from the repo', async () => {
      (repo.queryId as jest.Mock).mockRejectedValue(new Error());
      await controller.get(req, resp, next);

      expect(repo.queryId).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
  describe('When post method is called', () => {
    test('Then if there are NOT errors from the repo', async () => {
      await controller.post(req, resp, next);

      expect(repo.create).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then if there are errors from the repo', async () => {
      (repo.create as jest.Mock).mockRejectedValue(new Error());
      await controller.post(req, resp, next);

      expect(repo.create).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
  describe('When patch method is called', () => {
    test('Then if there are NOT errors from the repo and the body id is different than params', async () => {
      await controller.patch(req, resp, next);

      expect(repo.update).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then if there are errors from the repo', async () => {
      (repo.update as jest.Mock).mockRejectedValue(new Error());
      await controller.patch(req, resp, next);

      expect(repo.update).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });

    test('Then if there is NO error from the repo and the body id is the same than params', async () => {
      const req = {
        body: {
          id: '3',
        },
        params: { id: '' },
      } as unknown as Request;

      await controller.patch(req, resp, next);

      expect(repo.update).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
  });
  describe('When delete method is called', () => {
    test('Then if there are NOT errors from the repo', async () => {
      await controller.delete(req, resp, next);

      expect(repo.destroy).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then if there are errors from the repo', async () => {
      (repo.destroy as jest.Mock).mockRejectedValue(new Error());
      await controller.delete(req, resp, next);

      expect(repo.destroy).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});
