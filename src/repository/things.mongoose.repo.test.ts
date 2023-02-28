import { ThingModel } from './things.mongoose.model';
import { ThingsMongooseRepo } from './things.mongoose.repo';
jest.mock('./things.mongoose.model');
const repo = new ThingsMongooseRepo();

describe('Given ThingsMongooseRepo', () => {
  describe('When we use query ', () => {
    test('Then should return the data', async () => {
      (ThingModel.find as jest.Mock).mockResolvedValue('[]');
      const data = await repo.query();
      expect(ThingModel.find).toHaveBeenCalled();
      expect(data).toEqual('[]');
    });
  });
});
describe('When the queryId method is used', () => {
  beforeEach(async () => {
    (ThingModel.findById as jest.Mock).mockResolvedValue('[{"id": "1"}]');
  });

  test('Then if it has an object with a valid ID, it should return the object', async () => {
    const result = await repo.queryId('1');
    expect(ThingModel.findById).toHaveBeenCalled();
    expect(result).toEqual({ id: '1' });
  });

  test('Then if it has an object with NO valid ID, it should throw an Error', async () => {
    expect(async () => repo.queryId('2')).rejects.toThrow();
  });
});

describe('When we use create', () => {
  test('Then it should return a object', async () => {
    (ThingModel.create as jest.Mock).mockResolvedValue({ name: 'bonito' });
    const data = await repo.create({ name: 'atun' });
    expect(ThingModel.create).toHaveBeenCalled();
    expect(data).toEqual({ name: 'atun' });
  });
});

describe('When we use destroy', () => {
  test('Then we expect undefined because the item don,t exist', async () => {
    (ThingModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
      '[{  "id" }]'
    );
    const data = await repo.destroy('1');
    expect(ThingModel.findByIdAndDelete).toHaveBeenCalled();
    expect(data).toBe(1);
  });
  test('Then it should throw an error if it has a NO valid id', () => {
    (ThingModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
      '[{  "id"  }]'
    );
    expect(async () => repo.destroy('1')).rejects.toThrow();
    expect(ThingModel.findByIdAndDelete).toHaveBeenCalled();
  });
});
